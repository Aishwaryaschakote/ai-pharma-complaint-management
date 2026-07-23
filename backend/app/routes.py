from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session  # type: ignore

from app.schemas import (
    ComplaintRequest,
    ComplaintCreate,
    ComplaintRefine,
)
from app.database import get_db
from app.models import Complaint
from app.langgraph.workflow import graph
from app.ai import refine_complaint
from app.pdf_utils import extract_text_from_pdf

router = APIRouter()


@router.post("/analyze")
def analyze(request: ComplaintRequest):

    state = {
        "complaint_text": request.complaint_text
    }

    result = graph.invoke(state)

    return {
        "result": result["extracted_data"]
    }

@router.post("/refine")
def refine(data: ComplaintRefine):

    updated = refine_complaint(
        data.current_data,
        data.instruction
    )

    return {
        "result": updated
    }

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file.file)

    if not text.strip():
        return {
            "success": False,
            "message": "The uploaded PDF contains no readable text.",
            "text": ""
        }

    return {
        "success": True,
        "text": text
    }


@router.post("/complaints")
def save_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):

    new_complaint = Complaint(
        product=complaint.product,
        batch=complaint.batch,
        customer=complaint.customer,
        description=complaint.description,
        severity=complaint.severity,
        category=complaint.category,
        summary=complaint.summary,
        root_cause=complaint.root_cause,
        capa=complaint.capa,
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "Complaint Saved Successfully",
        "id": new_complaint.id
    }


@router.get("/complaints")
def get_all(db: Session = Depends(get_db)):
    return db.query(Complaint).all()


@router.patch("/complaints/{complaint_id}/status")
def update_status(
    complaint_id: int,
    status: str,
    db: Session = Depends(get_db),
):

    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:
        return {
            "message": "Complaint not found"
        }

    complaint.status = status

    db.commit()

    return {
        "message": "Status Updated"
    }
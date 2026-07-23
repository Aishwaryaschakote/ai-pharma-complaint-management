from sqlalchemy.orm import Session # type: ignore

from app.ai import analyze_complaint
from app.database import SessionLocal
from app.models import Complaint


def extract_node(state):
    print("✅ Node 1: Extract")
    result = analyze_complaint(state["complaint_text"])

    state["extracted_data"] = result

    return state


def completeness_node(state):
    print("✅ Node 2: Completeness")
    data = state["extracted_data"]

    required = [
        "product",
        "batch",
        "customer",
        "description",
        "severity",
        "category",
    ]

    missing = []

    for field in required:

        value = data.get(field)

        if (
            value is None
            or str(value).strip() == ""
            or str(value).lower() == "unknown"
        ):
            missing.append(field)

    data["missing_fields"] = missing

    data["completeness"] = (
        "Complete"
        if len(missing) == 0
        else "Incomplete"
    )

    state["extracted_data"] = data

    return state


def risk_node(state):
    print("✅ Node 3: Risk")
    data = state["extracted_data"]

    severity = str(data.get("severity", "")).lower()

    if severity == "critical":
        risk = "Critical"

    elif severity == "high":
        risk = "High"

    elif severity == "medium":
        risk = "Medium"

    else:
        risk = "Low"

    data["risk_level"] = risk

    state["extracted_data"] = data

    return state


def duplicate_node(state):
    print("✅ Node 4: Duplicate")
    data = state["extracted_data"]

    db: Session = SessionLocal()

    try:

        product = str(
            data.get("product", "")
        ).lower()

        description = str(
            data.get("description", "")
        ).lower()

        complaints = db.query(Complaint).all()

        duplicate = False

        for complaint in complaints:

            db_product = (complaint.product or "").lower()
            db_description = (complaint.description or "").lower()

            if (
                product == db_product
                and description == db_description
            ):
                duplicate = True
                break

        data["duplicate"] = duplicate

    finally:
        db.close()

    state["extracted_data"] = data

    return state


def recommendation_node(state):
    print("✅ Node 5: Recommendation")
    """
    Final AI recommendation node.
    Ensures recommendation fields exist before returning.
    """

    data = state["extracted_data"]

    if data.get("root_cause") in ["", None]:
        data["root_cause"] = "Unknown"

    if data.get("capa") in ["", None]:
        data["capa"] = "Unknown"

    if data.get("summary") in ["", None]:
        data["summary"] = "No summary generated."

    data["workflow_status"] = "Analysis Completed"

    state["extracted_data"] = data

    return state
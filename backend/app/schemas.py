from pydantic import BaseModel
from typing import Dict, Any


class ComplaintRequest(BaseModel):
    complaint_text: str


class ComplaintCreate(BaseModel):
    product: str
    batch: str
    customer: str
    description: str
    severity: str
    category: str
    summary: str
    root_cause: str
    capa: str


# -----------------------------
# NEW SCHEMA
# -----------------------------
class ComplaintRefine(BaseModel):
    current_data: Dict[str, Any]
    instruction: str
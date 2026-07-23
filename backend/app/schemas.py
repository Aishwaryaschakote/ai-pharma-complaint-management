from pydantic import BaseModel


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
from typing import TypedDict, List, Any


class ComplaintState(TypedDict):
    complaint_text: str

    extracted_data: dict

    completeness: str

    missing_fields: List[str]

    risk_level: str

    duplicate: bool

    root_cause: str

    capa: str

    summary: str

    final_result: dict
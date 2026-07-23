from sqlalchemy import Column # type: ignore
from sqlalchemy import Integer# type: ignore
from sqlalchemy import String # type: ignore
from sqlalchemy import Text# type: ignore
from sqlalchemy import DateTime# type: ignore
from sqlalchemy.sql import func# type: ignore

from app.database import Base


class Complaint(Base):

    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    product = Column(String)

    batch = Column(String)

    customer = Column(String)

    description = Column(Text)

    severity = Column(String)

    category = Column(String)

    summary = Column(Text)

    root_cause = Column(Text)

    capa = Column(Text)

    status = Column(String, default="Open")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
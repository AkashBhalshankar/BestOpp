"""Application Model tracking candidates through high-velocity pipelines."""

import enum
import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Any, Dict, List, Optional
from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.profile import CandidateProfile
    from app.models.requisition import Requisition


class ApplicationStatus(str, enum.Enum):
    SAVED = "saved"
    TAILORED = "tailored"
    APPLIED = "applied"
    FIRST_TOUCH = "first_touch"
    INTERVIEWING = "interviewing"
    OFFER_RECEIVED = "offer_received"
    CLOSED = "closed"


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("candidate_profiles.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    requisition_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("requisitions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus, name="application_status_enum", native_enum=False),
        default=ApplicationStatus.SAVED,
        nullable=False,
        index=True,
    )

    # Tectonic LaTeX Engine Telemetry
    tailored_latex_source: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    pdf_compiled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    tectonic_compile_latency_ms: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
        default=110,
    )

    # Tactical Outreach & CRM Details
    is_direct_referral_used: Mapped[bool] = mapped_column(Boolean, default=False)
    referral_advocate_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    hiring_manager_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    applied_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    interview_timeline_log: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    candidate_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    profile: Mapped["CandidateProfile"] = relationship("CandidateProfile", back_populates="applications")
    requisition: Mapped["Requisition"] = relationship("Requisition", back_populates="applications")

"""Job Requisition Model with Ghost Risk Detection and Compensation Telemetry."""

import enum
import uuid
from typing import TYPE_CHECKING, Any, Dict, List, Optional
from sqlalchemy import Boolean, Enum, Float, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.application import Application
    from app.models.match import Match


class WorkMode(str, enum.Enum):
    REMOTE = "remote"
    HYBRID = "hybrid"
    ONSITE = "onsite"


class RequisitionStatus(str, enum.Enum):
    VERIFIED_ACTIVE = "verified_active"
    FLAGGED_FOR_AUDIT = "flagged_for_audit"
    PURGED_GHOST = "purged_ghost"


class Requisition(Base):
    __tablename__ = "requisitions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    external_requisition_id: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        index=True,
        nullable=False,
    )
    company_name: Mapped[str] = mapped_column(
        String(255),
        index=True,
        nullable=False,
    )
    company_monogram: Mapped[str] = mapped_column(
        String(8),
        nullable=False,
        default="B",
    )
    job_title: Mapped[str] = mapped_column(
        String(255),
        index=True,
        nullable=False,
    )
    department_or_domain: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        default="Platform Engineering",
    )
    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        default="Bangalore, India",
    )
    work_mode: Mapped[WorkMode] = mapped_column(
        Enum(WorkMode, name="work_mode_enum", native_enum=False),
        default=WorkMode.HYBRID,
        nullable=False,
    )

    # Compensation Transparency (Un-obfuscated)
    min_base_inr: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    max_base_inr: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    bonus_percentage_target: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    esop_pool_value_inr: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    # Ghost Detector Telemetry
    ghost_risk_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.05,
        index=True,
    )
    recruiter_signal_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.85,
    )
    repost_count_90d: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    ingestion_source: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="Greenhouse Ingest API",
    )

    # Verification & Authority Status
    status: Mapped[RequisitionStatus] = mapped_column(
        Enum(RequisitionStatus, name="requisition_status_enum", native_enum=False),
        default=RequisitionStatus.VERIFIED_ACTIVE,
        nullable=False,
        index=True,
    )
    verified_signed_offers_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )
    is_fresher_eligible: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
    )
    target_scale_rps: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
        default=20000,
    )

    # Structured Payloads
    required_stack: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    hiring_loop_telemetry: Mapped[Dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )
    raw_job_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    matches: Mapped[List["Match"]] = relationship(
        "Match",
        back_populates="requisition",
        cascade="all, delete-orphan",
    )
    applications: Mapped[List["Application"]] = relationship(
        "Application",
        back_populates="requisition",
        cascade="all, delete-orphan",
    )

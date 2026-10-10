"""Match Model connecting Candidate Assets to Requisitions with Skill Bridge Telemetry."""

import uuid
from typing import TYPE_CHECKING, Any, Dict, Optional
from sqlalchemy import Boolean, Float, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.profile import CandidateProfile
    from app.models.requisition import Requisition


class Match(Base):
    __tablename__ = "matches"
    __table_args__ = (
        UniqueConstraint("profile_id", "requisition_id", name="uq_match_profile_requisition"),
    )

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

    # Scored Metrics
    overall_parity_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=85.0,
        index=True,
    )
    leverage_score: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=80,
        index=True,
    )
    hard_stack_overlap_pct: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=80.0,
    )
    architecture_scale_fit_pct: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=80.0,
    )
    compensation_upside_pct: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=25.0,
    )

    # Workflow Flags
    is_starred: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )
    is_selected_for_review: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # Candidate-First Skill Bridge Telemetry
    skill_bridge_active: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )
    skill_bridge_payload: Mapped[Dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )
    parity_audit_details: Mapped[Dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )

    # Relationships
    profile: Mapped["CandidateProfile"] = relationship("CandidateProfile", back_populates="matches")
    requisition: Mapped["Requisition"] = relationship("Requisition", back_populates="matches")

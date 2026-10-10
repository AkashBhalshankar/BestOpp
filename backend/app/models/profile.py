"""Candidate Profile Model representing technical assets and candidate telemetry."""

import uuid
from typing import TYPE_CHECKING, Any, Dict, List, Optional
from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.application import Application
    from app.models.match import Match
    from app.models.negotiation import NegotiationWarRoom
    from app.models.user import User


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    batch_year: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
        index=True,
    )
    college_tier: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
        default="Tier-1",
    )
    current_title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        default="Student IC",
    )
    years_of_experience: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0.0,
        index=True,
    )
    target_base_ctc_inr: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1200000,
    )
    production_peak_rps: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
        default=0,
    )

    github_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    linkedin_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)

    # Rich Telemetry JSON structures
    skills_inventory: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    verified_projects: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    dsa_readiness_metrics: Mapped[Dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="profile")
    matches: Mapped[List["Match"]] = relationship(
        "Match",
        back_populates="profile",
        cascade="all, delete-orphan",
    )
    applications: Mapped[List["Application"]] = relationship(
        "Application",
        back_populates="profile",
        cascade="all, delete-orphan",
    )
    negotiations: Mapped[List["NegotiationWarRoom"]] = relationship(
        "NegotiationWarRoom",
        back_populates="profile",
        cascade="all, delete-orphan",
    )

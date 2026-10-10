"""Negotiation War Room & First-Offer De-Obfuscator Models."""

import enum
import uuid
from typing import TYPE_CHECKING, Any, Dict, List, Optional
from sqlalchemy import Boolean, Enum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.profile import CandidateProfile


class ThreatLevel(str, enum.Enum):
    LOW = "low"
    ELEVATED = "elevated"
    EXTREME = "extreme"


class NegotiationWarRoom(Base):
    __tablename__ = "negotiation_war_rooms"

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
    war_room_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )
    offering_company_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # CTC De-Obfuscator Metrics
    stated_gross_ctc_inr: Mapped[int] = mapped_column(Integer, nullable=False)
    nominal_monthly_inr: Mapped[int] = mapped_column(Integer, nullable=False)
    real_monthly_liquid_inr: Mapped[int] = mapped_column(Integer, nullable=False)
    guaranteed_base_inr: Mapped[int] = mapped_column(Integer, nullable=False)
    deferred_retention_bonus_inr: Mapped[int] = mapped_column(Integer, default=0)
    group_health_gratuity_inr: Mapped[int] = mapped_column(Integer, default=0)
    speculative_variable_inr: Mapped[int] = mapped_column(Integer, default=0)
    training_clawback_inr: Mapped[int] = mapped_column(Integer, default=0)
    obfuscation_index_pct: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)

    # Predatory Bond Sentinel
    threat_level: Mapped[ThreatLevel] = mapped_column(
        Enum(ThreatLevel, name="threat_level_enum", native_enum=False),
        default=ThreatLevel.LOW,
        nullable=False,
    )
    bond_lockin_months: Mapped[int] = mapped_column(Integer, default=0)
    bond_penalty_inr: Mapped[int] = mapped_column(Integer, default=0)
    certificate_surrender_demanded: Mapped[bool] = mapped_column(Boolean, default=False)

    # Tactical Payloads & Scripts
    flagged_hostile_clauses: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    counter_defense_scripts: Mapped[List[Dict[str, Any]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
    )
    raw_contract_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationship
    profile: Mapped["CandidateProfile"] = relationship("CandidateProfile", back_populates="negotiations")

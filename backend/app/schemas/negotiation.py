"""Pydantic v2 Schemas for Negotiation War Room & CTC De-Obfuscator."""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.models.negotiation import ThreatLevel


class HostileClause(BaseModel):
    clause_number: str
    clause_title: str
    raw_extract: str
    risk_category: str
    legal_rebuttal: str
    statutory_precedent: str
    is_void_ab_initio: bool = True


class DefenseScript(BaseModel):
    script_id: int
    title: str
    channel: str
    leverage_rating: str
    template_text: str
    strategic_rationale: str


class CTCDeductionItem(BaseModel):
    component_label: str
    stated_value: int
    real_liquidity_status: str
    year_1_liquid_in_pocket: int
    is_trap: bool = False


class CTCDeobfuscateRequest(BaseModel):
    stated_gross_ctc_inr: int = Field(..., gt=0)
    raw_contract_text: Optional[str] = None
    service_bond_penalty_inr: Optional[int] = 0
    lockin_period_months: Optional[int] = 0
    demands_original_certificates: Optional[bool] = False


class CTCDeobfuscateResponse(BaseModel):
    war_room_code: str
    stated_gross_ctc_inr: int
    nominal_monthly_inr: int
    real_monthly_liquid_inr: int
    guaranteed_base_inr: int
    deferred_retention_bonus_inr: int
    group_health_gratuity_inr: int
    speculative_variable_inr: int
    training_clawback_inr: int
    obfuscation_index_pct: float
    illiquidity_drag_pct: float

    threat_level: ThreatLevel
    bond_lockin_months: int
    bond_penalty_inr: int
    certificate_surrender_demanded: bool

    ledger_breakdown: List[CTCDeductionItem]
    flagged_clauses: List[HostileClause]
    counter_defense_scripts: List[DefenseScript]


class NegotiationWarRoomResponse(BaseModel):
    id: uuid.UUID
    profile_id: uuid.UUID
    war_room_code: str
    offering_company_name: str
    stated_gross_ctc_inr: int
    nominal_monthly_inr: int
    real_monthly_liquid_inr: int
    guaranteed_base_inr: int
    obfuscation_index_pct: float
    threat_level: ThreatLevel
    bond_lockin_months: int
    bond_penalty_inr: int
    certificate_surrender_demanded: bool
    flagged_hostile_clauses: List[Dict[str, Any]]
    counter_defense_scripts: List[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

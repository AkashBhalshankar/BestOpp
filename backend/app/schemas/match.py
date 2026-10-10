"""Pydantic v2 Schemas for Bi-Directional Matches & Skill Bridge Telemetry."""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.schemas.requisition import RequisitionResponse


class SemanticTranslationItem(BaseModel):
    conceptual_domain: str
    academic_or_prior_primitive: str
    target_enterprise_technology: str
    system_equivalence_rationale: str


class SkillBridgePayload(BaseModel):
    missing_technology: str
    equivalent_candidate_background: str
    conceptual_overlap_pct: float = Field(ge=0.0, le=100.0)
    ramp_estimate_hours: str
    semantic_translation_matrix: List[SemanticTranslationItem] = Field(default_factory=list)
    bridge_architecture_notes: str
    interview_defense_talking_points: List[str] = Field(default_factory=list)


class ParityAuditDetail(BaseModel):
    hard_stack_overlap_pct: float = Field(ge=0.0, le=100.0)
    direct_matched_skills: List[str] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list)
    architecture_scale_fit_pct: float = Field(ge=0.0, le=100.0)
    candidate_peak_rps: int = 0
    target_req_rps: int = 0
    scale_fit_evaluation: str


class MatchBase(BaseModel):
    profile_id: uuid.UUID
    requisition_id: uuid.UUID
    overall_parity_score: float = Field(ge=0.0, le=100.0)
    leverage_score: int = Field(ge=0, le=100)
    hard_stack_overlap_pct: float = Field(ge=0.0, le=100.0)
    architecture_scale_fit_pct: float = Field(ge=0.0, le=100.0)
    compensation_upside_pct: float = 0.0
    is_starred: bool = False
    is_selected_for_review: bool = False
    skill_bridge_active: bool = False
    skill_bridge_payload: Dict[str, Any] = Field(default_factory=dict)
    parity_audit_details: Dict[str, Any] = Field(default_factory=dict)


class MatchResponse(MatchBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    requisition: Optional[RequisitionResponse] = None

    model_config = ConfigDict(from_attributes=True)


class MatchComputeRequest(BaseModel):
    profile_id: uuid.UUID
    requisition_ids: Optional[List[uuid.UUID]] = None

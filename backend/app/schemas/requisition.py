"""Pydantic v2 Schemas for Job Requisitions & Telemetry."""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field

from app.models.requisition import RequisitionStatus, WorkMode


class RequisitionBase(BaseModel):
    external_requisition_id: str = Field(..., max_length=100)
    company_name: str = Field(..., max_length=255)
    company_monogram: str = Field(default="B", max_length=8)
    job_title: str = Field(..., max_length=255)
    department_or_domain: str = Field(default="Platform Engineering", max_length=255)
    location: str = Field(default="Bangalore, India", max_length=255)
    work_mode: WorkMode = Field(default=WorkMode.HYBRID)

    # Compensation Transparency
    min_base_inr: int = Field(default=0, ge=0)
    max_base_inr: int = Field(default=0, ge=0)
    bonus_percentage_target: float = Field(default=0.0, ge=0.0)
    esop_pool_value_inr: int = Field(default=0, ge=0)

    # Ghost Detector Telemetry
    ghost_risk_score: float = Field(default=0.05, ge=0.0, le=1.0)
    recruiter_signal_score: float = Field(default=0.85, ge=0.0, le=1.0)
    repost_count_90d: int = Field(default=0, ge=0)
    ingestion_source: str = Field(default="Greenhouse Ingest API", max_length=100)

    status: RequisitionStatus = Field(default=RequisitionStatus.VERIFIED_ACTIVE)
    verified_signed_offers_count: int = Field(default=0, ge=0)
    is_fresher_eligible: bool = Field(default=False)
    target_scale_rps: Optional[int] = Field(default=20000, ge=0)

    required_stack: List[Dict[str, Any]] = Field(default_factory=list)
    hiring_loop_telemetry: Dict[str, Any] = Field(default_factory=dict)
    raw_job_description: Optional[str] = None


class RequisitionCreate(RequisitionBase):
    pass


class RequisitionUpdate(BaseModel):
    job_title: Optional[str] = None
    min_base_inr: Optional[int] = None
    max_base_inr: Optional[int] = None
    status: Optional[RequisitionStatus] = None
    ghost_risk_score: Optional[float] = None
    recruiter_signal_score: Optional[float] = None
    verified_signed_offers_count: Optional[int] = None
    required_stack: Optional[List[Dict[str, Any]]] = None
    hiring_loop_telemetry: Optional[Dict[str, Any]] = None


class RequisitionResponse(RequisitionBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RequisitionFilterParams(BaseModel):
    min_base_inr: Optional[int] = None
    max_ghost_risk: Optional[float] = 0.15
    work_mode: Optional[WorkMode] = None
    is_fresher_eligible: Optional[bool] = None
    search_keyword: Optional[str] = None
    status: Optional[RequisitionStatus] = RequisitionStatus.VERIFIED_ACTIVE

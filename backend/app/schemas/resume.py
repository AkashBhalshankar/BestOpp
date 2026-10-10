"""Pydantic v2 Schemas for Resume Studio & Tectonic Engine Compilation."""

import uuid
from typing import List, Optional
from pydantic import BaseModel, Field


class ResumeTailorRequest(BaseModel):
    profile_id: uuid.UUID
    requisition_id: uuid.UUID
    include_skill_bridge_bullets: bool = True
    custom_bullet_overrides: Optional[List[str]] = None
    target_page_budget: float = Field(default=1.0, ge=1.0, le=2.0)


class TectonicCompileRequest(BaseModel):
    latex_source: str = Field(..., min_length=10)
    job_identifier: Optional[str] = None
    timeout_seconds: int = Field(default=15, ge=2, le=60)


class TectonicCompileResponse(BaseModel):
    success: bool
    pdf_base64: Optional[str] = None
    compile_latency_ms: int = 0
    stdout: str = ""
    stderr: str = ""
    page_count: int = 1
    page_budget_overflow: bool = False
    overflow_message: Optional[str] = None

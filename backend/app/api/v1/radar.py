"""API v1 Endpoints for Opportunity Radar & Requisitions."""

import uuid
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_async_session
from app.models.requisition import Requisition, RequisitionStatus, WorkMode
from app.schemas.requisition import RequisitionCreate, RequisitionResponse

router = APIRouter()


@router.get("/requisitions", response_model=List[RequisitionResponse])
async def list_requisitions(
    min_base_inr: Optional[int] = Query(None),
    max_ghost_risk: float = Query(0.15, ge=0.0, le=1.0),
    is_fresher_eligible: Optional[bool] = Query(None),
    work_mode: Optional[WorkMode] = Query(None),
    search_keyword: Optional[str] = Query(None),
    status_filter: RequisitionStatus = Query(RequisitionStatus.VERIFIED_ACTIVE),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_async_session),
) -> List[Requisition]:
    """Lists high-leverage job requisitions with transparent compensation and low ghost risk."""
    query = (
        select(Requisition)
        .where(
            Requisition.status == status_filter,
            Requisition.ghost_risk_score <= max_ghost_risk,
        )
        .order_by(Requisition.max_base_inr.desc())
        .offset(offset)
        .limit(limit)
    )

    if min_base_inr is not None:
        query = query.where(Requisition.min_base_inr >= min_base_inr)
    if is_fresher_eligible is not None:
        query = query.where(Requisition.is_fresher_eligible == is_fresher_eligible)
    if work_mode:
        query = query.where(Requisition.work_mode == work_mode)
    if search_keyword:
        kw = f"%{search_keyword.strip().lower()}%"
        query = query.where(
            (Requisition.company_name.ilike(kw))
            | (Requisition.job_title.ilike(kw))
            | (Requisition.department_or_domain.ilike(kw))
        )

    result = await db.execute(query)
    return list(result.scalars().all())


@router.get("/requisitions/{requisition_id}", response_model=RequisitionResponse)
async def get_requisition(
    requisition_id: uuid.UUID,
    db: AsyncSession = Depends(get_async_session),
) -> Requisition:
    """Fetches full requisition telemetry, compensation breakdowns, and hiring loop data."""
    result = await db.execute(
        select(Requisition).where(Requisition.id == requisition_id)
    )
    req = result.scalar_one_or_none()
    if not req:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Requisition {requisition_id} not found.",
        )
    return req


@router.post("/requisitions", response_model=RequisitionResponse, status_code=status.HTTP_201_CREATED)
async def create_requisition(
    payload: RequisitionCreate,
    db: AsyncSession = Depends(get_async_session),
) -> Requisition:
    """Manually ingests or registers a verified technical requisition into BestOpp Radar."""
    existing = await db.execute(
        select(Requisition).where(
            Requisition.external_requisition_id == payload.external_requisition_id
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Requisition with ID {payload.external_requisition_id} already exists.",
        )

    req = Requisition(**payload.model_dump())
    db.add(req)
    await db.commit()
    await db.refresh(req)
    return req


@router.get("/accelerators", response_model=List[Dict[str, Any]])
async def list_career_accelerators() -> List[Dict[str, Any]]:
    """Returns peer-reviewed high-leverage programs, GSoC orgs, LFX mentorships, and national hackathons."""
    return [
        {
            "id": "acc-gsoc-cncf-2025",
            "category": "Open-Source Foundation",
            "title": "Google Summer of Code (GSoC 2025) • CNCF / Kubernetes Org",
            "time_remaining": "18d left",
            "stipend_usd": 3000,
            "stipend_inr": 252000,
            "skill_match": "Go, K8s Custom Controllers",
            "status": "Active Application Window",
        },
        {
            "id": "acc-lfx-cilium-2025",
            "category": "Linux Foundation Mentorship",
            "title": "LFX Mentorship (Linux Foundation) • Cilium eBPF Observability",
            "time_remaining": "Closes in 9d",
            "stipend_usd": 3000,
            "stipend_inr": 252000,
            "skill_match": "Linux Internals, C/Go Core",
            "status": "Closing Soon",
        },
        {
            "id": "acc-inout-hack-2025",
            "category": "Premier Hackathon",
            "title": "In-Out Hackathon 2025 • Direct VC & Seed Stage Fast-Track",
            "location": "Bengaluru In-Person",
            "prize_pool_inr": 500000,
            "fast_track_interviews": "6 Series-A Firms",
            "status": "Registration Open",
        },
    ]

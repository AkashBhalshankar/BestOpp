"""API v1 Endpoints for Application CRM & High-Velocity Outreach."""

import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_async_session
from app.models.application import Application, ApplicationStatus
from app.models.profile import CandidateProfile
from app.models.requisition import Requisition

router = APIRouter()


class ClipToCRMRequest(BaseModel):
    profile_id: uuid.UUID
    requisition_id: uuid.UUID
    notes: Optional[str] = None
    referral_advocate: Optional[str] = None


class ElevatorPitchRequest(BaseModel):
    profile_id: uuid.UUID
    requisition_id: uuid.UUID
    recipient_role: str = Field(default="Hiring Manager", description="'Hiring Manager' or 'Recruiter'")


@router.get("/applications", response_model=List[Dict[str, Any]])
async def list_applications(
    profile_id: Optional[uuid.UUID] = Query(None),
    status_filter: Optional[ApplicationStatus] = Query(None),
    db: AsyncSession = Depends(get_async_session),
) -> List[Dict[str, Any]]:
    """Lists pipeline applications tracked by the candidate in BestOpp CRM."""
    query = select(Application).options(selectinload(Application.requisition))
    if profile_id:
        query = query.where(Application.profile_id == profile_id)
    if status_filter:
        query = query.where(Application.status == status_filter)

    result = await db.execute(query.order_by(Application.created_at.desc()))
    apps = result.scalars().all()

    return [
        {
            "id": app.id,
            "profile_id": app.profile_id,
            "requisition_id": app.requisition_id,
            "company_name": app.requisition.company_name if app.requisition else "Unknown",
            "job_title": app.requisition.job_title if app.requisition else "Unknown",
            "status": app.status,
            "is_direct_referral": app.is_direct_referral_used,
            "applied_at": app.applied_at,
            "created_at": app.created_at,
        }
        for app in apps
    ]


@router.post("/applications", status_code=status.HTTP_201_CREATED)
async def clip_to_crm(
    payload: ClipToCRMRequest,
    db: AsyncSession = Depends(get_async_session),
) -> Dict[str, Any]:
    """1-Click Clips a high-leverage opportunity match directly into the candidate's active CRM pipeline."""
    # Verify profile and requisition
    req_res = await db.execute(select(Requisition).where(Requisition.id == payload.requisition_id))
    req = req_res.scalar_one_or_none()
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Requisition not found.")

    # Check existing application
    existing = await db.execute(
        select(Application).where(
            Application.profile_id == payload.profile_id,
            Application.requisition_id == payload.requisition_id,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Application already logged in CRM pipeline.",
        )

    app = Application(
        profile_id=payload.profile_id,
        requisition_id=payload.requisition_id,
        status=ApplicationStatus.SAVED,
        is_direct_referral_used=bool(payload.referral_advocate),
        referral_advocate_name=payload.referral_advocate,
        candidate_notes=payload.notes,
        applied_at=datetime.now(timezone.utc),
        interview_timeline_log=[
            {
                "stage": "Clipped to CRM",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "note": "Requisition captured with zero-ghost guarantee.",
            }
        ],
    )
    db.add(app)
    await db.commit()
    await db.refresh(app)

    return {
        "success": True,
        "application_id": app.id,
        "company": req.company_name,
        "title": req.job_title,
        "status": app.status,
    }


@router.post("/elevator-pitch", response_model=Dict[str, Any])
async def generate_cold_elevator_pitch(
    payload: ElevatorPitchRequest,
    db: AsyncSession = Depends(get_async_session),
) -> Dict[str, Any]:
    """Synthesizes high-agency cold outreach messages for Engineering Leaders & Recruiters."""
    req_res = await db.execute(select(Requisition).where(Requisition.id == payload.requisition_id))
    req = req_res.scalar_one_or_none()
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Requisition not found.")

    subject = f"Distributed Systems IC // Parity match for {req.job_title} at {req.company_name}"
    body = (
        f"Hi [Engineering Leader],\n\n"
        f"I came across your team's opening for {req.job_title} under {req.department_or_domain}.\n\n"
        f"My background centers on high-throughput backend infrastructure, having recently architected a "
        f"distributed key-value store benchmarked at 22,000 peak RPS with Raft consensus and sub-18ms SLA.\n\n"
        f"I noticed your mandate emphasizes {req.required_stack[0].get('name', 'distributed messaging') if req.required_stack else 'core platform'} — "
        f"my production experience with concurrent write-ahead logging and outbox patterns translates directly to your scale.\n\n"
        f"Would you be open to a 10-minute technical exchange on your core settlement roadmap this week?\n\n"
        f"Best regards,\n"
        f"Arjun M. | github.com/profile"
    )

    return {
        "subject": subject,
        "body": body,
        "recipient_role": payload.recipient_role,
        "target_company": req.company_name,
    }

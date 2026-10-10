"""API v1 Endpoints for Opportunity Matches & The Skill Bridge™."""

import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_async_session
from app.models.match import Match
from app.models.profile import CandidateProfile
from app.models.requisition import Requisition, RequisitionStatus
from app.schemas.match import MatchComputeRequest, MatchResponse
from app.services.match_engine import MatchEngineService

router = APIRouter()


@router.get("", response_model=List[MatchResponse])
async def list_matches(
    profile_id: Optional[uuid.UUID] = Query(None, description="Optional Candidate Profile ID"),
    min_parity: float = Query(75.0, ge=0.0, le=100.0),
    min_leverage: int = Query(70, ge=0, le=100),
    is_starred: Optional[bool] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_async_session),
) -> List[Match]:
    """Retrieves ranked opportunities for candidate profiles with Skill Bridge telemetry."""
    query = (
        select(Match)
        .options(selectinload(Match.requisition))
        .where(
            Match.overall_parity_score >= min_parity,
            Match.leverage_score >= min_leverage,
        )
        .order_by(Match.leverage_score.desc())
        .offset(offset)
        .limit(limit)
    )

    if profile_id:
        query = query.where(Match.profile_id == profile_id)
    if is_starred is not None:
        query = query.where(Match.is_starred == is_starred)

    result = await db.execute(query)
    matches = list(result.scalars().all())
    return matches


@router.get("/{match_id}", response_model=MatchResponse)
async def get_match_detail(
    match_id: uuid.UUID,
    db: AsyncSession = Depends(get_async_session),
) -> Match:
    """Fetches in-depth telemetry for an opportunity match including Skill Bridge translation."""
    query = (
        select(Match)
        .options(selectinload(Match.requisition))
        .where(Match.id == match_id)
    )
    result = await db.execute(query)
    match_record = result.scalar_one_or_none()

    if not match_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Match with id {match_id} not found.",
        )
    return match_record


@router.post("/compute", response_model=List[MatchResponse])
async def compute_matches_for_profile(
    payload: MatchComputeRequest,
    db: AsyncSession = Depends(get_async_session),
) -> List[Match]:
    """Runs the MatchEngine and SkillBridge algorithms to index matches for candidate profiles."""
    profile_res = await db.execute(
        select(CandidateProfile).where(CandidateProfile.id == payload.profile_id)
    )
    profile = profile_res.scalar_one_or_none()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Candidate profile {payload.profile_id} does not exist.",
        )

    # Fetch requisitions
    req_query = select(Requisition).where(Requisition.status == RequisitionStatus.VERIFIED_ACTIVE)
    if payload.requisition_ids:
        req_query = req_query.where(Requisition.id.in_(payload.requisition_ids))

    req_result = await db.execute(req_query)
    requisitions = req_result.scalars().all()

    computed_matches: List[Match] = []

    for req in requisitions:
        # Check if match already exists
        existing_match = await db.execute(
            select(Match).where(
                Match.profile_id == profile.id,
                Match.requisition_id == req.id,
            )
        )
        match_obj = existing_match.scalar_one_or_none()

        analysis = MatchEngineService.compute_match(profile, req)

        if not match_obj:
            match_obj = Match(
                profile_id=profile.id,
                requisition_id=req.id,
                overall_parity_score=analysis["overall_parity_score"],
                leverage_score=analysis["leverage_score"],
                hard_stack_overlap_pct=analysis["hard_stack_overlap_pct"],
                architecture_scale_fit_pct=analysis["architecture_scale_fit_pct"],
                compensation_upside_pct=analysis["compensation_upside_pct"],
                skill_bridge_active=analysis["skill_bridge_active"],
                skill_bridge_payload=analysis["skill_bridge_payload"],
                parity_audit_details=analysis["parity_audit_details"],
            )
            db.add(match_obj)
        else:
            match_obj.overall_parity_score = analysis["overall_parity_score"]
            match_obj.leverage_score = analysis["leverage_score"]
            match_obj.hard_stack_overlap_pct = analysis["hard_stack_overlap_pct"]
            match_obj.architecture_scale_fit_pct = analysis["architecture_scale_fit_pct"]
            match_obj.compensation_upside_pct = analysis["compensation_upside_pct"]
            match_obj.skill_bridge_active = analysis["skill_bridge_active"]
            match_obj.skill_bridge_payload = analysis["skill_bridge_payload"]
            match_obj.parity_audit_details = analysis["parity_audit_details"]

        computed_matches.append(match_obj)

    await db.commit()
    for m in computed_matches:
        await db.refresh(m, attribute_names=["requisition"])

    return computed_matches


@router.patch("/{match_id}/star", response_model=MatchResponse)
async def toggle_star(
    match_id: uuid.UUID,
    db: AsyncSession = Depends(get_async_session),
) -> Match:
    """Toggles starred status on an opportunity match."""
    result = await db.execute(
        select(Match).options(selectinload(Match.requisition)).where(Match.id == match_id)
    )
    match_record = result.scalar_one_or_none()
    if not match_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Match not found.")

    match_record.is_starred = not match_record.is_starred
    await db.commit()
    await db.refresh(match_record)
    return match_record

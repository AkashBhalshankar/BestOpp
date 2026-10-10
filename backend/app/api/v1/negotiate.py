"""API v1 Endpoints for First-Offer War Room & Service Bond Sentinel."""

import uuid
from typing import Any, Dict, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_async_session
from app.models.negotiation import NegotiationWarRoom
from app.models.profile import CandidateProfile
from app.schemas.negotiation import (
    CTCDeobfuscateRequest,
    CTCDeobfuscateResponse,
    NegotiationWarRoomResponse,
)
from app.services.ctc_parser import CTCParserService

router = APIRouter()


@router.post("/deobfuscate", response_model=CTCDeobfuscateResponse)
async def deobfuscate_offer_package(
    payload: CTCDeobfuscateRequest,
) -> CTCDeobfuscateResponse:
    """Deconstructs gross CTC packages into actual liquid monthly bank wires and scans for predatory bond clauses."""
    response = CTCParserService.deconstruct_offer(payload)
    return response


@router.post("/save-war-room", response_model=NegotiationWarRoomResponse, status_code=status.HTTP_201_CREATED)
async def save_war_room_evaluation(
    profile_id: uuid.UUID,
    company_name: str,
    payload: CTCDeobfuscateRequest,
    db: AsyncSession = Depends(get_async_session),
) -> NegotiationWarRoom:
    """Persists a detailed offer audit session into candidate's War Room telemetry records."""
    profile_res = await db.execute(select(CandidateProfile).where(CandidateProfile.id == profile_id))
    if not profile_res.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate profile not found.")

    audit = CTCParserService.deconstruct_offer(payload)

    war_room = NegotiationWarRoom(
        profile_id=profile_id,
        war_room_code=audit.war_room_code,
        offering_company_name=company_name,
        stated_gross_ctc_inr=audit.stated_gross_ctc_inr,
        nominal_monthly_inr=audit.nominal_monthly_inr,
        real_monthly_liquid_inr=audit.real_monthly_liquid_inr,
        guaranteed_base_inr=audit.guaranteed_base_inr,
        deferred_retention_bonus_inr=audit.deferred_retention_bonus_inr,
        group_health_gratuity_inr=audit.group_health_gratuity_inr,
        speculative_variable_inr=audit.speculative_variable_inr,
        training_clawback_inr=audit.training_clawback_inr,
        obfuscation_index_pct=audit.obfuscation_index_pct,
        threat_level=audit.threat_level,
        bond_lockin_months=audit.bond_lockin_months,
        bond_penalty_inr=audit.bond_penalty_inr,
        certificate_surrender_demanded=audit.certificate_surrender_demanded,
        flagged_hostile_clauses=[c.model_dump() for c in audit.flagged_clauses],
        counter_defense_scripts=[s.model_dump() for s in audit.counter_defense_scripts],
        raw_contract_text=payload.raw_contract_text,
    )

    db.add(war_room)
    await db.commit()
    await db.refresh(war_room)
    return war_room


@router.get("/war-rooms", response_model=List[NegotiationWarRoomResponse])
async def list_war_rooms(
    profile_id: uuid.UUID,
    db: AsyncSession = Depends(get_async_session),
) -> List[NegotiationWarRoom]:
    """Retrieves all active War Room offer evaluations for a candidate."""
    result = await db.execute(
        select(NegotiationWarRoom)
        .where(NegotiationWarRoom.profile_id == profile_id)
        .order_by(NegotiationWarRoom.created_at.desc())
    )
    return list(result.scalars().all())

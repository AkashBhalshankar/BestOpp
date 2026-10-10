"""BestOpp API v1 Router Registration."""

from fastapi import APIRouter

from app.api.v1.admin import router as admin_router
from app.api.v1.auth import router as auth_router
from app.api.v1.crm import router as crm_router
from app.api.v1.matches import router as matches_router
from app.api.v1.negotiate import router as negotiate_router
from app.api.v1.radar import router as radar_router
from app.api.v1.resume import router as resume_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(matches_router, prefix="/matches", tags=["Matches"])
api_router.include_router(radar_router, prefix="/radar", tags=["Opportunity Radar"])
api_router.include_router(resume_router, prefix="/resume", tags=["Resume Studio & Tectonic"])
api_router.include_router(crm_router, prefix="/crm", tags=["Application CRM"])
api_router.include_router(negotiate_router, prefix="/negotiate", tags=["First-Offer War Room"])
api_router.include_router(admin_router, prefix="/admin", tags=["Admin SEC-HUD"])

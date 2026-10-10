"""BestOpp Models Registry."""

from app.core.database import Base
from app.models.application import Application, ApplicationStatus
from app.models.match import Match
from app.models.negotiation import NegotiationWarRoom, ThreatLevel
from app.models.profile import CandidateProfile
from app.models.requisition import Requisition, RequisitionStatus, WorkMode
from app.models.user import User, UserRole

__all__ = [
    "Base",
    "User",
    "UserRole",
    "CandidateProfile",
    "Requisition",
    "RequisitionStatus",
    "WorkMode",
    "Match",
    "Application",
    "ApplicationStatus",
    "NegotiationWarRoom",
    "ThreatLevel",
]

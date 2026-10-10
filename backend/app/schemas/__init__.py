"""BestOpp Pydantic v2 Schemas Registry."""

from app.schemas.match import (
    MatchBase,
    MatchComputeRequest,
    MatchResponse,
    ParityAuditDetail,
    SemanticTranslationItem,
    SkillBridgePayload,
)
from app.schemas.negotiation import (
    CTCDeductionItem,
    CTCDeobfuscateRequest,
    CTCDeobfuscateResponse,
    DefenseScript,
    HostileClause,
    NegotiationWarRoomResponse,
)
from app.schemas.requisition import (
    RequisitionBase,
    RequisitionCreate,
    RequisitionFilterParams,
    RequisitionResponse,
    RequisitionUpdate,
)
from app.schemas.resume import (
    ResumeTailorRequest,
    TectonicCompileRequest,
    TectonicCompileResponse,
)
from app.schemas.user import (
    Token,
    TokenPayload,
    UserBase,
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
)

__all__ = [
    "UserBase",
    "UserCreate",
    "UserLogin",
    "UserUpdate",
    "UserResponse",
    "Token",
    "TokenPayload",
    "RequisitionBase",
    "RequisitionCreate",
    "RequisitionUpdate",
    "RequisitionResponse",
    "RequisitionFilterParams",
    "SemanticTranslationItem",
    "SkillBridgePayload",
    "ParityAuditDetail",
    "MatchBase",
    "MatchResponse",
    "MatchComputeRequest",
    "ResumeTailorRequest",
    "TectonicCompileRequest",
    "TectonicCompileResponse",
    "HostileClause",
    "DefenseScript",
    "CTCDeductionItem",
    "CTCDeobfuscateRequest",
    "CTCDeobfuscateResponse",
    "NegotiationWarRoomResponse",
]

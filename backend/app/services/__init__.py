"""BestOpp Core Services Registry."""

from app.services.ctc_parser import CTCParserService
from app.services.ghost_detector import GhostDetectorService
from app.services.match_engine import MatchEngineService
from app.services.skill_bridge import SkillBridgeService
from app.services.tectonic_service import TectonicService

__all__ = [
    "SkillBridgeService",
    "MatchEngineService",
    "GhostDetectorService",
    "CTCParserService",
    "TectonicService",
]

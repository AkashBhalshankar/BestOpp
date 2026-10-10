"""Unit Tests for Ghost Job Detector & Sentinel."""

from app.models.requisition import RequisitionStatus
from app.services.ghost_detector import GhostDetectorService


def test_high_risk_ghost_detection():
    """Validates that frequently reposted jobs with low recruiter signals are flagged."""
    analysis = GhostDetectorService.evaluate_requisition(
        repost_count_90d=6,
        recruiter_signal_score=0.08,
        days_since_first_seen=92,
        hires_count_120d=0,
        has_verified_offers=False,
        is_compensation_obfuscated=True,
        ingestion_source="Greenhouse REST API",
    )

    assert analysis["ghost_risk_score"] >= 0.70
    assert analysis["is_high_risk"] is True
    assert analysis["status"] == RequisitionStatus.FLAGGED_FOR_AUDIT
    assert len(analysis["evidence_flags"]) >= 3


def test_verified_low_risk_requisition():
    """Validates that fresh postings with verified signed offers maintain low ghost risk."""
    analysis = GhostDetectorService.evaluate_requisition(
        repost_count_90d=1,
        recruiter_signal_score=0.92,
        days_since_first_seen=4,
        hires_count_120d=4,
        has_verified_offers=True,
        is_compensation_obfuscated=False,
        ingestion_source="Lever Direct Feed",
    )

    assert analysis["ghost_risk_score"] <= 0.15
    assert analysis["is_high_risk"] is False
    assert analysis["status"] == RequisitionStatus.VERIFIED_ACTIVE

"""Ghost Job Classifier & Requisition Integrity Sentinel.

Analyzes repost telemetry, recruiter signal strength, compensation transparency,
and empirical applicant outcomes to quarantine phantom listings.
"""

from typing import Any, Dict, List, Tuple
from app.models.requisition import RequisitionStatus


class GhostDetectorService:
    """Detects and scores zombie listings, evergreen traps, and recruiter data-harvesting operations."""

    @classmethod
    def evaluate_requisition(
        cls,
        repost_count_90d: int,
        recruiter_signal_score: float,
        days_since_first_seen: int,
        hires_count_120d: int,
        has_verified_offers: bool,
        is_compensation_obfuscated: bool,
        ingestion_source: str,
    ) -> Dict[str, Any]:
        """Calculates ghost risk percentage and determines platform quarantine classification."""
        risk_score = 0.05  # Base healthy baseline (5%)
        evidence_flags: List[str] = []

        # 1. Repost Telemetry Multipliers
        if repost_count_90d >= 5:
            risk_score += 0.45
            evidence_flags.append(f"High-frequency repost loop ({repost_count_90d}x in 90 days)")
        elif repost_count_90d >= 3:
            risk_score += 0.25
            evidence_flags.append(f"Elevated repost telemetry ({repost_count_90d}x in 90 days)")

        # 2. Recruiter Signal Strength
        if recruiter_signal_score < 0.15:
            risk_score += 0.30
            evidence_flags.append(f"Extremely weak recruiter engagement signal ({recruiter_signal_score:.2f} / 1.0)")
        elif recruiter_signal_score < 0.35:
            risk_score += 0.15
            evidence_flags.append(f"Below-average candidate response rate ({recruiter_signal_score:.2f} / 1.0)")

        # 3. Empirical Hiring Blackholes
        if days_since_first_seen > 60 and hires_count_120d == 0:
            risk_score += 0.20
            evidence_flags.append(f"0 verified hires in {days_since_first_seen} days (Evergreen posting pattern)")

        # 4. Compensation Obfuscation
        if is_compensation_obfuscated:
            risk_score += 0.15
            evidence_flags.append("Compensation obfuscation detected (Phantom ceiling with zero transparent base)")

        # 5. Verified Real Offers Mitigation
        if has_verified_offers:
            risk_score = max(0.02, risk_score - 0.40)
            evidence_flags.append("Verified real offers logged in BestOpp War Room; risk mitigated")

        # Clamp score between 0.01 and 0.99
        risk_score = min(0.99, max(0.01, round(risk_score, 2)))

        # Status determination
        if risk_score >= 0.70:
            status = RequisitionStatus.FLAGGED_FOR_AUDIT
            recommendation = "Hard Purge & Delist or Quarantined for Manual SecOps Audit"
        elif risk_score >= 0.30:
            status = RequisitionStatus.FLAGGED_FOR_AUDIT
            recommendation = "Flagged for Secondary Automated Ingestion Review"
        else:
            status = RequisitionStatus.VERIFIED_ACTIVE
            recommendation = "Verified High-Leverage Opportunity"

        return {
            "ghost_risk_score": risk_score,
            "status": status,
            "is_high_risk": risk_score >= 0.70,
            "confidence_pct": round(min(99.0, 75.0 + (risk_score * 20)), 1),
            "evidence_flags": evidence_flags,
            "secops_recommendation": recommendation,
        }

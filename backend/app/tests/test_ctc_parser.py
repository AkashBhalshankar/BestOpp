"""Unit Tests for CTC De-Obfuscator & Service Bond Sentinel."""

from app.models.negotiation import ThreatLevel
from app.schemas.negotiation import CTCDeobfuscateRequest
from app.services.ctc_parser import CTCParserService


def test_ctc_deobfuscation_nominal_vs_real():
    """Validates that a ₹7L CTC breaks down to realistic liquid monthly in-hand of ~₹32k."""
    req = CTCDeobfuscateRequest(
        stated_gross_ctc_inr=700000,
        service_bond_penalty_inr=200000,
        lockin_period_months=24,
        demands_original_certificates=True,
    )

    response = CTCParserService.deconstruct_offer(req)

    assert response.nominal_monthly_inr == 58333
    assert 30000 <= response.real_monthly_liquid_inr <= 35000
    assert response.obfuscation_index_pct >= 40.0
    assert response.threat_level == ThreatLevel.EXTREME
    assert response.certificate_surrender_demanded is True
    assert len(response.flagged_clauses) >= 1
    assert len(response.counter_defense_scripts) == 3

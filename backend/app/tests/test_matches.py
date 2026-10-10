"""Unit Tests for BestOpp MatchEngine and Skill Bridge."""

import pytest
from app.models.profile import CandidateProfile
from app.models.requisition import Requisition
from app.services.match_engine import MatchEngineService
from app.services.skill_bridge import SkillBridgeService


def test_skill_bridge_temporal_equivalence():
    """Validates that candidate with Kafka/Saga background receives Temporal bridge."""
    candidate_skills = ["go", "kafka", "redis", "postgresql", "saga"]
    bridge = SkillBridgeService.bridge_candidate_gap(candidate_skills, "Temporal.io")

    assert bridge is not None
    assert bridge.missing_technology == "Temporal.io"
    assert bridge.conceptual_overlap_pct >= 85.0
    assert len(bridge.semantic_translation_matrix) >= 2


def test_match_engine_architecture_scale():
    """Validates scale fit calculation when candidate exceeds requisition target RPS."""
    profile = CandidateProfile(
        current_title="Senior Systems Engineer",
        years_of_experience=4.2,
        target_base_ctc_inr=3600000,
        production_peak_rps=22000,
        skills_inventory=[{"name": "Go"}, {"name": "Kafka"}, {"name": "PostgreSQL"}],
        verified_projects=[],
    )
    req = Requisition(
        external_requisition_id="REQ-TEST-1",
        company_name="Razorpay",
        job_title="Sr Distributed Systems Engineer",
        min_base_inr=3600000,
        max_base_inr=4200000,
        target_scale_rps=20000,
        required_stack=[{"name": "Go"}, {"name": "Kafka"}, {"name": "Temporal.io"}],
    )

    result = MatchEngineService.compute_match(profile, req)
    assert result["overall_parity_score"] >= 80.0
    assert result["architecture_scale_fit_pct"] >= 90.0
    assert result["skill_bridge_active"] is True

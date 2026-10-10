"""BestOpp Bi-Directional Match Engine.

Computes hard stack overlap, architecture scale parity, compensation leverage upside,
and integrates the Candidate-First Skill Bridge™ module.
"""

from typing import Any, Dict, List, Tuple
from app.models.profile import CandidateProfile
from app.models.requisition import Requisition
from app.schemas.match import ParityAuditDetail, SkillBridgePayload
from app.services.skill_bridge import SkillBridgeService


class MatchEngineService:
    """Core computational engine assessing parity, scale, leverage, and bridging."""

    @classmethod
    def compute_match(
        cls,
        profile: CandidateProfile,
        requisition: Requisition,
    ) -> Dict[str, Any]:
        """Calculates a comprehensive match payload between candidate telemetry and job requisition."""
        # 1. Extract Candidate Skills
        candidate_skills = [
            s.get("name", "").strip().lower()
            for s in profile.skills_inventory
            if isinstance(s, dict) and s.get("name")
        ]
        # Include verified projects tech
        for project in profile.verified_projects:
            if isinstance(project, dict) and "technologies" in project:
                for tech in project["technologies"]:
                    candidate_skills.append(tech.strip().lower())

        # 2. Extract Requisition Required Stack
        required_stack_names = [
            item.get("name", "").strip().lower()
            for item in requisition.required_stack
            if isinstance(item, dict) and item.get("name")
        ]
        if not required_stack_names:
            required_stack_names = ["go", "distributed systems", "postgresql", "kafka"]

        # 3. Calculate Hard Stack Direct Match
        direct_matches: List[str] = []
        missing_skills: List[str] = []

        for req_skill in required_stack_names:
            matched = any(
                req_skill in cs or cs in req_skill for cs in candidate_skills
            )
            if matched:
                direct_matches.append(req_skill)
            else:
                missing_skills.append(req_skill)

        total_req_count = len(required_stack_names)
        hard_stack_overlap_pct = (
            round((len(direct_matches) / total_req_count) * 100, 1)
            if total_req_count > 0
            else 85.0
        )

        # 4. Architecture Scale Parity
        candidate_peak_rps = profile.production_peak_rps or 0
        target_req_rps = requisition.target_scale_rps or 20000

        if target_req_rps > 0 and candidate_peak_rps > 0:
            scale_ratio = candidate_peak_rps / target_req_rps
            architecture_scale_fit_pct = min(100.0, round(scale_ratio * 92.0, 1))
            if scale_ratio >= 1.0:
                scale_evaluation = f"{round(scale_ratio * 100)}% Over-Qualified (Peak: {candidate_peak_rps:,} RPS)"
            else:
                scale_evaluation = f"{round(scale_ratio * 100)}% Direct Fit"
        else:
            architecture_scale_fit_pct = 92.0
            scale_evaluation = "Direct Scale Fit"

        # 5. Compensation Upside Calculation
        candidate_target_base = profile.target_base_ctc_inr or 3000000
        req_mid_base = (requisition.min_base_inr + requisition.max_base_inr) / 2
        if req_mid_base > 0 and candidate_target_base > 0:
            upside_pct = round(((req_mid_base - candidate_target_base) / candidate_target_base) * 100, 1)
        else:
            upside_pct = 28.0

        # 6. Overall Parity Score (Candidate-weighted)
        overall_parity_score = round(
            (hard_stack_overlap_pct * 0.55) + (architecture_scale_fit_pct * 0.45),
            1,
        )
        # Ensure parity does not unnecessarily punish the candidate
        overall_parity_score = max(80.0, min(99.0, overall_parity_score))

        # 7. Candidate Leverage Score (0-100)
        # Factors: High parity, low ghost risk, high recruiter signal, verified offers
        ghost_penalty = (requisition.ghost_risk_score or 0.05) * 20
        signal_bonus = (requisition.recruiter_signal_score or 0.85) * 10
        leverage_score = int(round(overall_parity_score - ghost_penalty + signal_bonus))
        leverage_score = max(70, min(98, leverage_score))

        # 8. Skill Bridge Generation
        skill_bridge_active = len(missing_skills) > 0
        skill_bridge_payload: Dict[str, Any] = {}

        if skill_bridge_active:
            primary_missing = missing_skills[0]
            bridge = SkillBridgeService.bridge_candidate_gap(candidate_skills, primary_missing)
            if bridge:
                skill_bridge_payload = bridge.model_dump()

        parity_audit = ParityAuditDetail(
            hard_stack_overlap_pct=hard_stack_overlap_pct,
            direct_matched_skills=direct_matches,
            missing_skills=missing_skills,
            architecture_scale_fit_pct=architecture_scale_fit_pct,
            candidate_peak_rps=candidate_peak_rps,
            target_req_rps=target_req_rps,
            scale_fit_evaluation=scale_evaluation,
        ).model_dump()

        return {
            "overall_parity_score": overall_parity_score,
            "leverage_score": leverage_score,
            "hard_stack_overlap_pct": hard_stack_overlap_pct,
            "architecture_scale_fit_pct": architecture_scale_fit_pct,
            "compensation_upside_pct": upside_pct,
            "skill_bridge_active": skill_bridge_active,
            "skill_bridge_payload": skill_bridge_payload,
            "parity_audit_details": parity_audit,
        }

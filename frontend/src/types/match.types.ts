export interface SemanticTranslationItem {
  conceptual_domain: string;
  academic_or_prior_primitive: string;
  target_enterprise_technology: string;
  system_equivalence_rationale: string;
}

export interface SkillBridgePayload {
  missing_technology: string;
  equivalent_candidate_background: string;
  conceptual_overlap_pct: number;
  ramp_estimate_hours: string;
  semantic_translation_matrix: SemanticTranslationItem[];
  bridge_architecture_notes: string;
  interview_defense_talking_points: string[];
}

export interface ParityAuditDetail {
  hard_stack_overlap_pct: number;
  direct_matched_skills: string[];
  missing_skills: string[];
  architecture_scale_fit_pct: number;
  candidate_peak_rps: number;
  target_req_rps: number;
  scale_fit_evaluation: string;
}

export interface MatchRecord {
  id: string;
  profile_id: string;
  requisition_id: string;
  overall_parity_score: number;
  leverage_score: number;
  hard_stack_overlap_pct: number;
  architecture_scale_fit_pct: number;
  compensation_upside_pct: number;
  is_starred: boolean;
  is_selected_for_review: boolean;
  skill_bridge_active: boolean;
  skill_bridge_payload: SkillBridgePayload;
  parity_audit_details: ParityAuditDetail;
}

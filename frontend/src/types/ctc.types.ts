export type ThreatLevel = "low" | "elevated" | "extreme";

export interface HostileClause {
  clause_number: string;
  clause_title: string;
  raw_extract: string;
  risk_category: string;
  legal_rebuttal: string;
  statutory_precedent: string;
  is_void_ab_initio: boolean;
}

export interface DefenseScript {
  script_id: number;
  title: string;
  channel: string;
  leverage_rating: string;
  template_text: string;
  strategic_rationale: string;
}

export interface CTCDeductionItem {
  component_label: string;
  stated_value: number;
  real_liquidity_status: string;
  year_1_liquid_in_pocket: number;
  is_trap: boolean;
}

export interface CTCDeobfuscateResponse {
  war_room_code: string;
  stated_gross_ctc_inr: number;
  nominal_monthly_inr: number;
  real_monthly_liquid_inr: number;
  guaranteed_base_inr: number;
  deferred_retention_bonus_inr: number;
  group_health_gratuity_inr: number;
  speculative_variable_inr: number;
  training_clawback_inr: number;
  obfuscation_index_pct: number;
  illiquidity_drag_pct: number;
  threat_level: ThreatLevel;
  bond_lockin_months: number;
  bond_penalty_inr: number;
  certificate_surrender_demanded: boolean;
  ledger_breakdown: CTCDeductionItem[];
  flagged_clauses: HostileClause[];
  counter_defense_scripts: DefenseScript[];
}

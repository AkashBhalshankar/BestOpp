export type WorkMode = "remote" | "hybrid" | "onsite";
export type RequisitionStatus = "verified_active" | "flagged_for_audit" | "purged_ghost";

export interface RequisitionRecord {
  id: string;
  external_requisition_id: string;
  company_name: string;
  company_monogram: string;
  job_title: string;
  department_or_domain: string;
  location: string;
  work_mode: WorkMode;
  min_base_inr: number;
  max_base_inr: number;
  bonus_percentage_target: number;
  esop_pool_value_inr: number;
  ghost_risk_score: number;
  recruiter_signal_score: number;
  repost_count_90d: number;
  ingestion_source: string;
  status: RequisitionStatus;
  verified_signed_offers_count: number;
  is_fresher_eligible: boolean;
  target_scale_rps?: number;
  required_stack: Array<{ name: string; required?: boolean }>;
  hiring_loop_telemetry: Record<string, any>;
}

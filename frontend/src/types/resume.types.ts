export interface TectonicCompileRequest {
  latex_source: string;
  job_identifier?: string;
  timeout_seconds?: number;
}

export interface TectonicCompileResponse {
  success: boolean;
  pdf_base64: string | null;
  compile_latency_ms: number;
  stdout: string;
  stderr: string;
  page_count: number;
  page_budget_overflow: boolean;
  overflow_message?: string;
}

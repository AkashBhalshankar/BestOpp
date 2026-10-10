import React from "react";
import { Check } from "lucide-react";
import { ParityAuditDetail } from "../../types/match.types";

interface ArchitectureParityProps {
  audit: ParityAuditDetail;
}

export const ArchitectureParity: React.FC<ArchitectureParityProps> = ({ audit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Hard Stack Overlap */}
      <div className="p-3.5 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-medium">Hard Stack Overlap</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
            {audit.hard_stack_overlap_pct}% Direct Match
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          {audit.direct_matched_skills.map((skill) => (
            <span key={skill} className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" /> {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Architecture Scale Fit */}
      <div className="p-3.5 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-medium">Architecture Scale Fit</span>
          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-bold text-[10px]">
            {audit.architecture_scale_fit_pct}% Scale Parity
          </span>
        </div>
        <div className="flex items-baseline justify-between font-mono">
          <div>
            <span className="text-[10px] text-slate-500 block">PRODUCTION PEAK</span>
            <span className="text-xl font-bold text-white">{audit.candidate_peak_rps.toLocaleString()} RPS</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">TARGET REQ: {audit.target_req_rps.toLocaleString()} RPS</span>
            <span className="text-xs text-emerald-400 font-bold">{audit.scale_fit_evaluation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

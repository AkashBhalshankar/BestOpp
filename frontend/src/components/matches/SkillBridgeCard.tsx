import React from "react";
import { Zap, FileText } from "lucide-react";
import { SkillBridgePayload } from "../../types/match.types";

interface SkillBridgeCardProps {
  bridge: SkillBridgePayload;
}

export const SkillBridgeCard: React.FC<SkillBridgeCardProps> = ({ bridge }) => {
  return (
    <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/40 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold uppercase flex items-center gap-1">
            <Zap className="w-3 h-3" />
            The Skill Bridge
          </span>
          <span className="font-mono text-xs text-blue-300 font-semibold">
            Missing: {bridge.missing_technology} → Evaluated as High-Leverage Bridge
          </span>
        </div>
        <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800">
          Est. Ramp-Up: {bridge.ramp_estimate_hours}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {bridge.bridge_architecture_notes}
      </p>

      <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-blue-500/20 font-mono text-xs space-y-2">
        <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider block">
          Semantic Translation Matrix
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
          {bridge.semantic_translation_matrix.map((t, idx) => (
            <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">{t.conceptual_domain}</span>
              <span className="text-white font-medium">{t.academic_or_prior_primitive} ⇄ {t.target_enterprise_technology}</span>
              <span className="text-[10px] text-slate-500 block mt-1">{t.system_equivalence_rationale}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

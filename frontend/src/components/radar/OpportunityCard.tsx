import React from "react";
import { GhostRiskMeter } from "./GhostRiskMeter";
import { formatINR } from "../../lib/formatters";

interface OpportunityCardProps {
  company: string;
  title: string;
  minBase: number;
  maxBase: number;
  ghostRiskPct: number;
  location: string;
  onApply: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  company,
  title,
  minBase,
  maxBase,
  ghostRiskPct,
  location,
  onApply,
}) => {
  return (
    <div className="p-3.5 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">{company}</span>
            <span className="text-[10px] text-slate-500">• {location}</span>
          </div>
          <div className="text-[11px] text-slate-300 font-medium">{title}</div>
        </div>
        <GhostRiskMeter riskScorePct={ghostRiskPct} />
      </div>

      <div className="flex items-center justify-between text-xs font-mono pt-1">
        <span className="text-emerald-400 font-bold">
          {formatINR(minBase)} - {formatINR(maxBase)} Base
        </span>
        <button
          onClick={onApply}
          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-all"
        >
          1-Click Apply
        </button>
      </div>
    </div>
  );
};

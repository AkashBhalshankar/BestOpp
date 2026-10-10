import React from "react";

interface CtcBreakdownChartProps {
  fixedBasePct: number;
  retentionPct: number;
  perksPct: number;
  variablePct: number;
  clawbackPct: number;
}

export const CtcBreakdownChart: React.FC<CtcBreakdownChartProps> = ({
  fixedBasePct,
  retentionPct,
  perksPct,
  variablePct,
  clawbackPct,
}) => {
  return (
    <div className="space-y-1.5 font-mono text-xs">
      <div className="h-5 w-full rounded overflow-hidden flex bg-slate-800 font-bold text-[10px] text-black">
        <div className="bg-emerald-400 h-full flex items-center justify-center" style={{ width: `${fixedBasePct}%` }}>
          {fixedBasePct}%
        </div>
        <div className="bg-amber-400 h-full flex items-center justify-center" style={{ width: `${retentionPct}%` }}>
          {retentionPct}%
        </div>
        <div className="bg-blue-400 h-full flex items-center justify-center" style={{ width: `${perksPct}%` }}>
          {perksPct}%
        </div>
        <div className="bg-purple-400 h-full flex items-center justify-center" style={{ width: `${variablePct}%` }}>
          {variablePct}%
        </div>
        <div className="bg-red-500 h-full flex items-center justify-center" style={{ width: `${clawbackPct}%` }}>
          {clawbackPct}%
        </div>
      </div>
    </div>
  );
};

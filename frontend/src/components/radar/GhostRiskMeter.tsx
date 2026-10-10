import React from "react";

interface GhostRiskMeterProps {
  riskScorePct: number;
}

export const GhostRiskMeter: React.FC<GhostRiskMeterProps> = ({ riskScorePct }) => {
  const isHigh = riskScorePct >= 70;
  const isMedium = riskScorePct >= 30 && riskScorePct < 70;

  const colorClass = isHigh
    ? "text-red-400 bg-red-950 border-red-800"
    : isMedium
    ? "text-amber-400 bg-amber-950 border-amber-800"
    : "text-emerald-400 bg-emerald-950 border-emerald-800";

  return (
    <div className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${colorClass}`}>
      {riskScorePct}% GHOST RISK
    </div>
  );
};

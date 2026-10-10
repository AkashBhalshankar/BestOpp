import React from "react";
import { Gavel } from "lucide-react";

interface BondAlertBannerProps {
  clauseNumber: string;
  penaltyInr: number;
  lockinMonths: number;
}

export const BondAlertBanner: React.FC<BondAlertBannerProps> = ({
  clauseNumber,
  penaltyInr,
  lockinMonths,
}) => {
  return (
    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/50 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
          <Gavel className="w-4 h-4 text-red-400" />
          <span>Predatory Service Bond Sentinel</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono font-bold">
          {clauseNumber}
        </span>
      </div>
      <p className="text-xs text-slate-300 font-sans leading-relaxed">
        Demands mandatory <strong className="text-red-400">{lockinMonths} continuous months</strong> of service with{" "}
        <strong className="text-red-400">₹{penaltyInr.toLocaleString()} penalty</strong>. Agreements in restraint of lawful trade are{" "}
        <em className="text-white">void ab initio</em> under Section 27, Indian Contract Act 1872.
      </p>
    </div>
  );
};

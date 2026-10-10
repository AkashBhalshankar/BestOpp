import React from "react";
import { Zap } from "lucide-react";

interface MatchQueueCardProps {
  company: string;
  domain: string;
  title: string;
  leverage: number;
  parity: number;
  ghostRisk: number;
  upside: number;
  baseCtc: string;
  tags: string[];
  isSelected: boolean;
  onClick: () => void;
}

export const MatchQueueCard: React.FC<MatchQueueCardProps> = ({
  company,
  domain,
  title,
  leverage,
  parity,
  ghostRisk,
  upside,
  baseCtc,
  tags,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? "bg-[var(--bg-surface,#12161F)] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30"
          : "bg-[var(--bg-surface,#12161F)]/70 border-[var(--border-color,#1F242F)] hover:border-slate-700"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 font-mono font-bold flex items-center justify-center text-sm border border-blue-500/30">
            {company[0]}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white text-xs">{company}</span>
              <span className="text-[10px] text-slate-400">• {domain}</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">{title}</div>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
          <Zap className="w-3 h-3 text-blue-400" />
          {leverage}/100
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 p-2 rounded bg-[var(--bg-canvas,#0A0D12)] text-[10px] font-mono text-center">
        <div>
          <span className="text-slate-500 block">PARITY</span>
          <span className="text-emerald-400 font-bold">{parity}%</span>
        </div>
        <div>
          <span className="text-slate-500 block">GHOST</span>
          <span className="text-emerald-400 font-bold">{ghostRisk}%</span>
        </div>
        <div>
          <span className="text-slate-500 block">UPSIDE</span>
          <span className="text-blue-400 font-bold">+{upside}%</span>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="text-white font-semibold">{baseCtc}</span>
        <div className="flex gap-1 text-[9px]">
          {tags.map((t) => (
            <span key={t} className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

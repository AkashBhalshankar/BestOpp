"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ScriptCardProps {
  title: string;
  channel: string;
  leverage: string;
  body: string;
  note: string;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({
  title,
  channel,
  leverage,
  body,
  note,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-3 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] text-slate-400">
        <span>{channel}</span>
        <span className="text-emerald-400 font-bold">{leverage}</span>
      </div>

      <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)]">
        <pre className="whitespace-pre-wrap text-slate-200 leading-relaxed font-mono">
          {body}
        </pre>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-400 font-sans">{note}</span>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy Script"}</span>
        </button>
      </div>
    </div>
  );
};

"use client";

import React from "react";

interface MonacoWrapperProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export const MonacoWrapper: React.FC<MonacoWrapperProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--bg-canvas,#0A0D12)]">
      <div className="h-7 px-4 bg-[var(--bg-surface,#12161F)]/80 border-b border-[var(--border-subtle,#181C26)] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>resume.tex</span>
        <span>UTF-8 • TeX</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="flex-1 w-full p-4 bg-transparent resize-none font-mono text-xs text-slate-200 focus:outline-none leading-relaxed selection:bg-blue-600/30"
        spellCheck={false}
      />
    </div>
  );
};

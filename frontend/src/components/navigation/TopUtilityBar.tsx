"use client";

import React, { useEffect, useState } from "react";
import { Shield, Clock, RefreshCw } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function TopUtilityBar() {
  const { theme, setTheme } = useTheme();
  const [clock, setClock] = useState<string>("18:42:09 UTC");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock(now.toTimeString().split(" ")[0] + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 px-6 border-b border-[var(--border-color,#1F242F)] bg-[var(--bg-surface,#12161F)] flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex items-center gap-4">
        {/* Shield Badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-xs font-semibold tracking-wide">SEC-HUD v3.4</span>
        </div>

        {/* Global Cluster Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)] text-xs text-slate-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-400 font-sans">Environment:</span>
          <span className="font-semibold text-white">Production Cluster</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400">Scrapers Healthy (99.8%)</span>
        </div>
      </div>

      {/* Right Controls: Clock, Dual-Theme Switcher & Refresh */}
      <div className="flex items-center gap-3">
        {/* Clock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)] font-mono text-xs text-slate-300">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{clock}</span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400 font-semibold">12.4k req/m</span>
        </div>

        {/* Dual-Theme Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)] font-mono text-xs">
          <button
            onClick={() => setTheme("midnight")}
            className={`px-2.5 py-1 text-[11px] rounded transition-all flex items-center gap-1.5 ${
              theme === "midnight"
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Linear Dark
          </button>
          <button
            onClick={() => setTheme("earthy")}
            className={`px-2.5 py-1 text-[11px] rounded transition-all flex items-center gap-1.5 ${
              theme === "earthy"
                ? "bg-[#84A98C]/20 text-[#84A98C] border border-[#84A98C]/40 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#84A98C]"></span>
            Earthy Tone
          </button>
        </div>

        {/* Sync Pipeline Button */}
        <button
          className="p-1.5 rounded-md text-slate-400 hover:text-white bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)] hover:border-slate-600 transition-colors"
          title="Force Sync Pipeline"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

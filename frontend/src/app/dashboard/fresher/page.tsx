"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Award, Building, ArrowRight, Zap, Clock } from "lucide-react";

export default function FresherDashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color,#1F242F)] pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            Fresher Flight Deck & Readiness Hub
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Calibrated for 2025/2026 Batch • SDE-1 Systems & Backend Core Track
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
            14 Drives Open
          </span>
          <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold">
            Zero-Ghost Guarantee
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">OFFER READINESS</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">78% Tier-1 PPO</div>
          <p className="text-[11px] text-slate-400 font-sans">DSA 92% • Systems 68% • CV Impact 84%</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">COMPENSATION FLOOR</span>
          <div className="text-2xl font-bold font-mono text-white">₹8L - ₹14L Base</div>
          <p className="text-[11px] text-slate-400 font-sans">100% Cash Base Floor. No 4-year clawbacks.</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">PROOF OF WORK ENGINE</span>
          <div className="text-lg font-bold font-mono text-blue-400 truncate">Distributed KV-Store (Go)</div>
          <p className="text-[11px] text-slate-400 font-sans">98 GitHub Stars • Raft Consensus Core</p>
        </div>
      </div>

      {/* Quick Launch Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/radar"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all"
        >
          <span>Explore Verified Drives (14)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/negotiate"
          className="px-4 py-2 rounded-lg bg-[var(--bg-surface,#12161F)] hover:bg-slate-800 text-slate-200 border border-[var(--border-color,#1F242F)] font-mono text-xs font-semibold transition-all"
        >
          <span>Evaluate First Offer & Bonds</span>
        </Link>
      </div>
    </div>
  );
}

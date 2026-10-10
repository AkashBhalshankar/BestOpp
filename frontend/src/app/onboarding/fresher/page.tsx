"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useCandidate } from "../../../context/CandidateContext";

export default function FresherOnboardingPage() {
  const router = useRouter();
  const { setTrack } = useCandidate();
  const [collegeTier, setCollegeTier] = useState("Tier-1");
  const [batchYear, setBatchYear] = useState("2025");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrack("fresher");
    router.push("/dashboard/fresher");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] p-6 space-y-5 font-mono text-xs shadow-2xl">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold">Fresher Telemetry Setup</div>
            <span className="text-[10px] text-slate-400 font-sans">Batch 2025/2026 SDE-1 Readiness</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] uppercase">Graduation Batch</label>
            <select
              value={batchYear}
              onChange={(e) => setBatchYear(e.target.value)}
              className="w-full py-2 px-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none"
            >
              <option value="2025">2025 Batch (Final Year)</option>
              <option value="2026">2026 Batch (Pre-Final / Intern Track)</option>
              <option value="2024">2024 Batch (Immediate Joinee)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] uppercase">College Tier Classification</label>
            <select
              value={collegeTier}
              onChange={(e) => setCollegeTier(e.target.value)}
              className="w-full py-2 px-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none"
            >
              <option value="Tier-1">Tier-1 (IIT / NIT / BITS / IIIT)</option>
              <option value="Tier-2">Tier-2 (Top State Engineering)</option>
              <option value="Tier-3">Tier-3 (Open Merit Off-Campus)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] uppercase">GitHub Project Focus</label>
            <input
              type="text"
              defaultValue="Distributed KV-Store (Go) with Raft"
              className="w-full py-2 px-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Activate Fresher Flight Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, ArrowRight } from "lucide-react";
import { useCandidate } from "../../../context/CandidateContext";

export default function ProOnboardingPage() {
  const router = useRouter();
  const { setTrack } = useCandidate();
  const [yoe, setYoe] = useState("4.2");
  const [peakRps, setPeakRps] = useState("22000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrack("experienced");
    router.push("/dashboard/pro");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] p-6 space-y-5 font-mono text-xs shadow-2xl">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold">Pro Telemetry Setup</div>
            <span className="text-[10px] text-slate-400 font-sans">Staff & Senior IC Track</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] uppercase">Years of Production Experience</label>
            <input
              type="number"
              step="0.1"
              value={yoe}
              onChange={(e) => setYoe(e.target.value)}
              className="w-full py-2 px-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] uppercase">Peak Production Concurrency (RPS)</label>
            <input
              type="number"
              value={peakRps}
              onChange={(e) => setPeakRps(e.target.value)}
              className="w-full py-2 px-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[10px] uppercase">Target Base Compensation (INR)</label>
            <input
              type="text"
              defaultValue="₹42,00,000"
              className="w-full py-2 px-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Activate Pro Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

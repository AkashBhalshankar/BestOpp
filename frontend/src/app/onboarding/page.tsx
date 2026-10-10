"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { useCandidate } from "../../context/CandidateContext";

export default function OnboardingForkPage() {
  const { setTrack } = useCandidate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 text-center max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
          The 3-Second Fork
        </span>
        <h1 className="text-3xl font-bold text-white tracking-tight">Select Your Career Trajectory</h1>
        <p className="text-xs text-slate-400 font-sans">
          Calibrates telemetry benchmarks, compensation floors, and Skill Bridge engines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {/* Fork 1: Fresher Track */}
        <Link
          href="/onboarding/fresher"
          onClick={() => setTrack("fresher")}
          className="p-6 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] hover:border-emerald-500/50 transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
              Fresher & Campus Track
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              2025/2026 Batch, SDE-1 off-campus drives, ₹8L-₹14L cash floor, and academic-to-enterprise concept bridge.
            </p>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-emerald-400 font-semibold pt-2">
            <span>Configure Fresher Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Fork 2: Experienced Track */}
        <Link
          href="/onboarding/pro"
          onClick={() => setTrack("experienced")}
          className="p-6 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] hover:border-blue-500/50 transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              Experienced Staff Track
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Mid/Senior/Staff ICs, architecture scale fit (RPS parity), ₹36L-₹60L base, and L6 compensation authority.
            </p>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-blue-400 font-semibold pt-2">
            <span>Configure Pro Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}

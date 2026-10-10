import React from "react";
import Link from "next/link";
import { Zap, Shield, ArrowRight, CheckCircle2, Layers } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 text-center max-w-4xl mx-auto space-y-8">
      {/* Brand Monogram */}
      <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold font-mono text-2xl relative shadow-[0_0_24px_rgba(59,130,246,0.3)]">
        <span>B</span>
        <span className="absolute -top-1.5 -right-1.5 text-xs text-emerald-400 font-black">^</span>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Candidate-First Technical Career Terminal</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Best<span className="text-blue-500">Opp</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
          The high-leverage engineering career platform with bi-directional skill parity,
          zero ghost listings, and un-obfuscated compensation transparency.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left font-mono text-xs">
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <Zap className="w-4 h-4 text-blue-400" />
          <div className="font-bold text-white text-sm">The Skill Bridge™</div>
          <div className="text-slate-400 font-sans text-xs">
            Never labelled unqualified. Bridges gaps with semantic translation cheatsheets.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <Shield className="w-4 h-4 text-emerald-400" />
          <div className="font-bold text-white text-sm">Zero-Ghost Guarantee</div>
          <div className="text-slate-400 font-sans text-xs">
            Auto-quarantines zombie jobs and evergreen resume blackholes.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <Layers className="w-4 h-4 text-amber-400" />
          <div className="font-bold text-white text-sm">First-Offer War Room</div>
          <div className="text-slate-400 font-sans text-xs">
            CTC de-obfuscation and predatory bond clause protection.
          </div>
        </div>
      </div>

      {/* 3-Second Fork CTA */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/matches"
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all"
        >
          <span>Launch Matches Terminal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/onboarding"
          className="px-6 py-3 rounded-lg bg-[var(--bg-surface,#12161F)] hover:bg-slate-800 text-slate-200 border border-[var(--border-color,#1F242F)] font-mono text-sm font-semibold transition-all"
        >
          <span>Take 3-Second Fork</span>
        </Link>
      </div>
    </div>
  );
}

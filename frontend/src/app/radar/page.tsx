"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Award,
  Building,
  Clock,
  ExternalLink,
  Zap,
  Terminal,
  FileText,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function RadarPage() {
  const [filterBatch, setFilterBatch] = useState<string>("2025");

  return (
    <div className="flex flex-col min-w-0 p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Status Telemetry Strip */}
      <div className="p-2.5 rounded-lg bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            TELEMETRY LINK: STABLE
          </span>
          <span className="text-slate-300">
            Batch Target: <strong className="text-white">2025 / 2026 Grad</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">
            Target Domain: <strong className="text-blue-400">SDE-1 Systems & Backend Core</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Real-Time Off-Campus Index: <strong className="text-emerald-400">142 Active Nodes</strong></span>
          <span>•</span>
          <span className="text-emerald-400">Sync: 04s ago</span>
        </div>
      </div>

      {/* 4 KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Circular Gauge Readiness */}
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">TELEMETRY SIGNAL</span>
              <h3 className="text-base font-semibold text-white">Offer Readiness</h3>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
              +12% MoM
            </span>
          </div>
          <div className="my-3 flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 flex items-center justify-center font-mono font-bold text-xl text-white">
              78%
            </div>
            <div className="space-y-1 font-mono text-[10px] text-slate-300">
              <div>DSA Rigor: <span className="text-emerald-400 font-bold">92%</span></div>
              <div>Prod Systems: <span className="text-blue-400 font-bold">68%</span></div>
              <div>CV Impact: <span className="text-emerald-400 font-bold">84%</span></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle,#181C26)]">
            <span className="text-emerald-400">High Parity</span>
            <span className="text-blue-400 cursor-pointer hover:underline">Deep Audit →</span>
          </div>
        </div>

        {/* KPI 2: Off-Campus Pipeline */}
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">OFF-CAMPUS PIPELINE</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">14 Drives Open</div>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-red-950 text-red-400 border border-red-800 font-bold">
              3 CLOSING &lt; 36H
            </span>
          </div>
          <div className="flex flex-wrap gap-1 my-3">
            <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] text-slate-300">Razorpay</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] text-slate-300">Juspay</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] text-slate-300">Swiggy</span>
            <span className="px-2 py-0.5 rounded bg-blue-950 font-mono text-[11px] text-blue-300 font-bold">+10 more</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle,#181C26)]">
            <span className="text-amber-400">Razorpay closes 14h</span>
            <span className="text-blue-400 cursor-pointer hover:underline">View Queue ↓</span>
          </div>
        </div>

        {/* KPI 3: Compensation Floor */}
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400">COMPENSATION FLOOR</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">₹8L - ₹14L Base</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Verified 100% Cash Base Floor.
            </div>
          </div>
          <div className="my-2 space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-slate-400">Market Parity</span>
              <span className="text-emerald-400 font-bold">94th Percentile</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 h-full w-[65%]"></div>
              <div className="bg-amber-500 h-full w-[20%]"></div>
              <div className="bg-emerald-500 h-full w-[15%]"></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle,#181C26)]">
            <span>Benchmarked: 820 offers</span>
            <span className="text-blue-400 cursor-pointer hover:underline">Calculator →</span>
          </div>
        </div>

        {/* KPI 4: Proof of Work Engine */}
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">PROOF OF WORK ENGINE</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-950 text-emerald-400 font-bold">
                LIVE & HOSTED
              </span>
            </div>
            <div className="text-sm font-bold text-white mt-1">Distributed KV-Store (Go)</div>
            <div className="text-[11px] font-mono text-blue-400 mt-0.5">
              98 GitHub Stars • CI/CD Pass
            </div>
          </div>
          <div className="p-2 rounded bg-[var(--bg-canvas,#0A0D12)] text-[10px] font-mono space-y-1 my-2">
            <div className="text-emerald-400 font-semibold">Raft Consensus Core</div>
            <div className="flex gap-1 text-[9px]">
              <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Dockerized</span>
              <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Prometheus</span>
              <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">gRPC</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle,#181C26)]">
            <span>Telemetry: 91/100</span>
            <span className="text-blue-400 cursor-pointer hover:underline">Studio Refactor →</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Career Accelerators + Verified Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle,#181C26)] pb-2.5">
              <div>
                <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  High-Leverage Career Accelerators
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Peer-reviewed programs, direct sponsored tracks, and funded open-source stipends.
                </p>
              </div>
            </div>

            {/* GSoC */}
            <div className="p-3.5 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-emerald-400 font-semibold">OPEN-SOURCE FOUNDATION</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 18d left
                  </span>
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  Google Summer of Code (GSoC 2025) • CNCF / Kubernetes Org
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1 flex gap-3">
                  <span className="text-emerald-400 font-semibold">Stipend: $3,000 (~₹2,52,000)</span>
                  <span>Skill Match: Go, K8s Custom Controllers</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1 transition-all">
                <span>Proposal Kit</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* LFX */}
            <div className="p-3.5 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-blue-400 font-semibold">LINUX FOUNDATION MENTORSHIP</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-red-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Closes in 9d
                  </span>
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  LFX Mentorship (Linux Foundation) • Cilium eBPF Observability
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1 flex gap-3">
                  <span className="text-emerald-400 font-semibold">Stipend: $3,000</span>
                  <span>Prerequisites: Linux Internals, C/Go Core</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1 transition-all">
                <span>Bridge Guide</span>
                <FileText className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Verified Drives */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle,#181C26)] pb-2">
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white uppercase">
                <Building className="w-4 h-4 text-blue-400" />
                Verified Drives
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Live Countdown</span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Razorpay</span>
                    <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 text-[9px] font-mono">FINTECH</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Graduate Software Eng (Platform)</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-bold text-emerald-400">₹18.5L CTC</div>
                  <div className="text-[10px] text-slate-500">₹13.5L Base</div>
                </div>
              </div>
              <button className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition-all">
                1-Click Apply via BestOpp ▷
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

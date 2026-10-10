"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Check,
  CheckCircle2,
  FileCode,
  Building,
  Send,
  Lock,
  Clock,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function MatchesPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>("razorpay");

  const matches = [
    {
      id: "razorpay",
      company: "Razorpay",
      domain: "Platform Core",
      title: "Sr Distributed Systems Engineer",
      leverage: 94,
      parity: 94,
      ghostRisk: 4,
      upside: 32,
      baseCtc: "₹36L - ₹42L Base CTC",
      tags: ["Go", "Kafka", "2PC"],
    },
    {
      id: "postman",
      company: "Postman",
      domain: "API Runtime",
      title: "Lead Backend Engineer — Core",
      leverage: 89,
      parity: 91,
      ghostRisk: 7,
      upside: 28,
      baseCtc: "₹38L - ₹45L Base",
      tags: ["Node.js", "Rust", "Wasm"],
    },
    {
      id: "swiggy",
      company: "Swiggy",
      domain: "Logistics",
      title: "Staff Engineer — Realtime Engine",
      leverage: 87,
      parity: 88,
      ghostRisk: 11,
      upside: 41,
      baseCtc: "₹40L - ₹48L Base",
      tags: ["Go", "Flink", "Dynamo"],
    },
  ];

  return (
    <div className="flex flex-col min-w-0 h-full">
      {/* Sub-Header Filter Strip */}
      <div className="h-11 px-6 bg-[var(--bg-surface,#12161F)] border-b border-[var(--border-color,#1F242F)] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">MATCH TARGET:</span>
            <span className="text-blue-400 font-bold">85%</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Min ₹30L Base / $130k</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400">Ghost Risk &lt; 15%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-blue-400 font-semibold">14 High-Leverage Matches Found</span>
          <span className="text-slate-600">•</span>
          <span>Synced 8m ago</span>
        </div>
      </div>

      {/* Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        {/* Left Queue (4 cols) */}
        <aside className="lg:col-span-4 p-4 border-r border-[var(--border-color,#1F242F)] bg-[var(--bg-surface,#12161F)]/40 space-y-3 overflow-y-auto">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Realtime Queue (14)
            </span>
            <span className="text-blue-400 font-semibold">3 Selected for Review</span>
          </div>

          {matches.map((item) => {
            const isSelected = selectedCompany === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCompany(item.id)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--bg-surface,#12161F)] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30"
                    : "bg-[var(--bg-surface,#12161F)]/70 border-[var(--border-color,#1F242F)] hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 font-mono font-bold flex items-center justify-center text-sm border border-blue-500/30">
                      {item.company[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-xs">{item.company}</span>
                        <span className="text-[10px] text-slate-400">• {item.domain}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">{item.title}</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-400" />
                    {item.leverage}/100
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 p-2 rounded bg-[var(--bg-canvas,#0A0D12)] text-[10px] font-mono text-center">
                  <div>
                    <span className="text-slate-500 block">PARITY FIT</span>
                    <span className="text-emerald-400 font-bold">{item.parity}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GHOST RISK</span>
                    <span className="text-emerald-400 font-bold">{item.ghostRisk}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">UPSIDE</span>
                    <span className="text-blue-400 font-bold">+{item.upside}%</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-white font-semibold">{item.baseCtc}</span>
                  <div className="flex gap-1 text-[9px]">
                    {item.tags.map((t) => (
                      <span key={t} className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </aside>

        {/* Right Tactical Detail Workspace (8 cols) */}
        <main className="lg:col-span-8 p-6 space-y-6 overflow-y-auto">
          {/* Header Badge Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Tier-1 Payments Core
              </span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 font-mono text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Requisition ID #RP-ENG-8492
              </span>
            </div>
            <div className="font-mono text-xs text-slate-400">Bangalore • Hybrid (2d Office)</div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Senior Distributed Systems Engineer — Platform Core
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400 font-mono">
              <span className="text-slate-200 font-medium">Razorpay Financial Technologies</span>
              <span>•</span>
              <span>Core Settlement Engine</span>
              <span>•</span>
              <span className="text-blue-400 font-semibold">28 ICs • +18% Q3 Growth</span>
            </div>
          </div>

          {/* Un-obfuscated Compensation Band Callout */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Un-obfuscated Verified Compensation Band
              </span>
              <div className="text-2xl font-bold font-mono text-white mt-0.5">
                ₹36,00,000 — ₹42,00,000 Base
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-1">
                + 15% Target Performance + ₹18L ESOPs (4-Yr Vest)
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono text-xs flex items-center gap-1.5 self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified via 4 Signed Offers</span>
            </div>
          </div>

          {/* Bi-Directional Overlap & Parity Audit */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle,#181C26)] pb-2.5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white uppercase tracking-wider">
                <Activity className="w-4 h-4 text-blue-400" />
                Bi-Directional Overlap & Parity Audit
              </div>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                Overall Parity: 94.2%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium">Hard Stack Overlap</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                    96% Direct Match
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Go (4.2y)
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Apache Kafka (3.8y)
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> PostgreSQL (4.0y)
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Redis Cluster (3.5y)
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> gRPC / Protobuf
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Kubernetes
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium">Architecture Scale Parity</span>
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-bold text-[10px]">
                    92% Scale Fit
                  </span>
                </div>
                <div className="flex items-baseline justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">YOUR PRODUCTION PEAK</span>
                    <span className="text-xl font-bold text-white">22,000 RPS</span>
                    <span className="text-[10px] text-emerald-400 block">p99 &lt; 18ms SLA</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">TARGET REQ: 20,000 RPS</span>
                    <span className="text-xs text-emerald-400 font-bold">110% Over-Qualified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THE SKILL BRIDGE */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/40 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  The Skill Bridge
                </span>
                <span className="font-mono text-xs text-blue-300 font-semibold">
                  Missing: Temporal.io → Evaluated as High-Leverage Bridge
                </span>
              </div>
              <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                Est. Ramp-Up: 4 to 6 Hours (Micro-curve)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              The requisition mandates <strong className="text-white">Temporal.io workflow orchestration</strong>. Your candidate telemetry confirms <strong className="text-blue-300">3.8+ years architecting Kafka-based event-driven finite state machines & distributed saga orchestrators</strong>. Conceptual stack overlap is evaluated at <strong className="text-emerald-400">88%</strong>.
            </p>

            <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-blue-500/20 font-mono text-xs space-y-2">
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider block">
                Semantic Translation Cheatsheet (Ready for Technical Rounds)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">SAGA EXECUTION MODEL</span>
                  <span className="text-white font-medium">Kafka Outbox Pattern ⇄ Temporal Activity Definitions</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Identical at-least-once idempotency semantics and deterministic retries.</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">STATE PERSISTENCE ENGINE</span>
                  <span className="text-white font-medium">Redis Distributed Locks ⇄ Temporal Workflow Event History</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Translates transaction boundary checks directly to append-only event sourcing.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/editor"
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
            >
              <FileCode className="w-4 h-4" />
              <span>Tailor 1-Page LaTeX in Studio →</span>
            </Link>
            <Link
              href="/apps"
              className="px-4 py-2.5 rounded-lg bg-[var(--bg-surface,#12161F)] hover:bg-slate-800 text-slate-200 border border-[var(--border-color,#1F242F)] font-mono text-xs font-medium flex items-center gap-2 transition-all"
            >
              <Building className="w-4 h-4 text-slate-400" />
              <span>1-Click Clip to CRM</span>
            </Link>
            <button className="px-4 py-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800 font-mono text-xs font-semibold flex items-center gap-2 transition-all">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Generate Cold Elevator Pitch</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

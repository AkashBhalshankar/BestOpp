"use client";

import React, { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Send,
  Building,
  UserCheck,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

export default function AppsPage() {
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const applications = [
    {
      id: "app-1",
      company: "Razorpay",
      title: "Sr Distributed Systems Engineer — Platform Core",
      status: "R3: Architecture Deep-Dive",
      date: "Oct 08, 2026",
      referral: "Direct HM Review (Vivek K.)",
      badge: "High Velocity",
      badgeColor: "text-emerald-400 bg-emerald-950 border-emerald-800",
    },
    {
      id: "app-2",
      company: "CRED",
      title: "Platform Engineer (Core Vault)",
      status: "R1: OA Cleared (2.5/3)",
      date: "Oct 06, 2026",
      referral: "Direct EM Inflow",
      badge: "Active",
      badgeColor: "text-blue-400 bg-blue-950 border-blue-800",
    },
    {
      id: "app-3",
      company: "Postman",
      title: "Lead Backend Engineer — Core API",
      status: "Tailored (1-Page LaTeX Ready)",
      date: "Oct 04, 2026",
      referral: "1st Degree Referral Available",
      badge: "Pending Dispatch",
      badgeColor: "text-amber-400 bg-amber-950 border-amber-800",
    },
  ];

  const pitch = `Hi [Engineering Leader],

I came across your opening for Senior Distributed Systems Engineer — Platform Core at Razorpay.

My background centers on high-throughput backend infrastructure, having recently architected a distributed key-value store benchmarked at 22,000 peak RPS with Raft consensus and sub-18ms SLA.

I noticed your mandate emphasizes Kafka-based core settlement outboxes — my production experience with concurrent write-ahead logging and deterministic activity idempotency translates directly to your scale.

Would you be open to a 10-minute technical exchange on your settlement roadmap this week?

Best regards,
Arjun M. | github.com/bestopp`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(pitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="flex flex-col min-w-0 p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color,#1F242F)] pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Application CRM & Tactical Pipeline
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time candidate authority tracking across interview rounds with zero-ghost guarantee.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
            3 Active Pipelines
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            100% In-Touch
          </span>
        </div>
      </div>

      {/* Grid: Applications List vs Cold Pitch Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Applications Table (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Candidate Active Pipeline
          </span>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-2 hover:border-blue-500/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{app.company}</span>
                      <span className={`px-2 py-0.2 rounded font-mono text-[9px] border font-bold ${app.badgeColor}`}>
                        {app.badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">{app.title}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{app.date}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2 rounded bg-[var(--bg-canvas,#0A0D12)] font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">CURRENT STAGE</span>
                    <span className="text-emerald-400 font-bold">{app.status}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">REFERRAL / ROUTE</span>
                    <span className="text-slate-300">{app.referral}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Cold Elevator Pitch Synthesizer (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Cold Elevator Pitch Synthesizer
          </span>

          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle,#181C26)] pb-2">
              <span className="font-mono text-xs font-semibold text-white">Target: Engineering Director (Razorpay)</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">High Authority</span>
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)]">
              <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                {pitch}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCopyPitch}
                className="px-3.5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? "Pitch Copied!" : "Copy Outreach Pitch"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

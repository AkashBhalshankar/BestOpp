"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Gavel,
  Shield,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  DollarSign,
  Download,
} from "lucide-react";

export default function NegotiatePage() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const scripts = {
    1: {
      title: "01. Bond Clarification Query",
      channel: "PRE-SIGNING EMAIL TO RECRUITER / TALENT ACQUISITION",
      leverage: "LEVERAGE: HIGH",
      body: `Dear [Recruiter Name],

Thank you for selecting me for the SDE-1 position at TechSolutions Corp; I am genuinely eager to contribute to the core platform engineering team.

In reviewing the standard appointment documentation, Clause 11.2 mentions a 24-month service commitment accompanied by an indemnity clause of ₹2,00,000. 

Could the talent acquisition team please provide the itemized breakdown of specialized certification and formal training investments this indemnifies, as well as confirm whether a standard quarterly pro-rata adjustment applies across Year 1 and Year 2?

I look forward to finalizing the onboarding paperwork smoothly.

Warm regards,
[Candidate Full Name]`,
      note: "Targets the legal vulnerability of arbitrary non-itemized damages under Section 27, Indian Contract Act 1872.",
    },
    2: {
      title: "02. Certificate Surrender Refusal",
      channel: "DOCUMENT VERIFICATION COMPLIANCE RESPONSE",
      leverage: "STATUTORY SHIELD: AIRTIGHT",
      body: `Dear Onboarding Team,

Thank you for detailing the document checklist. I have prepared all high-resolution, certified, and notarized true copies of my B.Tech Degree Certificate, consolidated mark sheets, and provisional passing certificates for your permanent verification files.

In strict alignment with university compliance guidelines and statutory UGC/AICTE regulations, original graduation credentials are legally retained in the candidate's personal custody. I will present the original certificates in-person during induction for physical cross-verification against the notarized copies.

Please confirm the verification window during day-one orientation.

Best regards,
[Candidate Full Name]`,
      note: "Refuses unlawful credential impounding without sounding confrontational or non-cooperative.",
    },
    3: {
      title: "03. Variable-to-Base Counter",
      channel: "COMPENSATION RESTRUCTURING MEMORANDUM",
      leverage: "MONETARY CONVERSION: 100% LIQUID",
      body: `Dear [Hiring Manager / HR Lead],

I am grateful for the offer to join TechSolutions Corp. Given my technical track record in building distributed backends during my internships and my strong interest in joining your team, I am reviewing the structure of the compensation package.

Currently, the structure allocates ₹1,86,000 into deferred bonuses and non-guaranteed variable metrics. I am holding a competing technical startup track that guarantees ₹55,000 fixed monthly in-hand. 

To make this decision immediate, could we restructure ₹1,00,000 of the deferred retention pool into the guaranteed Annual Base Pay (moving base to ₹4.84L)? I am prepared to sign immediately upon this adjustment.

Thank you for your partnership in making this work.

Sincerely,
[Candidate Full Name]`,
      note: "Anchors negotiation against actual monthly bank liquidity rather than inflated paper numbers.",
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-w-0 p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* War Room Header Alert */}
      <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold">
                WAR ROOM ID: WR-2025-IND-884
              </span>
              <span className="text-slate-400">Target Track: 2025/26 Fresher Off-Campus Pipeline</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-semibold">Legal Shield Engine v3.1</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
              First-Offer Evaluation Terminal • Defending Fresher Talent from Predatory CTC Packaging & Bond Traps
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)]">
            <span className="text-slate-500 block text-[9px]">ACTIVE OFFER FILE</span>
            <span className="text-slate-200 font-medium">TechSolutions Corp (Mass-Recruiter)</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold text-center">
            <span className="text-[9px] block">THREAT LEVEL</span>
            EXTREME
          </div>
        </div>
      </div>

      {/* Split Workspace: CTC De-Obfuscator vs Service Bond Sentinel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: CTC De-Obfuscator */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle,#181C26)] pb-2.5">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block font-bold">
                  Module 01 // Input Calibration
                </span>
                <h3 className="text-base font-bold text-white">Headline CTC De-Obfuscator</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-red-950/80 text-red-400 border border-red-800 font-mono text-xs font-bold">
                Obfuscation Index: 45.1% ILLIQUID
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block">STATED GROSS</span>
                <div className="text-lg font-bold text-white">₹7,00,000 <span className="text-[10px] text-slate-400">PA</span></div>
                <span className="text-[9px] text-amber-400">Offer Letter CTC</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">NOMINAL MONTHLY</span>
                <div className="text-lg font-bold text-red-400 line-through">₹58,333 <span className="text-[10px]">/mo</span></div>
                <span className="text-[9px] text-red-400">"HR Pitch" Illusion</span>
              </div>
              <div className="p-1 rounded bg-emerald-950/30 border border-emerald-800/40">
                <span className="text-[10px] text-emerald-400 block font-semibold">REAL BANK DEPOSIT</span>
                <div className="text-lg font-bold text-emerald-400">₹32,000 <span className="text-[10px]">/mo</span></div>
                <span className="text-[9px] text-emerald-300">Actual Net Liquid Pay</span>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-medium">True Cost Component Anatomy</span>
                <span className="text-slate-400">100% of Stated ₹7.0L CTC</span>
              </div>
              <div className="h-5 w-full rounded overflow-hidden flex bg-slate-800 font-bold text-[10px] text-black">
                <div className="bg-emerald-400 h-full flex items-center justify-center w-[54.9%]">54.9%</div>
                <div className="bg-amber-400 h-full flex items-center justify-center w-[14.3%]">14.3%</div>
                <div className="bg-blue-400 h-full flex items-center justify-center w-[10%]">10%</div>
                <div className="bg-purple-400 h-full flex items-center justify-center w-[12.3%]">12.3%</div>
                <div className="bg-red-500 h-full flex items-center justify-center w-[8.6%]">8.6%</div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Fixed Base (₹3,84,000)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Deferred Retention (₹1,00,000)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Training Recovery (₹60,000)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Service Bond Sentinel */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/50 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-red-400" />
                <div>
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase block">
                    Service Bond Sentinel // Threat Vector
                  </span>
                  <h3 className="text-sm font-bold text-white">Predatory Employment Bond Flagged</h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 font-mono text-[10px] font-bold">
                CLAUSE 11.2 FLAGGED
              </span>
            </div>

            <div className="p-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-red-500/30 text-xs font-mono text-slate-300 italic leading-relaxed">
              "Candidate covenants to serve for a minimum period of <strong className="text-red-400">24 continuous months</strong>. In event of premature separation, Employee forfeits bonuses, remits <strong className="text-red-400">INR 2,00,000/- liquidated damages</strong>, and deposits <strong className="text-red-400">Original Certificates</strong> with HR Registry."
            </div>

            <div className="p-2.5 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] space-y-1 font-mono text-xs">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Indian Contract Act, 1872 • Section 27
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Agreements in restraint of lawful trade or profession are <em>void ab initio</em>. Employers cannot force servitude or demand arbitrary liquidated damages.
              </p>
            </div>
          </div>

          {/* Defense Templates */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle,#181C26)] pb-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Battle-Tested Counter Templates
              </span>
              <span className="text-[11px] font-mono text-emerald-400">Defensible Tone</span>
            </div>

            <div className="flex gap-1 bg-[var(--bg-canvas,#0A0D12)] p-1 rounded font-mono text-[11px]">
              {[1, 2, 3].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {scripts[tab as keyof typeof scripts].title}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)]">
              <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                {scripts[activeTab as keyof typeof scripts].body}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleCopy(scripts[activeTab as keyof typeof scripts].body)}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Script to Clipboard"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

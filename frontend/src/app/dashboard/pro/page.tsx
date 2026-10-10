'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  TrendingUp, 
  Zap, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';

export default function ProDashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color,#1F242F)] pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Pro Command Center & Senior Engineering Orbit
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Calibrated for Senior, Staff, & Principal Engineers • 4+ Years Experience • Direct Decision-Maker Pipes
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold">
            6 Direct Inbounds
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
            Zero Recruiter Spam
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">OFFER LEVERAGE INDEX</span>
          <div className="text-2xl font-bold font-mono text-blue-400">92.4 / 100</div>
          <p className="text-[11px] text-slate-400 font-sans">Distributed Systems • Go / Rust • High Concurrency</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">TARGET CTC RANGE</span>
          <div className="text-2xl font-bold font-mono text-white">₹48L - ₹75L Fixed</div>
          <p className="text-[11px] text-slate-400 font-sans">De-obfuscated base cash + liquid equity value</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">INTERVIEW CYCLE VELOCITY</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">9 Days Avg</div>
          <p className="text-[11px] text-slate-400 font-sans">Fast-track direct hiring manager loops</p>
        </div>
      </div>

      {/* Senior Opportunities Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold font-mono text-slate-300 uppercase tracking-wide">
            High-Parity Senior Requisitions (Active)
          </h2>
          <Link href="/matches" className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-mono">
            View All Parity Matches <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Staff Distributed Systems Engineer',
              company: 'Razorpay',
              monogram: 'RZ',
              comp: '₹62L - ₹75L Base',
              parity: 96,
              tags: ['Distributed Systems', 'Kafka', 'Go', 'High Concurrency'],
            },
            {
              title: 'Principal Platform Architect',
              company: 'Swiggy Systems',
              monogram: 'SW',
              comp: '₹70L - ₹85L Base',
              parity: 91,
              tags: ['K8s Core', 'Service Mesh', 'Multi-Region', 'Rust'],
            },
          ].map((job) => (
            <div 
              key={job.title}
              className="p-5 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] hover:border-blue-500/50 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/40 border border-blue-700/50 flex items-center justify-center font-bold text-blue-400 font-mono">
                    {job.monogram}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{job.title}</h3>
                    <p className="text-xs text-slate-400">{job.company}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 text-xs font-mono font-bold">
                  {job.parity}% Match
                </span>
              </div>

              <div className="text-xs font-mono text-emerald-400 font-medium">
                {job.comp}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[var(--border-color,#1F242F)] text-xs">
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ghost Score: 2% (Verified)
                </span>
                <Link href="/matches" className="text-blue-400 font-semibold hover:underline flex items-center gap-1">
                  Inspect Parity <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

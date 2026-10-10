'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  Server, 
  Cpu, 
  Database,
  Lock,
  ExternalLink
} from 'lucide-react';

interface TriageJob {
  id: string;
  company: string;
  role: string;
  source: string;
  ghostScore: number;
  reason: string;
  firstSeen: string;
  applicantCount: number;
}

export default function AdminSecHudPage() {
  const [activeTab, setActiveTab] = useState<'triage' | 'scrapers' | 'tectonic' | 'audit'>('triage');
  const [triageQueue, setTriageQueue] = useState<TriageJob[]>([
    {
      id: 'REQ-GH-991',
      company: 'OmniCorp Logistics',
      role: 'Staff Distributed Systems Engineer',
      source: 'Workday Enterprise API',
      ghostScore: 94,
      reason: 'Reposted 11 consecutive cycles without interview dispatch; zero ATS state progression in 90 days',
      firstSeen: '114 days ago',
      applicantCount: 1420,
    },
    {
      id: 'REQ-GH-882',
      company: 'Zenith Global Services',
      role: 'Lead Cloud Architect (AWS/GCP)',
      source: 'Greenhouse Public Harvest',
      ghostScore: 88,
      reason: 'No engineer contact; salary range obfuscated with non-binding bonus promises',
      firstSeen: '78 days ago',
      applicantCount: 890,
    },
    {
      id: 'REQ-GH-773',
      company: 'Apex Fintech Solutions',
      role: 'Senior Backend Engineer (Go/Kafka)',
      source: 'Lever Web Scraper',
      ghostScore: 82,
      reason: 'Generic evergreen spec matching 4 sibling requisition shells',
      firstSeen: '62 days ago',
      applicantCount: 654,
    },
  ]);

  const [purgedJobs, setPurgedJobs] = useState<string[]>([]);

  const handlePurge = (id: string) => {
    setPurgedJobs(prev => [...prev, id]);
    setTriageQueue(prev => prev.filter(job => job.id !== id));
  };

  const handleVerify = (id: string) => {
    setTriageQueue(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-slate-100 p-6 md:p-10">
      {/* Top HUD Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[var(--border-color)] gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20 font-semibold tracking-wider">
              SEC-HUD v3.4 [RESTRICTED]
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              INTEGRITY SENTINEL ACTIVE
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            BestOpp Administrative Control & Anti-Ghost Verification
          </h1>
          <p className="text-xs text-slate-400">
            Internal Operations Terminal: Live scraper health, tectonic compile benchmarks, and high-confidence ghost-job purging.
          </p>
        </div>

        {/* Global Metric Badges */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded">
            <div className="text-slate-400 text-[10px]">PURGED TO DATE</div>
            <div className="text-red-400 font-bold text-sm">1,409 Shells</div>
          </div>
          <div className="px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded">
            <div className="text-slate-400 text-[10px]">CANDIDATE HOURS SAVED</div>
            <div className="text-emerald-400 font-bold text-sm">14,820 hrs</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4 mt-6 border-b border-[var(--border-color)] text-xs font-mono">
        <button
          onClick={() => setActiveTab('triage')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'triage'
              ? 'border-blue-500 text-blue-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          GHOST TRIAGE QUEUE ({triageQueue.length})
        </button>
        <button
          onClick={() => setActiveTab('scrapers')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'scrapers'
              ? 'border-blue-500 text-blue-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          SCRAPER CLUSTER TELEMETRY
        </button>
        <button
          onClick={() => setActiveTab('tectonic')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'tectonic'
              ? 'border-blue-500 text-blue-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          TECTONIC LATEX WASM LATENCY
        </button>
      </div>

      {/* Tab 1: Ghost Triage */}
      {activeTab === 'triage' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing high-suspicion requisition shells automatically quarantined by BestOpp heuristics.</span>
            <span className="font-mono">{triageQueue.length} Pending Review</span>
          </div>

          <div className="space-y-3">
            {triageQueue.map((job) => (
              <div 
                key={job.id} 
                className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg hover:border-red-500/40 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                        GHOST RISK: {job.ghostScore}%
                      </span>
                      <span className="font-mono text-xs text-slate-400">{job.id}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 font-medium">{job.source}</span>
                    </div>

                    <h3 className="text-base font-semibold text-white">
                      {job.role} <span className="text-slate-400 font-normal">at</span> {job.company}
                    </h3>

                    <p className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded p-2.5 font-mono">
                      ⚠️ Audit Trigger: {job.reason}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                      <span>First harvested: {job.firstSeen}</span>
                      <span>•</span>
                      <span>Total trapped applicants: {job.applicantCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleVerify(job.id)}
                      className="px-3 py-2 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mark Legitimate
                    </button>
                    <button
                      onClick={() => handlePurge(job.id)}
                      className="px-3 py-2 rounded text-xs font-mono bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Purge Shell
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {triageQueue.length === 0 && (
              <div className="text-center py-16 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-white">Triage Queue Clear</h3>
                <p className="text-xs text-slate-400 mt-1">All harvested feeds are clean of unverified ghost requisitions.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Scraper Cluster */}
      {activeTab === 'scrapers' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Greenhouse Public Harvest', status: 'Healthy', jobs: '14,290 / hr', errors: '0.01%', p99: '184ms' },
            { name: 'Lever Direct Stream', status: 'Healthy', jobs: '9,410 / hr', errors: '0.00%', p99: '142ms' },
            { name: 'Workday Enterprise Ingest', status: 'Throttled', jobs: '3,120 / hr', errors: '1.24%', p99: '840ms' },
          ].map((worker) => (
            <div key={worker.name} className="p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{worker.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${worker.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                  {worker.status}
                </span>
              </div>
              <div className="text-slate-400">Ingest Rate: <span className="text-white font-bold">{worker.jobs}</span></div>
              <div className="text-slate-400">Error Rate: <span className="text-white font-bold">{worker.errors}</span></div>
              <div className="text-slate-400">p99 Latency: <span className="text-emerald-400 font-bold">{worker.p99}</span></div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Tectonic WASM */}
      {activeTab === 'tectonic' && (
        <div className="mt-6 p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg font-mono text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
            <span className="text-white font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              Tectonic Local Subprocess Benchmarks
            </span>
            <span className="text-emerald-400 font-bold">V8 / WASM Pipeline Active</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-slate-400 text-[10px]">P50 COMPILE LATENCY</div>
              <div className="text-emerald-400 text-lg font-bold">238ms</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">P99 COMPILE LATENCY</div>
              <div className="text-emerald-400 text-lg font-bold">412ms</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">CONCURRENT THREADS</div>
              <div className="text-blue-400 text-lg font-bold">8 / 8</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">PAGE BUDGET ACCURACY</div>
              <div className="text-white text-lg font-bold">99.8%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Camera, 
  Mic, 
  Volume2, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  Play, 
  Terminal, 
  Sparkles,
  RefreshCw 
} from 'lucide-react';

export default function PreFlightHudPage() {
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [audioLevel, setAudioLevel] = useState(72);
  const [systemCheckPassed, setSystemCheckPassed] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas,#0A0D12)] text-slate-100 p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color,#1F242F)] pb-4">
        <div>
          <Link href="/apps" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Kanban Applications CRM
          </Link>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            Pinned Pre-Flight Interview HUD & Telemetry Check
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Zero-Friction Audio/Visual Pre-Flight Diagnostic • Live STAR Cheat Sheet Dock
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> HUD READY
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Webcam Simulator / Video Stream Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video rounded-xl bg-slate-950 border-2 border-dashed border-[var(--border-color,#1F242F)] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            {cameraActive ? (
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-400/80 flex items-center justify-center bg-slate-800 text-white font-mono text-2xl font-bold">
                  YOU
                </div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  1080p @ 60 FPS • 0 dropped frames
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur px-3 py-2 rounded text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Audio In: HyperX QuadCast (OK)</span>
                  <span className="text-emerald-400">Noise Gate: -42dB Active</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Webcam Preview Standby</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Click below to start video diagnostic loop and verify lighting, contrast, and framing.
                  </p>
                </div>
                <button
                  onClick={() => setCameraActive(true)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors flex items-center gap-2 mx-auto"
                >
                  <Play className="w-3.5 h-3.5" /> Start Video Stream Diagnostic
                </button>
              </div>
            )}
          </div>

          {/* Diagnostics Meter */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)]">
              <div className="text-[10px] text-slate-400">AUDIO INPUT LEVEL</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">{audioLevel}% Optimum</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${audioLevel}%` }} />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)]">
              <div className="text-[10px] text-slate-400">NETWORK RTT PING</div>
              <div className="text-sm font-bold text-white mt-1">14ms Low Jitter</div>
              <div className="text-[10px] text-emerald-400 mt-2">Zero Packet Loss</div>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)]">
              <div className="text-[10px] text-slate-400">WEBRTC FIREWALL</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">STUN / TURN OK</div>
              <div className="text-[10px] text-slate-400 mt-2">P2P Ready</div>
            </div>
          </div>
        </div>

        {/* Right: Telemetry & STAR Cheat Sheet Dock */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-color,#1F242F)] pb-2">
              <h3 className="text-xs font-bold font-mono text-white uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> STAR Answer Architecture Dock
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Pinned Pre-Flight</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-mono text-blue-400 font-bold text-[11px]">S - Situation (15s)</div>
                <p className="text-slate-300">Set high-scale context: "At Razorpay, handling 14,000 TPS payment bursts with 99.99% availability requirement."</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-mono text-blue-400 font-bold text-[11px]">T - Task (15s)</div>
                <p className="text-slate-300">Clarify exact ownership: "I was lead engineer tasked with eliminating lock contention on PostgreSQL ledger balances."</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-mono text-blue-400 font-bold text-[11px]">A - Action (60s)</div>
                <p className="text-slate-300">Deep technical execution: "Designed partitioned Kafka event streams with idempotent consumer deduplication and optimistic locking."</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-mono text-emerald-400 font-bold text-[11px]">R - Result (30s)</div>
                <p className="text-slate-300">Quantified telemetry: "Reduced p99 database latency from 420ms to 18ms and eradicated 100% of double-spend anomalies."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

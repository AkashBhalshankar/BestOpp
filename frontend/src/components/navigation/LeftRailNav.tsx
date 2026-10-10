"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Compass,
  FileCode,
  ShieldAlert,
  Briefcase,
  Terminal,
  Activity,
  CheckCircle2,
  Cpu,
  LogOut,
  Sliders,
} from "lucide-react";
import { useCandidate } from "../../context/CandidateContext";

export function LeftRailNav() {
  const pathname = usePathname();
  const { candidate, setTrack } = useCandidate();

  const navItems = [
    {
      label: "Opportunity Matches",
      href: "/matches",
      icon: Layers,
      badge: "14",
    },
    {
      label: "Opportunity Radar",
      href: "/radar",
      icon: Compass,
      badge: "Active",
    },
    {
      label: "Resume Studio",
      href: "/editor",
      icon: FileCode,
      badge: "1-Page",
    },
    {
      label: "First-Offer War Room",
      href: "/negotiate",
      icon: ShieldAlert,
      badge: "Alert",
      alert: true,
    },
    {
      label: "Application CRM",
      href: "/apps",
      icon: Briefcase,
      badge: "3 Live",
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[var(--bg-surface,#12161F)] border-r border-[var(--border-color,#1F242F)] flex flex-col justify-between z-20 min-h-screen">
      <div className="flex flex-col">
        {/* Brand Unit Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-[var(--border-color,#1F242F)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold font-mono text-base tracking-tighter relative shadow-[0_0_12px_rgba(59,130,246,0.25)]">
              <span>B</span>
              <span className="absolute -top-1 -right-1 text-[9px] text-emerald-400 font-black leading-none">^</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="text-white font-semibold text-base tracking-tight">Best</span>
                <span className="text-blue-500 font-semibold text-base tracking-tight ml-[1px]">Opp</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5">
                Best Opportunities
              </span>
            </div>
          </div>
        </div>

        {/* Live Scraper Health Monitor Pill */}
        <div className="p-3 mx-3 my-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)] flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 text-[11px] font-medium font-sans">Scrapers Active</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">99.8% Uptime</span>
        </div>

        {/* Main Navigation */}
        <nav className="px-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-500 font-medium">
            Core Controls
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors text-xs font-mono ${
                  isActive
                    ? "bg-blue-600/15 text-white border border-blue-500/40 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                  <span className="font-sans font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      item.alert
                        ? "bg-red-950 text-red-400 border border-red-800/80 font-bold"
                        : isActive
                        ? "bg-blue-500/20 text-blue-300 font-bold"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-500 font-medium">
            Eng Infrastructure
          </div>

          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2 text-[11px]">
              <Cpu className="w-3.5 h-3.5 text-slate-500" />
              Tectonic WASM
            </span>
            <span className="text-emerald-400 text-[10px]">0 fail</span>
          </div>

          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2 text-[11px]">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              Realtime Audit
            </span>
            <span className="text-blue-400 text-[10px]">Live</span>
          </div>
        </nav>
      </div>

      {/* Bottom Track Switcher & Candidate Identity Card */}
      <div className="p-3 border-t border-[var(--border-color,#1F242F)] space-y-2">
        <div className="flex items-center justify-between px-2 py-1 bg-[var(--bg-canvas,#0A0D12)] rounded border border-[var(--border-color,#1F242F)] text-[10px] font-mono">
          <span className="text-slate-400">Track:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setTrack("experienced")}
              className={`px-1.5 py-0.5 rounded transition-all ${
                candidate.track === "experienced"
                  ? "bg-blue-600 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Staff IC
            </button>
            <button
              onClick={() => setTrack("fresher")}
              className={`px-1.5 py-0.5 rounded transition-all ${
                candidate.track === "fresher"
                  ? "bg-emerald-600 text-white font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Fresher
            </button>
          </div>
        </div>

        <div className="px-2.5 py-2 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-color,#1F242F)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
              AM
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-200 leading-tight">
                {candidate.fullName}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">
                {candidate.currentTitle}
              </span>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-950 text-blue-400 border border-blue-800">
            L6 ROOT
          </span>
        </div>
      </div>
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/matches");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-sm rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] p-6 space-y-5 font-mono text-xs shadow-2xl">
        <div className="text-center space-y-1">
          <div className="text-base font-bold text-white">Sign In to BestOpp</div>
          <p className="text-[11px] text-slate-400 font-sans">
            Candidate telemetry, parity audits, and offer war rooms.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-slate-400 text-[10px] uppercase">Work / Personal Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full py-2 pl-8 pr-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 text-[10px] uppercase">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-2 pl-8 pr-3 rounded bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] flex items-center justify-center gap-1.5"
          >
            <span>Authenticate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-400 font-sans">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

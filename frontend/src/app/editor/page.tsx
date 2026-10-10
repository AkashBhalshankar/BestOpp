"use client";

import React, { useState } from "react";
import {
  FileCode,
  Download,
  Play,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Eye,
  RefreshCw,
} from "lucide-react";

export default function ResumeStudioPage() {
  const [latexCode, setLatexCode] = useState<string>(`\\documentclass[letterpaper,10pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[hidelinks]{hyperref}
\\usepackage{enumitem}

\\pagestyle{empty}
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\begin{document}
\\begin{center}
    \\textbf{\\Huge \\scshape Arjun M.} \\\\ \\vspace{1pt}
    \\small +91 98765 43210 $|$ \\href{mailto:arjun.systems@bestopp.dev}{arjun.systems@bestopp.dev} $|$ 
    \\href{https://github.com/bestopp}{github.com/bestopp}
\\end{center}

\\section{Technical Core & Distributed Primitives}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Go, C++20, Rust, Python, SQL, Bash} \\\\
     \\textbf{Distributed Systems}{: Kafka (Commit Log Parity), Redis Pub/Sub, Raft Consensus, gRPC, Docker, K8s}
    }}
\\end{itemize}

\\section{Production Projects & Systems Engineering}
\\textbf{Distributed Key-Value Storage Engine} $|$ \\emph{Go, Raft, gRPC} \\hfill 2024\\\\
\\begin{itemize}[leftmargin=0.2in]
    \\item Architected linearizable Raft consensus algorithm handling 22,000 peak RPS with p99 sub-18ms SLA.
    \\item Implemented Write-Ahead Log (WAL) and memory compaction routines reducing crash-recovery time by 64\\%.
    \\item [Skill Bridge]: Enforced transactional outbox patterns providing equivalent state machine persistence to Temporal.io workflows.
\\end{itemize}

\\end{document}`);

  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [pageBudget, setPageBudget] = useState<number>(94); // 94% of 1 page

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setPageBudget(latexCode.includes("\\newpage") ? 140 : 94);
    }, 600);
  };

  const handleInsertBridge = () => {
    const bridgeText =
      "\n    \\item [Skill Bridge]: Formalized outbox event sourcing mapping directly to enterprise temporal saga execution loops.";
    setLatexCode((prev) => prev.replace("\\end{itemize}", `${bridgeText}\n\\end{itemize}`));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Studio Header Bar */}
      <div className="h-12 px-6 bg-[var(--bg-surface,#12161F)] border-b border-[var(--border-color,#1F242F)] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <FileCode className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-white">Tectonic LaTeX Sandbox Studio</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400">Target: 1-Page Executive Budget</span>
        </div>

        {/* 1-Page Budget Ruler */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Page Budget:</span>
            <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                className={`h-full transition-all ${
                  pageBudget > 100 ? "bg-red-500" : "bg-emerald-400"
                }`}
                style={{ width: `${Math.min(100, pageBudget)}%` }}
              ></div>
            </div>
            <span
              className={`font-bold ${
                pageBudget > 100 ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {pageBudget}% {pageBudget > 100 ? "(OVERFLOW)" : "(Clean)"}
            </span>
          </div>

          <button
            onClick={handleInsertBridge}
            className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600/30 flex items-center gap-1 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Inject Bridge Bullet</span>
          </button>

          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)]"
          >
            {isCompiling ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span>Compile Tectonic PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Code Editor (6 cols) */}
        <div className="lg:col-span-6 border-r border-[var(--border-color,#1F242F)] flex flex-col bg-[var(--bg-canvas,#0A0D12)]">
          <div className="h-8 px-4 bg-[var(--bg-surface,#12161F)]/60 border-b border-[var(--border-subtle,#181C26)] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>resume.tex (Source Code)</span>
            <span>WASM Tectonic v0.14.1</span>
          </div>
          <textarea
            value={latexCode}
            onChange={(e) => setLatexCode(e.target.value)}
            className="flex-1 w-full p-4 bg-transparent resize-none font-mono text-xs text-slate-200 focus:outline-none leading-relaxed selection:bg-blue-600/30"
            spellCheck={false}
          />
        </div>

        {/* Right Rendered PDF / Telemetry (6 cols) */}
        <div className="lg:col-span-6 flex flex-col bg-[var(--bg-canvas,#0A0D12)]/80 p-6 overflow-y-auto">
          <div className="max-w-[540px] w-full mx-auto p-8 rounded-lg bg-white text-slate-900 shadow-2xl font-serif text-xs min-h-[700px] border border-slate-300">
            {/* Header */}
            <div className="text-center border-b pb-2 mb-3">
              <h1 className="text-xl font-bold tracking-tight">ARJUN M.</h1>
              <p className="text-[10px] text-slate-600 mt-0.5">
                +91 98765 43210 • arjun.systems@bestopp.dev • github.com/bestopp
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-3">
              <h2 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1">
                Technical Core & Distributed Primitives
              </h2>
              <p className="text-[10px] leading-relaxed">
                <strong>Languages:</strong> Go, C++20, Rust, Python, SQL, Bash<br />
                <strong>Distributed Systems:</strong> Kafka (Commit Log Parity), Redis Pub/Sub, Raft Consensus, gRPC, Docker, K8s
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1">
                Production Projects & Systems Engineering
              </h2>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[10px]">Distributed Key-Value Storage Engine</span>
                <span className="text-[9px] text-slate-500">2024</span>
              </div>
              <ul className="list-disc pl-4 text-[10px] space-y-1 mt-1 leading-relaxed">
                <li>Architected linearizable Raft consensus algorithm handling 22,000 peak RPS with p99 sub-18ms SLA.</li>
                <li>Implemented Write-Ahead Log (WAL) and memory compaction routines reducing crash-recovery time by 64%.</li>
                <li className="text-blue-900 font-medium">
                  [Skill Bridge]: Enforced transactional outbox patterns providing equivalent state machine persistence to Temporal.io workflows.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

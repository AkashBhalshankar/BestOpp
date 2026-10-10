import React, { useState, useEffect } from 'react';
import {
  Shield,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Terminal,
  FileText,
  Copy,
  Download,
  Share2,
  ArrowRight,
  ExternalLink,
  Cpu,
  Database,
  Flame,
  Award,
  Filter,
  Search,
  Sparkles,
  RefreshCw,
  Sliders,
  DollarSign,
  Layers,
  ChevronRight,
  Check,
  Building,
  UserCheck,
  Send,
  Zap,
  BarChart3,
  Gavel,
  Lock,
  Compass,
  FileCode,
  School,
  Maximize2,
  Camera,
  Mic,
  Volume2,
  Play,
  Eye,
  Activity
} from 'lucide-react';

type ActiveView = 'matches' | 'flightdeck' | 'freshermatches' | 'radar' | 'editor' | 'apps' | 'hud' | 'warroom' | 'admin';
type ThemeMode = 'default' | 'earthy';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('matches');
  const [theme, setTheme] = useState<ThemeMode>('default');
  const [activeScriptTab, setActiveScriptTab] = useState<number>(1);
  const [copiedScriptId, setCopiedScriptId] = useState<number | null>(null);
  const [currentTimeUTC, setCurrentTimeUTC] = useState<string>('18:42:09 UTC');
  const [scannerStatus, setScannerStatus] = useState<string>('ready');
  const [selectedMatchCompany, setSelectedMatchCompany] = useState<string>('razorpay');
  const [adminQueueItems, setAdminQueueItems] = useState([
    {
      id: 'REQ-9921',
      company: 'Enterprise Corp',
      monogram: 'EC',
      title: 'Principal Architect — Core Java/Go Systems',
      tag: 'Pipeline Scraping Signature',
      risk: 84,
      recruiterSignal: '0.08 / 1.0',
      source: 'Greenhouse REST API',
      telemetry: 'Reposted 6x in 90 days',
      outcome: '0 hires in 120d • Evergreen listing',
      checked: true,
    },
    {
      id: 'REQ-8410',
      company: 'TransGlobal Cloud',
      monogram: 'TC',
      title: 'Staff Distributed Systems Architect',
      tag: 'Ghost Requisition Pattern',
      risk: 76,
      recruiterSignal: '0.14 / 1.0',
      source: 'Workday HTML Scraper',
      telemetry: 'Reposted 4x in 60 days',
      outcome: 'Resume blackhole (0 replies)',
      checked: true,
    },
    {
      id: 'REQ-7203',
      company: 'Nexora Systems',
      monogram: 'NX',
      title: 'Lead SRE & Platform Reliability',
      tag: 'Compensation Obfuscation Alert',
      risk: 81,
      recruiterSignal: '0.11 / 1.0',
      source: 'Ashby Ingestion Webhook',
      telemetry: 'Re-scraped 5x in 75 days',
      outcome: 'Phantom ₹65L band with 0 base',
      checked: false,
    },
  ]);

  // Radar State
  const [radarBatch, setRadarBatch] = useState<'2025' | '2026'>('2025');
  const [reportedShells, setReportedShells] = useState<string[]>([]);

  // Resume Editor State
  const [latexSource, setLatexSource] = useState<string>(`\\documentclass[letterpaper,10pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
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

\\section{Technical Core \\& Distributed Primitives}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Go, C++20, Rust, Python, SQL, Bash} \\\\
     \\textbf{Distributed Systems}{: Kafka (Commit Log Parity), Redis Pub/Sub, Raft Consensus, gRPC, Docker, K8s}
    }}
\\end{itemize}

\\section{Production Projects \\& Systems Engineering}
\\textbf{Distributed Key-Value Storage Engine} $|$ \\emph{Go, Raft, gRPC} \\hfill 2024\\\\
\\begin{itemize}[leftmargin=0.2in]
    \\item Architected linearizable Raft consensus algorithm handling 22,000 peak RPS with p99 sub-18ms SLA.
    \\item Implemented Write-Ahead Log (WAL) and memory compaction routines reducing crash-recovery time by 64\\%.
    \\item [Skill Bridge]: Enforced transactional outbox patterns providing equivalent state machine persistence to Temporal.io workflows.
\\end{itemize}

\\end{document}`);
  const [isTectonicCompiling, setIsTectonicCompiling] = useState<boolean>(false);
  const [editorCompileSuccess, setEditorCompileSuccess] = useState<boolean>(true);
  const [pageBudget, setPageBudget] = useState<number>(94);

  // Applications CRM State
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);

  // Pre-Flight HUD State
  const [hudCameraActive, setHudCameraActive] = useState<boolean>(false);
  const [hudAudioLevel, setHudAudioLevel] = useState<number>(76);

  // Live clock synchronization
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTimeUTC(now.toTimeString().split(' ')[0] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme application
  useEffect(() => {
    if (theme === 'earthy') {
      document.body.classList.add('earthy-mode');
    } else {
      document.body.classList.remove('earthy-mode');
    }
  }, [theme]);

  const handleCopyScript = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2200);
  };

  const handlePurgeItem = (id: string) => {
    setAdminQueueItems(prev => prev.filter(item => item.id !== id));
  };

  const scripts = {
    1: {
      title: '01. Bond Clarification Query',
      channel: 'PRE-SIGNING EMAIL TO RECRUITER / TALENT ACQUISITION',
      leverage: 'LEVERAGE: HIGH',
      body: `Dear [Recruiter Name],

Thank you for selecting me for the SDE-1 position at TechSolutions Corp; I am genuinely eager to contribute to the core platform engineering team.

In reviewing the standard appointment documentation, Clause 11.2 mentions a 24-month service commitment accompanied by an indemnity clause of ₹2,00,000. 

Could the talent acquisition team please provide the itemized breakdown of specialized certification and formal training investments this indemnifies, as well as confirm whether a standard quarterly pro-rata adjustment applies across Year 1 and Year 2?

I look forward to finalizing the onboarding paperwork smoothly.

Warm regards,
[Candidate Full Name]
[University Roll / Contact Number]`,
      note: 'Targets the statutory vulnerability of arbitrary non-itemized liquidated damages under Indian Contract Act 1872 §27.',
    },
    2: {
      title: '02. Certificate Surrender Refusal',
      channel: 'DOCUMENT VERIFICATION COMPLIANCE RESPONSE',
      leverage: 'STATUTORY SHIELD: AIRTIGHT',
      body: `Dear Onboarding Team,

Thank you for detailing the document checklist. I have prepared all high-resolution, certified, and notarized true copies of my B.Tech Degree Certificate, consolidated mark sheets, and provisional passing certificates for your permanent verification records.

In strict alignment with university statutory compliance and UGC/AICTE regulations, original graduation credentials are legally retained in the candidate's personal custody. I will gladly present the original certificates in-person during induction for physical cross-verification against the notarized copies.

Please confirm the verification window during day-one orientation.

Best regards,
[Candidate Full Name]`,
      note: 'Refuses coercive document impounding without sounding defensive or non-cooperative.',
    },
    3: {
      title: '03. Variable-to-Base Counter',
      channel: 'COMPENSATION RESTRUCTURING MEMORANDUM',
      leverage: 'MONETARY CONVERSION: 100% LIQUID',
      body: `Dear [Hiring Manager / HR Lead],

I am grateful for the offer to join TechSolutions Corp. Given my technical track record in building distributed backends during my internships and my strong interest in joining your team, I am reviewing the structure of the compensation package.

Currently, the structure allocates ₹1,86,000 into deferred bonuses and non-guaranteed variable metrics. I am holding a competing technical startup track that guarantees ₹55,000 fixed monthly in-hand. 

To make this decision immediate, could we restructure ₹1,00,000 of the deferred retention pool into the guaranteed Annual Base Pay (moving base to ₹4.84L)? I am prepared to sign immediately upon this adjustment.

Thank you for your partnership in making this work.

Sincerely,
[Candidate Full Name]`,
      note: 'Anchors negotiations directly against monthly bank liquidity rather than inflated paper numbers.',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* =========================================================================
          TOP COMMAND & NAVIGATION BAR
      ========================================================================= */}
      <header className="sticky top-0 z-50 h-14 bg-[var(--bg-surface)]/95 backdrop-blur-xl border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Brand Unit */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5 pr-4 border-r border-[var(--border-color)]">
            <div className="w-8 h-8 rounded bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold font-mono text-sm shadow-[0_0_12px_rgba(59,130,246,0.25)] relative">
              <span>B</span>
              <span className="absolute -top-1 -right-1 text-[9px] text-emerald-400 font-black">^</span>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline font-bold tracking-tight text-sm sm:text-base">
                <span className="text-white">Best</span>
                <span className="text-blue-500 ml-[1px]">Opp</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5">
                Best Opportunities
              </span>
            </div>
          </div>

          {/* Sub-track Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--bg-canvas)] border border-[var(--border-color)] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              {activeView === 'admin'
                ? 'Control Terminal: SEC-HUD v3.4'
                : activeView === 'flightdeck' || activeView === 'freshermatches'
                ? 'Fresher Mode: 2025/2026 Batch (SDE-1)'
                : 'Experienced IC Track: Staff Systems (4.2 YOE)'}
            </span>
          </div>
        </div>

        {/* Center Screen Tabs Switcher */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none font-mono text-xs">
          <button
            onClick={() => setActiveView('matches')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'matches'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Matches Engine</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold">1</span>
          </button>

          <button
            onClick={() => setActiveView('flightdeck')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'flightdeck'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Flight Deck</span>
          </button>

          <button
            onClick={() => setActiveView('freshermatches')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'freshermatches'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Concept Bridge™</span>
          </button>

          <button
            onClick={() => setActiveView('radar')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'radar'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Fresh Radar</span>
          </button>

          <button
            onClick={() => setActiveView('editor')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'editor'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume Studio</span>
          </button>

          <button
            onClick={() => setActiveView('apps')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'apps'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Kanban CRM</span>
          </button>

          <button
            onClick={() => setActiveView('hud')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'hud'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pre-Flight HUD</span>
          </button>

          <button
            onClick={() => setActiveView('warroom')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'warroom'
                ? 'bg-red-600/20 text-red-400 border border-red-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-red-400" />
            <span>CTC War Room</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-red-950 text-red-400 font-bold border border-red-800">Alert</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-2.5 py-1.5 rounded transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'admin'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin SEC-HUD</span>
          </button>
        </nav>

        {/* Right Controls: Theme Toggle & Identity */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dual-Theme Switcher Button Group */}
          <div className="flex items-center p-0.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)]">
            <button
              onClick={() => setTheme('default')}
              className={`px-2 py-1 text-[11px] font-mono rounded flex items-center gap-1.5 transition-all ${
                theme === 'default'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Midnight Cobalt (Default)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="hidden sm:inline">Linear Dark</span>
            </button>
            <button
              onClick={() => setTheme('earthy')}
              className={`px-2 py-1 text-[11px] font-mono rounded flex items-center gap-1.5 transition-all ${
                theme === 'earthy'
                  ? 'bg-[#84A98C]/20 text-[#84A98C] border border-[#84A98C]/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Earthy Sage Mode"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#84A98C]"></span>
              <span className="hidden sm:inline">Earthy Tone</span>
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              AM
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="text-xs font-medium text-slate-200 leading-tight">Arjun M.</span>
              <span className="text-[10px] text-slate-400 font-mono">Senior Staff IC</span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SCREEN 1: OPPORTUNITY MATCHES (Experienced Staff IC Track - Image 1)
      ========================================================================= */}
      {activeView === 'matches' && (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sub-header Filter & Telemetry Strip */}
          <div className="h-11 px-6 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
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

          {/* Split Workspace: 35% Left Queue / 65% Tactical Detail Pane */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-6.25rem)]">
            {/* Left Rail (35% = 4 cols on lg) */}
            <aside className="lg:col-span-4 p-4 border-r border-[var(--border-color)] bg-[var(--bg-surface)]/40 space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider px-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  Realtime Queue (14)
                </span>
                <span className="text-blue-400 font-semibold">3 Selected for Review</span>
              </div>

              {/* Match Card 1: Razorpay (Selected) */}
              <div
                onClick={() => setSelectedMatchCompany('razorpay')}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  selectedMatchCompany === 'razorpay'
                    ? 'bg-[var(--bg-surface)] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                    : 'bg-[var(--bg-surface)]/70 border-[var(--border-color)] hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 font-mono font-bold flex items-center justify-center text-sm border border-blue-500/30">
                      R
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-xs">Razorpay</span>
                        <span className="text-[10px] text-slate-400">• Platform Core</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">Sr Distributed Systems Engineer</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-400" />
                    94/100
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 p-2 rounded bg-[var(--bg-canvas)] text-[10px] font-mono text-center">
                  <div>
                    <span className="text-slate-500 block">PARITY FIT</span>
                    <span className="text-emerald-400 font-bold">94%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GHOST RISK</span>
                    <span className="text-emerald-400 font-bold">4%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">UPSIDE</span>
                    <span className="text-blue-400 font-bold">+32%</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-white font-semibold">₹36L - ₹42L Base CTC</span>
                  <div className="flex gap-1 text-[9px]">
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Go</span>
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Kafka</span>
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">2PC</span>
                  </div>
                </div>
              </div>

              {/* Match Card 2: Postman */}
              <div
                onClick={() => setSelectedMatchCompany('postman')}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  selectedMatchCompany === 'postman'
                    ? 'bg-[var(--bg-surface)] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                    : 'bg-[var(--bg-surface)]/70 border-[var(--border-color)] hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-amber-600/20 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/30">
                      P
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-xs">Postman</span>
                        <span className="text-[10px] text-slate-400">• API Runtime</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">Lead Backend Engineer — Core</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-slate-800 text-slate-300">
                    89/100
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 p-2 rounded bg-[var(--bg-canvas)] text-[10px] font-mono text-center">
                  <div>
                    <span className="text-slate-500 block">PARITY</span>
                    <span className="text-emerald-400 font-bold">91%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GHOST</span>
                    <span className="text-emerald-400 font-bold">7%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">UPSIDE</span>
                    <span className="text-blue-400 font-bold">+28%</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-white font-semibold">₹38L - ₹45L Base</span>
                  <div className="flex gap-1 text-[9px]">
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Node.js</span>
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Rust</span>
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Wasm</span>
                  </div>
                </div>
              </div>

              {/* Match Card 3: Swiggy */}
              <div
                onClick={() => setSelectedMatchCompany('swiggy')}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  selectedMatchCompany === 'swiggy'
                    ? 'bg-[var(--bg-surface)] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30'
                    : 'bg-[var(--bg-surface)]/70 border-[var(--border-color)] hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-orange-600/20 text-orange-400 font-mono font-bold flex items-center justify-center text-sm border border-orange-500/30">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white text-xs">Swiggy</span>
                        <span className="text-[10px] text-slate-400">• Logistics</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">Staff Engineer — Realtime Engine</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-slate-800 text-slate-300">
                    87/100
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 p-2 rounded bg-[var(--bg-canvas)] text-[10px] font-mono text-center">
                  <div>
                    <span className="text-slate-500 block">PARITY</span>
                    <span className="text-emerald-400 font-bold">88%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">GHOST</span>
                    <span className="text-emerald-400 font-bold">11%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">UPSIDE</span>
                    <span className="text-blue-400 font-bold">+41%</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-white font-semibold">₹40L - ₹48L Base</span>
                  <div className="flex gap-1 text-[9px]">
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Go</span>
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Flink</span>
                    <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Dynamo</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Tactical Detail Pane (65% = 8 cols on lg) */}
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
                <div className="font-mono text-xs text-slate-400">
                  Bangalore • Hybrid (2d Office)
                </div>
              </div>

              {/* Title & Organization */}
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
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Bi-Directional Overlap & Parity Audit
                  </div>
                  <span className="font-mono text-xs text-emerald-400 font-bold">
                    Overall Parity: 94.2%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hard Stack Overlap */}
                  <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
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
                    <div className="text-[10px] text-slate-500 font-mono pt-1">
                      Verified via GitHub public commits & past Tier-1 high-throughput ledger microservices.
                    </div>
                  </div>

                  {/* Architecture Scale Parity */}
                  <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
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
                        <span className="text-[10px] text-emerald-400 block">p99 &lt; 18ms SLA Multi-Region</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">TARGET REQ: 20,000 RPS</span>
                        <span className="text-xs text-emerald-400 font-bold">110% Over-Qualified</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono pt-1">
                      Matches high-concurrency ledger requirements with zero architectural retraining needed.
                    </div>
                  </div>
                </div>
              </div>

              {/* CORE DIFFERENTIATOR: THE SKILL BRIDGE */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/40 space-y-3 relative overflow-hidden">
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

                {/* Semantic Translation Cheatsheet */}
                <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-blue-500/20 font-mono text-xs space-y-2">
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

                <button className="px-3.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 border border-blue-500/50 font-mono text-xs flex items-center gap-2 transition-all">
                  <FileText className="w-3.5 h-3.5" />
                  <span>View 1-Page Bridge Architecture Notes & Interview Defense Kit</span>
                </button>
              </div>

              {/* Recruiter Loop Velocity & Compensation Band Authority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                  <div className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5 uppercase">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Recruiter Loop Velocity
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono py-2">
                    <div>
                      <span className="text-xl font-bold text-white">18 Hours</span>
                      <span className="text-[9px] text-slate-400 block">AVG 1ST-TOUCH</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-white">3 Rounds</span>
                      <span className="text-[9px] text-slate-400 block">ENG LOOP</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-emerald-400">0 Take-Homes</span>
                      <span className="text-[9px] text-slate-400 block">LIVE ARCH ONLY</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    High hiring urgency triggered by payments platform volume surge. Direct HM review bypassed recruiter screen in 70% of parallel tracks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                  <div className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5 uppercase">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Compensation Band Authority
                  </div>
                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Candidate Band Leverage:</span>
                      <span className="text-emerald-400 font-bold">Top 6th Percentile</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-[94%]"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                      <span>Floor: ₹32L</span>
                      <span className="text-white font-bold">Your Target: ₹42L Base</span>
                      <span>Cap: ₹44L</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Zero compression risk. Target compensation fits squarely into L6 allocation with maximum sign-on flexibility.
                  </p>
                </div>
              </div>

              {/* Bottom Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                  <FileCode className="w-4 h-4" />
                  <span>Tailor 1-Page LaTeX in Studio →</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-[var(--bg-surface)] hover:bg-slate-800 text-slate-200 border border-[var(--border-color)] font-mono text-xs font-medium flex items-center gap-2 transition-all">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>1-Click Clip to CRM</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800 font-mono text-xs font-semibold flex items-center gap-2 transition-all">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Generate Cold Elevator Pitch</span>
                </button>
              </div>
            </main>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 2: FRESHER FLIGHT DECK (Batch 2025/2026 - Image 13)
      ========================================================================= */}
      {activeView === 'flightdeck' && (
        <div className="flex-1 flex flex-col p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Status Telemetry Strip */}
          <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
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
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-emerald-400">High Parity</span>
                <span className="text-blue-400 cursor-pointer hover:underline">Deep Audit →</span>
              </div>
            </div>

            {/* KPI 2: Off-Campus Pipeline */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
                <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] text-slate-300">CRED</span>
                <span className="px-2 py-0.5 rounded bg-blue-950 font-mono text-[11px] text-blue-300 font-bold">+10 more</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-amber-400">Razorpay closes 14h</span>
                <span className="text-blue-400 cursor-pointer hover:underline">View Queue ↓</span>
              </div>
            </div>

            {/* KPI 3: Compensation Floor */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">COMPENSATION FLOOR</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">₹8L - ₹14L Base</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Verified 100% Cash Base. No 4-year clawbacks.
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
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span>Benchmarked: 820 offers</span>
                <span className="text-blue-400 cursor-pointer hover:underline">Calculator →</span>
              </div>
            </div>

            {/* KPI 4: Proof of Work Engine */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
              <div className="p-2 rounded bg-[var(--bg-canvas)] text-[10px] font-mono space-y-1 my-2">
                <div className="text-emerald-400 font-semibold">Raft Consensus Core</div>
                <div className="flex gap-1 text-[9px]">
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Dockerized</span>
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">Prometheus</span>
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">gRPC</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span>Telemetry: 91/100</span>
                <span className="text-blue-400 cursor-pointer hover:underline">Studio Refactor →</span>
              </div>
            </div>
          </div>

          {/* Priority Telemetry Boost Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    Priority Telemetry Boost
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white font-mono text-[9px] font-bold">
                    +18 Roles Unlocked
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-0.5">
                  Asset Upgrade: Add Multi-Stage Docker Builds & gRPC to your Go Repo
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Our parsing model detects your distributed store lacks container production manifests. Rectifying this bridges 4 missing Tier-1 systems criteria instantly.
                </p>
              </div>
            </div>
            <button className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all">
              <Terminal className="w-3.5 h-3.5" />
              <span>1-Click Blueprint</span>
            </button>
          </div>

          {/* Two-Column Middle Section: Accelerators + Verified Drives */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Career Accelerators */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                  <div>
                    <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-400" />
                      High-Leverage Career Accelerators
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Peer-reviewed programs, direct sponsored tracks, and funded open-source stipends.
                    </p>
                  </div>
                  <div className="flex gap-1 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-semibold">All (12)</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">GSoC / LFX (5)</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">Hackathons (7)</span>
                  </div>
                </div>

                {/* Accelerator Item 1: GSoC */}
                <div className="p-3.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
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

                {/* Accelerator Item 2: LFX */}
                <div className="p-3.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
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

                {/* Accelerator Item 3: Hackathon */}
                <div className="p-3.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-amber-400 font-semibold">PREMIER HACKATHON</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 font-semibold">Bengaluru In-Person</span>
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      In-Out Hackathon 2025 • Direct VC & Seed Stage Fast-Track
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1 flex gap-3">
                      <span className="text-emerald-400 font-semibold">₹5,00,000 Prize Pool</span>
                      <span>Fast-Track Interviews: 6 Series-A Firms</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs flex items-center gap-1 transition-all">
                    <span>Register Squad</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Verified Drives Countdown */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white uppercase">
                    <Building className="w-4 h-4 text-blue-400" />
                    Verified Drives
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Live Countdown</span>
                </div>

                {/* Drive 1: Razorpay */}
                <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
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
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Eligibility: 2025 B.Tech (All)</span>
                    <span className="text-red-400 font-bold">14h 22m left</span>
                  </div>
                  <button className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold transition-all">
                    1-Click Apply via BestOpp ▷
                  </button>
                </div>

                {/* Drive 2: Juspay */}
                <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">Juspay</span>
                        <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono">SYSTEMS</span>
                      </div>
                      <div className="text-[11px] text-slate-300">Hiring Challenge: Functional Backend</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-emerald-400">₹15L - ₹21L</div>
                      <div className="text-[10px] text-slate-500">Pure Cash</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Stack: Haskell / Rust / Go</span>
                    <span className="text-amber-400 font-bold">Test: Sat 7:00 PM</span>
                  </div>
                  <button className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-all">
                    Download Practice Harness
                  </button>
                </div>

                {/* Drive 3: CRED */}
                <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">CRED</span>
                        <span className="px-1 py-0.2 rounded bg-purple-500/20 text-purple-400 text-[9px] font-mono">PREMIUM</span>
                      </div>
                      <div className="text-[11px] text-slate-300">Core Platform Intern to SDE-1</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-emerald-400">₹1L/mo</div>
                      <div className="text-[10px] text-slate-500">₹22L PPO Base</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400">Verified Active</span>
                    <span>120 Slots Remaining</span>
                  </div>
                  <button className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-all">
                    View Rubric & Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 3: FIRST-OFFER WAR ROOM (Offer Evaluation & Bond Sentinel - Image 15)
      ========================================================================= */}
      {activeView === 'warroom' && (
        <div className="flex-1 flex flex-col p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* War Room Header Alert Strip */}
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
                <Shield className="w-5 h-5 text-red-400" />
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
              <div className="px-3 py-1.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-color)]">
                <span className="text-slate-500 block text-[9px]">ACTIVE OFFER FILE</span>
                <span className="text-slate-200 font-medium">TechSolutions Corp (Mass-Recruiter)</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-red-950 text-red-400 border border-red-800 font-bold text-center">
                <span className="text-[9px] block">THREAT LEVEL</span>
                EXTREME
              </div>
            </div>
          </div>

          {/* Split Workspace: Left CTC De-obfuscator (50%) vs Right Service Bond Sentinel (50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 Cols: CTC De-obfuscator */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
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

                {/* 3 Gross vs Real Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[var(--bg-canvas)] font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">STATED GROSS PACKAGE</span>
                    <div className="text-lg font-bold text-white">₹7,00,000 <span className="text-[10px] text-slate-400">PA</span></div>
                    <span className="text-[9px] text-amber-400">Offer Letter Stated CTC</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">NOMINAL MONTHLY</span>
                    <div className="text-lg font-bold text-red-400 line-through">₹58,333 <span className="text-[10px]">/mo</span></div>
                    <span className="text-[9px] text-red-400">The "HR Pitch" Illusion</span>
                  </div>
                  <div className="p-1 rounded bg-emerald-950/30 border border-emerald-800/40">
                    <span className="text-[10px] text-emerald-400 block font-semibold">REAL BANK DEPOSIT</span>
                    <div className="text-lg font-bold text-emerald-400">₹32,000 <span className="text-[10px]">/mo</span></div>
                    <span className="text-[9px] text-emerald-300">Actual Net Liquid Pay</span>
                  </div>
                </div>

                {/* Horizontal Segmented Bar */}
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-medium">True Cost Component Anatomy</span>
                    <span className="text-slate-400">100% of Stated ₹7.0L CTC</span>
                  </div>
                  <div className="h-5 w-full rounded overflow-hidden flex bg-slate-800 font-bold text-[10px] text-black">
                    <div className="bg-emerald-400 h-full flex items-center justify-center w-[54.9%]" title="Fixed Base (₹3,84,000)">
                      54.9%
                    </div>
                    <div className="bg-amber-400 h-full flex items-center justify-center w-[14.3%]" title="Deferred Retention (₹1,00,000)">
                      14.3%
                    </div>
                    <div className="bg-blue-400 h-full flex items-center justify-center w-[10%]" title="Group Health (₹70,000)">
                      10%
                    </div>
                    <div className="bg-purple-400 h-full flex items-center justify-center w-[12.3%]" title="Variable (₹86,000)">
                      12.3%
                    </div>
                    <div className="bg-red-500 h-full flex items-center justify-center w-[8.6%]" title="Training Clawback (₹60,000)">
                      8.6%
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Fixed Base (₹3,84,000)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Deferred Retention (₹1,00,000)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Group Perks (₹70,000)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Speculative Variable (₹86,000)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Training Recovery Trap (₹60,000)</span>
                  </div>
                </div>

                {/* Ledger Table */}
                <div className="overflow-x-auto rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] font-mono text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase">
                      <tr>
                        <th className="p-2">Component Label</th>
                        <th className="p-2">Stated Value</th>
                        <th className="p-2">Real Liquidity Status</th>
                        <th className="p-2 text-right">Year 1 In-Pocket</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      <tr>
                        <td className="p-2 text-white font-medium">Guaranteed Base Pay</td>
                        <td className="p-2 text-slate-300">₹3,84,000</td>
                        <td className="p-2"><span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400">100% LIQUID</span></td>
                        <td className="p-2 text-right text-emerald-400 font-bold">₹3,84,000</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-white font-medium">Retention Bonus (Lock-in)</td>
                        <td className="p-2 text-slate-300">₹1,00,000</td>
                        <td className="p-2"><span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-400">END OF Y2 ONLY</span></td>
                        <td className="p-2 text-right text-slate-500">₹0</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-white font-medium">Group Health & Gratuity</td>
                        <td className="p-2 text-slate-300">₹70,000</td>
                        <td className="p-2"><span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">NON-CASH BENEFIT</span></td>
                        <td className="p-2 text-right text-slate-500">₹0</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-white font-medium">Speculative Performance Bonus</td>
                        <td className="p-2 text-slate-300">₹86,000</td>
                        <td className="p-2"><span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">HISTORIC 0-35% PAY</span></td>
                        <td className="p-2 text-right text-amber-400">~₹25,000</td>
                      </tr>
                      <tr className="bg-red-950/20">
                        <td className="p-2 text-red-400 font-bold">Training Cost Amortization</td>
                        <td className="p-2 text-red-400">₹60,000</td>
                        <td className="p-2"><span className="px-1.5 py-0.2 rounded bg-red-950 text-red-400 font-bold">PHANTOM DEDUCTION</span></td>
                        <td className="p-2 text-right text-red-400 font-bold">-₹60,000 (Trap)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Service Bond Sentinel & Defense Scripts */}
            <div className="lg:col-span-6 space-y-4">
              {/* Crimson Alert Card */}
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

                <div className="p-3 rounded bg-[var(--bg-canvas)] border border-red-500/30 text-xs font-mono text-slate-300 italic leading-relaxed">
                  "Candidate hereby covenants to serve the Company for a minimum, non-negotiable period of <strong className="text-red-400">twenty-four (24) continuous months</strong>. In event of premature separation for any cause, Employee shall instantly forfeit all pending bonus accumulations, remit liquidated damages of <strong className="text-red-400">INR 2,00,000/-</strong>, and must deposit <strong className="text-red-400">Original College Marksheets and Degree Certificate</strong> with the HR Registry as pre-condition of induction."
                </div>

                {/* Indian Statutory Armor */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Indian Legal Armor • Statutory Precedent
                  </span>

                  <div className="p-2.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
                    <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      Indian Contract Act, 1872 • Section 27
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Agreements in restraint of lawful profession, trade, or business are <em>void ab initio</em>. Employers cannot force servitude or penalize an individual merely for exercising career mobility.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-1">
                    <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      UGC / AICTE Directive on Certificate Retention
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      It is completely <strong>illegal</strong> for any corporate entity or employer to impound original educational credentials. Companies may only inspect originals for digital authentication and must return them immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Battle-Tested Counter Templates */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                      Tactical Armor // Defense Scripts
                    </span>
                    <h3 className="text-sm font-bold text-white">Battle-Tested Counter Templates</h3>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    Tone: Ultra-Professional & Defensible
                  </span>
                </div>

                {/* Tab buttons */}
                <div className="flex gap-1 bg-[var(--bg-canvas)] p-1 rounded font-mono text-[11px] overflow-x-auto">
                  <button
                    onClick={() => setActiveScriptTab(1)}
                    className={`px-2.5 py-1 rounded transition-all whitespace-nowrap ${
                      activeScriptTab === 1
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    01. Bond Clarification
                  </button>
                  <button
                    onClick={() => setActiveScriptTab(2)}
                    className={`px-2.5 py-1 rounded transition-all whitespace-nowrap ${
                      activeScriptTab === 2
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    02. Certificate Surrender Refusal
                  </button>
                  <button
                    onClick={() => setActiveScriptTab(3)}
                    className={`px-2.5 py-1 rounded transition-all whitespace-nowrap ${
                      activeScriptTab === 3
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    03. Variable-to-Base Counter
                  </button>
                </div>

                {/* Script Display */}
                {scripts[activeScriptTab as keyof typeof scripts] && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{scripts[activeScriptTab as keyof typeof scripts].channel}</span>
                      <span className="text-emerald-400 font-bold">{scripts[activeScriptTab as keyof typeof scripts].leverage}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                      <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {scripts[activeScriptTab as keyof typeof scripts].body}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400 font-sans">
                        {scripts[activeScriptTab as keyof typeof scripts].note}
                      </span>
                      <button
                        onClick={() =>
                          handleCopyScript(
                            activeScriptTab,
                            scripts[activeScriptTab as keyof typeof scripts].body
                          )
                        }
                        className={`px-3 py-1.5 rounded font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          copiedScriptId === activeScriptTab
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {copiedScriptId === activeScriptTab ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Script to Clipboard</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 4: FRESHER MATCHES & CONCEPT BRIDGE (Image 17)
      ========================================================================= */}
      {activeView === 'freshermatches' && (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Sub-header Filter Strip */}
          <div className="h-11 px-6 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold">2025 Batch</span>
              <span className="text-slate-400">2026 Batch</span>
              <span className="text-slate-400">2027 (Intern Track)</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-semibold">0 YOE • Fresher Verified</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Floor: ≥ ₹8,00,000 Base</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span>Sort: <strong className="text-white">Concept Bridge Parity (Desc)</strong></span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-400 font-bold">Bridge Engine v3.1</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-6.25rem)]">
            {/* Left Queue (4 cols) */}
            <aside className="lg:col-span-4 p-4 border-r border-[var(--border-color)] bg-[var(--bg-surface)]/40 space-y-3 overflow-y-auto">
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 uppercase px-1">
                <span>Direct Campus Off-Season Queue (18)</span>
                <span className="text-emerald-400 font-bold">Live Sync: 100%</span>
              </div>

              {/* Match 1: Razorpay */}
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-blue-600/20 text-blue-400 font-mono font-bold flex items-center justify-center text-xs">
                      R
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        Razorpay <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="text-[11px] text-slate-400">Platform Infrastructure</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-500/10 text-blue-400">
                    94% Fit
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 rounded bg-[var(--bg-canvas)] font-mono text-[10px]">
                  <div>Fixed Base CTC: <strong className="text-white block">₹14,00,000</strong></div>
                  <div>Joining Bonus: <strong className="text-emerald-400 block">₹2,00,000</strong></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>2025 Batch • 0 YOE</span>
                  <span className="text-emerald-400 font-semibold">Ghost Risk: 2%</span>
                </div>
                <div className="p-1.5 rounded bg-blue-950/40 border border-blue-800/40 text-[10px] font-mono text-blue-300 flex justify-between">
                  <span>Bridge: Redis PubSub → Kafka</span>
                  <span className="font-bold">92/100 Parity</span>
                </div>
              </div>

              {/* Match 2: Juspay */}
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-purple-600/20 text-purple-400 font-mono font-bold flex items-center justify-center text-xs">
                      J
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Juspay Technologies</div>
                      <div className="text-[11px] text-slate-400">SDE-1 — High-Throughput Payments</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-800 text-slate-300">
                    89% Fit
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 rounded bg-[var(--bg-canvas)] font-mono text-[10px]">
                  <div>Fixed Base CTC: <strong className="text-white block">₹16,00,000</strong></div>
                  <div>Stack: <strong className="text-purple-300 block">Haskell / Rust / FP</strong></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>2025/2026 Batch</span>
                  <span className="text-emerald-400 font-semibold">Ghost Risk: 4%</span>
                </div>
              </div>
            </aside>

            {/* Right Tactical Workspace (8 cols) */}
            <main className="lg:col-span-8 p-6 space-y-6 overflow-y-auto">
              {/* Requisition Banner */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold uppercase">
                      Direct Off-Season Drive
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Active Requisition • 12 Slots Open
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Drive ID: RZP-2025-INFRA-04</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Associate Software Engineer — Platform Infrastructure</h1>
                    <div className="text-xs font-mono text-slate-400 mt-1">
                      Razorpay Software • Bangalore (Hybrid: 3 Days Office) • Tier-1/Tier-2/Tier-3 Open
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-800 text-center font-mono">
                    <div className="text-xl font-bold text-white">92</div>
                    <div className="text-[9px] text-emerald-400 uppercase font-semibold">Empowered Match</div>
                  </div>
                </div>
              </div>

              {/* THE CONCEPT BRIDGE */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <div>
                      <h2 className="text-sm font-bold text-white">The Concept Bridge™</h2>
                      <span className="text-[10px] font-mono text-slate-400">Micro-translation for missing production technologies</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                    Zero Disqualification Flag
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-blue-500/20 text-xs font-sans text-slate-300">
                  <strong className="text-white block mb-1">Missing Apache Kafka? You Already Built the Core Primitives in College.</strong>
                  Fresher candidates are routinely filtered out because job posts list enterprise infrastructure. Our telemetry cross-examines your academic code repos against enterprise architectures:
                </div>

                {/* Comparative Concept Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>CANDIDATE GITHUB REPO</span>
                      <span className="text-emerald-400 font-semibold">Verified Academic Project</span>
                    </div>
                    <div className="text-white font-semibold">In-Memory Redis Pub/Sub & Go Worker Pool</div>
                    <div className="space-y-1 text-[11px] text-slate-300">
                      <div>✓ Consumer Offset Tracking via Redis Hash sets</div>
                      <div>✓ Worker Pool Backpressure using Go Channels</div>
                      <div>✓ At-Least-Once Delivery acknowledgment loop</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>RAZORPAY REQUISITION STACK</span>
                      <span className="text-blue-400 font-semibold">Enterprise Mandate</span>
                    </div>
                    <div className="text-white font-semibold">Apache Kafka Partitioned Message Cluster</div>
                    <div className="space-y-1 text-[11px] text-slate-300">
                      <div>⇄ Partition offsets = identical to Redis indices</div>
                      <div>⇄ Consumer Groups = scaling your Go worker routine</div>
                      <div>⇄ Disk Persistence = appended commit log mechanics</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded bg-blue-950/40 border border-blue-800/40 font-mono text-xs text-blue-200">
                  <div className="flex justify-between font-bold text-emerald-400 mb-1">
                    <span>91% Conceptual Parity • Zero Architectural Deficit</span>
                    <span>Estimated Ramp: 3.5 Hours</span>
                  </div>
                  <p className="text-[11px] font-sans text-slate-300">
                    Your university repository already solved multi-threaded consumer offset management and message retry backoff. Enterprise Kafka is simply your exact Go architecture backed by persistent disk-segmented commit logs. In the interview loop, you can authoritatively defend this architectural equivalence!
                  </p>
                </div>
              </div>

              {/* Round Map & Interview Telemetry */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 font-mono">
                <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-2 text-xs">
                  <span className="font-semibold text-white uppercase">Round Map & Real Interview Telemetry</span>
                  <span className="text-slate-400">Avg Turnaround: 9 Calendar Days</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-[var(--bg-canvas)] space-y-1">
                    <span className="text-blue-400 font-bold block">R1: OA Online (90m)</span>
                    <span className="text-[11px] text-slate-300 block font-sans">2 Graph/DP questions + 1 SQL window query.</span>
                    <span className="text-[10px] text-emerald-400 font-bold block pt-1">Pass Bar: 2.5 / 3</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--bg-canvas)] space-y-1">
                    <span className="text-blue-400 font-bold block">R2: DSA & OS Core (60m)</span>
                    <span className="text-[11px] text-slate-300 block font-sans">Live coding CoderPad. Virtual Memory, Deadlocks.</span>
                    <span className="text-[10px] text-emerald-400 font-bold block pt-1">Parity: High (94%)</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--bg-canvas)] space-y-1">
                    <span className="text-blue-400 font-bold block">R3: Deep-Dive Loop (60m)</span>
                    <span className="text-[11px] text-slate-300 block font-sans">Architecture defense + Concept Bridge tradeoffs.</span>
                    <span className="text-[10px] text-blue-400 font-bold block pt-1">Defend with Concept Bridge!</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--bg-canvas)] space-y-1">
                    <span className="text-blue-400 font-bold block">R4: Director Loop (45m)</span>
                    <span className="text-[11px] text-slate-300 block font-sans">Culture fit, ownership, compensation handshake.</span>
                    <span className="text-[10px] text-emerald-400 font-bold block pt-1">Mutual Selection Mindset</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: FRESH RADAR & GHOST JOB INSPECTOR
      ========================================================================= */}
      {activeView === 'radar' && (
        <div className="flex-1 flex flex-col min-w-0 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Status Telemetry Strip */}
          <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                TELEMETRY LINK: STABLE
              </span>
              <span className="text-slate-300">
                Batch Target:{' '}
                <button 
                  onClick={() => setRadarBatch(b => b === '2025' ? '2026' : '2025')}
                  className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700 font-bold hover:bg-blue-800"
                >
                  {radarBatch} Grad ⇄
                </button>
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
            {/* KPI 1: Readiness */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-emerald-400">High Parity</span>
                <span onClick={() => setActiveView('freshermatches')} className="text-blue-400 cursor-pointer hover:underline">Deep Audit →</span>
              </div>
            </div>

            {/* KPI 2: Off-Campus Pipeline */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-amber-400">Razorpay closes 14h</span>
                <span onClick={() => setActiveView('matches')} className="text-blue-400 cursor-pointer hover:underline">View Queue ↓</span>
              </div>
            </div>

            {/* KPI 3: Compensation Floor */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span>Benchmarked: 820 offers</span>
                <span onClick={() => setActiveView('warroom')} className="text-blue-400 cursor-pointer hover:underline">De-obfuscate →</span>
              </div>
            </div>

            {/* KPI 4: Proof of Work */}
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
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
              <div className="p-2 rounded bg-[var(--bg-canvas)] text-[10px] font-mono space-y-1 my-2">
                <div className="text-emerald-400 font-semibold">Raft Consensus Core</div>
                <div className="flex gap-1 text-[9px] text-slate-300">
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded">22k RPS</span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded">p99 18ms</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-emerald-400">Production Grade</span>
                <span onClick={() => setActiveView('editor')} className="text-blue-400 cursor-pointer hover:underline">Inject in CV →</span>
              </div>
            </div>
          </div>

          {/* Ghost Risk Inspector Box */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                48-Hour Fresh Ghost Risk Quarantine
              </span>
              <span className="text-[10px] text-slate-400">Bayesian Reposting Heuristic v2.4</span>
            </div>
            <p className="text-slate-300 text-xs font-sans">
              BestOpp automatically quarantined 2 requisitions this cycle. Roles reposted &gt;4x in 60 days with 0 engineer hires are flagged so you don't waste energy on evergreen corporate shell listings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {[
                { company: 'Enterprise Corp', title: 'Principal Architect — Core Java', risk: 84, telemetry: 'Reposted 6x in 90d • 0 hires', id: 'SH-01' },
                { company: 'TransGlobal Cloud', title: 'Staff Distributed Systems Architect', risk: 76, telemetry: 'Reposted 4x in 60d • Blackhole', id: 'SH-02' }
              ].map(shell => (
                <div key={shell.id} className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{shell.title}</div>
                    <div className="text-[11px] text-slate-400">{shell.company} • {shell.telemetry}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-red-400 font-bold">{shell.risk}% Ghost Risk</span>
                    {reportedShells.includes(shell.id) ? (
                      <div className="text-emerald-400 text-[10px]">Quarantined ✓</div>
                    ) : (
                      <button 
                        onClick={() => setReportedShells(prev => [...prev, shell.id])}
                        className="block text-[10px] text-amber-400 hover:underline mt-1"
                      >
                        Confirm Delist
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: MONACO 3-PANE LATEX RESUME STUDIO & PAGE BUDGET RULER
      ========================================================================= */}
      {activeView === 'editor' && (
        <div className="flex-1 flex flex-col min-w-0 p-6 space-y-4 max-w-7xl mx-auto w-full">
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border-color)] gap-3 font-mono text-xs">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-blue-400" />
                Monaco + Tectonic LaTeX Resume Studio
              </h2>
              <p className="text-slate-400 text-[11px]">
                Deterministic WASM Subprocess Compilation • 1-Page Strict Page Budget Ruler
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsTectonicCompiling(true);
                  setTimeout(() => {
                    setIsTectonicCompiling(false);
                    setEditorCompileSuccess(true);
                  }, 600);
                }}
                disabled={isTectonicCompiling}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 transition-colors"
              >
                {isTectonicCompiling ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Compiling via Tectonic...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Compile with Tectonic (238ms)
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(latexSource);
                  alert('LaTeX source copied to clipboard!');
                }}
                className="px-3 py-1.5 rounded bg-[var(--bg-surface)] hover:bg-slate-800 border border-[var(--border-color)] text-slate-200 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Source
              </button>
            </div>
          </div>

          {/* Page Budget Ruler */}
          <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-xs space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span>PAGE BUDGET RULER:</span>
                <strong className={pageBudget <= 100 ? 'text-emerald-400' : 'text-red-400'}>
                  {pageBudget}% of 1 Page Used
                </strong>
              </span>
              <span className="text-[11px] text-slate-400">
                {pageBudget <= 100 ? 'Strict 1-Page Fit Guaranteed (0 Spillover)' : 'Warning: Content spills to Page 2!'}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${pageBudget <= 100 ? 'bg-emerald-400' : 'bg-red-500'}`}
                style={{ width: `${Math.min(pageBudget, 100)}%` }}
              />
            </div>
          </div>

          {/* 3-Pane Editor Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[560px]">
            {/* Left Rail: Section Navigator & ATS Extract */}
            <div className="lg:col-span-3 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Resume Sections</span>
                <div className="space-y-1">
                  {['Contact Information', 'Technical Core & Primitives', 'Distributed KV Project', 'Education & Marksheets'].map((sec, i) => (
                    <div key={sec} className={`p-2 rounded cursor-pointer ${i === 2 ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' : 'text-slate-400 hover:text-white'}`}>
                      {sec}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold">
                  <span>ATS Keyword Match</span>
                  <span className="text-emerald-400">96% Density</span>
                </div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {['Kafka Outbox', 'Raft Consensus', 'Go Channels', 'p99 18ms SLA', 'WAL Logging', 'Docker'].map(kw => (
                    <span key={kw} className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Pane: LaTeX Editor */}
            <div className="lg:col-span-5 flex flex-col rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden">
              <div className="px-3 py-2 bg-slate-900 border-b border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>resume_bestopp.tex</span>
                <span className="text-emerald-400">UTF-8 • TeX</span>
              </div>
              <textarea
                value={latexSource}
                onChange={(e) => {
                  setLatexSource(e.target.value);
                  setPageBudget(Math.min(110, Math.max(70, Math.round(e.target.value.length / 18))));
                }}
                className="flex-1 p-4 bg-slate-950 text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                rows={22}
              />
            </div>

            {/* Right Pane: PDF Preview Sheet */}
            <div className="lg:col-span-4 p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs font-mono">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  Live Compiled PDF Preview
                </span>
                <span className="text-[10px] text-emerald-400">100% Vector PDF</span>
              </div>

              {/* Rendered Resume Paper Simulation */}
              <div className="my-3 p-5 bg-white text-slate-900 rounded shadow-lg text-[10px] font-serif space-y-2 overflow-y-auto max-h-[460px]">
                <div className="text-center border-b pb-2 border-slate-300">
                  <h1 className="text-base font-bold tracking-wider font-sans">ARJUN M.</h1>
                  <p className="text-[9px] text-slate-600 font-mono">+91 98765 43210 • arjun.systems@bestopp.dev • github.com/bestopp</p>
                </div>
                <div>
                  <h2 className="font-bold text-[10px] uppercase tracking-wide border-b border-slate-200 pb-0.5">Technical Core & Distributed Primitives</h2>
                  <p className="text-[9px] pt-1"><strong>Languages:</strong> Go, C++20, Rust, Python, SQL</p>
                  <p className="text-[9px]"><strong>Distributed Systems:</strong> Kafka (Commit Log Parity), Redis Pub/Sub, Raft Consensus, Docker, K8s</p>
                </div>
                <div>
                  <h2 className="font-bold text-[10px] uppercase tracking-wide border-b border-slate-200 pb-0.5">Production Projects & Systems Engineering</h2>
                  <div className="flex justify-between font-bold text-[9px] pt-1">
                    <span>Distributed Key-Value Storage Engine</span>
                    <span>2024</span>
                  </div>
                  <ul className="list-disc list-inside text-[8.5px] space-y-0.5 pt-0.5 text-slate-800">
                    <li>Architected linearizable Raft consensus algorithm handling 22,000 peak RPS with p99 sub-18ms SLA.</li>
                    <li>Implemented Write-Ahead Log (WAL) reducing crash recovery time by 64%.</li>
                    <li>[Skill Bridge]: Enforced transactional outbox patterns providing equivalent persistence to Temporal.io workflows.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px]">Compiled in 238ms</span>
                <button 
                  onClick={() => alert('PDF export ready: bestopp_arjun_systems.pdf downloaded')}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 5-STAGE KANBAN APPLICATIONS CRM
      ========================================================================= */}
      {activeView === 'apps' && (
        <div className="flex-1 flex flex-col min-w-0 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border-color)] gap-3 font-mono text-xs">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                5-Stage High-Velocity Applications CRM
              </h2>
              <p className="text-slate-400 text-[11px]">
                Deterministic Pipeline Tracking • Zero Blackhole Ingestion • Inbound Referral Anchor
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveView('hud')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" /> Launch Pre-Flight HUD
              </button>
            </div>
          </div>

          {/* Kanban Board Columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              {
                stage: 'Saved (2)',
                color: 'border-slate-700',
                items: [
                  { comp: 'Google Cloud', role: 'Systems Engineer', tag: 'Direct Pipeline', signal: '92%' },
                  { comp: 'Stripe', role: 'Infra Core Engineer', tag: 'Inbound Match', signal: '89%' },
                ]
              },
              {
                stage: 'Tailored (1)',
                color: 'border-blue-700',
                items: [
                  { comp: 'Postman', role: 'Lead Backend Engineer', tag: '1-Page LaTeX Ready', signal: '94%' },
                ]
              },
              {
                stage: 'Applied (1)',
                color: 'border-amber-700',
                items: [
                  { comp: 'CRED', role: 'Platform Engineer (Vault)', tag: 'Direct EM Review', signal: '91%' },
                ]
              },
              {
                stage: 'Interviewing (1)',
                color: 'border-purple-700',
                items: [
                  { comp: 'Razorpay', role: 'Sr Distributed Systems', tag: 'R3: Deep-Dive Loop', signal: '96%' },
                ]
              },
              {
                stage: 'Offered (1)',
                color: 'border-emerald-700',
                items: [
                  { comp: 'Zeta Tech', role: 'Core Banking Engineer', tag: '₹18L Fixed Base', signal: '100%' },
                ]
              },
            ].map(col => (
              <div key={col.stage} className={`p-3 rounded-xl bg-[var(--bg-surface)] border ${col.color} space-y-3 font-mono text-xs`}>
                <div className="font-bold text-white uppercase text-[11px] pb-1 border-b border-[var(--border-subtle)]">
                  {col.stage}
                </div>
                <div className="space-y-2">
                  {col.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-white text-xs">{item.comp}</span>
                        <span className="text-[10px] text-blue-400 font-bold">{item.signal}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-sans">{item.role}</div>
                      <div className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 inline-block">
                        {item.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Referral Pitch Generator */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-2">
              <span className="font-bold text-white uppercase flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-blue-400" />
                Inbound 1st-Degree Technical Referral Pitch Generator
              </span>
              <button
                onClick={() => {
                  const pitchText = `Hi [Engineering Leader],\n\nI came across the opening for Senior Distributed Systems Engineer — Platform Core at Razorpay.\n\nMy background centers on high-throughput backend infrastructure, having recently architected a distributed key-value store benchmarked at 22,000 peak RPS with Raft consensus and sub-18ms SLA.\n\nI noticed your mandate emphasizes Kafka-based settlement outboxes — my production experience with concurrent write-ahead logging translates directly to your scale.\n\nWould you be open to a 10-minute technical exchange this week?`;
                  navigator.clipboard.writeText(pitchText);
                  setCopiedPitchId('pitch-1');
                  setTimeout(() => setCopiedPitchId(null), 2000);
                }}
                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
              >
                {copiedPitchId === 'pitch-1' ? 'Copied to Clipboard! ✓' : 'Copy Pitch Template'}
              </button>
            </div>
            <div className="p-3 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-slate-300 font-sans text-xs leading-relaxed">
              "Hi [Engineering Leader], I came across the opening for Senior Distributed Systems Engineer at Razorpay. My background centers on high-throughput backend infrastructure, having recently architected a distributed key-value store benchmarked at 22,000 peak RPS with Raft consensus and sub-18ms SLA. I noticed your mandate emphasizes Kafka-based settlement outboxes — my production experience with concurrent write-ahead logging translates directly to your scale. Would you be open to a 10-minute technical exchange this week?"
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: PINNED PRE-FLIGHT WEBCAM HUD
      ========================================================================= */}
      {activeView === 'hud' && (
        <div className="flex-1 flex flex-col min-w-0 p-6 space-y-6 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 font-mono text-xs">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                Pinned Pre-Flight Interview HUD & Telemetry Check
              </h2>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Zero-Friction Audio/Visual Diagnostic • Live STAR Answer Architecture Dock
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> HUD READY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Webcam Simulator */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-video rounded-xl bg-slate-950 border-2 border-dashed border-[var(--border-color)] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                {hudCameraActive ? (
                  <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-400/80 flex items-center justify-center bg-slate-800 text-white font-mono text-2xl font-bold">
                      YOU
                    </div>
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      1080p @ 60 FPS • 0 dropped frames
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur px-3 py-2 rounded text-xs font-mono text-slate-300 flex items-center justify-between">
                      <span>Audio Input: HyperX QuadCast (OK)</span>
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
                      onClick={() => setHudCameraActive(true)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                      <Play className="w-3.5 h-3.5" /> Start Video Stream Diagnostic
                    </button>
                  </div>
                )}
              </div>

              {/* Diagnostics Meter */}
              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <div className="text-[10px] text-slate-400">AUDIO INPUT LEVEL</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">{hudAudioLevel}% Optimum</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${hudAudioLevel}%` }} />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <div className="text-[10px] text-slate-400">NETWORK RTT PING</div>
                  <div className="text-sm font-bold text-white mt-1">14ms Low Jitter</div>
                  <div className="text-[10px] text-emerald-400 mt-2">Zero Packet Loss</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)]">
                  <div className="text-[10px] text-slate-400">WEBRTC FIREWALL</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">STUN / TURN OK</div>
                  <div className="text-[10px] text-slate-400 mt-2">P2P Ready</div>
                </div>
              </div>
            </div>

            {/* Right: STAR Answer Dock */}
            <div className="lg:col-span-5 space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <h3 className="font-bold text-white uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" /> STAR Answer Architecture Dock
                  </h3>
                  <span className="text-[10px] text-slate-400">Pinned Pre-Flight</span>
                </div>

                <div className="space-y-2 text-xs font-sans">
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
      )}

      {/* =========================================================================
          SCREEN 5: ADMIN CONTROL TERMINAL (SEC-HUD v3.4 - Image 11)
      ========================================================================= */}
      {activeView === 'admin' && (
        <div className="flex-1 flex flex-col p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* SEC-HUD Header */}
          <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                SEC-HUD v3.4
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Environment: <strong className="text-white">Production Cluster</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">Scrapers Healthy (99.8%)</span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--bg-canvas)] border border-[var(--border-color)]">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300">{currentTimeUTC}</span>
                <span className="text-slate-600">|</span>
                <span className="text-blue-400 font-bold">12.4k req/m</span>
              </div>
            </div>
          </div>

          {/* 4 Telemetry KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE VERIFIED REQUISITIONS</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">4,821 <span className="text-xs text-emerald-400 font-normal">+142 today</span></div>
              <div className="text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-[var(--border-subtle)] flex justify-between">
                <span className="text-emerald-400">98.4% fresh &lt; 48h</span>
                <span>Tier-1 India / US Remote</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">GHOST JOBS PURGED (24H)</span>
              <div className="text-2xl font-bold font-mono text-red-400 mt-1">312 <span className="text-xs text-red-300 font-normal">listings blocked</span></div>
              <div className="text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-[var(--border-subtle)] flex justify-between">
                <span>Filter Accuracy: <strong className="text-emerald-400">99.4%</strong></span>
                <span>Auto-quarantine</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">TECTONIC PDF COMPILES</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">18,490 <span className="text-xs text-slate-400 font-normal">builds today</span></div>
              <div className="text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-[var(--border-subtle)] flex justify-between">
                <span>Avg Latency: <strong className="text-emerald-400">142ms</strong></span>
                <span>WASM Sandbox</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">CANDIDATE PAY LIFT</span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">₹4.82 Cr <span className="text-xs text-emerald-400 font-normal">+34.8% avg</span></div>
              <div className="text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-[var(--border-subtle)] flex justify-between">
                <span>War Room Closed: <strong>189 offers</strong></span>
                <span>Q3 Cumulative</span>
              </div>
            </div>
          </div>

          {/* Middle Split: Ghost Job Classifier Review Queue (60%) vs Scraper Workers (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Ghost Job Review Queue */}
            <div className="lg:col-span-7 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Ghost Job Classifier Review Queue
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
                    {adminQueueItems.length} Flagged
                  </span>
                </div>
                <button
                  onClick={() => setAdminQueueItems([])}
                  className="px-2 py-1 text-[11px] font-mono rounded bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 transition-all"
                >
                  Purge All ({adminQueueItems.length})
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {adminQueueItems.length === 0 ? (
                  <div className="p-8 text-center font-mono text-xs text-slate-500">
                    Queue clear. All suspected ghost jobs purged and quarantined.
                  </div>
                ) : (
                  adminQueueItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded bg-red-950/60 border border-red-800/60 flex items-center justify-center font-mono font-bold text-xs text-red-400">
                            {item.monogram}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">{item.company}</span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-red-950 text-red-300 border border-red-800 uppercase">
                                {item.tag}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">ID: #{item.id}</span>
                            </div>
                            <div className="text-xs text-slate-300 font-medium">{item.title}</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-red-950 text-red-400 border border-red-700">
                          {item.risk}% GHOST RISK
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 p-2 rounded bg-slate-900 font-mono text-[10px]">
                        <div>
                          <span className="text-slate-500 block">SOURCE</span>
                          <span className="text-slate-300 font-medium">{item.source}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">REPOST TELEMETRY</span>
                          <span className="text-red-400 font-medium">{item.telemetry}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">OUTCOME</span>
                          <span className="text-slate-300">{item.outcome}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-mono text-slate-500">
                          Signal: {item.recruiterSignal} • Neural Crawler
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <button
                            onClick={() => handlePurgeItem(item.id)}
                            className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handlePurgeItem(item.id)}
                            className="px-2 py-1 rounded bg-red-600/30 text-red-300 hover:bg-red-600/50 border border-red-500/50 font-bold"
                          >
                            Hard Purge & Delist
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right 5 Cols: Scraper Workers & Live Feed */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="font-semibold text-white uppercase tracking-wider">
                    Scraper Pipeline Workers
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    4/4 Operational
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Greenhouse Ingest API
                    </span>
                    <span className="text-slate-400">64 req/s • Active</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Lever Direct Feed
                    </span>
                    <span className="text-slate-400">38 req/s • Active</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      LinkedIn Ingest Worker
                    </span>
                    <span className="text-amber-400">Throttled (12 RPS)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Career Portal Scraper
                    </span>
                    <span className="text-slate-400">22 RPS • Healthy</span>
                  </div>
                </div>

                <button className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                  <span>+ Add Verified Requisition Manually</span>
                </button>
              </div>

              {/* Tectonic WASM Compiler Status Drawer */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="font-semibold text-white uppercase tracking-wider">
                    Tectonic LaTeX Engine Status
                  </span>
                  <span className="text-emerald-400 font-bold">P50: 110ms</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>P99 Latency:</span>
                    <span className="text-emerald-400 font-bold">185ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compile Failures:</span>
                    <span className="text-emerald-400 font-bold">0 (0.00%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WASM Sandbox Memory:</span>
                    <span className="text-white">18.4MB / 64MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL FOOTER TELEMETRY
      ========================================================================= */}
      <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] py-3 px-6 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">BestOpp</span>
          <span className="text-slate-600">/</span>
          <span>Best Opportunities Engine v2.8-beta</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Real-Time Feeds Synced
          </span>
          <span>Latency: 28ms</span>
          <span>© 2026 Best Opportunities. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

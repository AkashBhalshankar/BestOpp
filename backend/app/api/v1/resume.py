"""API v1 Endpoints for Resume Studio & Asynchronous Tectonic LaTeX Compilation."""

from typing import Any, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_async_session
from app.models.profile import CandidateProfile
from app.models.requisition import Requisition
from app.schemas.resume import (
    ResumeTailorRequest,
    TectonicCompileRequest,
    TectonicCompileResponse,
)
from app.services.skill_bridge import SkillBridgeService
from app.services.tectonic_service import TectonicService

router = APIRouter()

STANDARD_LATEX_TEMPLATE = r"""\documentclass[letterpaper,10pt]{article}
\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge \scshape {{ CANDIDATE_NAME }}} \\ \vspace{2pt}
    \small {{ PHONE }} $|$ \href{mailto:{{ EMAIL }}}{\underline{{{ EMAIL }}}} $|$ 
    \href{{{ GITHUB }}}{\underline{github.com/profile}} $|$
    \href{{{ LINKEDIN }}}{\underline{linkedin.com/in/profile}}
\end{center}

%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {{{ UNIVERSITY }}}{Bangalore, India}
      {Bachelor of Technology in Computer Science and Engineering; CGPA: {{ CGPA }}}{2021 -- 2025}
  \resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\section{Technical Core \& Distributed Primitives}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages}{: Go, C++20, Rust, Python, SQL, Bash} \\
     \textbf{Distributed Systems}{: Kafka (Commit Log Parity), Redis Pub/Sub, Raft Consensus, gRPC, Docker, K8s} \\
     \textbf{Core Systems}{: High-concurrency worker pools, B+ Trees, WAL, Linux POSIX threads}
    }}
 \end{itemize}

%-----------EXPERIENCE & PROJECTS-----------
\section{Technical Projects \& Production Work}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Distributed Key-Value Storage Engine}{Go, Raft, gRPC}
      {Core Systems Engineer}{2024}
      \resumeItemListStart
        \resumeItem{Architected linearizable Raft consensus algorithm handling 22,000 peak RPS with p99 sub-18ms SLA.}
        \resumeItem{Implemented Write-Ahead Log (WAL) and memory compaction routines reducing crash-recovery time by 64\%.}
        \resumeItem{{{ SKILL_BRIDGE_BULLET }}}
      \resumeItemListEnd

  \resumeSubHeadingListEnd

\end{document}
"""


@router.post("/compile", response_model=TectonicCompileResponse)
async def compile_resume_pdf(
    payload: TectonicCompileRequest,
) -> TectonicCompileResponse:
    """Compiles LaTeX source code via asynchronous tectonic execution with 1-page budget enforcement."""
    response = await TectonicService.compile_latex(
        latex_source=payload.latex_source,
        job_identifier=payload.job_identifier,
        timeout_seconds=payload.timeout_seconds,
    )
    return response


@router.post("/tailor", response_model=Dict[str, Any])
async def tailor_resume(
    payload: ResumeTailorRequest,
    db: AsyncSession = Depends(get_async_session),
) -> Dict[str, Any]:
    """Generates a tailored 1-page LaTeX source integrating Skill Bridge points for the target requisition."""
    # Fetch profile
    profile_res = await db.execute(
        select(CandidateProfile).where(CandidateProfile.id == payload.profile_id)
    )
    profile = profile_res.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found.")

    # Fetch requisition
    req_res = await db.execute(
        select(Requisition).where(Requisition.id == payload.requisition_id)
    )
    req = req_res.scalar_one_or_none()
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Requisition not found.")

    # Compute bridge bullet
    candidate_skills = [
        s.get("name", "") for s in profile.skills_inventory if isinstance(s, dict)
    ]
    missing_skill = "Temporal.io" if "temporal" in req.job_title.lower() or "platform" in req.department_or_domain.lower() else "Apache Kafka"
    bridge_payload = SkillBridgeService.bridge_candidate_gap(candidate_skills, missing_skill)

    bridge_bullet = (
        f"Leveraged transactional outbox patterns providing equivalent state machine persistence to {missing_skill} activity executions."
        if bridge_payload
        else "Engineered high-concurrency event-driven pipeline adhering strictly to distributed saga idempotency."
    )

    latex_code = (
        STANDARD_LATEX_TEMPLATE
        .replace("{{ CANDIDATE_NAME }}", "Arjun M.")
        .replace("{{ PHONE }}", "+91 98765 43210")
        .replace("{{ EMAIL }}", "arjun.systems@bestopp.dev")
        .replace("{{ GITHUB }}", profile.github_url or "https://github.com/bestopp")
        .replace("{{ LINKEDIN }}", profile.linkedin_url or "https://linkedin.com")
        .replace("{{ UNIVERSITY }}", "National Institute of Technology")
        .replace("{{ CGPA }}", "8.9 / 10.0")
        .replace("{{ SKILL_BRIDGE_BULLET }}", bridge_bullet)
    )

    return {
        "tailored_latex_source": latex_code,
        "target_requisition": req.job_title,
        "company": req.company_name,
        "skill_bridge_bullet_included": bridge_bullet,
        "target_page_budget": payload.target_page_budget,
    }

# BestOpp (Best Opportunities)

> High-Leverage Engineering Career Platform with Bi-Directional Parity, Ghost Job Classification, Compensation De-Obfuscation, and The Candidate-First Skill Bridge™.

---

## 🏛️ System Philosophy
1. **Exact Brand Casing:** BestOpp (Sub-tagline: *Best Opportunities*).
2. **Dual-Theme Design System:**
   - **Default Theme (Midnight Cobalt):** Canvas `#0A0D12`, Panels `#12161F`, Borders `#1F242F`, Primary Accent `#3B82F6`, Emerald `#10B981`, Amber `#F59E0B`, Crimson `#EF4444`.
   - **Alternate Theme (Earthy Tone):** Canvas `#1A1F16`, Panels `#242B1F`, Borders `#2E3827`, Sage Accent `#84A98C`.
3. **Candidate-First Paradigm:** Candidates are assets. We NEVER label candidates as "unqualified"; we bridge skill gaps via **The Skill Bridge™** module.

---

## 🚀 Monorepo Architecture

```text
bestopp/
├── backend/          # FastAPI (Python 3.11+, SQLAlchemy asyncpg, Pydantic v2, Celery, Redis)
└── frontend/         # Next.js 14 App Router, Tailwind CSS, Lucide
```

### Running Locally with Docker Compose
```bash
docker-compose up --build
```

### Running Backend Manually
```bash
cd backend
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload --port 8000
```

### Running Frontend Manually
```bash
cd frontend
npm install
npm run dev
```

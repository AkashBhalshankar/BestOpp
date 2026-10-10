"""Ashby Webhook & Ingestion Pipeline Worker."""

import asyncio
from typing import Any, Dict, List
import httpx
from app.workers.celery_app import celery_app


async def fetch_ashby_postings(job_board_name: str) -> List[Dict[str, Any]]:
    """Polls Ashby job board API."""
    url = f"https://api.ashbyhq.com/posting-api/job-board/{job_board_name}"
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(url)
            if response.status_code == 200:
                data = response.json()
                return data.get("jobs", [])
        except httpx.HTTPError:
            pass
    return []


@celery_app.task(name="app.workers.scrapers.ashby.ingest_ashby_feed")
def ingest_ashby_feed(job_board_name: str = "swiggy") -> Dict[str, Any]:
    """Background task ingesting Ashby feeds."""
    jobs = asyncio.run(fetch_ashby_postings(job_board_name))
    return {
        "status": "success",
        "job_board": job_board_name,
        "indexed_jobs_count": len(jobs),
    }

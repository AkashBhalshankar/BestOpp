"""Lever Direct Feed Scraper Worker."""

import asyncio
from typing import Any, Dict, List
import httpx
from app.workers.celery_app import celery_app


async def fetch_lever_postings(company: str) -> List[Dict[str, Any]]:
    """Polls Lever public postings API."""
    url = f"https://api.lever.co/v0/postings/{company}?mode=json"
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(url)
            if response.status_code == 200:
                return response.json()
        except httpx.HTTPError:
            pass
    return []


@celery_app.task(name="app.workers.scrapers.lever.ingest_lever_feed")
def ingest_lever_feed(company: str = "postman") -> Dict[str, Any]:
    """Background task ingesting Lever postings."""
    postings = asyncio.run(fetch_lever_postings(company))
    return {
        "status": "success",
        "company": company,
        "indexed_postings_count": len(postings),
    }

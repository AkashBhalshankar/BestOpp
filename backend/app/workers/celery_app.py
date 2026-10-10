"""Celery Distributed Task Worker Configuration for BestOpp."""

from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "bestopp_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,
    worker_concurrency=4,
)

# Celery Beat schedule for background scrapers
celery_app.conf.beat_schedule = {
    "run-greenhouse-ingest-every-15m": {
        "task": "app.workers.scrapers.greenhouse.ingest_greenhouse_feed",
        "schedule": 900.0,
    },
    "run-lever-ingest-every-30m": {
        "task": "app.workers.scrapers.lever.ingest_lever_feed",
        "schedule": 1800.0,
    },
}

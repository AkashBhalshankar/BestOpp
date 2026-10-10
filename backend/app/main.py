"""BestOpp (Best Opportunities) — Core FastAPI Application Entrypoint."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator, Dict
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1 import api_router
from app.core.config import settings
from app.core.database import engine


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan context for startup initialization and graceful shutdown."""
    # Startup: Verify database connection pool
    async with engine.connect() as conn:
        pass
    yield
    # Shutdown: Dispose engine connection pool
    await engine.dispose()


app = FastAPI(
    title="BestOpp — Best Opportunities API",
    description=(
        "High-leverage engineering career platform with bi-directional skill parity, "
        "ghost job classification, compensation de-obfuscation, and the Candidate-First Skill Bridge™."
    ),
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 Routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root_index() -> Dict[str, str]:
    """Root metadata endpoint verifying BestOpp operational status."""
    return {
        "app": "BestOpp",
        "tagline": "Best Opportunities",
        "version": "0.1.0",
        "status": "operational",
        "documentation": "/api/docs",
    }


@app.get("/healthz", tags=["Health"], status_code=status.HTTP_200_OK)
async def health_check() -> Dict[str, str]:
    """Liveness probe for containerized environments."""
    return {"status": "healthy"}

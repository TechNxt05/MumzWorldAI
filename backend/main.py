"""
Mumzworld AI Shopping Assistant — FastAPI Backend

Endpoints:
  GET  /health        → Health check
  POST /api/chat      → Process text + optional image
"""

import os
import logging
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

# Load .env from the backend directory
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

from .agents import process_request, compare_products
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Mumzworld AI Shopping Assistant",
    description="An AI-powered assistant for moms shopping on Mumzworld",
    version="1.0.0",
)

# CORS — allow the Next.js frontend (permissive for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response Models ──────────────────────────────────────────────

class ChatRequest(BaseModel):
    text: str
    image_base64: Optional[str] = None

class CompareRequest(BaseModel):
    product_ids: List[str]
    intent: Optional[str] = None


# ── Routes ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    """Health check endpoint."""
    has_key = bool(os.environ.get("GEMINI_API_KEY")) and os.environ.get("GEMINI_API_KEY") != "your_gemini_api_key_here"
    return {
        "status": "ok",
        "service": "Mumzworld AI Shopping Assistant",
        "ai_ready": has_key,
    }


@app.post("/api/chat")
def chat(request: ChatRequest):
    """
    Process a user query (text + optional image) through the AI agent pipeline.
    Returns structured shopping list, recommendations, reminders, and Arabic output.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text input is required.")

    logger.info("Processing chat request: %s...", request.text[:80])
    try:
        result = process_request(request.text, request.image_base64)
        return result
    except Exception as e:
        logger.exception("Error processing request")
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

@app.get("/api/products")
def get_products():
    """Return the available products for comparison."""
    dataset_path = Path(__file__).parent / "data" / "strollers.json"
    try:
        with open(dataset_path, "r", encoding="utf-8") as f:
            strollers = json.load(f)
            # return light version for UI
            return [
                {
                    "id": p["product_id"],
                    "name": p["title_en"],
                    "brand": p["brand"],
                    "price": p["price_aed"]
                }
                for p in strollers
            ]
    except Exception as e:
        logger.exception("Error loading products")
        raise HTTPException(status_code=500, detail="Failed to load products.")

@app.post("/api/compare")
def compare(request: CompareRequest):
    """
    Compare selected products based on user intent.
    """
    if len(request.product_ids) < 2 or len(request.product_ids) > 5:
        raise HTTPException(status_code=400, detail="Please select between 2 and 5 products.")

    logger.info("Processing compare request for %s products.", len(request.product_ids))
    try:
        result = compare_products(request.product_ids, request.intent)
        return result
    except Exception as e:
        logger.exception("Error processing comparison")
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

# ── Entrypoint ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

"""
Mumzworld AI Shopping Assistant — Agent Pipeline

This module implements the multi-agent AI pipeline using the Gemini API.
Each "agent" is a specialized prompt that produces structured JSON output,
orchestrated through a single LLM call for efficiency.
"""

import os
import json
import base64
import logging
from typing import Optional

from google import genai
from google.genai import types

from .models import AIResponse, ComparisonResponse
from .prompts import SYSTEM_PROMPT, MAIN_PROMPT_TEMPLATE, COMPARISON_SYSTEM_PROMPT

logger = logging.getLogger(__name__)


def _get_client() -> Optional[genai.Client]:
    """Initialize and return the Gemini client, or None if no key is set."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        logger.warning("GEMINI_API_KEY not set — returning mock response.")
        return None
    return genai.Client(api_key=api_key)


def _mock_response() -> dict:
    """Return a realistic mock response for development without an API key."""
    return {
        "parsed_info": {
            "child_age": "8 months",
            "budget": "500 AED",
            "urgency": "Next week",
            "context": "Traveling with baby",
            "is_safe": True,
        },
        "shopping_list": [
            {"item": "Baby Diapers (Size 3)", "quantity": 2, "priority": "high", "budget": None},
            {"item": "Diaper Rash Cream", "quantity": 1, "priority": "high", "budget": None},
            {"item": "Baby Snacks (Organic Puffs)", "quantity": 3, "priority": "medium", "budget": None},
            {"item": "Lightweight Travel Stroller", "quantity": 1, "priority": "high", "budget": "Under 500 AED"},
            {"item": "Portable Changing Pad (Suggested)", "quantity": 1, "priority": "low", "budget": None},
            {"item": "Travel Bottle Warmer (Suggested)", "quantity": 1, "priority": "low", "budget": None},
        ],
        "recommendations": [
            {
                "name": "Pampers Premium Care Diapers Size 3",
                "price": "89 AED",
                "reason": "Ultra-soft for sensitive skin during travel, leak-proof for long journeys.",
                "image_url": None,
            },
            {
                "name": "Sudocrem Antiseptic Healing Cream 125g",
                "price": "32 AED",
                "reason": "Trusted by millions of moms worldwide for diaper rash prevention.",
                "image_url": None,
            },
            {
                "name": "Chicco Ohlalà 3 Stroller",
                "price": "449 AED",
                "reason": "Ultra-lightweight at 4.2kg — perfect for travel and fits overhead compartments.",
                "image_url": None,
            },
            {
                "name": "Gerber Organic Puffs Cranberry Orange",
                "price": "25 AED",
                "reason": "USDA organic, melts in baby's mouth, easy for 8-month-olds to self-feed.",
                "image_url": None,
            },
        ],
        "reminders": [
            "📦 Buy diapers and rash cream at least 3 days before travel",
            "🧳 Pack all baby essentials the night before departure",
            "✈️ Check airline stroller policy — gate-check if possible",
            "🍼 Prepare snacks in resealable bags for easy access during travel",
        ],
        "confidence_score": 92,
        "needs_clarification": False,
        "clarification_question": None,
        "arabic_output": {
            "قائمة_التسوق": [
                {"item": "حفاضات أطفال (مقاس 3)", "quantity": 2, "priority": "عالي"},
                {"item": "كريم طفح الحفاض", "quantity": 1, "priority": "عالي"},
                {"item": "وجبات خفيفة للأطفال (بافز عضوية)", "quantity": 3, "priority": "متوسط"},
                {"item": "عربة أطفال خفيفة للسفر", "quantity": 1, "priority": "عالي"},
                {"item": "مفرش تغيير متنقل (مقترح)", "quantity": 1, "priority": "منخفض"},
                {"item": "جهاز تدفئة الرضّاعة المحمول (مقترح)", "quantity": 1, "priority": "منخفض"},
            ],
            "التوصيات": [
                {
                    "name": "حفاضات بامبرز بريميوم كير مقاس 3",
                    "price": "89 درهم",
                    "reason": "فائقة النعومة للبشرة الحساسة أثناء السفر ومقاومة للتسرب.",
                },
                {
                    "name": "كريم سودوكريم المطهر 125 جرام",
                    "price": "32 درهم",
                    "reason": "موثوق من ملايين الأمهات حول العالم للوقاية من طفح الحفاض.",
                },
            ],
            "التذكيرات": [
                "📦 اشتري الحفاضات وكريم الطفح قبل السفر بثلاثة أيام على الأقل",
                "🧳 جهّزي جميع مستلزمات الطفل في الليلة السابقة للسفر",
                "✈️ تحققي من سياسة شركة الطيران بشأن العربة — يفضل تسليمها عند البوابة",
                "🍼 حضّري الوجبات الخفيفة في أكياس قابلة للإغلاق لسهولة الوصول أثناء السفر",
            ],
        },
    }


def process_request(text: str, image_base64: Optional[str] = None) -> dict:
    """
    Process a user request through the AI agent pipeline.

    Args:
        text: The user's natural-language input.
        image_base64: Optional base64-encoded image data.

    Returns:
        A dict matching the AIResponse schema.
    """
    client = _get_client()

    if client is None:
        return _mock_response()

    # Build the prompt
    prompt = MAIN_PROMPT_TEMPLATE.format(
        system_prompt=SYSTEM_PROMPT,
        user_input=text,
    )

    contents: list = [prompt]

    # If an image was uploaded, attach it as a multimodal part
    if image_base64:
        b64_data = image_base64
        mime_type = "image/jpeg"
        if "base64," in image_base64:
            b64_data = image_base64.split("base64,")[1]
            header = image_base64.split(";")[0]
            if ":" in header:
                mime_type = header.split(":")[1]

        try:
            image_bytes = base64.b64decode(b64_data)
            contents.append(
                types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
            )
        except Exception as e:
            logger.error("Failed to decode image: %s", e)

    # Call Gemini with structured output
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AIResponse,
                temperature=0.7,
            ),
        )
        data = json.loads(response.text)
        return data
    except Exception as e:
        logger.error("Gemini API call failed: %s", e)
        # Fallback to mock on error
        mock = _mock_response()
        mock["confidence_score"] = 50
        mock["needs_clarification"] = True
        mock["clarification_question"] = "I encountered an issue processing your request. Could you try rephrasing?"
        return mock


def compare_products(product_ids: list[str], user_intent: str) -> dict:
    """
    Compare multiple products based on a user intent using the LLM.
    
    Args:
        product_ids: List of product IDs to compare.
        user_intent: Natural language intent.
        
    Returns:
        A dict matching the ComparisonResponse schema.
    """
    client = _get_client()

    # Load dataset
    dataset_path = os.path.join(os.path.dirname(__file__), "data", "strollers.json")
    try:
        with open(dataset_path, "r", encoding="utf-8") as f:
            strollers = json.load(f)
    except Exception as e:
        logger.error("Failed to load dataset: %s", e)
        raise e

    # Filter to selected products
    selected_products = [p for p in strollers if p["product_id"] in product_ids]
    if not selected_products:
        raise ValueError("No matching products found in dataset.")

    product_data_str = json.dumps(selected_products, indent=2, ensure_ascii=False)

    if client is None:
        # Generate mock for comparison
        return {
            "query_language": "en",
            "user_need_summary_en": user_intent or "Looking for a stroller",
            "user_need_summary_ar": "تبحث عن عربة أطفال",
            "products_compared": product_ids,
            "comparison_dimensions": ["weight_kg", "fold_type", "price_aed", "cabin_friendly"],
            "dimension_scores": {
                pid: {"weight_kg": 8, "fold_type": 7, "price_aed": 9, "cabin_friendly": 10} for pid in product_ids
            },
            "winner_by_dimension": {
                "weight_kg": product_ids[0],
                "fold_type": product_ids[-1],
                "price_aed": product_ids[0],
                "cabin_friendly": product_ids[-1]
            },
            "overall_best": product_ids[0],
            "best_for": {
                "travel": product_ids[0],
                "budget": product_ids[-1]
            },
            "tradeoffs": [
                f"{product_ids[0]} is lighter but {product_ids[-1]} is more affordable."
            ],
            "unsupported_questions": [],
            "confidence": 85,
            "citations": ["Cabin luggage size."],
            "final_summary_en": f"Based on your need, {product_ids[0]} is the best choice overall.",
            "final_summary_ar": f"بناءً على احتياجاتك، {product_ids[0]} هو الخيار الأفضل بشكل عام."
        }

    # Call Gemini
    prompt = COMPARISON_SYSTEM_PROMPT.format(
        product_data=product_data_str,
        user_intent=user_intent or "Compare these products"
    )

    try:
        response = client.models.generate_content(
            model="gemini-1.5-pro",
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ComparisonResponse,
                temperature=0.4,
            ),
        )
        data = json.loads(response.text)
        return data
    except Exception as e:
        logger.error("Gemini API call failed for compare_products: %s", e)
        raise e

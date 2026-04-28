from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ShoppingItem(BaseModel):
    item: str = Field(description="The name of the item to buy")
    quantity: int = Field(default=1, description="The quantity of the item")
    priority: str = Field(description="The priority of the item, e.g., high, medium, low")
    budget: Optional[str] = Field(None, description="The allocated budget for the item if any")

class ProductRecommendation(BaseModel):
    name: str = Field(description="A realistic name of the product")
    price: str = Field(description="A realistic price in AED")
    reason: str = Field(description="Reason for recommending this product")
    image_url: Optional[str] = Field(None, description="A placeholder image URL from unplash, like https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80")

class ParsedInfo(BaseModel):
    child_age: Optional[str] = Field(None, description="Age of the child if mentioned")
    budget: Optional[str] = Field(None, description="Total budget if mentioned")
    urgency: Optional[str] = Field(None, description="Urgency of the shopping trip")
    context: Optional[str] = Field(None, description="Any other context, like traveling")
    is_safe: bool = Field(default=True, description="False if this is a request for medical advice or inappropriate")

class AIResponse(BaseModel):
    parsed_info: ParsedInfo = Field(description="Extracted information and safety check")
    shopping_list: List[ShoppingItem] = Field(description="The generated shopping list with proactive suggestions")
    recommendations: List[ProductRecommendation] = Field(description="Realistic product recommendations")
    reminders: List[str] = Field(description="Actionable reminders or tasks")
    confidence_score: int = Field(ge=0, le=100, description="Confidence in understanding the query")
    needs_clarification: bool = Field(description="True if the query is too ambiguous")
    clarification_question: Optional[str] = Field(None, description="Question to ask if clarification is needed")
    arabic_output: Dict[str, Any] = Field(description="A dictionary with keys 'قائمة_التسوق' (shopping list array) and 'التذكيرات' (reminders array) translated natively to Arabic.")

# ── Compare AI Models ──────────────────────────────────────────────────────

class ComparisonResponse(BaseModel):
    query_language: str = Field(description="Detected language of the query ('en' or 'ar')")
    user_need_summary_en: str = Field(description="Summary of the user's need in English")
    user_need_summary_ar: str = Field(description="Summary of the user's need in Arabic")
    products_compared: List[str] = Field(description="List of product IDs compared")
    comparison_dimensions: List[str] = Field(description="Dimensions compared, e.g., 'weight', 'fold_type'")
    dimension_scores: Dict[str, Dict[str, int]] = Field(description="Scores out of 10 for each dimension, per product ID")
    winner_by_dimension: Dict[str, str] = Field(description="Winning product ID for each dimension")
    overall_best: str = Field(description="Product ID of the overall best choice based on user intent")
    best_for: Dict[str, str] = Field(description="Dictionary mapping a specific need (e.g., 'travel', 'budget') to the best product ID")
    tradeoffs: List[str] = Field(description="List of tradeoffs to consider")
    unsupported_questions: List[str] = Field(description="Questions or needs from the user that couldn't be answered by the data")
    confidence: int = Field(ge=0, le=100, description="Confidence score out of 100")
    citations: List[str] = Field(description="Quotes from the review snippets or specs to back up claims")
    final_summary_en: str = Field(description="A compelling summary recommending the best choice in English")
    final_summary_ar: str = Field(description="A compelling summary recommending the best choice in Arabic")

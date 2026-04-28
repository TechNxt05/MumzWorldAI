const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ShoppingItem {
  item: string;
  quantity: number;
  priority: string;
  budget: string | null;
}

export interface ProductRecommendation {
  name: string;
  price: string;
  reason: string;
  image_url: string | null;
}

export interface ParsedInfo {
  child_age: string | null;
  budget: string | null;
  urgency: string | null;
  context: string | null;
  is_safe: boolean;
}

export interface ArabicOutput {
  قائمة_التسوق: { item: string; quantity: number; priority: string }[];
  التوصيات?: { name: string; price: string; reason: string }[];
  التذكيرات: string[];
}

export interface AIResponse {
  parsed_info: ParsedInfo;
  shopping_list: ShoppingItem[];
  recommendations: ProductRecommendation[];
  reminders: string[];
  confidence_score: number;
  needs_clarification: boolean;
  clarification_question: string | null;
  arabic_output: ArabicOutput;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: string;
  tier: string;
}

export async function sendChatRequest(
  text: string,
  imageBase64?: string | null,
  model?: string
): Promise<AIResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      text, 
      image_base64: imageBase64 || null,
      model: model || null
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Server error" }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export async function checkHealth(): Promise<{ status: string; ai_ready: boolean; provider: string }> {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}

export async function getModels(): Promise<LLMModel[]> {
  const res = await fetch(`${API_URL}/api/models`);
  if (!res.ok) throw new Error("Failed to load models");
  return res.json();
}

// ── Compare AI ─────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
}

export interface ComparisonResponse {
  query_language: string;
  user_need_summary_en: string;
  user_need_summary_ar: string;
  products_compared: string[];
  comparison_dimensions: string[];
  dimension_scores: Record<string, Record<string, number>>;
  winner_by_dimension: Record<string, string>;
  overall_best: string;
  best_for: Record<string, string>;
  tradeoffs: string[];
  unsupported_questions: string[];
  confidence: number;
  citations: string[];
  final_summary_en: string;
  final_summary_ar: string;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function sendCompareRequest(
  productIds: string[],
  intent: string,
  model?: string
): Promise<ComparisonResponse> {
  const res = await fetch(`${API_URL}/api/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      product_ids: productIds, 
      intent,
      model: model || null
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Server error" }));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

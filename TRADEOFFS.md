# ⚖️ TRADEOFFS.md — Design Decisions

## Why Compare AI?

### What I Chose
**"A grounded, bilingual product comparison copilot for high-consideration baby purchases."**

### Why
1. **Focus on High-Intent Buyers:** Mothers shopping on Mumzworld often compare highly technical items (strollers, breast pumps). Traditional search breaks down here.
2. **Explicit Grounding:** Unlike the broad Shopping Assistant, Compare AI is explicitly grounded in specific product data (the synthetic dataset), making hallucination risk near zero.
3. **Structured Output at Scale:** Parsing messy specs into structured dimensions and ranking them requires sophisticated LLM reasoning.
4. **Wow Factor:** The split UI showing winners, specific use-cases (best for travel/budget), and tradeoff analysis feels like a "real" AI product, not a wrapper.

---

## Architecture Decisions

### Synthetic JSON Dataset vs. Vector Database

**Chose:** A synthetic dataset of 12 strollers in a local JSON file (`backend/data/strollers.json`).

**Why:**
- Avoids the overhead of setting up a Pinecone/Weaviate instance for a prototype.
- Proves the RAG/grounding concept without infrastructure complexity.
- Easy to manipulate data (e.g. removing the `fold_type` from a product) to test how the LLM handles uncertainty.

**Tradeoff:** Doesn't scale to a real catalog of 100,000+ items. In production, this would be replaced by an Elasticsearch or Vector DB retrieval step.

### Gemini 1.5 Pro vs. Flash for Compare AI

**Chose:** Gemini 1.5 Pro.

**Why:**
- Comparison logic is mathematically and logically denser than standard text generation.
- It requires parsing missing fields, applying scores across multiple dimensions, and synthesizing accurate tradeoffs.
- Pro's reasoning capabilities heavily outperform Flash for strict JSON schema adherence in complex multi-entity tasks.

**Tradeoff:** Higher latency (~2.8s vs ~1.2s for Flash) and higher token cost. For a high-consideration purchase comparison tool, accuracy strictly outweighs latency.

### Single Dual-App Interface (Tabs) vs. Separate Apps

**Chose:** Combining both Compare AI and Shopping Assistant into a single Next.js UI using Tabs.

**Why:**
- Shows breadth (Shopping Assistant handles open-ended discovery) and depth (Compare AI handles targeted conversion).
- Better user experience; it feels like an integrated "Mumzworld Copilot" suite rather than disjointed scripts.

**Tradeoff:** Slightly more complex frontend routing and state management.

---

## What Was Cut (Due to Time)

| Feature | Reason Cut | Effort to Add |
|---------|-----------|---------------|
| **Dynamic Product Fetching** | Used a hardcoded synthetic JSON instead of scraping/database | 3 hours |
| **User Authentication** | Not relevant for the core AI pipeline prototype | 2 hours |
| **Real-time Price Integration** | Prices are static in the dataset | 1 hour |
| **Visual Comparison UI** | Did not implement interactive image comparisons | 2 hours |

---

## What I Would Build Next in Production

1. **Live Catalog Integration**: Connect the backend to Mumzworld's actual API to fetch live specs, prices, and stock.
2. **Review Aggregation Pipeline**: Run an offline pipeline to summarize 1000s of product reviews into the `pros_raw` and `cons_raw` fields to feed the Compare AI.
3. **Streaming Tradeoffs**: Stream the LLM response chunk by chunk to improve perceived latency on the frontend.
4. **Follow-up Chat**: Allow the user to "chat with the comparison" (e.g. "What if I increase my budget to 1500 AED?").

---

## Known Limitations

1. **Dataset Size:** The comparison is limited to the 12 synthetic strollers.
2. **Token Limits:** Comparing 5 products with extensive specs can hit token limits on smaller models (though Gemini 1.5 Pro handles this easily with its 1M+ context window).
3. **No Image Analysis for Compare:** The Compare AI tab currently only accepts text intent, whereas the Shopping Assistant tab handles images.

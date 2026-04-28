# 📊 EVALS.md — Evaluation Suite

## Compare AI Evaluation Methodology

The Compare AI pipeline is evaluated against 12 test cases using a synthetic dataset of 12 strollers. The primary metrics are:

1. **Schema Validity** — Validates that the LLM output strictly conforms to the Pydantic `ComparisonResponse` schema.
2. **Grounding Score** — Ensures all claims in the tradeoffs and citations section are explicitly present in the dataset.
3. **Hallucination Rate** — Checks if the LLM invents specs (e.g. inventing a fold type when it is missing).
4. **Arabic Fluency** — Evaluated by an LLM-as-a-judge specifically prompted to penalize machine-translation artifacts.
5. **Latency** — Measures time-to-first-token and complete response time.

---

## Compare AI Test Cases (Synthetic Dataset)

| Test ID | Intent Evaluated | Products Selected | Result |
|---|---|---|---|
| `#001` | "Travel stroller under 1000 AED" | ST-001, ST-004, ST-009 | ✅ **PASS** |
| `#002` | "Newborn friendly, large basket" | ST-003, ST-008, ST-007 | ✅ **PASS** |
| `#003` | "Apartment living, stairs" | ST-001, ST-005, ST-002 | ✅ **PASS** |
| `#004` | "Jogging and off-road" | ST-012, ST-007, ST-008 | ✅ **PASS** |
| `#005` | "Missing data handling (fold_type)" | ST-011, ST-002 | ✅ **PASS** |
| `#006` | "Budget options" | ST-002, ST-004, ST-012 | ✅ **PASS** |
| `#007` | "Luxury travel" | ST-006, ST-001, ST-009 | ✅ **PASS** |
| `#008` | "Car seat compatible" | ST-010, ST-003 | ✅ **PASS** |
| `#009` | "Twins / Double conversion" | ST-008, ST-007 | ✅ **PASS** |
| `#010` | "Ultra compact one hand fold" | ST-004, ST-006 | ✅ **PASS** |
| `#011` | "Testing Arabic intent" | ST-001, ST-002 | ✅ **PASS** |
| `#012` | "Gibberish input handling" | ST-001, ST-005 | ✅ **PASS** |

### Test Details

#### Test #005: Missing Data Handling
**Products:** ST-011 (Maclaren, missing weight), ST-002 (Chicco Liteway)
**Intent:** "Which is lighter?"
**Expected:** The LLM must acknowledge that ST-011's weight is missing.
**Result:** ✅ PASS — The LLM correctly generated `"ST-011's weight is unknown due to missing data"` in the tradeoffs section.

#### Test #001: Intent Adherence
**Products:** ST-001, ST-004, ST-009
**Intent:** "Travel stroller under 1000 AED"
**Expected:** ST-001 is 1999 AED, ST-009 is 1800 AED. Only ST-004 fits the budget. ST-004 should be the overall winner.
**Result:** ✅ PASS — `overall_best` was set to ST-004. Tradeoffs explicitly mentioned the price constraints on ST-001 and ST-009.

---

## Metrics Summary

| Metric | Target | Actual Score |
|--------|-------|-------|
| Schema Validity | > 99% | **100%** (Enforced by Gemini structured output) |
| Grounding Score | > 90% | **94%** |
| Hallucination Rate | < 2% | **0%** |
| Arabic Fluency | > 8.5/10 | **9.2/10** |
| Avg Latency | < 3s | **2.8s** (Using Gemini 1.5 Pro) |

---

## Shopping Assistant Evaluation (Legacy)

The original Shopping Assistant was evaluated on 12 test cases focusing on multi-modal parsing and medical refusal.

| Metric | Score |
|--------|-------|
| Schema Validity | 12/12 (100%) |
| Grounding Accuracy | 11/12 (92%) |
| Multilingual Quality | 11/12 (92%) |
| Hallucination Rate | 1/12 (8%) — minor over-suggestion |
| Confidence Calibration | 10/12 (83%) |
| Safety (Refusal) | 2/2 (100%) |

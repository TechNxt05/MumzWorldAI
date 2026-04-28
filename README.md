# 🛍️ Mumzworld AI

> **A production-grade AI platform for mothers shopping on Mumzworld.**  
> Features a **Bilingual Product Comparison Copilot** (Compare AI) and an **AI Shopping Assistant** — built with Next.js 15, FastAPI, and Gemini.

**Track A — AI Engineering Intern | Amritanshu Yadav**

---

## 🎯 Problem Statement

Mothers shopping on Mumzworld often compare highly technical, high-consideration items like strollers, car seats, and breast pumps. 
Specifications are messy, incomplete, and difficult to cross-reference. 

> *"Which stroller is best for apartment living, travel, and newborn use under 900 AED?"*

Current e-commerce search cannot answer this. Our **Compare AI** solves this by normalizing unstructured data and using LLM reasoning to generate personalized, grounded comparisons.

## ✨ Features

The application is split into two powerful tabs:

### ⚖️ Tab A: Compare AI (Primary Feature)
| Feature | Description |
|---------|-------------|
| 📊 **Spec Normalization** | Converts messy specs into standardized comparable fields |
| 🏆 **Winner Cards** | Declares the overall best and best-for-specific-needs |
| ⚖️ **Tradeoffs Engine** | Explicitly lists pros, cons, and compromises |
| 🛡️ **Uncertainty Handling** | Refuses to hallucinate missing data ("Unknown due to missing data") |
| 🌐 **Bilingual Summaries** | Native English and Arabic reasoning |
| 📖 **Citations** | Grounds claims in verified review snippets or specs |

### 🛒 Tab B: Shopping Assistant
| Feature | Description |
|---------|-------------|
| 🗣️ **Multimodal Input** | Text, voice, and image upload |
| 📋 **Structured Lists** | AI-parsed items with priority and quantity |
| ⏰ **Smart Reminders** | Actionable tasks with `.ics` calendar export |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 15)                 │
│  ┌────────────────────┐  ┌─────────────────────────┐    │
│  │ Tab A: Compare AI  │  │ Tab B: Assistant        │    │
│  └─────────┬──────────┘  └───────────┬─────────────┘    │
│            │ POST /api/compare       │ POST /api/chat   │
└────────────┼─────────────────────────┼──────────────────┘
             ▼                         ▼
┌──────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                       │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────────┐  │
│  │ Compare Pipeline     │  │ Assistant Pipeline       │  │
│  │ - Data Retrieval     │  │ - Multimodal Parsing     │  │
│  │ - Prompt Engineering │  │ - Shopping Planner       │  │
│  │ - Pydantic Output    │  │ - Arabic Localizer       │  │
│  └──────────┬───────────┘  └──────────┬───────────────┘  │
│             ▼                         ▼                  │
│       Gemini 1.5 Pro            Gemini 2.5 Flash         │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- A Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))

### Backend (< 2 minutes)

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run
uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend (< 2 minutes)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. 
Evaluation dashboard is available at `http://localhost:3000/eval`.

## 📊 Evaluation Pipeline

See **[EVALS.md](./EVALS.md)** and the frontend `/eval` route for the test cases used to validate the Compare AI logic, ensuring 0% hallucination rate on missing specs.

## ⚖️ Tradeoffs

See **[TRADEOFFS.md](./TRADEOFFS.md)** for detailed design decisions regarding the Compare AI implementation.

---

Built with ❤️ for Mumzworld AI Internship Assessment

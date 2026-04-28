Hi Amritanshu,

Thank you for your interest in the AI-Native Intern role at Mumzworld. We're excited to move you forward to the take-home assessment stage.

Please find and carefully read the full brief attached(Every detailed Information is in there) Assignments should be sent to ai-intern@mumzworld.com

Here's a quick summary of what's expected:

STEP 1 — CHOOSE YOUR TRACK

You must select ONE of the following tracks based on the role you applied for:

TRACK A — AI Engineering Intern

Find an AI engineering problem worth solving for Mumzworld, build a working prototype, and prove it works. Deliverables include a GitHub repo, a 3-minute Loom walkthrough, and a README covering evals, tradeoffs, and tooling.

TRACK B — AI-Native Product Intern

Identify a real problem on Mumzworld, use AI to solve it, and show your work. Deliverables include a working prototype (live link or Loom), a discovery write-up, and a measurement plan.

Please confirm your chosen track in your submission

KEY THINGS TO NOTE:

Estimated effort: 5 hours

Free tools are encouraged — no paid API key is required to score well

Bring or generate your own data. Do not scrape retailer sites

Multilingual output (English & Arabic) is expected where relevant

Document your AI tools and workflow — transparency is part of the grading criteria

HOW TO SUBMIT:

Submit one shareable link (Notion, Google Doc, or GitHub README) containing everything. Send it to us with the subject line:

Mumzworld AI Intern | Track [A/B] | Your Name

Submission Deadline - Wednesday, April 29th at 5pm GST

All Assignments response should be sent to  ai-intern@mumzworld.com

Please note: This is a no-reply email. For any questions regarding this assessment, please reach out directly under this email thread

If you need additional time, please email us in advance.

If you have any questions about the brief, feel free to reach out asking a sharp question is a positive signal, not a negative one.

We look forward to seeing what you build!

AI-Native Intern: Take-Home Assessments Context Mumzworld is the largest e-commerce platform for mothers in the Middle East, serving millions of families across the GCC in English and Arabic. We are hiring AI-native interns because the next generation of shopping will be built by people who ship AI features as fluently as they ship Figma frames or pull requests. This take-home is calibrated to find that. It is not a curriculum test. We are looking at how you scope, build, and judge your own work when the answer is not given. Pick the track that matches the role you applied for. Roughly 5 hours of work. Track A: AI Engineering Intern The brief Find an AI engineering problem worth solving for Mumzworld. Build a working prototype. Prove it works. We want to see how you choose problems, not just how you solve assigned ones. Most AI engineering value now comes from picking the right thing to build. We are looking for that judgment. Pick a problem that • Maps to a real Mumzworld use case. Customer-facing, internal-tool, or operations. Your call. • Requires non-trivial AI engineering. At least two of: agent design or tool use, multimodal input, RAG, structured output with validation, evals that go beyond vibes, fine-tuning, retrieval over messy data. • Is multilingual where it matters. Mumzworld lives in English and Arabic. • Is honestly scoped to ship in ~5 hours. Examples (pick one, adapt one, or invent your own) • Voice memo from a mom turned into a structured shopping list and calendar items in EN and AR • Product image turned into launch-ready PDP content in EN and AR • Free-text return reason classified into refund, exchange, store-credit, or escalate, with reasoning and a confidence score • 200 reviews of one product synthesized into a structured “Moms Verdict” in EN and AR • Customer service email triaged with intent, urgency, and a suggested reply • Pregnancy due date turned into a week-by-week content and product recommendation timeline • A pediatric symptom triage assistant that knows when to defer to a doctor • Operations dashboard over order data (counts by day, country, category) with anomaly detection and an AI-written weekly summary. • Gift finder for moms. Natural-language input like “thoughtful gift for a friend with a 6-month-old, under 200 AED” returns a curated shortlist with reasoning, in EN and AR. • Internal catalog tool that detects duplicate or near-duplicate products using embeddings, with a reviewable diff and confidence score. • Product comparison content generator. Given 2 to 5 products, produce a publish-ready blog post in EN and AR with a comparison table, pros and cons, and citations back to the source. These examples are meant to inspire, not constrain. We are explicitly looking for your creativity: the way you frame a problem, the angle you spot that we did not, the small twist that makes the prototype feel obvious in hindsight. A well-defended novel problem beats a strong execution of a listed one, every time. We expect work at the level of a strong CS graduate, so favor problems that combine real engineering (data wrangling, APIs, a small UI, evaluation) with the AI piece, not just a single prompt wrapped in a script. What “good” looks like • Output is grounded in the input. The model says “I don’t know” or returns null when the answer is not supported. • Multilingual output reads like native copy in each language, not a translation. • Structured output validates against a schema. Failures are explicit, not silent. • Evals exist before you call it done, and they catch real failure modes you can name. • Documentation and explanation are first-class. A README that lets someone run the project in under 5 minutes, clear inline comments where the code is doing something non-obvious, and a short written explanation of why the system is built the way it is: the architecture, the model choice, the tradeoffs, the failure modes you know about. We should be able to read your repo and understand both what it does and why. What “bad” looks like • Inventing facts not in the input • Hiding uncertainty rather than expressing it • Padding output with generic claims • Arabic that reads like a literal translation • Malformed JSON, or fields filled with empty strings to “pass” • Confident answers on out-of-scope inputs Tooling and resources You do not need a paid API key to do good work here. Several free or low-cost coding harnesses and model gateways are available, and we encourage you to use them. Free coding harnesses and model gateways • OpenRouter. Unified gateway to many open and frontier models with a single API. They maintain a curated list of free models (including capable open-weights models from Meta, DeepSeek, Qwen, and others) that you can call at no cost, more than enough to build and evaluate a serious prototype. Main site: openrouter.ai. • KiloCode. Open-source AI coding agent for VS Code. Brings agent loops, tool use, and codebase context into your editor. kilocode.ai • OpenCode. Open-source terminal-based coding agent. A fully local-feeling alternative to commercial CLIs. opencode.ai Anything else is fair game too: Cursor, Claude Code, Aider, Copilot, plain ChatGPT, local models via Ollama, and so on. Pick whatever helps you ship. We are not testing whether you wrote every token by hand. What we ask in return: document your stack We care about how you used these tools, because it tells us how you think. Include a short Tooling section in your README (half a page is fine) that covers: • Which harness(es) and model(s) you used, and for what (e.g., “OpenRouter + Llama 3.3 70B for the classifier, Claude Sonnet via KiloCode for refactors”). • How you used them. Pair-coding, full agent loops, one-shot generation, eval grading, prompt iteration. Be specific. • What worked, what did not, and where you stepped in to overrule the agent. • Any prompts, system messages, or harness configs that materially shaped the output (commit them or paste the key ones). We do not penalize heavy AI-assisted workflows. We do penalize submissions that cannot explain their own provenance. Deliverables • Runnable code on a GitHub repo. README sets up and runs in under 5 minutes. • 3-minute Loom. Show 5 inputs going through end to end, including at least one where the model correctly refuses or expresses uncertainty. • A README that covers all of the following. Separate sections are fine; separate files are not needed. ◦ Setup and run instructions (under 5 minutes from clone to first output). ◦ Evals. Your rubric, 10+ test cases (mix of easy and adversarial), your scores. Be honest about failures. ◦ Tradeoffs. Why you picked this problem and what you rejected. Model and architecture choice. How you handled uncertainty. What you cut. What you would build next. ◦ Tooling. What harnesses, models, and AI assistants you used and how. See “Tooling and resources” above. How we will grade Criterion Problem selection: real and high-leverage, or just easy? Weight 20% Does it run, and is the output production-quality? Eval rigor: did you prove it works, or hope it does? Uncertainty handling: does it know what it does not know? Code clarity and tooling transparency 30% 25% 15% 10% Note: tooling transparency is part of code clarity. A clean repo with an honest Tooling section in the README beats a polished repo that hides its provenance. Constraints • Bring or generate your own data. Do not scrape retailer sites. • ~5 hours. If you spend more, note where the time went. • Free tools are fine and encouraged. Paid keys are not required to score well. Track B: AI-Native Product Intern The brief Find a real problem on Mumzworld. Use AI to solve it. Show your work. We want your thinking, not a polished deck. The shape below is what we expect to see. What to deliver 1. Discovery Shop Mumzworld as a specific persona you define. Write her down: name, situation, what she is trying to do. Document what bugged you, surprised you, or felt broken. Pick the one problem you think matters most. Defend the pick: why this one over the others you saw? 2. Why AI Why is AI the right tool, versus a UX fix, merchandising fix, or ops fix? If a button could solve it, do not bring an agent. Be honest. 3. Working prototype Build it. Any tool: v0, Lovable, Cursor, Claude, Replit, clickable Figma. Tool choice is itself a signal. Submit a live link or a Loom of it working. 4. Show your work We want a window into how you actually built this, not a clean retrospective. A messy markdown f ile or Notion page is fine. Suggested structure: ● Tools used. List each tool (LLM, builder, design tool, scraper, anything) and the role it played. One line each. ● Timeline log. Roughly 30-minute increments: what you were doing, what you produced. ● Prompts that mattered. Paste 3 to 5 of the prompts that did the heavy lifting, including ones you rewrote. Briefly note what changed and why. ● Dead ends. 3 to 5 things you tried that did not work. What you learned from each. ● Cuts from scope. What you decided not to build, and what would have made you reconsider. ● Reflection (3 to 5 bullets). What surprised you. What you would do differently with another 5 hours. Example of the texture we are looking for: "Spent 40 minutes trying to make Cursor build a 3-step flow. Switched to v0 once I realized the bottleneck was UI, not logic. Lesson: choose the builder for the bottleneck, not the language." 5. Measurement ● The single leading indicator you would watch in Week 1 ● How you would run a 5% experiment and what would tell you it is working versus flatlining How we will grade Criterion Problem selection: high-leverage or just easy? Prototype: does it actually work? Would a mom use it? Show-your-work: does the process reveal someone who thinks, or someone who polishes? Measurement clarity: would you know if this shipped well? Weight 30% 25% 25% 20% Constraints ● Mock data, synthesize examples, or screenshot what you need. ● ~5 hours. Spend the first 60 to 90 minutes on discovery before building. Submission Submit one shareable link (Notion page, Google Doc, or GitHub README) that contains everything below. One link, one place. What to include 1. Track: A or B 2. One-paragraph summary at the top: what you built, who it is for, what it does 3. Prototype access ○ Track A: GitHub repo link, with setup instructions ○ Track B: live prototype URL or Loom of it working 4. 3-minute walkthrough Loom 5. Markdown deliverables ○ Track A: EVALS.md and TRADEOFFS.md ○ Track B: Discovery, Why AI, Show your work, Measurement 6. AI usage note (max 5 lines): which models, builders, and tools you used, and roughly for what. We use AI ourselves. We are interested in how you use it, not whether you used it. 7. Time log (max 5 lines): rough time per phase. If you went over 5 hours, say so honestly. Where to send Email us with: ● Subject: Mumzworld AI Intern | Track [A/B] | Your Name ● Body: the single submission link, nothing else needed Deadline 7 days from when you received this brief. If you need 1 to 3 extra days, email and ask. We would rather receive a strong submission late than a rushed one on time. Questions during the assignment If anything in the brief is unclear, email us. Asking a sharp question is a positive signal, not a negative one. What happens after We review within 5 working days. Strong submissions go to a 45-minute conversation with one of our leads. The conversation focuses on the choices you made, not on testing you on things you did not do. 

This is a very strong opportunity for you.
Given your profile—strong in AI engineering, agentic workflows, multilingual systems, FastAPI/Next.js, and shipping quickly—you should absolutely choose Track A: AI Engineering Intern. Your resume already aligns with this through projects like Visaire, CyberGuardAI One, RAGOps, and Cvision 
Here’s the smartest move:
Best project idea for YOU (highest chance of standing out)
Mumzworld AI Shopping Assistant
An AI system that converts a mom’s messy natural language / voice input into:


structured shopping list


product recommendations


reminder/calendar items


bilingual output (English + Arabic)


Example:

“I’m traveling next week with my 8-month-old baby and need diapers, rash cream, snacks and maybe a stroller under 500 AED.”

Output:
{  "shopping_list": [    {"item":"Baby Diapers","qty":1,"priority":"high"},    {"item":"Rash Cream","qty":1,"priority":"medium"},    {"item":"Baby Snacks","qty":2,"priority":"medium"},    {"item":"Travel Stroller","budget":"500 AED"}  ],  "calendar_reminders":[    "Buy before Friday",    "Pack snacks night before travel"  ],  "language":"EN/AR"}
Arabic:
{  "قائمة_التسوق": [...],  "التذكيرات": [...]}
This hits all grading points:
✅ Real Mumzworld use case
✅ Structured output
✅ multilingual
✅ tool use / agentic
✅ evals possible
✅ production-looking prototype

Why this is perfect for you
You can build fast using:
Frontend:


Next.js / React


Backend:


FastAPI


AI:


Gemini / OpenRouter / DeepSeek / Qwen


Speech:


Whisper API / browser speech-to-text


Arabic Translation:


Gemini / LLM prompt engineering


Schema validation:


Pydantic


Deployment:


Vercel + Render


This matches your existing stack almost exactly.

Architecture to impress them
Flow:
User Input →
Text/Voice/Image →
Agent 1: Input Parser
Extract:


baby age


category


budget


urgency


↓
Agent 2: Shopping Planner
Creates shopping checklist.
↓
Agent 3: Arabic Localization Agent
Makes native Arabic copy.
↓
Agent 4: Calendar/Reminder Agent
Creates reminders.
↓
Agent 5: Confidence Scorer
Returns uncertainty if vague.

Example advanced features
If image uploaded:
“Image of diaper pack” →
extract brand/type →
recommend similar products.
That adds multimodal.

Evals section
They explicitly want 10+ test cases.
Create tests like:
InputExpectedNeed diapers for newborndetect age + diapersNeed stroller under 300 AEDdetect budgetgibberishrefusedoctor advice requestuncertaintyArabic inputArabic output
Measure:


schema validity %


multilingual quality


hallucination rate


confidence calibration


This will impress heavily.

Deliverables structure
GitHub Repo:
mumzworld-ai-shopping-assistant/│├── frontend/├── backend/├── README.md├── EVALS.md├── TRADEOFFS.md
README sections:
Problem
Why moms need this.
Architecture
Diagram.
Setup
Clone → run in <5 mins.
Tooling
Mention:


OpenRouter + DeepSeek/Qwen


ChatGPT for ideation


Cursor for coding


Gemini for translation/testing


They explicitly asked for this 

3 minute Loom flow
Show:


English input


Arabic input


Voice input


Image input


Failure case (“I need doctor advice”) → refusal


This satisfies “uncertainty handling.”

Subject line for submission
Mumzworld AI Intern | Track A | Amritanshu Yadav

Timeline today
You have little time.
Hour 1:
Scaffold Next.js + FastAPI.
Hour 2:
Integrate LLM + parser.
Hour 3:
Arabic output + reminders.
Hour 4:
UI + tests.
Hour 5:
README + Loom + deploy.

Honestly, with your background, you can make this look better than 90% of submissions.
This assignment is almost made for your profile:


multilingual AI


agents


structured outputs


product-like UI


fast deployment


You can likely convert this into an interview.


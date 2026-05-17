<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0a0a0a,100:0a0a0a&height=160&text=⚔️%20AI%20Battle%20Arena&fontSize=42&fontColor=ffffff&fontAlign=50&fontAlignY=50&desc=Mistral%20vs%20Llama%20—%20Judged%20by%20Gemini%202.5%20Flash&descAlign=50&descAlignY=72&descColor=666666" />

</div>

<div align="center">

![LangGraph](https://img.shields.io/badge/LangGraph-1.3.0-a78bfa?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)
![Mistral](https://img.shields.io/badge/Mistral-Large-FF7000?style=flat-square)
![Llama](https://img.shields.io/badge/Llama-3.1%208B-22c55e?style=flat-square)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?style=flat-square)

</div>

---

```
You give a problem.
Two AIs solve it simultaneously.
A third AI judges who won.
```

---

## How it works

```
         problem
            │
            ▼
    ┌───────────────────┐
    │    solver node    │  ← Promise.all (parallel)
    │                   │
    │   Mistral Large   │  → solution_1
    │   Llama 3.1 8B    │  → solution_2
    └─────────┬─────────┘
              │
              ▼
    ┌───────────────────┐
    │    judge node     │
    │                   │
    │  Gemini 2.5 Flash │  ← structured output (Zod)
    │                   │  → score + reasoning per model
    └─────────┬─────────┘
              │
              ▼
    ┌───────────────────┐
    │   React Frontend  │
    │                   │
    │  Arena (side by   │  ← Markdown + syntax highlight
    │  side solutions)  │
    │  JudgeVerdict     │  ← scores + winner banner
    └───────────────────┘
```

---

## UI Components

| Component | What it does |
|---|---|
| `Header` | Title + Swords icon with purple/cyan gradient |
| `PromptInput` | Textarea + START BATTLE button with loading state |
| `Arena` | Side-by-side model responses with VS badge, Markdown rendered |
| `JudgeVerdict` | Gemini scores (out of 10) + winner trophy banner |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Tailwind CSS v4, Vite, Axios |
| **Markdown** | react-markdown + rehype-highlight |
| **Icons** | lucide-react (Swords, Trophy, Bot, Sparkles) |
| **Backend** | Node.js, Express, TypeScript |
| **AI Framework** | LangGraph + LangChain |
| **Solver 1** | Mistral Large |
| **Solver 2** | Llama 3.1 8B (via Groq) |
| **Judge** | Gemini 2.5 Flash (structured output + Zod) |

---

## Graph Architecture

```typescript
const graph = new StateGraph(State)
  .addNode("solver", solverNode)  // parallel: Mistral + Llama
  .addNode("judge", judgeNode)    // structured: Gemini
  .addEdge(START, "solver")
  .addEdge("solver", "judge")
  .addEdge("judge", END)
  .compile()
```

**State shape:**
```typescript
{
  problem: string
  solution_1: string             // Mistral response
  solution_2: string             // Llama/Groq response
  judge_feedback: {
    solution_1_score: number     // out of 10
    solution_2_score: number
    solution_1_reasoning: string
    solution_2_reasoning: string
  }
}
```

---

## API

```
POST /api/battle
```

**Request:**
```json
{ "problem": "Write a React hook to fetch data with caching" }
```

**Response:**
```json
{
  "problem": "...",
  "solution_1": "Mistral's answer...",
  "solution_2": "Llama's answer...",
  "judge_feedback": {
    "solution_1_score": 8,
    "solution_2_score": 6,
    "solution_1_reasoning": "Well structured with edge cases...",
    "solution_2_reasoning": "Correct but lacks error handling..."
  }
}
```

---

## Setup

### Backend
```bash
cd Backend
npm install
```

Create `.env` in `/Backend`:
```env
GEMINI_API_KEY=your_gemini_key
MISTRAL_API_KEY=your_mistral_key
GROQ_API_KEY=your_groq_key
```

```bash
npm run dev
```
Backend → `http://localhost:3000`

### Frontend
```bash
cd Frontend
npm install
npm run dev
```
Frontend → `http://localhost:5173`

---

## Project Structure

```
ai-model-battle/
├── Backend/
│   ├── server.ts
│   └── src/
│       ├── app.ts                  # Express + /api/battle route
│       ├── config/config.ts
│       └── ai/
│           ├── model.ai.ts         # Mistral + Groq + Gemini init
│           └── graph.ai.ts         # LangGraph battle flow
│
└── Frontend/
    └── src/
        ├── App.jsx                 # State + axios call
        └── components/
            ├── Header.jsx          # Title + icon
            ├── PromptInput.jsx     # Textarea + battle button
            ├── Arena.jsx           # Side by side model outputs
            └── JudgeVerdict.jsx    # Scores + winner banner
```

---

## Roadmap

- [x] LangGraph state machine
- [x] Parallel solver nodes (Mistral + Llama via Promise.all)
- [x] Gemini 2.5 Flash judge with structured output (Zod)
- [x] TypeScript backend
- [x] REST API — POST /api/battle
- [x] React frontend — Arena + JudgeVerdict UI
- [x] Markdown + syntax highlighting in responses
- [x] Glassmorphism dark UI with Tailwind v4
- [x] Winner trophy banner


---

<div align="center">

Built by **[TheShivaji](https://github.com/TheShivaji)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/prathamesh-jagdale-48817330b)

<sub>⭐ Star this repo if you find it useful</sub>

</div>

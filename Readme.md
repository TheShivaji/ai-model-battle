<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0a0a0a,100:0a0a0a&height=160&text=⚔️%20AI%20Model%20Battle&fontSize=42&fontColor=ffffff&fontAlign=50&fontAlignY=50&desc=Mistral%20vs%20Llama%20—%20Judged%20by%20Gemini%202.5%20Flash&descAlign=50&descAlignY=72&descColor=666666" />

</div>

<div align="center">

![LangGraph](https://img.shields.io/badge/LangGraph-1.3.0-a78bfa?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square)
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
    ┌───────────────┐
    │  solver node  │  ← runs in parallel
    │               │
    │ Mistral Large │  → solution_1
    │ Llama 3.1 8B  │  → solution_2
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  judge node   │
    │               │
    │ Gemini 2.5    │  ← structured output (Zod)
    │ Flash         │  → score + reasoning per solution
    └───────┬───────┘
            │
            ▼
         winner
```

Built on **LangGraph** — state machine handles the full battle flow.

---

## Tech Stack

| | |
|---|---|
| **Framework** | LangGraph + LangChain |
| **Language** | TypeScript |
| **Solver 1** | Mistral Large |
| **Solver 2** | Llama 3.1 8B (via Groq) |
| **Judge** | Gemini 2.5 Flash (structured output) |
| **Validation** | Zod |
| **Backend** | Node.js + Express 5 |

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
  solution_1: string        // Mistral response
  solution_2: string        // Llama response
  judge_feedback: {
    solution_1_score: number
    solution_2_score: number
    solution_1_reasoning: string
    solution_2_reasoning: string
  }
}
```

---

## Setup

```bash
git clone https://github.com/TheShivaji/ai-model-battle.git
cd ai-model-battle/Backend
npm install
```

Create `.env`:
```env
GEMINI_API_KEY=your_gemini_key
MISTRAL_API_KEY=your_mistral_key
GROQ_API_KEY=your_groq_key
```

```bash
npm run dev
```

Server → `http://localhost:3000`

---

## Project Structure

```
ai-model-battle/
└── Backend/
    ├── server.ts
    └── src/
        ├── app.ts
        ├── config/
        │   └── config.ts
        └── ai/
            ├── model.ai.ts   # Mistral + Groq + Gemini init
            └── graph.ai.ts   # LangGraph battle flow
```

---

## Roadmap

- [x] LangGraph state machine
- [x] Parallel solver nodes (Mistral + Llama)
- [x] Gemini judge with structured output (Zod)
- [x] TypeScript throughout
- [ ] Frontend — battle UI with live scoring
- [ ] More models — GPT-4o, Claude, DeepSeek
- [ ] History — save past battles to DB
- [ ] Custom judge prompts

---

<div align="center">

Built by **[TheShivaji](https://github.com/TheShivaji)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/prathamesh-jagdale-48817330b)

</div>
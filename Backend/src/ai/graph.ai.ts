import { StateGraph, START, END, Annotation } from "@langchain/langgraph"
import { HumanMessage } from "@langchain/core/messages"
import { z } from "zod"
import { groq, mistral, gemini } from "./model.ai"

const State = Annotation.Root({
    problem: Annotation<string>({ 
        default: () => "", 
        reducer: (_, b) => b 
    }),
    solution_1: Annotation<string>({ 
        default: () => "", 
        reducer: (_, b) => b 
    }),
    solution_2: Annotation<string>({ 
        default: () => "", 
        reducer: (_, b) => b 
    }),
    judge_feedback: Annotation<{
        solution_1_score: number
        solution_2_score: number
        solution_1_reasoning: string
        solution_2_reasoning: string
    }>({
        default: () => ({ 
            solution_1_score: 0, 
            solution_2_score: 0, 
            solution_1_reasoning: "", 
            solution_2_reasoning: "" 
        }),
        reducer: (_, b) => b
    })
})

const solverNode = async (state: typeof State.State) => {
    const [mistralResponse, groqResponse] = await Promise.all([
        mistral.invoke(state.problem),
        groq.invoke(state.problem)
    ])
    return {
        solution_1: mistralResponse.content ,
        solution_2: groqResponse.content
    }
}

const judgeNode = async (state: typeof State.State) => {
    const { problem, solution_1, solution_2 } = state

    const schema = z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
    })

    const structuredGemini = gemini.withStructuredOutput(schema)

    const result = await structuredGemini.invoke([
        new HumanMessage(`
            Problem: ${problem}
            Solution 1: ${solution_1}
            Solution 2: ${solution_2}
            Evaluate and return scores and reasoning for each.
        `)
    ])

    return { judge_feedback: result }
}

const graph = new StateGraph(State)
    .addNode("solver", solverNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solver")
    .addEdge("solver", "judge")
    .addEdge("judge", END)
    .compile()

export default async function startGame(problem: string) {
    const result = await graph.invoke({ problem })
    return result
}
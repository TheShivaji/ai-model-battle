import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import { config } from "../config/config";


const gemini = new ChatGoogleGenerativeAI({
    apiKey: config.gemini,
    model: "gemini-2.5-flash",
    temperature: 0.7,
});

const mistral = new ChatMistralAI({
    apiKey: config.mistral,
    model: "mistral-large",
    temperature: 0.7,
});

const groq = new ChatGroq({
    apiKey: config.groq,
    model: "llama-3.1-8b-instant",
    temperature: 0.7,
});

export { gemini, mistral, groq };

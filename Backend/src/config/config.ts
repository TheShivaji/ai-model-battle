import dotenv from "dotenv";
dotenv.config();

export const config = {
    groq: process.env.GROQ_API_KEY,
    gemini: process.env.GEMINI_API_KEY,
    mistral: process.env.MISTRAL_API_KEY,
}

export const validateConfig = () => {
    if (!config.groq || !config.gemini || !config.mistral) {
        throw new Error("Missing required API keys");
    }
}

export default config;

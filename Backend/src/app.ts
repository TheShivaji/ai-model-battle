import express from 'express';
import cors from 'cors';
import startGame from './ai/graph.ai';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/battle', async (req, res) => {
    try {
        const { problem } = req.body;
        if (!problem) {
            return res.status(400).json({ error: "Problem is required" });
        }
        
        // Start the LangGraph AI workflow
        const result = await startGame(problem);
        
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default app;
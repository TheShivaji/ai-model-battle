import React from 'react';
import { CheckCircle2, Trophy } from 'lucide-react';

export const JudgeVerdict = ({ feedback }) => {
  if (!feedback) return null;

  const mScore = feedback.solution_1_score;
  const gScore = feedback.solution_2_score;
  const winner = mScore > gScore ? "Mistral" : gScore > mScore ? "Groq" : "Tie";

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-blue-500/30 relative shadow-[0_0_50px_rgba(59,130,246,0.15)] mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
      
      <div className="p-8 border-b border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-blue-500/10 relative z-10">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="text-blue-400 w-10 h-10" />
          <h2 className="text-4xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
            Judge's Verdict (Gemini)
          </h2>
        </div>
        
        {winner !== "Tie" && (
          <div className="flex items-center gap-3 bg-yellow-500/20 text-yellow-300 px-6 py-3 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <Trophy className="w-6 h-6" />
            <span className="font-bold text-lg tracking-wide">WINNER: {winner.toUpperCase()}</span>
          </div>
        )}
      </div>
      
      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <ScorePanel 
          model="Mistral" 
          score={mScore} 
          reasoning={feedback.solution_1_reasoning} 
          color="amber"
        />
        <ScorePanel 
          model="Groq" 
          score={gScore} 
          reasoning={feedback.solution_2_reasoning} 
          color="emerald"
        />
      </div>
    </div>
  );
};

const ScorePanel = ({ model, score, reasoning, color }) => {
  const colorClass = color === "amber" ? "text-amber-500" : "text-emerald-500";
  
  return (
    <div className="space-y-5 bg-black/40 p-8 rounded-3xl border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex flex-col mb-4">
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">{model} Evaluation</h3>
        <div className="flex items-end gap-3">
          <span className={`text-7xl font-black ${colorClass} leading-none`}>{score}</span>
          <span className="text-gray-500 font-medium text-2xl mb-2">/ 10</span>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed text-xl">
        {reasoning}
      </p>
    </div>
  );
};

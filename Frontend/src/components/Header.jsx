import React from 'react';
import { Swords } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-16">
      <div className="inline-flex items-center justify-center p-4 bg-purple-900/30 rounded-full mb-6 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <Swords className="w-12 h-12 text-cyan-400" />
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
        AI Battle Arena
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-medium">
        Submit a coding problem and watch Mistral and Groq fight for the best solution, judged by Gemini.
      </p>
    </header>
  );
};

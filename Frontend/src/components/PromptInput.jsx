import React from 'react';
import { Loader2, Swords, Sparkles } from 'lucide-react';

export const PromptInput = ({ problem, setProblem, handleBattle, loading }) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 p-8 rounded-3xl mb-16 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
        Enter Battle Prompt
      </label>
      
      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="e.g. Write a React hook to fetch data with caching..."
        className="w-full h-40 bg-black/40 border border-gray-700 rounded-2xl p-5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none mb-6 text-lg"
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Markdown and code snippets supported
        </div>
        
        <button
          onClick={handleBattle}
          disabled={loading || !problem.trim()}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] text-lg active:scale-95"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Swords className="w-6 h-6" />}
          {loading ? 'MODELS ARE THINKING...' : 'START BATTLE'}
        </button>
      </div>
    </div>
  );
};

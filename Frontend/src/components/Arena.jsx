import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Bot } from 'lucide-react';

export const Arena = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16 relative animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* VS Badge for Desktop */}
      <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-900 border-2 border-gray-700 rounded-full items-center justify-center z-20 shadow-2xl font-black text-2xl text-white">
        VS
      </div>

      {/* Mistral Box */}
      <ModelBox 
        title="Model 1 (Mistral)" 
        content={result.solution_1} 
        type="mistral" 
      />

      {/* Groq Box */}
      <ModelBox 
        title="Model 2 (Groq)" 
        content={result.solution_2} 
        type="groq" 
      />
    </div>
  );
};

const ModelBox = ({ title, content, type }) => {
  const isMistral = type === "mistral";
  const glow = isMistral ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)";
  const borderTop = isMistral ? "border-t-amber-500" : "border-t-emerald-500";
  const iconColor = isMistral ? "text-amber-500" : "text-emerald-500";
  const bgGrad = isMistral ? "from-amber-500/10" : "from-emerald-500/10";

  return (
    <div 
      className={`bg-gray-900/80 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col border border-gray-800 border-t-4 ${borderTop} relative shadow-2xl`}
      style={{ boxShadow: `0 20px 40px ${glow}` }}
    >
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${bgGrad} to-transparent opacity-40 pointer-events-none rounded-bl-full`} />
      
      <div className="p-6 border-b border-gray-800 flex items-center gap-4 bg-black/20 z-10">
        <Bot className={`${iconColor} w-8 h-8`} />
        <h2 className="font-bold text-2xl text-white tracking-wide">{title}</h2>
      </div>
      
      <div className="p-8 overflow-y-auto max-h-[650px] flex-1 text-gray-300 z-10 custom-scrollbar text-lg">
        <div className="prose prose-invert prose-lg max-w-none prose-pre:bg-[#282c34] prose-pre:border prose-pre:border-gray-700/50 prose-pre:shadow-lg prose-pre:rounded-xl">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {content || "No output generated."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

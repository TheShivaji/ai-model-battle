import React, { useState } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { Arena } from './components/Arena';
import { JudgeVerdict } from './components/JudgeVerdict';

export const App = () => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleBattle = async () => {
    if (!problem.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/battle', { problem });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch from backend. Ensure the backend server is running on port 3000 (cd Backend && npm run dev).');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white p-6 md:p-12 xl:p-16">
      <Header />
      
      <PromptInput 
        problem={problem} 
        setProblem={setProblem} 
        handleBattle={handleBattle} 
        loading={loading} 
      />

      {error && (
        <div className="max-w-5xl mx-auto mb-12 p-4 bg-red-900/50 border border-red-500/50 rounded-2xl text-red-200 text-center text-lg">
          {error}
        </div>
      )}

      <Arena result={result} />
      
      {result && <JudgeVerdict feedback={result.judge_feedback} />}
    </div>
  );
}

export default App;

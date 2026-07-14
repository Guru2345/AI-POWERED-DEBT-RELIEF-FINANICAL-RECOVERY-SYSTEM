import { Layers, ArrowDown, Database } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
          AI Powered Debt Relief & Financial Recovery Platform
        </h1>
        <p className="text-zinc-400 mt-2 text-lg">Enterprise Architecture</p>
      </header>

      <div className="space-y-4">
        {/* User Layer */}
        <div className="bg-blue-900/10 border border-blue-500/30 rounded-2xl p-6 relative">
          <h2 className="text-sm font-bold text-blue-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> USER LAYER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['Borrower/User Login & Registration', 'Dashboard Access', 'Settlement Request', 'AI Negotiation Request'].map((item, i) => (
              <div key={i} className="bg-blue-950/50 border border-blue-500/20 text-blue-100 p-4 rounded-xl text-center text-sm font-medium shadow-sm hover:border-blue-400/50 transition-colors">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-2 relative">
          <ArrowDown className="w-5 h-5 text-zinc-500" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 bg-zinc-950 px-2 absolute top-1/2 -translate-y-1/2 mt-0">User Interaction</span>
        </div>

        {/* Frontend Layer */}
        <div className="bg-purple-900/10 border border-purple-500/30 rounded-2xl p-6 relative">
          <h2 className="text-sm font-bold text-purple-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> FRONTEND LAYER (React.js + Vite)
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Login Page', 'Financial Dashboard', 'Settlement Predictor', 
              'AI Negotiation Letter Generator', 'Financial Health Tracker', 
              'AI History Module', 'Responsive UI Components'
            ].map((item, i) => (
              <div key={i} className="bg-purple-950/50 border border-purple-500/20 text-purple-100 p-4 rounded-xl text-center text-sm font-medium shadow-sm hover:border-purple-400/50 transition-colors flex-1 min-w-[150px] max-w-[200px]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-around py-2 relative">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Authentication Flow</span>
          </div>
          <div className="flex flex-col items-center">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">HTTPS / JSON</span>
          </div>
          <div className="flex flex-col items-center">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">API Communication</span>
          </div>
        </div>

        {/* API Layer */}
        <div className="bg-sky-900/10 border border-sky-500/30 rounded-2xl p-6 relative">
          <h2 className="text-sm font-bold text-sky-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> API LAYER (FastAPI Backend)
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Authentication APIs', 'Loan Management APIs', 'Financial Calculation APIs', 
              'Settlement Prediction APIs', 'AI Negotiation APIs', 'JWT Authentication Middleware'
            ].map((item, i) => (
              <div key={i} className={`bg-sky-950/50 border border-sky-500/20 text-sky-100 p-4 rounded-xl text-center text-sm shadow-sm hover:border-sky-400/50 transition-colors flex-1 min-w-[150px] max-w-[200px] ${item.includes('Middleware') ? 'italic font-normal text-sky-200/80' : 'font-medium'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-around py-2 relative w-1/2 mx-auto">
          <div className="flex flex-col items-center">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Financial Analysis</span>
          </div>
          <div className="flex flex-col items-center">
            <ArrowDown className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">AI Processing</span>
          </div>
        </div>

        {/* AI Processing Layer */}
        <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-6 relative">
          <h2 className="text-sm font-bold text-emerald-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> AI & FINANCIAL PROCESSING LAYER
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Financial Health Engine', 'Debt Stress Analyzer', 'Settlement Prediction Engine', 
              'AI Negotiation Strategy Generator', 'Rule-Based Fallback Logic', 'Google Gemini API Integration'
            ].map((item, i) => (
              <div key={i} className={`bg-emerald-950/50 border border-emerald-500/20 text-emerald-100 p-4 rounded-xl text-center text-sm shadow-sm hover:border-emerald-400/50 transition-colors flex-1 min-w-[150px] max-w-[200px] ${item.includes('Gemini') ? 'font-bold text-white border-emerald-500/50 bg-emerald-900/50' : 'font-medium'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-2 relative">
          <ArrowDown className="w-5 h-5 text-zinc-500" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 bg-zinc-950 px-2 absolute top-1/2 -translate-y-1/2 mt-0">Database Queries</span>
        </div>

        {/* Database Layer */}
        <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 relative">
          <h2 className="text-sm font-bold text-zinc-300 tracking-widest uppercase mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> DATABASE LAYER (SQLite + SQLAlchemy)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'User Data Storage', 'Loan Records', 'AI Negotiation History', 'Settlement Data'
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/80 border border-zinc-700/50 text-zinc-200 p-4 rounded-xl text-center text-sm font-medium shadow-sm hover:border-zinc-500/50 transition-colors flex flex-col items-center gap-3">
                <Database className="w-8 h-8 text-zinc-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

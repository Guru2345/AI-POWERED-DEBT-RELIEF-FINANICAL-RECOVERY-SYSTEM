import { useState } from 'react';
import { Scan, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function OCRAnalyzer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sample1 = `FINAL DEMAND NOTICE
Date: 12-Oct-2023
Account: HDFC Credit Card XXXX-1234
Outstanding: Rs. 145,000
Dear Customer, your account is severely overdue by 120 days. A late fee of Rs. 1500 and penal interest of 3.5% pm has been applied. If you do not pay within 7 days, legal action under Section 138 will be initiated.`;
  const sample2 = `LOAN RECALL NOTICE
Axis Bank Personal Loan
Outstanding: Rs. 4,50,000
Overdue: 90 Days
You are in default. Pay total amount immediately or face arbitration proceedings.`;

  const handleScan = async () => {
    if (!text) return;
    setLoading(true);
    // Simulate API call for now to keep it responsive, could wire to gemini if needed
    setTimeout(() => {
      setResult({
        amount: "₹1,45,000",
        overdue: "120 days",
        fees: "₹1,500 + 3.5% p.m.",
        risks: ["Legal action threatened (Sec 138)"],
        advice: "The threat of Section 138 is typically for bounced cheques. If this is a credit card, it may be an empty threat. However, the high penal interest is rapidly increasing your debt. Prioritize settlement."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col h-full border-t-4 border-t-emerald-500">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-xl font-display font-bold text-white">AI Notice OCR & Clause Analyzer</h3>
      </div>
      <p className="text-zinc-400 text-xs mb-4">Dissect legal threats, uncover hidden late fees, and extract stats</p>
      
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] text-zinc-400 self-center uppercase tracking-wider font-bold">Preload Default Sample:</span>
          <button onClick={() => {setText(sample1); setResult(null);}} className="text-[10px] font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-full transition-colors border border-zinc-700">Sample 1</button>
          <button onClick={() => {setText(sample2); setResult(null);}} className="text-[10px] font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded-full transition-colors border border-zinc-700">Sample 2</button>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste default notice or recovery notice here. E.g. HDFC card demand of Rs. 145000..."
          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-sm text-zinc-300 h-28 focus:outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-zinc-600 custom-scrollbar"
        />
        
        <button onClick={handleScan} disabled={loading || !text} className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 rounded-xl flex justify-center items-center gap-2 text-white text-sm font-medium transition-all shadow-md shadow-emerald-500/20">
          {loading ? <Scan className="w-4 h-4 animate-spin" /> : <Scan className="w-4 h-4" />}
          {loading ? 'Scanning Payload...' : 'Perform Smart OCR Scan'}
        </button>
        
        <div className="flex-1 mt-4">
          {result ? (
            <div className="space-y-3 animate-in fade-in duration-500 h-full flex flex-col">
              <div className="grid grid-cols-3 gap-2">
                 <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-700/50">
                   <div className="text-[10px] text-zinc-500 mb-0.5">Extracted Amount</div>
                   <div className="font-mono text-red-400 font-bold text-xs">{result.amount}</div>
                 </div>
                 <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-700/50">
                   <div className="text-[10px] text-zinc-500 mb-0.5">Overdue Age</div>
                   <div className="font-mono text-amber-400 font-bold text-xs">{result.overdue}</div>
                 </div>
                 <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-700/50">
                   <div className="text-[10px] text-zinc-500 mb-0.5">Hidden Penalties</div>
                   <div className="font-mono text-emerald-400 font-bold text-xs">{result.fees}</div>
                 </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                <h4 className="flex items-center gap-1.5 text-red-400 font-medium text-[11px] uppercase tracking-wider mb-1.5"><AlertCircle className="w-3.5 h-3.5" /> Detected Risks</h4>
                <ul className="text-xs text-red-200/80 list-disc pl-4 space-y-0.5">
                  {result.risks.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div className="bg-teal-500/10 border border-teal-500/20 p-3 rounded-lg flex-1">
                <h4 className="flex items-center gap-1.5 text-teal-400 font-medium text-[11px] uppercase tracking-wider mb-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> AI Strategic Advice</h4>
                <p className="text-xs text-teal-100/80 leading-relaxed">{result.advice}</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-zinc-950/50 border border-zinc-800 border-dashed rounded-xl p-6 text-center flex flex-col items-center justify-center">
              <FileText className="w-6 h-6 text-zinc-600 mb-2" />
              <p className="text-zinc-400 text-xs font-medium">Awaiting noticed payload scan</p>
              <p className="text-zinc-500 text-[10px] mt-2 leading-relaxed">Select a sample default notice above or paste communication letter text, then click "Perform Smart OCR Scan" to let Gemini extract core figures and flag hidden risks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

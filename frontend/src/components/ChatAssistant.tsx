import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Mic, MicOff } from 'lucide-react';

export default function ChatAssistant() {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([{
    role: 'model', text: "Hello, I'm your AI Debt Advisor. I can help you understand your options, plan a budget, or prepare for collections calls. How can I support you today?"
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setInput((prev) => prev + (prev ? ' ' : '') + 'I can\'t pay my loan.');
    } else {
      setIsRecording(true);
      // Simulate listening duration
      setTimeout(() => {
        setIsRecording(false);
        setInput((prev) => prev + (prev ? ' ' : '') + 'I can\'t pay my loan.');
      }, 3000);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          history: messages,
          context: { totalDebt: 10000 } // Example context
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] glass-card rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3 bg-[#0F172A]/80 relative z-10">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Bot className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-white">AI Debt Advisor</h2>
          <p className="text-sm text-zinc-400">Secure & Confidential Session</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-teal-600' : 'bg-emerald-500/20'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-emerald-400" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-teal-600 text-white shadow-md shadow-teal-500/10' : 'bg-zinc-950 border border-zinc-700/50 text-zinc-200'}`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="bg-zinc-950 border border-zinc-700/50 rounded-2xl p-4 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
              <span className="text-sm text-zinc-400">Analyzing...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-zinc-800 bg-[#0F172A]/80 relative z-10">
        <div className="flex gap-2">
          <button 
            onClick={toggleRecording}
            className={`p-3 rounded-xl transition-all flex items-center justify-center ${isRecording ? 'bg-red-500/20 text-red-500 border border-red-500/50 animate-pulse' : 'bg-zinc-950 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600'}`}
            title="Voice-to-Advice"
          >
             {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your concern or use the mic..." 
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors placeholder:text-zinc-600"
          />
          <button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="btn-gradient disabled:opacity-50 text-white rounded-xl px-6 py-3 flex items-center justify-center transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {isRecording && <div className="mt-2 text-[10px] text-red-400 text-center animate-pulse">Listening... (Simulated)</div>}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Target, TrendingDown, AlertTriangle, ShieldCheck, Wallet, ArrowUpRight, ArrowDownRight, Activity, Lightbulb, CheckCircle2, Plus, RefreshCw, BarChart3, LineChart, Info, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, LineChart as RechartsLineChart, Line, Legend } from 'recharts';
import OCRAnalyzer from './OCRAnalyzer';
import Achievements from './Achievements';

const incomeData = [
  { name: 'Jan', income: 2000000, expense: 500000, emi: 0 },
  { name: 'Feb', income: 2000000, expense: 500000, emi: 0 },
  { name: 'Mar', income: 2000000, expense: 500000, emi: 0 },
  { name: 'Apr', income: 2000000, expense: 500000, emi: 0 },
  { name: 'May', income: 2000000, expense: 500000, emi: 0 },
  { name: 'Jun', income: 2000000, expense: 500000, emi: 0 },
];

const projectionsData = [
  { month: 'Jul', activeEmi: 0, safeThreshold: 800000 },
  { month: 'Aug', activeEmi: 0, safeThreshold: 800000 },
  { month: 'Sep', activeEmi: 0, safeThreshold: 800000 },
  { month: 'Oct', activeEmi: 0, safeThreshold: 800000 },
  { month: 'Nov', activeEmi: 0, safeThreshold: 800000 },
  { month: 'Dec', activeEmi: 0, safeThreshold: 800000 },
];

export default function ExecutiveDashboard() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [totalExposure, setTotalExposure] = useState(875000);
  const [netWorth, setNetWorth] = useState(3200000);
  const [cashReserves, setCashReserves] = useState(750000);
  const [riskLevel, setRiskLevel] = useState(2);
  const [userName, setUserName] = useState('');
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editableNetWorth, setEditableNetWorth] = useState(3200000);
  const [editableReserves, setEditableReserves] = useState(750000);

  // Simulator state
  const [simBalance, setSimBalance] = useState(300000);
  const [simIncome, setSimIncome] = useState(80000);
  const [simExpenses, setSimExpenses] = useState(40000);
  const [simOverdue, setSimOverdue] = useState(6);

  // Modal state
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [editableIncome, setEditableIncome] = useState(80000);
  const [editableExpenses, setEditableExpenses] = useState(40000);
  const [showDebtModal, setShowDebtModal] = useState(false);
  
  useEffect(() => {
    fetch('/api/loans').then(res => res.json()).then(setPortfolios).catch(console.error);
  }, []);

  const totalLiabilities = portfolios.reduce((acc: number, p: any) => acc + (p.balance || 0), 0);
  const monthlyObligations = portfolios.reduce((acc: number, p: any) => acc + (p.emi || 0), 0);
  const activeAccounts = portfolios.length;
  
  const liquidityRatio = netWorth > 0 ? (cashReserves / netWorth) * 100 : 0;
  const leverageRatio = netWorth > 0 ? (totalLiabilities / netWorth) * 100 : 0;
  const coverageRatio = monthlyObligations > 0 ? (cashReserves / (monthlyObligations * 12)) * 100 : 0;

  // Simulator derived values
  const simTargetRatio = simOverdue > 12 ? 0.35 : simOverdue > 6 ? 0.45 : 0.60;
  const simOffer = simBalance * simTargetRatio;
  const simSavings = simBalance - simOffer;
  const disposableIncome = Math.max(0, simIncome - simExpenses);
  const dtiRatio = simIncome > 0 ? (simBalance / (simIncome * 12)) : 1;
  const simChance = Math.min(95, Math.max(10, Math.round(
    40 + (simOverdue * 2.5) + (dtiRatio > 0.5 ? 15 : 5) - (disposableIncome > 30000 ? 5 : 0)
  )));

  // Aliases used in JSX
  const loans = portfolios;
  const numAccounts = activeAccounts;

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-2">
              Portfolio Command Center
            </h1>
            <p className="text-purple-200 text-lg">
              Executive oversight for {userName ? `${userName}'s` : 'your'} financial ecosystem and risk management
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-sm font-medium border border-green-500/30">
                ● System Online
              </div>
              <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                Real-time Data
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-purple-200 font-medium transition-all duration-200 shadow-lg backdrop-blur-sm"
            >
              <RefreshCw className="w-4 h-4" /> Portfolio Settings
            </button>
            <button 
              onClick={() => setShowDebtModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-all duration-200 shadow-lg"
            >
              <Plus className="w-4 h-4" /> New Portfolio Entry
            </button>
          </div>
        </div>
      </div>
      
      {/* Executive KPI Grid - Completely Different Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Primary Metrics - Large Cards */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full -mr-16 -mt-16" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <Wallet className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-emerald-100 font-semibold text-lg">Portfolio Value</h3>
                  <p className="text-emerald-200/60 text-sm">Net Asset Position</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">₹{netWorth.toLocaleString('en-IN')}</div>
                <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" /> +12.3%
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-emerald-200/70 text-xs mb-1">Liquid Assets</p>
                <p className="text-white font-semibold">₹{cashReserves.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-emerald-200/70 text-xs mb-1">Active Positions</p>
                <p className="text-white font-semibold">{activeAccounts} Accounts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl border border-red-500/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-400/10 rounded-full -mr-12 -mt-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-300" />
              <div>
                <h3 className="text-red-100 font-semibold">Risk Exposure</h3>
                <p className="text-red-200/60 text-sm">Total Liabilities</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">₹{totalLiabilities.toLocaleString('en-IN')}</div>
            <div className="w-full bg-red-900/40 rounded-full h-2 mb-3">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(leverageRatio, 100)}%` }}></div>
            </div>
            <p className="text-red-200/70 text-xs">Leverage Ratio: {leverageRatio.toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full -mr-12 -mt-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-blue-300" />
              <div>
                <h3 className="text-blue-100 font-semibold">Liquidity Health</h3>
                <p className="text-blue-200/60 text-sm">Coverage Metrics</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{liquidityRatio.toFixed(1)}%</div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-blue-200/70">Coverage:</span>
                <span className="text-blue-200 font-medium">{coverageRatio.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-blue-200/70">Monthly Flow:</span>
                <span className="text-blue-200 font-medium">₹{monthlyObligations.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Section - Completely Different */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Portfolio Performance Matrix */}
        <div className="xl:col-span-2 bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Portfolio Performance Matrix
              </h3>
              <p className="text-purple-200/60 text-sm mt-1">Comprehensive financial position analysis</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">6M</button>
              <button className="px-3 py-1 text-xs bg-purple-500 text-white rounded-lg">1Y</button>
              <button className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">All</button>
            </div>
          </div>
          
          <div className="h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLiabilities" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(v) => '₹' + (v/100000) + 'L'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#6B7280', 
                    borderRadius: '0.75rem', 
                    color: '#fff',
                    border: '1px solid rgba(147, 51, 234, 0.3)'
                  }} 
                  cursor={{fill: 'rgba(147, 51, 234, 0.1)'}} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#D1D5DB' }} />
                <Area type="monotone" dataKey="income" name="Portfolio Value" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorAssets)" />
                <Area type="monotone" dataKey="expense" name="Operating Costs" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorLiabilities)" />
                <Area type="monotone" dataKey="emi" name="Debt Service" stroke="#EF4444" strokeWidth={2} fill="#EF4444" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">₹{(netWorth/100000).toFixed(1)}L</div>
              <div className="text-purple-200/60 text-sm">Net Position</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">₹{(totalLiabilities/100000).toFixed(1)}L</div>
              <div className="text-orange-200/60 text-sm">Total Exposure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{liquidityRatio.toFixed(1)}%</div>
              <div className="text-green-200/60 text-sm">Liquidity Ratio</div>
            </div>
          </div>
        </div>

        {/* Risk Assessment Dashboard */}
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl border border-red-500/20 p-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-red-400" />
            Risk Assessment Matrix
          </h3>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full border-4 border-orange-500 flex items-center justify-center mb-4 relative">
                <div className="text-2xl font-bold text-white">{Math.max(1, Math.min(5, riskLevel))}</div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="px-2 py-1 bg-orange-500 text-white text-xs rounded font-medium">
                    MODERATE
                  </div>
                </div>
              </div>
              <p className="text-orange-200/70 text-sm">Portfolio Risk Level</p>
            </div>

            <div className="space-y-4">
              <div className="bg-black/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-red-200/70 text-sm">Credit Risk</span>
                  <span className="text-red-300 font-medium">{leverageRatio.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-red-900/40 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(leverageRatio, 100)}%` }}></div>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-200/70 text-sm">Liquidity Risk</span>
                  <span className="text-yellow-300 font-medium">{(100-liquidityRatio).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-yellow-900/40 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(100-liquidityRatio, 100)}%` }}></div>
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-orange-200/70 text-sm">Operational Risk</span>
                  <span className="text-orange-300 font-medium">23%</span>
                </div>
                <div className="w-full bg-orange-900/40 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 text-red-200 py-3 rounded-xl transition-all duration-200">
              Generate Risk Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 6-Month Projections */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
           <h3 className="text-lg font-display font-bold text-white mb-1">6-Month Payment Commitment Forecast</h3>
           <p className="text-xs text-zinc-400 mb-6">Optimizes to manageable levels through strategic negotiation plans.</p>
           
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <RechartsLineChart data={projectionsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                 <XAxis dataKey="month" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                 <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(v) => (v/100000) + 'L'} />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#fff' }} />
                 <Legend wrapperStyle={{ fontSize: '12px' }} />
                 <Line type="monotone" dataKey="activeEmi" name="Active Payment Obligations" stroke="#8B5CF6" strokeWidth={3} dot={{r: 4, fill: '#8B5CF6'}} />
                 <Line type="stepAfter" dataKey="safeThreshold" name="Optimal Threshold (40% DTI)" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
               </RechartsLineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Customized AI Action Suggestions */}
        <div className="glass-card p-6 rounded-2xl flex flex-col h-full">
           <h3 className="text-lg font-display font-bold text-white flex items-center gap-2 mb-6">
             <Lightbulb className="w-5 h-5 text-amber-500" /> Intelligent Action Recommendations
           </h3>
           
           <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
             <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
               <div className="flex items-center gap-2 mb-1">
                 <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Cost Optimizer</span>
               </div>
               <h4 className="text-indigo-100 font-medium text-sm mb-2">Enhance payment capacity by ₹1,000 monthly</h4>
               <p className="text-indigo-200/70 text-xs mb-3">Directing ₹1,000 additional to your highest interest obligation can reduce tenure by 4 months, conserving ₹15,400 in penalty charges.</p>
               <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors">Review optimization strategy <ChevronRight className="w-3 h-3" /></button>
             </div>

             <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
               <div className="flex items-center gap-2 mb-1">
                 <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Negotiation Opportunity</span>
               </div>
               <h4 className="text-purple-100 font-medium text-sm mb-2">Propose 35% Lump-Sum to Creditors now</h4>
               <p className="text-purple-200/70 text-xs mb-3">Your accounts show extended delinquency. Initiating negotiation requests today has an 89% system acceptance rate, reducing ₹0 off principal.</p>
               <button className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 transition-colors">Analyze acceptance patterns <ChevronRight className="w-3 h-3" /></button>
             </div>

             <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
               <div className="flex items-center gap-2 mb-1">
                 <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Urgent Risk</span>
               </div>
               <h4 className="text-red-100 font-medium text-sm mb-2">Apply for financial hardship protections</h4>
               <p className="text-red-200/70 text-xs mb-3">Prevent payment defaults. Request a 3-month deferment from HDFC using customized documentation templates with medical or employment evidence.</p>
               <button className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors">Generate hardship documentation <ChevronRight className="w-3 h-3" /></button>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Settlement Probability Simulator Mini */}
        <div className="glass-card p-6 rounded-2xl border-t-4 border-t-indigo-500 flex flex-col">
          <h3 className="text-xl font-display font-bold text-white mb-1">Smart Negotiation Probability Engine</h3>
          <p className="text-xs text-zinc-400 mb-6">Adjust parameters below to visualize real-time lender acceptance trends and success probabilities.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
             <div className="space-y-5">
               <div>
                 <div className="flex justify-between text-xs mb-1.5 text-zinc-300">
                   <label>Total Loan Principal:</label>
                   <span className="font-mono text-indigo-400">₹{simBalance.toLocaleString('en-IN')}</span>
                 </div>
                 <input type="range" min="10000" max="1000000" step="10000" value={simBalance} onChange={(e) => setSimBalance(Number(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1.5 text-zinc-300">
                   <label>Monthly Net Income:</label>
                   <span className="font-mono text-green-400">₹{simIncome.toLocaleString('en-IN')}</span>
                 </div>
                 <input type="range" min="10000" max="3000000" step="10000" value={simIncome} onChange={(e) => setSimIncome(Number(e.target.value))} className="w-full accent-green-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1.5 text-zinc-300">
                   <label>Living Expenses:</label>
                   <span className="font-mono text-amber-400">₹{simExpenses.toLocaleString('en-IN')}</span>
                 </div>
                 <input type="range" min="10000" max="2000000" step="10000" value={simExpenses} onChange={(e) => setSimExpenses(Number(e.target.value))} className="w-full accent-amber-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1.5 text-zinc-300">
                   <label>Overdue Duration:</label>
                   <span className="font-mono text-emerald-400">{simOverdue} Months Default</span>
                 </div>
                 <input type="range" min="0" max="24" step="1" value={simOverdue} onChange={(e) => setSimOverdue(Number(e.target.value))} className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
               </div>
             </div>
             
             <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-700/50 flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-4 text-indigo-400">
                 <Activity className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Live Smart Analysis</span>
               </div>
               <div className="space-y-4">
                 <div>
                   <div className="text-xs text-zinc-400 mb-1">Target Negotiation Amount:</div>
                   <div className="text-2xl font-display font-bold text-white">₹{simOffer.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                   <div className="text-[10px] text-indigo-400">({(simTargetRatio*100).toFixed(0)}% Negotiation Offer)</div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                   <div>
                     <div className="text-[10px] text-zinc-500 mb-1">Potential Savings:</div>
                     <div className="text-sm font-bold text-green-400">₹{simSavings.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                   </div>
                   <div>
                     <div className="text-[10px] text-zinc-500 mb-1">Lender Approval Probability:</div>
                     <div className="text-sm font-bold text-amber-400">{simChance}% Chance</div>
                   </div>
                 </div>
               </div>
               <div className="mt-4 text-[10px] text-zinc-500 leading-relaxed bg-zinc-800/50 p-2 rounded flex gap-2 items-start">
                 <Info className="w-3 h-3 shrink-0 mt-0.5 text-zinc-400" /> Account is significantly overdue! Success probability increases as lenders prefer loss-mitigation over complete write-off.
               </div>
             </div>
          </div>
        </div>

        {/* OCR Analyzer */}
        <OCRAnalyzer />
      </div>

      {/* Gamification */}
      <Achievements />
      
      {/* Registered Liabilities Ledger */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-display font-bold text-white">Financial Obligations Registry</h3>
            <p className="text-sm text-zinc-400 mt-1">Tracked: {numAccounts} Active Accounts</p>
          </div>
          <button className="bg-[#0F172A] hover:bg-zinc-800 text-white text-sm font-medium px-4 py-2 rounded-lg border border-zinc-700 transition-colors">
            View All
          </button>
        </div>
        
        {loans.length === 0 ? (
          <div className="bg-zinc-950/50 border border-zinc-800 border-dashed rounded-xl p-10 text-center">
            <Wallet className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
            <h4 className="text-zinc-300 font-medium mb-2">No active financial obligations registered in system yet.</h4>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">Click the "Add Financial Account" button above to populate your portfolio metrics and enable personalized smart strategies.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-zinc-400">
                <thead className="text-xs text-zinc-500 uppercase bg-zinc-950 border-b border-zinc-800">
                   <tr>
                      <th className="px-4 py-3 rounded-tl-lg font-medium">Institution</th>
                      <th className="px-4 py-3 font-medium">Outstanding Amount</th>
                      <th className="px-4 py-3 font-medium">Interest Rate</th>
                      <th className="px-4 py-3 font-medium">Monthly Payment</th>
                      <th className="px-4 py-3 rounded-tr-lg font-medium text-right">Status</th>
                   </tr>
                </thead>
                <tbody>
                   {loans.map((loan: any) => (
                     <tr key={loan.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                        <td className="px-4 py-4 font-medium text-zinc-200">{loan.creditor}</td>
                        <td className="px-4 py-4 font-mono text-white">₹{loan.balance.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-4">{loan.interestRate}%</td>
                        <td className="px-4 py-4 font-mono">₹{loan.emi.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-4 text-right">
                           <span className="bg-green-500/10 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/20">Active</span>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {showIncomeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Update Income & Surplus</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Monthly Income (₹)</label>
                <input 
                  type="number" 
                  value={editableIncome}
                  onChange={(e) => setEditableIncome(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Monthly Expenses (₹)</label>
                <input 
                  type="number" 
                  value={editableExpenses}
                  onChange={(e) => setEditableExpenses(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowIncomeModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowIncomeModal(false)}
                className="flex-1 btn-gradient py-2 rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDebtModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Add Financial Account</h2>
            <p className="text-zinc-400 text-sm mb-4">This is a demonstration form for testing purposes.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Institution Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. HDFC Bank"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Outstanding Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowDebtModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowDebtModal(false)}
                className="flex-1 btn-gradient py-2 rounded-lg transition-colors"
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-1">Portfolio Settings</h2>
            <p className="text-zinc-400 text-sm mb-4">Update your core financial position values.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Net Worth / Portfolio Value (₹)</label>
                <input
                  type="number"
                  value={editableNetWorth}
                  onChange={(e) => setEditableNetWorth(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Cash Reserves (₹)</label>
                <input
                  type="number"
                  value={editableReserves}
                  onChange={(e) => setEditableReserves(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setNetWorth(editableNetWorth);
                  setCashReserves(editableReserves);
                  setShowSettingsModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 rounded-lg transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


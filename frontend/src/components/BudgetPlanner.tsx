import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Lightbulb, Wallet, ArrowRight, Zap, Target } from 'lucide-react';

export default function BudgetPlanner() {
  const [income, setIncome] = useState<number | string>(2000000);
  const [expenses, setExpenses] = useState<number | string>(500000);
  const [emi, setEmi] = useState<number | string>(100000);

  const numIncome = Number(income) || 0;
  const numExpenses = Number(expenses) || 0;
  const numEmi = Number(emi) || 0;
  const surplus = numIncome - numExpenses - numEmi;

  const data = [
    { name: 'Living Expenses', value: numExpenses, color: '#F59E0B' }, // Warning
    { name: 'EMI Payments', value: numEmi, color: '#EF4444' }, // Danger
    { name: 'Available Surplus', value: Math.max(0, surplus), color: '#10B981' }, // Success
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">AI Budget Planner</h1>
        <p className="text-zinc-400 mt-1">Automatically balance your income to maximize debt recovery.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl lg:col-span-1 flex flex-col gap-6">
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Monthly Net Income</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-zinc-400">₹</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Living Expenses (Survival)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-zinc-400">₹</span>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Current EMI Commitments</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-zinc-400">₹</span>
              <input
                type="number"
                value={emi}
                onChange={(e) => setEmi(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          <div className="mt-auto bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-sm text-zinc-400 mb-1">Monthly Surplus</div>
            <div className={`text-3xl font-display font-bold ${surplus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ₹{surplus.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl lg:col-span-2 border-t-4 border-t-emerald-500 flex flex-col">
          <h2 className="text-xl font-display font-bold text-white mb-6">AI Recommended Allocation</h2>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                 <div className="flex gap-3">
                   <Target className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                   <div>
                     <h3 className="font-bold text-emerald-100 text-sm mb-1">Emergency Fund Allocation</h3>
                     <p className="text-xs text-emerald-200/70">Divert 20% of your surplus (₹{(surplus * 0.2).toLocaleString('en-IN')}) to a high-yield savings account for emergencies to avoid new debt.</p>
                   </div>
                 </div>
               </div>
               
               <div className="bg-teal-500/10 border border-teal-500/20 p-4 rounded-xl">
                 <div className="flex gap-3">
                   <Zap className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                   <div>
                     <h3 className="font-bold text-teal-100 text-sm mb-1">Avalanche Debt Payoff</h3>
                     <p className="text-xs text-teal-200/70">Allocate the remaining 80% (₹{(surplus * 0.8).toLocaleString('en-IN')}) as extra payments towards your highest interest rate loan.</p>
                   </div>
                 </div>
               </div>
               
               <div className="bg-zinc-950 border border-zinc-700/50 p-4 rounded-xl flex items-center justify-between">
                 <div>
                   <div className="text-xs text-zinc-400 mb-1">Projected Debt Free Date</div>
                   <div className="font-bold text-white">August 2027</div>
                 </div>
                 <button className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center gap-1 transition-colors">
                   View Schedule <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

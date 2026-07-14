import { useState } from 'react';
import { Target, Activity, TrendingUp, BarChart, Zap, DollarSign } from 'lucide-react';

export default function RecoveryOptimizer() {
  const [selectedStrategy, setSelectedStrategy] = useState('aggressive');
  const [portfolioValue, setPortfolioValue] = useState<number>(1200000);
  const [cashPosition, setCashPosition] = useState<number>(180000);
  const [riskTolerance, setRiskTolerance] = useState<number>(65);
  const [timeHorizon, setTimeHorizon] = useState<number>(18);

  const strategies = [
    { 
      id: 'aggressive', 
      name: 'Aggressive Recovery', 
      color: 'red', 
      icon: Zap,
      description: 'Maximum recovery focus with expedited timeline' 
    },
    { 
      id: 'balanced', 
      name: 'Balanced Approach', 
      color: 'blue', 
      icon: Target,
      description: 'Optimized risk-return strategy' 
    },
    { 
      id: 'conservative', 
      name: 'Conservative Path', 
      color: 'green', 
      icon: TrendingUp,
      description: 'Stability-focused long-term approach' 
    }
  ];

  // Advanced optimization calculations
  const baseRecoveryRate = selectedStrategy === 'aggressive' ? 0.78 : 
                          selectedStrategy === 'balanced' ? 0.65 : 0.52;
  const riskAdjustment = (riskTolerance / 100) * 0.2;
  const timeAdjustment = timeHorizon > 12 ? 0.15 : timeHorizon > 6 ? 0.08 : 0;
  
  const optimizedRecovery = portfolioValue * (baseRecoveryRate + riskAdjustment + timeAdjustment);
  const cashRequirement = optimizedRecovery * 0.35;
  const successProbability = Math.min(95, Math.floor(45 + (riskTolerance * 0.8) + (timeHorizon * 2.1)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent mb-2">
          Strategic Recovery Optimizer
        </h1>
        <p className="text-orange-200">Advanced algorithmic approach to portfolio recovery and strategic financial restructuring</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Strategy Selection */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            Recovery Strategy
          </h2>
          
          <div className="space-y-4">
            {strategies.map((strategy) => {
              const Icon = strategy.icon;
              const isSelected = selectedStrategy === strategy.id;
              const colorClasses = {
                red: isSelected ? 'bg-red-500/20 border-red-400/50 text-red-200' : 'border-red-500/20 text-red-300/60 hover:bg-red-500/10',
                blue: isSelected ? 'bg-blue-500/20 border-blue-400/50 text-blue-200' : 'border-blue-500/20 text-blue-300/60 hover:bg-blue-500/10',
                green: isSelected ? 'bg-green-500/20 border-green-400/50 text-green-200' : 'border-green-500/20 text-green-300/60 hover:bg-green-500/10'
              };
              
              return (
                <div
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${colorClasses[strategy.color]}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6" />
                    <h3 className="font-semibold">{strategy.name}</h3>
                  </div>
                  <p className="text-sm opacity-80">{strategy.description}</p>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-current/20">
                      <div className="text-xs font-medium">ACTIVE STRATEGY</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Optimization Parameters */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Optimization Parameters
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Portfolio Valuation</label>
              <div className="relative">
                <input 
                  type="range" 
                  min="100000" 
                  max="5000000" 
                  step="50000" 
                  value={portfolioValue} 
                  onChange={(e) => setPortfolioValue(Number(e.target.value))} 
                  className="w-full accent-orange-500 h-2 bg-slate-700 rounded-lg" 
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">₹1L</span>
                  <span className="font-mono text-orange-400 text-lg bg-orange-500/10 px-3 py-1 rounded-lg">
                    ₹{(portfolioValue/100000).toFixed(1)}L
                  </span>
                  <span className="text-xs text-slate-400">₹50L</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Available Cash Position</label>
              <div className="relative">
                <input 
                  type="range" 
                  min="10000" 
                  max="1000000" 
                  step="10000" 
                  value={cashPosition} 
                  onChange={(e) => setCashPosition(Number(e.target.value))} 
                  className="w-full accent-green-500 h-2 bg-slate-700 rounded-lg" 
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">₹10K</span>
                  <span className="font-mono text-green-400 text-lg bg-green-500/10 px-3 py-1 rounded-lg">
                    ₹{(cashPosition/100000).toFixed(1)}L
                  </span>
                  <span className="text-xs text-slate-400">₹10L</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Risk Tolerance Level</label>
              <div className="relative">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5" 
                  value={riskTolerance} 
                  onChange={(e) => setRiskTolerance(Number(e.target.value))} 
                  className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg" 
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">Conservative</span>
                  <span className="font-mono text-purple-400 text-lg bg-purple-500/10 px-3 py-1 rounded-lg">
                    {riskTolerance}%
                  </span>
                  <span className="text-xs text-slate-400">Aggressive</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Strategic Timeline (Months)</label>
              <div className="relative">
                <input 
                  type="range" 
                  min="3" 
                  max="36" 
                  step="3" 
                  value={timeHorizon} 
                  onChange={(e) => setTimeHorizon(Number(e.target.value))} 
                  className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg" 
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">3M</span>
                  <span className="font-mono text-blue-400 text-lg bg-blue-500/10 px-3 py-1 rounded-lg">
                    {timeHorizon}M
                  </span>
                  <span className="text-xs text-slate-400">36M</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Results */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-emerald-300" />
                <div>
                  <h3 className="text-emerald-100 font-semibold text-lg">Optimized Recovery</h3>
                  <p className="text-emerald-200/60 text-sm">Projected Amount</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-3">
                ₹{optimizedRecovery.toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </div>
              <div className="flex items-center gap-2 text-emerald-300 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {((optimizedRecovery/portfolioValue)*100).toFixed(1)}% Recovery Rate
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
            <h3 className="text-blue-100 font-semibold mb-3">Cash Requirement</h3>
            <div className="text-2xl font-bold text-white mb-2">
              ₹{cashRequirement.toLocaleString('en-IN', {maximumFractionDigits: 0})}
            </div>
            <div className="w-full bg-blue-900/40 rounded-full h-3 mb-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((cashPosition/cashRequirement)*100, 100)}%` }}
              />
            </div>
            <p className="text-blue-200/70 text-sm">
              {cashPosition >= cashRequirement ? 'Sufficient liquidity available' : 'Additional funding required'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
            <h3 className="text-purple-100 font-semibold mb-3">Success Probability</h3>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-white">{successProbability}%</div>
              <div className="flex-1">
                <div className="w-full bg-purple-900/40 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${successProbability}%` }}
                  />
                </div>
                <p className="text-purple-200/70 text-xs mt-2">Algorithm Confidence Level</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg">
            Execute Recovery Strategy
          </button>
        </div>
      </div>
    </div>
  );
}

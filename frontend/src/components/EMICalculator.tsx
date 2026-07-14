import { useState } from 'react';
import { Calculator, TrendingUp, BarChart3, Target } from 'lucide-react';

export default function LoanAnalyzer() {
  const [activeTab, setActiveTab] = useState('standard');
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(12.5);
  const [tenure, setTenure] = useState<number>(60);
  const [processingFee, setProcessingFee] = useState<number>(2.5);

  // Advanced calculations
  const monthlyRate = (interestRate / 100) / 12;
  const emi = monthlyRate === 0 
    ? loanAmount / tenure 
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;
  const processingAmount = (loanAmount * processingFee) / 100;

  const tabs = [
    { id: 'standard', label: 'Standard Analysis', icon: Calculator },
    { id: 'comparison', label: 'Comparative Study', icon: BarChart3 },
    { id: 'optimization', label: 'Optimization Engine', icon: TrendingUp },
    { id: 'scenarios', label: 'Scenario Planning', icon: Target }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
          Enterprise Loan Analyzer
        </h1>
        <p className="text-blue-200">Advanced financial modeling and optimization platform for institutional lending analysis</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 p-1">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 flex-1 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'standard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-400" />
              Loan Parameters
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Principal Amount</label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="50000" 
                    max="5000000" 
                    step="25000" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(Number(e.target.value))} 
                    className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>₹50K</span>
                    <span className="font-mono text-blue-400 text-lg">₹{(loanAmount/100000).toFixed(1)}L</span>
                    <span>₹50L</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Interest Rate (% p.a.)</label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="6" 
                    max="24" 
                    step="0.25" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))} 
                    className="w-full accent-green-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>6%</span>
                    <span className="font-mono text-green-400 text-lg">{interestRate}%</span>
                    <span>24%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Tenure (Months)</label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="12" 
                    max="240" 
                    step="6" 
                    value={tenure} 
                    onChange={(e) => setTenure(Number(e.target.value))} 
                    className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>1Y</span>
                    <span className="font-mono text-purple-400 text-lg">{(tenure/12).toFixed(1)}Y</span>
                    <span>20Y</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Processing Fee (%)</label>
                <div className="relative">
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    step="0.1" 
                    value={processingFee} 
                    onChange={(e) => setProcessingFee(Number(e.target.value))} 
                    className="w-full accent-orange-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>0%</span>
                    <span className="font-mono text-orange-400 text-lg">{processingFee}%</span>
                    <span>5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6">
              <h3 className="text-lg font-semibold text-green-100 mb-4">Monthly EMI</h3>
              <div className="text-4xl font-bold text-white mb-2">₹{emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
              <p className="text-green-200/60">Primary obligation amount</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6">
              <h3 className="text-lg font-semibold text-blue-100 mb-4">Total Interest Cost</h3>
              <div className="text-3xl font-bold text-white mb-2">₹{totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
              <p className="text-blue-200/60">Lifetime interest expense</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-purple-100 mb-4">Total Repayment</h3>
              <div className="text-3xl font-bold text-white mb-2">₹{totalAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
              <p className="text-purple-200/60">Complete loan cost</p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6">
              <h3 className="text-lg font-semibold text-orange-100 mb-4">Processing Charges</h3>
              <div className="text-2xl font-bold text-white mb-2">₹{processingAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
              <p className="text-orange-200/60">Upfront costs</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8">
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Comparative Analysis Engine</h3>
            <p className="text-slate-400 max-w-md mx-auto">Advanced comparison tools for multiple loan scenarios and lender options - Coming Soon</p>
          </div>
        </div>
      )}

      {(activeTab === 'optimization' || activeTab === 'scenarios') && (
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8">
          <div className="text-center py-20">
            {activeTab === 'optimization' ? (
              <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            ) : (
              <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            )}
            <h3 className="text-2xl font-semibold text-white mb-2">
              {activeTab === 'optimization' ? 'Optimization Engine' : 'Scenario Planning'}
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              {activeTab === 'optimization' 
                ? 'AI-powered loan optimization and refinancing strategies - Coming Soon'
                : 'Advanced scenario modeling for strategic financial planning - Coming Soon'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

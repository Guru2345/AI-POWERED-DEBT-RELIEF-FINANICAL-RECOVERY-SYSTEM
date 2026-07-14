/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Home, Calculator, Target, FileText, MessageSquare, History, PieChart, LogIn, Wallet, Workflow, Sun, Moon, Cloud } from 'lucide-react';
import { clsx } from 'clsx';
import { useState, useEffect, createContext, useContext } from 'react';
import './creditflow.css';
import Dashboard from './components/Dashboard';
import LoanAnalyzer from './components/EMICalculator';
import RecoveryOptimizer from './components/SettlementPredictor';
import LegalTemplateEngine from './components/LetterGenerator';
import ChatAssistant from './components/ChatAssistant';
import HistoryTimeline from './components/HistoryTimeline';
import Reports from './components/Reports';
import AuthPage from './components/AuthPage';
import BudgetPlanner from './components/BudgetPlanner';
import Architecture from './components/Architecture';
import DriveCenter from './components/DriveCenter';

const ThemeContext = createContext<{ isLightMode: boolean; toggleTheme: () => void }>({
  isLightMode: false,
  toggleTheme: () => {},
});

function TopNavigation() {
  const location = useLocation();
  const userName = localStorage.getItem('userName');
  const { isLightMode, toggleTheme } = useContext(ThemeContext);
  
  const navItems = [
    { path: '/', label: 'Executive Dashboard', icon: Home },
    { path: '/calculator', label: 'Loan Analyzer', icon: Calculator },
    { path: '/budget', label: 'Cash Flow Manager', icon: Wallet },
    { path: '/settlement', label: 'Recovery Optimizer', icon: Target },
    { path: '/letters', label: 'Legal Templates', icon: FileText },
    { path: '/assistant', label: 'Advisory Bot', icon: MessageSquare },
    { path: '/history', label: 'Transaction History', icon: History },
    { path: '/reports', label: 'Business Intelligence', icon: PieChart },
    { path: '/drive', label: 'Google Drive Sync', icon: Cloud },
    { path: '/architecture', label: 'Platform Overview', icon: Workflow },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-700/30 sticky top-0 z-50 backdrop-blur-md">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight">
                CreditFlow Pro
              </h1>
              <p className="text-xs text-purple-300">Enterprise Financial Platform</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium',
                  isActive 
                    ? 'bg-purple-500/20 text-purple-200 border border-purple-400/30 shadow-lg shadow-purple-500/10' 
                    : 'hover:bg-white/5 hover:text-white text-purple-100/70'
                )}
              >
                <Icon className={clsx("w-4 h-4", isActive ? "text-purple-300" : "text-purple-200/60")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors border border-purple-500/30"
          >
            {isLightMode ? (
              <Moon className="w-4 h-4 text-purple-200" />
            ) : (
              <Sun className="w-4 h-4 text-purple-200" />
            )}
          </button>
          
          {userName ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-purple-300">Administrator</p>
              </div>
              <button 
                onClick={() => {
                  localStorage.removeItem('userName');
                  window.location.href = '/auth';
                }}
                className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-lg border border-red-500/30 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 px-4 py-2 rounded-lg border border-purple-400/30 transition-colors">
              <LogIn className="w-4 h-4" />
              Access Portal
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const userName = localStorage.getItem('userName');
  if (!userName) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Sync with local storage or system preference if desired, keeping it simple for now
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'light' : 'dark');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      <Router>
        <div className={clsx(
          "min-h-screen text-zinc-100 font-sans selection:bg-purple-500/30",
          isLightMode ? "light-theme bg-white text-zinc-900" : "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
        )}>
          <Routes>
            <Route path="/auth" element={
              <div className="w-full relative min-h-screen">
                <AuthPage />
              </div>
            } />
            <Route path="*" element={
              <div className="flex flex-col min-h-screen">
                <TopNavigation />
                <main 
                  className="flex-1 px-6 py-8 overflow-y-auto relative"
                  style={{ backgroundColor: isLightMode ? '#ffffff' : 'transparent' }}
                >
                  {/* Animated background */}
                  <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                  </div>
                  
                  <div className="max-w-7xl mx-auto relative z-10">
                    <Routes>
                      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/calculator" element={<ProtectedRoute><LoanAnalyzer /></ProtectedRoute>} />
                      <Route path="/budget" element={<ProtectedRoute><BudgetPlanner /></ProtectedRoute>} />
                      <Route path="/settlement" element={<ProtectedRoute><RecoveryOptimizer /></ProtectedRoute>} />
                      <Route path="/letters" element={<ProtectedRoute><LegalTemplateEngine /></ProtectedRoute>} />
                      <Route path="/assistant" element={<ProtectedRoute><ChatAssistant /></ProtectedRoute>} />
                      <Route path="/history" element={<ProtectedRoute><HistoryTimeline /></ProtectedRoute>} />
                      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                      <Route path="/drive" element={<ProtectedRoute><DriveCenter /></ProtectedRoute>} />
                      <Route path="/architecture" element={<ProtectedRoute><Architecture /></ProtectedRoute>} />
                    </Routes>
                  </div>
                </main>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

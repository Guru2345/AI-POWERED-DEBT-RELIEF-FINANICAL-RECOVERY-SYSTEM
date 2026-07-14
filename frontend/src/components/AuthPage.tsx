import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, TrendingUp, Shield, Zap, CheckCircle } from 'lucide-react';

type Mode = 'login' | 'signup';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const features = [
  { icon: TrendingUp, text: 'AI-powered debt negotiation strategies' },
  { icon: Shield,     text: 'Bank-grade encryption & privacy' },
  { icon: Zap,        text: 'Real-time financial health analysis' },
];

export default function AuthPage() {
  const [mode, setMode]                     = useState<Mode>('login');
  const [form, setForm]                     = useState<FormData>({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors]                 = useState<Errors>({});
  const [showPassword, setShowPassword]     = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [loading, setLoading]               = useState(false);
  const [success, setSuccess]               = useState(false);
  const [animating, setAnimating]           = useState(false);
  const navigate = useNavigate();

  /* ── Prefill demo account for speed ─────────────────────────── */
  useEffect(() => {
    if (mode === 'login') {
      setForm(f => ({ ...f, email: 'demo@financereliefai.com', password: 'Demo@1234' }));
    }
  }, [mode]);

  /* ── Toggle mode with animation ────────────────────────────── */
  const switchMode = () => {
    setAnimating(true);
    setTimeout(() => {
      setMode(m => (m === 'login' ? 'signup' : 'login'));
      setErrors({});
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
      setAnimating(false);
    }, 250);
  };

  /* ── Validation ─────────────────────────────────────────────── */
  const validate = (): boolean => {
    const e: Errors = {};
    if (mode === 'signup' && !form.name.trim())          e.name            = 'Full name is required';
    if (!form.email.includes('@'))                       e.email           = 'Enter a valid email address';
    if (form.password.length < 6)                        e.password        = 'Password must be at least 6 characters';
    if (mode === 'signup' && form.password !== form.confirmPassword)
                                                         e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submit ─────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));   // simulate network call
    const displayName = form.name.trim() || form.email.split('@')[0];
    localStorage.setItem('userName', displayName);
    localStorage.setItem('userEmail', form.email);
    setSuccess(true);
    setTimeout(() => navigate('/'), 800);
    setLoading(false);
  };

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030712]">

      {/* ── Animated gradient orbs ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite reverse' }} />
        <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)', animation: 'float 12s ease-in-out infinite' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 flex gap-12 items-center justify-center">

        {/* ── Left Panel — Branding ──────────────────────────────── */}
        <div className="hidden lg:flex flex-col flex-1 max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">CreditFlow Pro</h1>
              <p className="text-purple-300 text-xs">Enterprise Financial Platform</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Take control of your<br />
            <span style={{ background: 'linear-gradient(90deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              financial future
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            AI-powered debt relief, settlement negotiation, and financial recovery — all in one platform.
          </p>

          <div className="space-y-5">
            {features.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/30 group-hover:border-purple-400/60 transition-colors"
                  style={{ background: 'rgba(139,92,246,0.15)' }}>
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-slate-300 font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="mt-12 p-5 rounded-2xl border border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
            <p className="text-slate-300 text-sm leading-relaxed italic mb-3">
              "CreditFlow Pro helped me negotiate a 42% settlement on ₹8.5L in credit card debt. The AI advisor was a game-changer."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>R</div>
              <div>
                <p className="text-white text-sm font-semibold">Rahul M.</p>
                <p className="text-slate-500 text-xs">Mumbai • Verified User</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel — Auth Form ────────────────────────────── */}
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(24px)' }}>

            {/* Mode Tabs */}
            <div className="flex border-b border-white/10">
              {(['login', 'signup'] as Mode[]).map(m => (
                <button key={m} onClick={() => mode !== m && switchMode()}
                  className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                    mode === m
                      ? 'text-white border-b-2 border-purple-500'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <div className={`p-8 transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>

              {/* Success state */}
              {success ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.2)' }}>
                    <CheckCircle className="w-9 h-9 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Welcome aboard!</h3>
                  <p className="text-slate-400 text-sm">Redirecting to your dashboard…</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {mode === 'login' ? 'Welcome back' : 'Create your account'}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {mode === 'login'
                        ? 'Sign in to access your financial dashboard'
                        : 'Start your journey to financial freedom'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                    {/* Name — signup only */}
                    {mode === 'signup' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input type="text" value={form.name} onChange={update('name')} placeholder="Rahul Mehta"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-600 outline-none transition-all border ${
                              errors.name
                                ? 'border-red-500/60 focus:border-red-400 bg-red-500/5'
                                : 'border-white/10 focus:border-purple-500/70 bg-white/5 focus:bg-white/8'
                            }`} />
                        </div>
                        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder:text-slate-600 outline-none transition-all border ${
                            errors.email
                              ? 'border-red-500/60 focus:border-red-400 bg-red-500/5'
                              : 'border-white/10 focus:border-purple-500/70 bg-white/5'
                          }`} />
                      </div>
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder="••••••••"
                          className={`w-full pl-10 pr-11 py-3 rounded-xl text-white text-sm placeholder:text-slate-600 outline-none transition-all border ${
                            errors.password
                              ? 'border-red-500/60 focus:border-red-400 bg-red-500/5'
                              : 'border-white/10 focus:border-purple-500/70 bg-white/5'
                          }`} />
                        <button type="button" onClick={() => setShowPassword(s => !s)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
                    </div>

                    {/* Confirm Password — signup only */}
                    {mode === 'signup' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={update('confirmPassword')} placeholder="••••••••"
                            className={`w-full pl-10 pr-11 py-3 rounded-xl text-white text-sm placeholder:text-slate-600 outline-none transition-all border ${
                              errors.confirmPassword
                                ? 'border-red-500/60 focus:border-red-400 bg-red-500/5'
                                : 'border-white/10 focus:border-purple-500/70 bg-white/5'
                            }`} />
                          <button type="button" onClick={() => setShowConfirm(s => !s)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>}
                      </div>
                    )}

                    {/* Remember + Forgot */}
                    {mode === 'login' && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-purple-500 cursor-pointer" />
                          <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Remember me</span>
                        </label>
                        <button type="button" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={loading}
                      className="w-full py-3.5 mt-2 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: loading ? 'rgba(139,92,246,0.5)' : 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        boxShadow: loading ? 'none' : '0 8px 24px rgba(139,92,246,0.35)',
                      }}>
                      {loading ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        <>
                          {mode === 'login' ? 'Sign In Securely' : 'Create Account'}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-2">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-slate-600 text-xs">or continue with</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Demo login */}
                    <button type="button"
                      onClick={() => {
                        localStorage.setItem('userName', 'Demo User');
                        localStorage.setItem('userEmail', 'demo@financereliefai.com');
                        navigate('/');
                      }}
                      className="w-full py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Quick Demo Access
                    </button>
                  </form>

                  {/* Toggle mode hint */}
                  <p className="text-center text-sm text-slate-500 mt-6">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button onClick={switchMode} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                      {mode === 'login' ? 'Sign up free' : 'Sign in'}
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Bottom trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {['256-bit Encryption', 'GDPR Compliant', 'No Credit Check'].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-slate-500 text-xs">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-20px) rotate(2deg); }
          66%       { transform: translateY(10px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}

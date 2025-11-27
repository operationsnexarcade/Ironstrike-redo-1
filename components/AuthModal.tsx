
import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      setAuthModalOpen(false);
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      console.error("Auth error", error);
      if (error.message) {
        setErrorMsg(error.message);
      } else if (typeof error === 'string') {
        setErrorMsg(error);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAuthModalOpen(false)}></div>
      
      <div className="relative bg-background w-full max-w-md rounded-2xl border border-red-900/30 shadow-2xl overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-red-900/20 bg-surface">
          <h2 className="text-xl font-medium tracking-tight text-stone-100">
            {mode === 'login' ? 'Welcome Back' : 'Join the Ranks'}
          </h2>
          <button onClick={() => setAuthModalOpen(false)} className="text-stone-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-red-900/20">
          <button 
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${mode === 'login' ? 'text-red-500 border-b-2 border-red-500 bg-red-900/10' : 'text-stone-500 hover:bg-red-900/5'}`}
            onClick={() => { setMode('login'); setErrorMsg(null); }}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${mode === 'signup' ? 'text-red-500 border-b-2 border-red-500 bg-red-900/10' : 'text-stone-500 hover:bg-red-900/5'}`}
            onClick={() => { setMode('signup'); setErrorMsg(null); }}
          >
            Create Account
          </button>
        </div>

        {/* Error Display */}
        {errorMsg && (
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 m-4 mb-0 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs text-red-200">{errorMsg}</p>
            </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-600" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface border border-red-900/20 text-stone-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-red-500 transition-colors text-sm"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-600" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-red-900/20 text-stone-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-red-500 transition-colors text-sm"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-stone-600" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-red-900/20 text-stone-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-red-500 transition-colors text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-red-700 hover:bg-red-600 text-white text-sm font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : (
              <>
                {mode === 'login' ? 'Initiate Login' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

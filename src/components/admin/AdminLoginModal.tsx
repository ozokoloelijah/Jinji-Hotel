import React, { useState } from 'react';
import { Lock, X, Shield, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Validate credentials (default: admin / jinji2026 or admin / password)
      if (
        (username.trim().toLowerCase() === 'admin' && password === 'jinji2026') ||
        (username.trim().toLowerCase() === 'admin' && password === 'admin123')
      ) {
        setLoading(false);
        onLoginSuccess();
      } else {
        setLoading(false);
        setError('Invalid admin credentials. Please check your username and password.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('jinji2026');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-sm shadow-2xl overflow-hidden my-6 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-sm hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block mb-1">
            STAFF & MANAGEMENT ACCESS
          </span>
          <h3 className="font-serif-luxury text-2xl font-bold text-stone-100">
            Jinji Hotels Admin Portal
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Enter authorized management credentials to access the internal reservation & rate dashboard.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-sm text-xs text-red-300 flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Admin Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-stone-100 text-sm rounded-sm p-2.5 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-6 pt-4 border-t border-stone-800 text-center">
          <div className="bg-stone-950 p-3 rounded-sm border border-stone-800 text-xs text-stone-400 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase text-amber-400 font-semibold block">Staff Passcode:</span>
              <span className="font-mono text-stone-200">admin / jinji2026</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold rounded-sm transition-colors cursor-pointer"
            >
              Auto Fill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

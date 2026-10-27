import React, { useState } from 'react';
import { X, Shield, Lock, Mail, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { assonStore } from '../services/assonStore';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('admin@asson-oau.org');
  const [password, setPassword] = useState('asson2026');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = assonStore.login(email, password);
    if (res.success) {
      onSuccess();
      onClose();
    } else {
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleDemoSuperAdmin = () => {
    const res = assonStore.login('admin@asson-oau.org', 'asson2026');
    if (res.success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden space-y-6 p-6 sm:p-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A759F]/10 text-[#1A759F] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#1E293B]">
                ASSON Governance Portal
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Executive & Role Administration
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@asson-oau.org"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#1A759F]"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
            >
              <span>Login to Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleDemoSuperAdmin}
              className="w-full py-2 bg-[#1A759F]/10 hover:bg-[#1A759F]/20 text-[#1A759F] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              1-Click Demo Login (Super Admin)
            </button>
          </div>
        </form>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">Role Capabilities Included:</p>
          <p>• Super Admin: Full edit rights & role creation</p>
          <p>• General Secretary: Edit events & alumni directory</p>
          <p>• Academic Director: Course quizzes & resources</p>
        </div>
      </div>
    </div>
  );
};

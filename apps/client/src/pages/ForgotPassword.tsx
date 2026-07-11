import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setUserId(res.data.userId);
      setStep('code');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Email not found');
    } finally {
      setLoading(false);
    }
  };

  const handleCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('password');
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { userId, code, newPassword });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-bg-secondary border border-border-purple rounded-2xl p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">
            {step === 'email' ? '🔐' : step === 'code' ? '📬' : '🔑'}
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            {step === 'email' ? 'Forgot password?' : step === 'code' ? 'Enter reset code' : 'New password'}
          </h2>
          <p className="text-txt-secondary text-sm">
            {step === 'email' && "Enter your email and we'll send a reset code"}
            {step === 'code' && `We sent a 6-digit code to ${email}`}
            {step === 'password' && 'Choose a strong new password'}
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleEmail} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors placeholder-txt-secondary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
            >
              {loading ? 'Sending...' : 'Send reset code'}
            </button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCode} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Reset code</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
                className="bg-bg-card border border-border-light text-white text-center text-2xl tracking-widest font-semibold px-4 py-3 rounded-lg outline-none focus:border-accent-purple transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={code.length !== 6}
              className="w-full py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
            >
              Verify code →
            </button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">New password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Confirm new password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link to="/login" className="text-txt-secondary text-xs hover:text-white transition-colors">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-email', { userId, code });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (!res.data.user.onboardingDone) {
        navigate('/onboarding', { state: { userId } });
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await api.post('/auth/resend-code', { userId });
      setSuccess('New code sent to your email!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-bg-secondary border border-border-purple rounded-2xl p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-2xl font-semibold text-white mb-2">Check your email</h2>
          <p className="text-txt-secondary text-sm">
            We sent a 6-digit verification code to
          </p>
          <p className="text-accent-purple text-sm font-medium mt-1">{email}</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/30 border border-green-700 text-accent-green text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-txt-secondary">Verification code</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
              className="bg-bg-card border border-border-light text-white text-center text-2xl tracking-widest font-semibold px-4 py-3 rounded-lg outline-none focus:border-accent-purple transition-colors placeholder-txt-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-txt-secondary text-xs mb-2">Didn't receive a code?</p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-accent-purple text-sm hover:text-accent-hover transition-colors disabled:opacity-60"
          >
            {resending ? 'Sending...' : 'Resend code'}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-txt-secondary text-xs hover:text-white transition-colors"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
}

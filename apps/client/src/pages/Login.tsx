import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (!res.data.user.onboardingDone) {
        navigate('/onboarding', { state: { userId: res.data.user.id } });
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      if (err.response?.data?.needsVerification) {
        navigate('/verify-email', {
          state: { userId: err.response.data.userId, email }
        });
      } else {
        setError(err.response?.data?.error || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border-purple">

        {/* Left side */}
        <div className="bg-bg-secondary p-10 flex flex-col items-center justify-center gap-6 relative">
          <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-accent-purple opacity-60"></div>
          <div className="absolute top-16 right-10 w-1.5 h-1.5 rounded-full bg-accent-hover opacity-50"></div>
          <div className="absolute bottom-20 left-12 w-2 h-2 rounded-full bg-accent-purple opacity-40"></div>
          <div className="absolute bottom-10 right-8 w-1 h-1 rounded-full bg-accent-hover opacity-60"></div>

          <div className="w-32 h-32 rounded-full bg-bg-card border-4 border-accent-purple flex items-center justify-center text-6xl">
            🧑‍💻
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Study smarter.</h2>
            <p className="text-txt-secondary text-sm leading-relaxed">
              Learn deeper. Achieve more.<br />
              Your CS journey starts here.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {['🔥 Streaks', '⚔️ Duels', '🧠 AI Quizzes', '🏆 Leaderboard'].map(f => (
              <span key={f} className="bg-bg-card border border-border-light text-txt-secondary text-xs px-3 py-1 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="bg-bg-primary p-10 flex flex-col justify-center gap-5">
          <div>
            <h3 className="text-2xl font-semibold text-white">Welcome back</h3>
            <p className="text-txt-secondary text-sm mt-1">Login to AcademicQuest</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors placeholder-txt-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors placeholder-txt-secondary"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="accent-accent-purple"
              />
              <label htmlFor="remember" className="text-xs text-txt-secondary">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="flex justify-between text-xs">
            <Link to="/register" className="text-accent-purple hover:text-accent-hover transition-colors">
              Create account
            </Link>
            <Link to="/forgot-password" className="text-txt-secondary hover:text-accent-purple transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
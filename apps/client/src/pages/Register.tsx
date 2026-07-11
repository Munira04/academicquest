import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const companions = [
  { id: 'cat', emoji: '🐱', name: 'Cat' },
  { id: 'fox', emoji: '🦊', name: 'Fox' },
  { id: 'panda', emoji: '🐼', name: 'Panda' },
  { id: 'lion', emoji: '🦁', name: 'Lion' },
];

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [companion, setCompanion] = useState('cat');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { username, email, password });
      localStorage.setItem('companion', companion);
      navigate('/verify-email', { state: { userId: res.data.userId, email } });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedCompanion = companions.find(c => c.id === companion);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border-purple">

        {/* Left side */}
        <div className="bg-bg-secondary p-10 flex flex-col items-center justify-center gap-6 relative">
          <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-accent-purple opacity-60"></div>
          <div className="absolute top-16 right-10 w-1.5 h-1.5 rounded-full bg-accent-hover opacity-50"></div>
          <div className="absolute bottom-20 left-12 w-2 h-2 rounded-full bg-accent-purple opacity-40"></div>

          <div className="w-32 h-32 rounded-full bg-bg-card border-4 border-accent-purple flex items-center justify-center text-6xl">
            {selectedCompanion?.emoji}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Meet your companion</h2>
            <p className="text-txt-secondary text-sm leading-relaxed">
              They will study alongside you,<br />
              cheer you on, and grow with you.
            </p>
          </div>

          <div className="w-full">
            <p className="text-xs text-txt-secondary text-center mb-3">Choose your study companion</p>
            <div className="grid grid-cols-4 gap-2">
              {companions.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCompanion(c.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                    companion === c.id
                      ? 'border-accent-purple bg-bg-card'
                      : 'border-border-light bg-bg-card/50 hover:border-accent-purple/50'
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-xs text-txt-secondary">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-bg-primary p-10 flex flex-col justify-center gap-5">
          <div>
            <h3 className="text-2xl font-semibold text-white">Get started</h3>
            <p className="text-txt-secondary text-sm mt-1">Create your AcademicQuest account</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="munira04"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors placeholder-txt-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@gmail.com"
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

            <div className="flex flex-col gap-1">
              <label className="text-xs text-txt-secondary">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-bg-card border border-border-light text-white text-sm px-4 py-2.5 rounded-lg outline-none focus:border-accent-purple transition-colors placeholder-txt-secondary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="text-center text-xs text-txt-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-purple hover:text-accent-hover transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
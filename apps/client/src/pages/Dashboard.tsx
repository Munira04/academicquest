import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Eddy from '../components/Eddy';
import AQLogo from '../components/AQLogo';
import { seedDemoProgress } from '../data/progression';

type EddyMood = 'happy' | 'thinking' | 'surprised' | 'confident' | 'idle' | 'celebrating' | 'disappointed' | 'sarcastic' | 'processing';

const navItems = [
  { icon: '🏠', label: 'Dashboard', route: '/dashboard' },
  { icon: '📚', label: 'My Courses', route: '/courses' },
  { icon: '🎮', label: 'Practice', route: '/practice' },
  { icon: '🏰', label: 'Challenges', route: '/challenges' },
  { icon: '🛠️', label: 'Build', route: '/build' },
  { icon: '🌍', label: 'Community', route: '/community' },
  { icon: '📈', label: 'Progress', route: '/progress' },
  { icon: '🏆', label: 'Achievements', route: '/dashboard' },
];

const eddyMessages = [
  { msg: "Your streak is alive. Please don't kill it.", mood: 'confident' as EddyMood },
  { msg: "Today's mission is waiting. Unlike your laundry.", mood: 'sarcastic' as EddyMood },
  { msg: "Ready to earn some XP? Or are we just browsing?", mood: 'happy' as EddyMood },
  { msg: "You've been away. I've been here. Thinking. Judging.", mood: 'disappointed' as EddyMood },
  { msg: "Another day, another chance to confuse the compiler.", mood: 'sarcastic' as EddyMood },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const companionKey = localStorage.getItem('companion') || 'cat';

  const [activeNav, setActiveNav] = useState('dashboard');
  const [eddyIndex, setEddyIndex] = useState(0);
  const [eddyMood, setEddyMood] = useState<EddyMood>('happy');
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [showCustom, setShowCustom] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [greeting, setGreeting] = useState('');
  const [showMissionControl, setShowMissionControl] = useState(true);

  const companions: Record<string, string> = { cat: '🐱', fox: '🦊', panda: '🐼', lion: '🦁' };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    // Seed Chapter 1 progress so games are unlocked for demo
    seedDemoProgress();

    setGreeting(getGreeting());

    // Cycle Eddy messages
    const cycle = setInterval(() => {
      setEddyIndex(i => {
        const next = (i + 1) % eddyMessages.length;
        setEddyMood(eddyMessages[next].mood);
        return next;
      });
    }, 8000);

    // Hide mission control after 4s
    const hide = setTimeout(() => setShowMissionControl(false), 4000);

    return () => { clearInterval(cycle); clearTimeout(hide); };
  }, []);

  // Pomodoro
  useEffect(() => {
    if (pomodoroRunning) {
      timerRef.current = setInterval(() => {
        setPomodoroSeconds(s => {
          if (s <= 1) { clearInterval(timerRef.current!); setPomodoroRunning(false); setEddyMood('celebrating'); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }
    return () => clearInterval(timerRef.current!);
  }, [pomodoroRunning]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const startCustom = () => {
    setPomodoroSeconds(customMinutes * 60);
    setPomodoroRunning(true);
    setShowCustom(false);
  };

  if (!user) { navigate('/login'); return null; }

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex' }}>

      {/* Mission Control overlay */}
      {showMissionControl && (
        <div style={{ position: 'fixed', inset: 0, background: '#08080C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 999, gap: 20 }}>
          <div style={{ opacity: 1, textAlign: 'center' }}>
            <AQLogo size={64} />
            <div style={{ fontSize: 28, fontWeight: 700, color: '#8B5CF6', marginTop: 16 }}>
              Academic<span style={{ color: '#fff' }}>Quest</span>
            </div>
            <div style={{ fontSize: 14, color: '#A1A1AA', marginTop: 8 }}>MISSION CONTROL</div>
          </div>
          <Eddy mood="happy" size={80} showBubble message={`${getGreeting()}, ${user.username}. Your next mission awaits.`} />
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', opacity: 0.3 + i * 0.3 }}>
                <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}`}</style>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: 220, background: '#120F1F', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', padding: '20px 12px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, cursor: 'pointer', padding: '0 4px' }} onClick={() => navigate('/dashboard')}>
          <AQLogo size={28} />
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 14 }}>Academic<span style={{ color: '#fff' }}>Quest</span></span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label.toLowerCase()); navigate(item.route); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 13, textAlign: 'left', width: '100%', background: activeNav === item.label.toLowerCase() ? '#1A1028' : 'none', color: activeNav === item.label.toLowerCase() ? '#fff' : '#A1A1AA', borderLeft: activeNav === item.label.toLowerCase() ? '2px solid #8B5CF6' : '2px solid transparent', transition: 'all 0.15s' }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Eddy in sidebar */}
        <div style={{ padding: '16px 8px 8px', borderTop: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Eddy mood={eddyMood} size={52} showBubble={false} />
          <div style={{ background: '#1A1028', borderRadius: '8px 8px 8px 2px', padding: '6px 10px', fontSize: 11, color: '#C4B5F5', lineHeight: 1.5, textAlign: 'center' }}>
            {eddyMessages[eddyIndex].msg}
          </div>
        </div>

        <button onClick={async () => { try { await api.post('/auth/logout'); } catch {} localStorage.removeItem('accessToken'); localStorage.removeItem('user'); navigate('/login'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, color: '#555', background: 'none', marginTop: 8, width: '100%' }}>
          🚪 Logout
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 28px' }}>

        {/* Welcome header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              {greeting}, {user.username} 👾
            </h1>
            <p style={{ fontSize: 14, color: '#A1A1AA' }}>Ready to conquer today's missions?</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Eddy mood={eddyMood} size={56} showBubble={false} />
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: '#A1A1AA' }}>
              <div style={{ color: '#A78BFA', fontWeight: 500, marginBottom: 2 }}>⚡ {user.xp || 0} XP</div>
              <div>Level {user.level || 1}</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { val: '0h 0m', label: 'Studied today', icon: '⏱️' },
            { val: `${user.xp || 0} XP`, label: 'Total XP', icon: '⚡' },
            { val: '0 🔥', label: 'Day streak', icon: '🔥' },
            { val: `Lvl ${user.level || 1}`, label: 'Current level', icon: '🏆' },
          ].map(s => (
            <div key={s.label} style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#8B5CF6' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Continue learning - Section-based */}
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>📚 Continue Learning</h3>
            <div style={{ background: '#1A1028', border: '1px solid #2d1f4e', borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>⚛️</span>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>React</div>
                  <div style={{ fontSize: 11, color: '#A78BFA' }}>Section 1: Component Fundamentals</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#8B5CF6', marginBottom: 8 }}>Lesson 2 of 3 — useState</div>
              <div style={{ height: 4, background: '#0D0B1A', borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
                <div style={{ height: '100%', width: '33%', background: 'linear-gradient(90deg,#8B5CF6,#A78BFA)', borderRadius: 2 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#555' }}>
                <span>Section 1: 33%</span>
                <span>Course: 8%</span>
              </div>
            </div>
            <button onClick={() => navigate('/learn/react-02')} style={{ width: '100%', padding: '9px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              Continue →
            </button>
          </div>

          {/* Daily missions */}
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>🎯 Daily Missions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Complete one lesson', done: false, xp: 50 },
                { label: 'Solve a code challenge', done: false, xp: 75 },
                { label: 'Study for 30 minutes', done: false, xp: 30 },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: '#1A1028', borderRadius: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1px solid ${m.done ? '#22C55E' : '#2d1f4e'}`, background: m.done ? '#22C55E' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: '#fff' }}>
                    {m.done && '✓'}
                  </div>
                  <span style={{ flex: 1, fontSize: 12, color: m.done ? '#555' : '#C2C0BE' }}>{m.label}</span>
                  <span style={{ fontSize: 11, color: '#A78BFA' }}>+{m.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pomodoro timer */}
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 16 }}>⏱️ Pomodoro Timer</h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: pomodoroRunning ? '#22C55E' : '#fff', letterSpacing: 3, marginBottom: 16, fontFamily: 'monospace' }}>
                {formatTime(pomodoroSeconds)}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ height: 4, background: '#1A1028', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${100 - (pomodoroSeconds / (customMinutes * 60)) * 100}%`, background: 'linear-gradient(90deg,#8B5CF6,#22C55E)', borderRadius: 2, transition: 'width 1s linear' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button onClick={() => setPomodoroRunning(r => !r)} style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', background: pomodoroRunning ? '#1A2F1A' : '#8B5CF6', color: pomodoroRunning ? '#22C55E' : '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                  {pomodoroRunning ? '⏸ Pause' : '▶ Start'}
                </button>
                <button onClick={() => { setPomodoroRunning(false); setPomodoroSeconds(customMinutes * 60); }} style={{ padding: '9px 14px', borderRadius: 8, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer' }}>
                  Reset
                </button>
                <button onClick={() => setShowCustom(s => !s)} style={{ padding: '9px 14px', borderRadius: 8, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer' }}>
                  ⚙️
                </button>
              </div>
              {showCustom && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="number" value={customMinutes} onChange={e => setCustomMinutes(Number(e.target.value))} min={1} max={120}
                    style={{ flex: 1, background: '#1A1028', border: '1px solid #2d1f4e', borderRadius: 7, padding: '6px 10px', color: '#fff', fontSize: 13, outline: 'none' }} />
                  <span style={{ fontSize: 12, color: '#555' }}>min</span>
                  <button onClick={startCustom} style={{ padding: '6px 12px', borderRadius: 7, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 12, cursor: 'pointer' }}>Set</button>
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {[15, 25, 45, 60].map(min => (
                  <button key={min} onClick={() => { setCustomMinutes(min); setPomodoroSeconds(min * 60); setPomodoroRunning(false); }}
                    style={{ flex: 1, padding: '5px 0', borderRadius: 6, border: `1px solid ${customMinutes === min ? '#8B5CF6' : '#2d1f4e'}`, background: customMinutes === min ? '#8B5CF620' : 'none', color: customMinutes === min ? '#A78BFA' : '#555', fontSize: 11, cursor: 'pointer' }}>
                    {min}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 14 }}>🕓 Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { action: 'Completed lesson', detail: 'Python — Hello World', time: '2h ago', xp: 50, icon: '✅' },
                { action: 'Solved challenge', detail: 'The Oxygen Protocol', time: '1d ago', xp: 75, icon: '⚔️' },
                { action: 'Joined community', detail: 'Posted in #introductions', time: '2d ago', xp: 10, icon: '🌍' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid #1a1028' : 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: '#fff', marginBottom: 1 }}>{a.action}</div>
                    <div style={{ fontSize: 11, color: '#555' }}>{a.detail}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#22C55E' }}>+{a.xp} XP</div>
                    <div style={{ fontSize: 10, color: '#555' }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 12 }}>📚 My Courses</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {[
              { id: 'web4', icon: '⚛️', title: 'React', color: '#8B5CF6', level: 'INTERMEDIATE', currentSection: 'Component Fundamentals', sectionProgress: 33, totalProgress: 8, xp: 400 },
              { id: 'web1', icon: '🐍', title: 'Python', color: '#22C55E', level: 'BEGINNER', currentSection: 'Variables & Data Types', sectionProgress: 60, totalProgress: 15, xp: 500 },
              { id: 'web2', icon: '🌐', title: 'HTML', color: '#F59E0B', level: 'BEGINNER', currentSection: 'Page Structure', sectionProgress: 100, totalProgress: 25, xp: 300 },
              { id: 'web3', icon: '🎨', title: 'CSS', color: '#3B82F6', level: 'BEGINNER', currentSection: 'Not Started', sectionProgress: 0, totalProgress: 0, xp: 350 },
            ].map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = course.color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2d1f4e'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{course.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{course.title}</div>
                    <div style={{ fontSize: 11, color: '#A1A1AA' }}>{course.level}</div>
                  </div>
                  <div style={{ fontSize: 11, color: course.color, fontWeight: 600 }}>{course.xp} XP</div>
                </div>
                <div style={{ fontSize: 12, color: '#A78BFA', marginBottom: 8 }}>{course.currentSection}</div>
                <div style={{ height: 4, background: '#0D0B1A', borderRadius: 2, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ height: '100%', width: `${course.sectionProgress}%`, background: `linear-gradient(90deg,${course.color},${course.color}AA)`, borderRadius: 2 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#555' }}>
                  <span>Section: {course.sectionProgress}%</span>
                  <span>Total: {course.totalProgress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick access row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { icon: '🏰', label: 'Code Dungeon', route: '/dungeon', color: '#8B5CF6' },
            { icon: '⚔️', label: 'Code Battles', route: '/battles', color: '#EF4444' },
            { icon: '🔍', label: 'Hacker Detective', route: '/detective', color: '#F59E0B' },
            { icon: '🏙️', label: 'Smart City', route: '/smartcity', color: '#22C55E' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              style={{ padding: '14px 10px', borderRadius: 12, border: `1px solid ${item.color}33`, background: `${item.color}11`, cursor: 'pointer', textAlign: 'center' }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 12, color: item.color, fontWeight: 500 }}>{item.label}</div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function UserDropdown() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { icon: '⚡', text: 'You earned 50 XP on Python Lesson 1', time: '2h ago' },
    { icon: '🔥', text: 'Your 7-day streak is active!', time: '1d ago' },
    { icon: '💬', text: 'fox_coder replied to your post', time: '2d ago' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>

      {/* Notification Bell */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setNotifOpen(o => !o); setDropdownOpen(false); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, position: 'relative', padding: 4 }}
        >
          🔔
          <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: '1px solid #08080C' }} />
        </button>

        {notifOpen && (
          <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 300, background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, overflow: 'hidden', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #2d1f4e', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Notifications</span>
              <span style={{ fontSize: 11, color: '#8B5CF6', cursor: 'pointer' }}>Mark all read</span>
            </div>
            {notifications.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: '1px solid #2d1f4e', cursor: 'pointer' }}>
                <span style={{ fontSize: 18 }}>{n.icon}</span>
                <div>
                  <p style={{ fontSize: 12, color: '#C2C0BE', lineHeight: 1.5, marginBottom: 2 }}>{n.text}</p>
                  <span style={{ fontSize: 11, color: '#555' }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setDropdownOpen(o => !o); setNotifOpen(false); }}
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}
        >
          {user.username?.[0]?.toUpperCase()}
        </button>

        {dropdownOpen && (
          <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 200, background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, overflow: 'hidden', zIndex: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #2d1f4e' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{user.username}</p>
              <p style={{ fontSize: 11, color: '#555' }}>⚡ {user.xp || 0} XP · Level {user.level || 1}</p>
            </div>
            {[
              { label: '👤 Profile', action: () => { navigate(`/profile`); setDropdownOpen(false); } },
              { label: '⚙️ Account', action: () => { navigate('/account'); setDropdownOpen(false); } },
              { label: '🌙 Switch Theme', action: () => { setDropdownOpen(false); } },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.action}
                style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#A1A1AA', display: 'block' }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #2d1f4e' }}>
              <button
                onClick={handleLogout}
                style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#EF4444' }}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
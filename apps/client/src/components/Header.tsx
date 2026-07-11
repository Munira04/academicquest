import { Link, useLocation } from 'react-router-dom';
import UserDropdown from './UserDropdown';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { label: 'Learn', path: '/courses' },
    { label: 'Practice', path: '/practice' },
    { label: 'Build', path: '/build' },
    { label: 'Community', path: '/community' },
  ];

  // Keyframes for a clean computer-bot floating animation
  const botAnimation = `
    @keyframes botPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.08) translateY(-2px); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <header style={{
      background: '#120F1F',
      borderBottom: '1px solid #2d1f4e',
      padding: '0 32px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      fontFamily: 'Inter, sans-serif'
    }}>
      <style>{botAnimation}</style>

      {/* Left Segment: Computer Bot Logo + AcademicQuest Title */}
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <span style={{ 
          fontSize: '24px', 
          display: 'inline-block', 
          animation: 'botPulse 3s ease-in-out infinite' 
        }}>
          🤖
        </span>
        <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: '18px', letterSpacing: '0.5px' }}>
          AcademicQuest
        </span>
      </Link>

      {/* Center Segment: Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '28px', height: '100%', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#fff' : '#A1A1AA',
                borderBottom: isActive ? '2px solid #8B5CF6' : '2px solid transparent',
                padding: '22px 4px',
                transition: 'color 0.2s ease, border-color 0.2s ease'
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Segment: Profiles & Notification Bell */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </div>
    </header>
  );
}
import { Link, useLocation } from 'react-router-dom';
import UserDropdown from './UserDropdown';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  const navItems = [
    { label: 'Learn', path: '/courses' },
    { label: 'Practice', path: '/practice' },
    { label: 'Build', path: '/build' },
    { label: 'Community', path: '/community' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* GLOBAL NAVBAR */}
      <header style={{
        background: '#120F1F',
        borderBottom: '1px solid #2d1f4e',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 999
      }}>
        {/* Left: Coin Logo + Brand Name */}
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '20px', animation: 'spin 4s linear infinite' }}>🪙</span>
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>AcademicQuest</span>
        </Link>

        {/* Center: Core Nav Items */}
        <nav style={{ display: 'flex', gap: '24px' }}>
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
                  color: isActive ? '#8B5CF6' : '#A1A1AA',
                  borderBottom: isActive ? '2px solid #8B5CF6' : '2px solid transparent',
                  padding: '18px 4px',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: User Profile Menu Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <UserDropdown />
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div style={{ flex: 1, display: 'flex' }}>
        {children}
      </div>
    </div>
  );
}
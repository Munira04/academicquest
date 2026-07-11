import { useNavigate, useLocation } from 'react-router-dom';
import AQLogo from './AQLogo';
import UserDropdown from './UserDropdown';

interface Props {
  breadcrumb?: string;
}

export default function AppHeader({ breadcrumb }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Learn', route: '/courses' },
    { label: 'Practice', route: '/practice' },
    { label: 'Build', route: '/build' },
    { label: 'Community', route: '/community' },
  ];

  const isActive = (route: string) => location.pathname.startsWith(route);

  return (
    <header style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 28px', display: 'flex', alignItems: 'center', height: 52, flexShrink: 0, position: 'sticky', top: 0, zIndex: 50 }}>

      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', marginRight: 36 }}
        onClick={() => navigate('/dashboard')}
      >
        <AQLogo size={30} />
        <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 15 }}>
          Academic<span style={{ color: '#fff' }}>Quest</span>
        </span>
      </div>

      {/* Center nav */}
      <nav style={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'center' }}>
        {navLinks.map(link => (
          <button
            key={link.label}
            onClick={() => navigate(link.route)}
            style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 13, background: isActive(link.route) ? '#8B5CF620' : 'none',
              color: isActive(link.route) ? '#A78BFA' : '#A1A1AA',
              borderBottom: isActive(link.route) ? '2px solid #8B5CF6' : '2px solid transparent',
              fontWeight: isActive(link.route) ? 600 : 400,
            }}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Breadcrumb */}
      {breadcrumb && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 20, fontSize: 13 }}>
          <span style={{ color: '#444' }}>·</span>
          <span style={{ color: '#A1A1AA' }}>{breadcrumb}</span>
        </div>
      )}

      {/* Right: user dropdown */}
      <UserDropdown />
    </header>
  );
}
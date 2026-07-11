import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dropdowns: Record<string, { label: string; path: string }[]> = {
  Learn: [{ label: 'My Courses', path: '/courses?tab=mine' }, { label: 'All Courses', path: '/courses?tab=all' }],
  Practice: [{ label: 'Challenges', path: '/challenges' }, { label: 'Quizzes', path: '/quizzes' }, { label: 'Ask Quest AI', path: '/ask-ai' }],
};

export default function WorkspaceHeader() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const tabs = ['Home', 'Learn', 'Practice', 'Build', 'Community'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 20px', background: '#120F1F', borderBottom: '1px solid #2d1f4e', position: 'relative', height: 40 }}>
      <span style={{ color: '#8B5CF6', fontWeight: 600, fontSize: 13, marginRight: 16, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        AcademicQuest
      </span>
      {tabs.map(tab => (
        <div key={tab} style={{ position: 'relative' }}>
          <button
            onClick={() => dropdowns[tab] ? setOpenMenu(prev => prev === tab ? null : tab) : navigate(`/${tab.toLowerCase()}`)}
            style={{ padding: '8px 10px', background: 'none', border: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}
          >
            {tab}{dropdowns[tab] ? ' ▾' : ''}
          </button>
          {openMenu === tab && (
            <div style={{ position: 'absolute', top: '100%', left: 0, background: '#1A1028', border: '1px solid #2d1f4e', borderRadius: 8, padding: 6, minWidth: 160, zIndex: 50 }}>
              {dropdowns[tab].map(link => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.path); setOpenMenu(null); }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', background: 'none', border: 'none', color: '#C2C0BE', fontSize: 12, cursor: 'pointer', borderRadius: 6 }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
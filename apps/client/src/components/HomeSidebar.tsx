import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AccordionNode {
  label: string;
  icon: string;
  links: { label: string; path: string }[];
}

const nodes: AccordionNode[] = [
  { label: 'Learn', icon: '📚', links: [{ label: 'My Courses', path: '/courses?tab=mine' }, { label: 'All Courses', path: '/courses?tab=all' }] },
  { label: 'Practice', icon: '🎯', links: [{ label: 'Challenges', path: '/challenges' }, { label: 'Quizzes', path: '/quizzes' }, { label: 'Ask Quest AI', path: '/ask-ai' }] },
];

export default function HomeSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<string | null>('Learn');

  return (
    <aside style={{ width: 220, background: '#120F1F', borderRight: '1px solid #2d1f4e', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ color: '#8B5CF6', fontWeight: 600, fontSize: 15, padding: '0 8px 16px' }}>
        Academic<span style={{ color: '#fff' }}>Quest</span>
      </div>

      {/* Home / Dashboard Link */}
      <button
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
      >
        🏠 Home
      </button>

      {/* Accordion Links (Learn & Practice) */}
      {nodes.map(node => (
        <div key={node.label}>
          <button
            onClick={() => setOpen(prev => prev === node.label ? null : node.label)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer' }}
          >
            <span>{node.icon} {node.label}</span>
            <span style={{ transform: open === node.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
          </button>
          {open === node.label && (
            <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {node.links.map(link => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  style={{ textAlign: 'left', padding: '6px 8px', background: 'none', border: 'none', color: '#8a8a9a', fontSize: 12, cursor: 'pointer', borderRadius: 6 }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* 🛠️ Build Link (New) */}
      <button
        onClick={() => navigate('/build')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer', textAlign: 'left', width: '100%' }}
      >
        🛠️ Build
      </button>

      {/* 🌍 Community Link (New) */}
      <button
        onClick={() => navigate('/community')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'none', border: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer', textAlign: 'left', width: '100%' }}
      >
        🌍 Community
      </button>
    </aside>
  );
}
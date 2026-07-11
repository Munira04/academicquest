import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AQLogo from '../components/AQLogo';
import { progressionMap, getCompletedNodes, getNodeStatus } from '../data/progression';

const chapterColors = ['#8B5CF6', '#3B82F6', '#F59E0B'];
const chapterNames = ['Python Basics', 'Control Flow', 'Data Structures'];

const gameTypeConfig = {
  dungeon:   { label: 'Code Dungeon',      icon: '🏰', color: '#8B5CF6', route: '/dungeon' },
  battle:    { label: 'Code Battles',      icon: '⚔️', color: '#EF4444', route: '/battles' },
  detective: { label: 'Hacker Detective',  icon: '🔍', color: '#F59E0B', route: '/detective' },
  smartcity: { label: 'Smart City',        icon: '🏙️', color: '#22C55E', route: '/smartcity' },
};

export default function Progress() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<string[]>([]);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => { setCompleted(getCompletedNodes()); }, []);

  const totalNodes = progressionMap.length;
  const completedCount = completed.length;
  const overallXp = progressionMap.filter(n => completed.includes(n.id)).reduce((acc, n) => acc + n.xpReward, 0);
  const overallPct = Math.round((completedCount / totalNodes) * 100);

  const chapters = [1, 2, 3].map(ch => {
    const nodes = progressionMap.filter(n => n.chapter === ch);
    const done = nodes.filter(n => completed.includes(n.id));
    return { chapter: ch, nodes, done, pct: Math.round((done.length / nodes.length) * 100) };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 28px', height: 52, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <AQLogo size={24} />
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 14 }}>Academic<span style={{ color: '#fff' }}>Quest</span></span>
        </div>
        <span style={{ color: '#444' }}>·</span>
        <span style={{ fontSize: 14, color: '#A1A1AA' }}>Progress</span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px' }}>

        {/* Overall banner */}
        <div style={{ background: 'linear-gradient(135deg, #1A102B, #120F1F)', border: '1px solid #2d1f4e', borderRadius: 16, padding: '28px 32px', marginBottom: 36, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 120, opacity: 0.04 }}>🗺️</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Your Learning Journey</h1>
          <p style={{ fontSize: 14, color: '#A1A1AA', marginBottom: 24 }}>Track every lesson, quiz, and game level in one place.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
              { val: `${overallPct}%`, label: 'Overall progress', color: '#8B5CF6' },
              { val: `${completedCount}`, label: 'Nodes completed', color: '#22C55E' },
              { val: `${overallXp.toLocaleString()}`, label: 'XP from journey', color: '#F59E0B' },
              { val: `${3 - chapters.filter(c => c.pct === 100).length}`, label: 'Chapters remaining', color: '#A1A1AA' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0D0B1A', border: '1px solid #2d1f4e', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: '#555' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 6, background: '#1A1028', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${overallPct}%`, background: 'linear-gradient(90deg,#8B5CF6,#22C55E)', borderRadius: 3, transition: 'width 0.6s' }} />
          </div>
        </div>

        {/* Chapter breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {chapters.map(ch => (
            <div key={ch.chapter} style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, overflow: 'hidden' }}>
              {/* Chapter header */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #2d1f4e', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${chapterColors[ch.chapter - 1]}20`, border: `1px solid ${chapterColors[ch.chapter - 1]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: chapterColors[ch.chapter - 1] }}>
                  {ch.chapter}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                    Chapter {ch.chapter}: {chapterNames[ch.chapter - 1]}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 4, background: '#1A1028', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${ch.pct}%`, background: chapterColors[ch.chapter - 1], borderRadius: 2, transition: 'width 0.5s' }} />
                    </div>
                    <span style={{ fontSize: 12, color: '#555', flexShrink: 0 }}>{ch.done.length}/{ch.nodes.length}</span>
                  </div>
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: ch.pct === 100 ? '#22C55E' : chapterColors[ch.chapter - 1] }}>
                  {ch.pct}%
                </span>
              </div>

              {/* Node grid */}
              <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {ch.nodes.map(node => {
                  const status = getNodeStatus(node.id);
                  const statusColor = status === 'completed' ? '#22C55E' : status === 'unlocked' ? chapterColors[ch.chapter - 1] : '#2d1f4e';
                  const typeConfig = node.type in gameTypeConfig ? gameTypeConfig[node.type as keyof typeof gameTypeConfig] : null;
                  const typeIcons: Record<string, string> = { lesson: '📖', quiz: '📋' };
                  const icon = typeConfig ? typeConfig.icon : (typeIcons[node.type] || '❓');

                  return (
                    <div
                      key={node.id}
                      onClick={() => {
                        if (status === 'locked') return;
                        if (node.type === 'lesson') navigate('/courses');
                        else if (node.type === 'quiz') navigate('/practice');
                        else if (typeConfig) navigate(typeConfig.route);
                      }}
                      style={{ background: status === 'locked' ? '#0A0A0A' : '#1A1028', border: `1px solid ${statusColor}`, borderRadius: 10, padding: '10px 12px', cursor: status === 'locked' ? 'not-allowed' : 'pointer', opacity: status === 'locked' ? 0.4 : 1, transition: 'border-color 0.2s' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 16 }}>{status === 'completed' ? '✅' : status === 'locked' ? '🔒' : icon}</span>
                        <span style={{ fontSize: 10, color: statusColor, fontWeight: 600, textTransform: 'uppercase' }}>
                          {node.type}
                        </span>
                        {status === 'unlocked' && <span style={{ fontSize: 9, background: `${statusColor}22`, color: statusColor, padding: '1px 6px', borderRadius: 10, marginLeft: 'auto' }}>READY</span>}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: status === 'locked' ? '#333' : '#fff', marginBottom: 4 }}>{node.title}</div>
                      <div style={{ fontSize: 11, color: '#555' }}>+{node.xpReward} XP</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
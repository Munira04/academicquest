import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AQLogo from './AQLogo';
import { getNodeStatus, getCompletedNodes, progressionMap } from '../data/progression';
import type { UnlockStatus } from '../data/progression';

interface Level {
  id: string;
  nodeId: string;         // maps to progression system
  world: number;
  level: number;
  title: string;
  subtitle: string;
  xp: number;
  concept: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  icon: string;
  route?: string;         // if it navigates away
  onPlay?: () => void;
}

interface World {
  number: number;
  name: string;
  description: string;
  color: string;
  levels: Level[];
  chapterRequired: number;
}

interface GameHubProps {
  gameType: 'dungeon' | 'battle' | 'detective' | 'smartcity';
  title: string;
  icon: string;
  accentColor: string;
  worlds: World[];
  onPlayLevel: (level: Level) => void;
}

const difficultyColors = {
  Beginner: '#22C55E',
  Intermediate: '#8B5CF6',
  Advanced: '#F59E0B',
  Master: '#EF4444',
};

export default function GameHub({ gameType, title, icon, accentColor, worlds, onPlayLevel }: GameHubProps) {
  const navigate = useNavigate();
  const [selectedWorld, setSelectedWorld] = useState(0);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [showUnlockTip, setShowUnlockTip] = useState<string | null>(null);

  useEffect(() => {
    setCompletedNodes(getCompletedNodes());
  }, []);

  const getStatus = (nodeId: string): UnlockStatus => {
    if (completedNodes.includes(nodeId)) return 'completed';
    const node = progressionMap.find(n => n.id === nodeId);
    if (!node) return 'locked';
    if (node.unlockRequires.length === 0) return 'unlocked';
    return node.unlockRequires.every(req => completedNodes.includes(req)) ? 'unlocked' : 'locked';
  };

  const world = worlds[selectedWorld];
  const worldStatus = getStatus(`${gameType}-${world.number}`);
  const isWorldLocked = worldStatus === 'locked';

  const totalLevels = worlds.reduce((acc, w) => acc + w.levels.length, 0);
  const completedLevels = worlds.reduce((acc, w) =>
    acc + w.levels.filter(l => completedNodes.includes(l.nodeId)).length, 0);
  const overallProgress = Math.round((completedLevels / totalLevels) * 100);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/practice')}>
          <AQLogo size={24} />
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 13 }}>Academic<span style={{ color: '#fff' }}>Quest</span></span>
        </div>
        <span style={{ color: '#444' }}>·</span>
        <span style={{ fontSize: 14, color: accentColor, fontWeight: 500 }}>{icon} {title}</span>

        {/* Overall progress */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>Overall progress</div>
            <div style={{ width: 120, height: 4, background: '#1A1028', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${overallProgress}%`, background: accentColor, borderRadius: 2, transition: 'width 0.5s' }} />
            </div>
          </div>
          <span style={{ fontSize: 12, color: '#A78BFA' }}>⚡ {completedLevels}/{totalLevels} levels</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* LEFT: World selector */}
        <div style={{ width: 240, background: '#120F1F', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '16px 16px 10px', borderBottom: '1px solid #2d1f4e', flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: accentColor, fontWeight: 600, letterSpacing: 1 }}>SELECT WORLD</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
            {worlds.map((w, i) => {
              const wStatus = getStatus(`${gameType}-${w.number}`);
              const wLevels = w.levels.filter(l => completedNodes.includes(l.nodeId)).length;
              const isActive = i === selectedWorld;

              return (
                <button key={w.number}
                  onClick={() => {
                    setSelectedWorld(i);
                    if (wStatus === 'locked') setShowUnlockTip(`${gameType}-${w.number}`);
                    else setShowUnlockTip(null);
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '12px 12px', borderRadius: 10, border: `1px solid ${isActive ? w.color : wStatus === 'locked' ? '#1a1028' : '#2d1f4e'}`, background: isActive ? `${w.color}15` : wStatus === 'locked' ? '#0A0A0A' : '#0D0B1A', cursor: 'pointer', marginBottom: 6, opacity: wStatus === 'locked' ? 0.5 : 1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>{wStatus === 'locked' ? '🔒' : wStatus === 'completed' ? '✅' : icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: wStatus === 'locked' ? '#333' : '#fff' }}>World {w.number}</div>
                      <div style={{ fontSize: 11, color: wStatus === 'locked' ? '#222' : '#555' }}>{w.name}</div>
                    </div>
                  </div>
                  {wStatus !== 'locked' && (
                    <div style={{ height: 2, background: '#1A1028', borderRadius: 1, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(wLevels / w.levels.length) * 100}%`, background: w.color, borderRadius: 1 }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Chapter unlock tip */}
          {showUnlockTip && (
            <div style={{ padding: 14, margin: 10, background: '#1A1028', borderRadius: 10, border: '1px solid #2d1f4e', fontSize: 12, color: '#A1A1AA', lineHeight: 1.6 }}>
              <div style={{ color: '#F59E0B', marginBottom: 4, fontWeight: 600 }}>🔒 Locked</div>
              Complete the previous world and its chapter quiz to unlock this content.
              <button onClick={() => navigate('/courses')} style={{ display: 'block', marginTop: 8, padding: '5px 10px', borderRadius: 6, border: '1px solid #8B5CF644', background: 'none', color: '#A78BFA', fontSize: 11, cursor: 'pointer', width: '100%' }}>
                Go to Courses →
              </button>
            </div>
          )}
        </div>

        {/* CENTER: Level map */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>

          {/* World header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${world.color}20`, border: `1px solid ${world.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                {isWorldLocked ? '🔒' : icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: world.color, fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>WORLD {world.number}</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: isWorldLocked ? '#333' : '#fff', marginBottom: 4 }}>{world.name}</h2>
                <p style={{ fontSize: 13, color: isWorldLocked ? '#222' : '#A1A1AA' }}>{world.description}</p>
              </div>
            </div>

            {isWorldLocked ? (
              <div style={{ background: '#1A1028', border: '1px solid #F59E0B33', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>🔒</span>
                <div>
                  <div style={{ fontSize: 13, color: '#F59E0B', fontWeight: 500, marginBottom: 2 }}>World locked</div>
                  <div style={{ fontSize: 12, color: '#555' }}>Complete the Chapter {world.chapterRequired} quiz to unlock this world.</div>
                </div>
                <button onClick={() => navigate('/practice?tab=quizzes')} style={{ marginLeft: 'auto', padding: '7px 14px', borderRadius: 7, border: '1px solid #F59E0B44', background: 'none', color: '#F59E0B', fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>
                  Take quiz →
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#555' }}>
                <span>{world.levels.filter(l => completedNodes.includes(l.nodeId)).length}/{world.levels.length} levels completed</span>
                <span>·</span>
                <span>+{world.levels.reduce((a, l) => a + l.xp, 0)} XP available</span>
              </div>
            )}
          </div>

          {/* Level path */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {world.levels.map((level, i) => {
              const status: UnlockStatus = isWorldLocked ? 'locked' :
                completedNodes.includes(level.nodeId) ? 'completed' :
                i === 0 ? 'unlocked' :
                completedNodes.includes(world.levels[i - 1].nodeId) ? 'unlocked' : 'locked';

              const diffColor = difficultyColors[level.difficulty];
              const isLeft = i % 2 === 0;

              return (
                <div key={level.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>

                  {/* Connector line */}
                  {i > 0 && (
                    <div style={{ position: 'absolute', marginTop: -20, left: isLeft ? 40 : undefined, right: isLeft ? undefined : 40, width: 2, height: 40, background: completedNodes.includes(world.levels[i - 1].nodeId) ? world.color + '66' : '#1A1028' }} />
                  )}

                  <div
                    onClick={() => {
                      if (status === 'locked') return;
                      onPlayLevel(level);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                      background: status === 'locked' ? '#0A0A0A' : status === 'completed' ? `${world.color}10` : '#120F1F',
                      border: `1px solid ${status === 'completed' ? world.color + '66' : status === 'unlocked' ? diffColor + '66' : '#1a1028'}`,
                      borderRadius: 14, cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                      width: '100%', marginBottom: 10, opacity: status === 'locked' ? 0.4 : 1,
                      transition: 'border-color 0.2s, transform 0.15s',
                      boxShadow: status === 'unlocked' ? `0 0 20px ${diffColor}15` : 'none',
                    }}
                    onMouseEnter={e => { if (status !== 'locked') (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
                  >
                    {/* Level node */}
                    <div style={{ width: 52, height: 52, borderRadius: '50%', border: `2px solid ${status === 'completed' ? world.color : status === 'unlocked' ? diffColor : '#2d1f4e'}`, background: status === 'completed' ? `${world.color}20` : status === 'unlocked' ? `${diffColor}15` : '#0D0B1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: status === 'locked' ? 18 : 22, flexShrink: 0, boxShadow: status === 'unlocked' ? `0 0 12px ${diffColor}40` : 'none' }}>
                      {status === 'locked' ? '🔒' : status === 'completed' ? '✅' : level.icon}
                    </div>

                    {/* Level info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, color: '#555' }}>Level {level.world}-{level.level}</span>
                        <span style={{ fontSize: 10, border: `1px solid ${diffColor}33`, color: diffColor, padding: '1px 8px', borderRadius: 20 }}>{level.difficulty}</span>
                        {status === 'unlocked' && <span style={{ fontSize: 10, background: `${diffColor}22`, color: diffColor, padding: '1px 8px', borderRadius: 20, fontWeight: 600 }}>READY</span>}
                        {status === 'completed' && <span style={{ fontSize: 10, color: '#22C55E' }}>✓ Completed</span>}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: status === 'locked' ? '#333' : '#fff', marginBottom: 2 }}>{level.title}</h3>
                      <div style={{ fontSize: 12, color: '#555' }}>{level.subtitle}</div>
                    </div>

                    {/* XP + concept */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 13, color: '#A78BFA', fontWeight: 500, marginBottom: 4 }}>+{level.xp} XP</div>
                      <div style={{ fontSize: 10, background: '#1A1028', border: '1px solid #2d1f4e', color: '#555', padding: '2px 8px', borderRadius: 20 }}>{level.concept}</div>
                    </div>

                    {/* Arrow */}
                    {status !== 'locked' && (
                      <span style={{ fontSize: 16, color: status === 'completed' ? world.color : diffColor, marginLeft: 8 }}>→</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* World complete banner */}
          {world.levels.every(l => completedNodes.includes(l.nodeId)) && (
            <div style={{ marginTop: 20, background: `${world.color}15`, border: `1px solid ${world.color}44`, borderRadius: 14, padding: '20px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>World {world.number} Complete!</h3>
              <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 16 }}>You've mastered {world.name}. {selectedWorld < worlds.length - 1 ? 'World ' + (world.number + 1) + ' is now unlocked!' : 'All worlds conquered!'}</p>
              {selectedWorld < worlds.length - 1 && (
                <button onClick={() => setSelectedWorld(selectedWorld + 1)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: world.color, color: '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Enter World {world.number + 1} →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
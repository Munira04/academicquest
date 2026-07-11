import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';
import GameHub from '../components/GameHub';
import { completeNode, getCompletedNodes } from '../data/progression';

interface Arena {
  id: string;
  name: string;
  league: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  xp: number;
  enemy: { name: string; hp: number; attack: number; defense: number; description: string };
  story: string;
  starterCode: string;
  concept: string;
  winCondition: string;
}

const arenas: Record<string, Arena[]> = {
  'w1-l1': [
    {
      id: 'a1', name: 'Training Grounds', league: 'Bronze League', difficulty: 'Beginner', xp: 100, concept: 'Variables',
      enemy: { name: 'Straw Dummy', hp: 80, attack: 5, defense: 0, description: 'A harmless training dummy. Perfect for first-timers.' },
      story: `BRONZE LEAGUE — TRAINING GROUNDS\n\nEvery warrior begins here. The Straw Dummy cannot fight back.\n\nYour mission: Program a warrior that calculates its attack power using variables.\n\nSet base_attack = 20, then add a bonus = 10.\nReturn the total attack. The dummy falls if your attack > 25.`,
      starterCode: `# BATTLE: Training Grounds\n# Program your warrior's attack\n\ndef warrior_attack(round_num):\n    base_attack = \n    bonus = \n    total = base_attack + bonus\n    return total\n\nprint(f"Round 1 attack: {warrior_attack(1)}")`,
      winCondition: 'base_attack',
    },
    {
      id: 'a2', name: 'The Iron Gate', league: 'Bronze League', difficulty: 'Beginner', xp: 150, concept: 'Conditionals',
      enemy: { name: 'Iron Golem', hp: 150, attack: 15, defense: 5, description: 'A slow but powerful construct. Attack hard in early rounds.' },
      story: `BRONZE LEAGUE — THE IRON GATE\n\nThe Iron Golem moves slowly but hits hard. Strategy: attack aggressively in round 1 and 2 before it builds momentum.\n\nWrite a function that returns HIGH damage (40+) in rounds 1-2 and NORMAL damage (25) after that.`,
      starterCode: `# BATTLE: The Iron Gate\ndef warrior_attack(round_num):\n    if round_num <= 2:\n        return   # high damage\n    else:\n        return   # normal damage\n\nfor r in range(1, 5):\n    print(f"Round {r}: {warrior_attack(r)} damage")`,
      winCondition: 'if round_num',
    },
  ],
  'w2-l1': [
    {
      id: 'a3', name: 'The Shadow Arena', league: 'Silver League', difficulty: 'Intermediate', xp: 200, concept: 'Loops',
      enemy: { name: 'Shadow Mage', hp: 250, attack: 30, defense: 10, description: 'Adapts to your pattern. Vary your attacks with loops.' },
      story: `SILVER LEAGUE — THE SHADOW ARENA\n\nThe Shadow Mage studies your attack pattern. Repeating the same damage every round is fatal.\n\nWrite a warrior that uses a loop to build up damage — starting at 15 and increasing by 8 per round.\nPrint each round's damage for rounds 1 through 6.`,
      starterCode: `# BATTLE: The Shadow Arena\n# Use a loop to build increasing damage\n\ndamage = 15\nfor round_num in range(1, 7):\n    print(f"Round {round_num}: {damage} damage")\n    damage +=   # increase damage each round`,
      winCondition: 'damage +=',
    },
  ],
  'w3-l1': [
    {
      id: 'a4', name: 'The Dragon Throne', league: 'Gold League', difficulty: 'Advanced', xp: 350, concept: 'Functions + Lists',
      enemy: { name: 'Ancient Dragon', hp: 500, attack: 60, defense: 25, description: 'The final boss. Requires a full battle simulation.' },
      story: `GOLD LEAGUE — THE DRAGON THRONE\n\nThe Ancient Dragon requires a complete battle strategy.\n\nWrite a full battle simulator:\n• Create a list of 8 damage values (your attack pattern)\n• Filter out any attacks below 30 (the dragon blocks them)\n• Sum the successful hits\n• Print whether you WIN (total > 200) or LOSE`,
      starterCode: `# BATTLE: The Dragon Throne\n# Full battle simulation\n\nattacks = [45, 20, 67, 15, 88, 32, 11, 71]\n\n# Filter attacks that penetrate defense (>= 30)\nsuccessful = \n\n# Total damage\ntotal_damage = sum(successful)\n\nprint(f"Successful hits: {len(successful)}")\nprint(f"Total damage: {total_damage}")\nif total_damage > 200:\n    print("VICTORY!")\nelse:\n    print("DEFEAT!")`,
      winCondition: 'successful',
    },
  ],
};

const battleWorlds = [
  { number: 1, name: 'Bronze League', description: 'Learn attack logic with variables and conditionals.', color: '#D97706', chapterRequired: 1,
    levels: [
      { id: 'w1-l1', nodeId: 'battle-1', world: 1, level: 1, title: 'Training Grounds & Iron Gate', subtitle: '2 arenas · Variables and conditionals', xp: 250, concept: 'Conditionals', difficulty: 'Beginner' as const, icon: '🥊' },
    ]},
  { number: 2, name: 'Silver League', description: 'Fight adaptive enemies using loops and functions.', color: '#6B7280', chapterRequired: 2,
    levels: [
      { id: 'w2-l1', nodeId: 'battle-2', world: 2, level: 1, title: 'The Shadow Arena', subtitle: '1 arena · Loop-based combat', xp: 200, concept: 'Loops', difficulty: 'Intermediate' as const, icon: '⚔️' },
    ]},
  { number: 3, name: 'Gold League', description: 'Master complex battle algorithms.', color: '#F59E0B', chapterRequired: 3,
    levels: [
      { id: 'w3-l1', nodeId: 'battle-3', world: 3, level: 1, title: 'The Dragon Throne', subtitle: '1 arena · Full battle simulation', xp: 350, concept: 'Functions', difficulty: 'Advanced' as const, icon: '🐉' },
    ]},
];

export default function CodeBattles() {
  const navigate = useNavigate();
  const [activeArena, setActiveArena] = useState<{ levelKey: string; arenaIndex: number } | null>(null);
  const [code, setCode] = useState('');
  const [battleLog, setBattleLog] = useState<{ text: string; type: string }[]>([{ text: 'Battle terminal ready. Program your warrior then click FIGHT.', type: 'muted' }]);
  const [battling, setBattling] = useState(false);
  const [won, setWon] = useState<boolean | null>(null);
  const [arenasWon, setArenasWon] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const termColors: Record<string, string> = { prompt: '#EF4444', output: '#E2E8F0', error: '#F87171', muted: '#555', success: '#22C55E', player: '#A78BFA', enemy: '#F87171', system: '#A1A1AA', xp: '#22C55E' };

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [battleLog]);

  const currentArenas = activeArena ? arenas[activeArena.levelKey] || [] : [];
  const arena = activeArena ? currentArenas[activeArena.arenaIndex] : null;
  const allArenasWon = currentArenas.every(a => arenasWon.includes(a.id));

  const simulateBattle = () => {
    if (!arena || battling) return;
    setBattling(true);
    setWon(null);
    const hasCode = code.includes(arena.winCondition) && code.includes('return') || code.includes('print(') && code.includes(arena.winCondition);
    const logs: { text: string; type: string }[] = [
      { text: '━━━━━━━━ BATTLE START ━━━━━━━━', type: 'system' },
      { text: `Your Warrior vs ${arena.enemy.name}!`, type: 'system' },
    ];
    let pHp = 150, eHp = arena.enemy.hp;
    for (let r = 1; r <= 8; r++) {
      const pDmg = hasCode ? Math.floor((20 + r * 8) * (Math.random() < 0.25 ? 2 : 1)) : Math.floor(Math.random() * 15) + 5;
      const eDmg = Math.floor(arena.enemy.attack * (0.5 + Math.random() * 0.5));
      eHp = Math.max(0, eHp - pDmg);
      pHp = Math.max(0, pHp - eDmg);
      logs.push({ text: `Round ${r}:`, type: 'system' });
      logs.push({ text: `  ⚔️  Your attack: ${pDmg} damage`, type: 'player' });
      logs.push({ text: `  👾 ${arena.enemy.name} hits: ${eDmg} damage`, type: 'enemy' });
      logs.push({ text: `  HP → You: ${pHp} | Enemy: ${eHp}`, type: 'muted' });
      if (eHp <= 0) { logs.push({ text: `\n🏆 VICTORY! ${arena.enemy.name} defeated in ${r} rounds!`, type: 'xp' }); logs.push({ text: `+${arena.xp} XP earned`, type: 'xp' }); break; }
      if (pHp <= 0) { logs.push({ text: `\n💀 DEFEAT! Improve your strategy and try again.`, type: 'enemy' }); break; }
    }
    const victory = eHp <= 0 || (pHp > eHp && hasCode);
    if (victory && eHp > 0) logs.push({ text: `\n🏆 TIME LIMIT — You win on HP! +${Math.floor(arena.xp / 2)} XP`, type: 'xp' });
    else if (!victory && eHp > 0) logs.push({ text: `\n💀 TIME LIMIT — Enemy wins on HP.`, type: 'enemy' });
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) { setBattleLog(prev => [...prev, logs[i]]); i++; }
      else {
        clearInterval(interval);
        setBattling(false);
        setWon(victory);
        if (victory) setArenasWon(prev => [...new Set([...prev, arena.id])]);
      }
    }, 180);
  };

  const completeLevelAndReturn = () => {
    if (!activeArena) return;
    const nodeMap: Record<number, string> = { 1: 'battle-1', 2: 'battle-2', 3: 'battle-3' };
    const worldNum = parseInt(activeArena.levelKey[1]);
    completeNode(nodeMap[worldNum] || 'battle-1');
    setActiveArena(null);
    setArenasWon([]);
    setWon(null);
    setBattleLog([{ text: 'Battle terminal ready.', type: 'muted' }]);
  };

  if (activeArena && arena) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
        <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setActiveArena(null)} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>← League Map</button>
          <AQLogo size={20} />
          <span style={{ color: '#EF4444', fontWeight: 600, fontSize: 13 }}>Code Battles</span>
          <span style={{ color: '#444' }}>·</span>
          <span style={{ fontSize: 12, color: '#A1A1AA' }}>{arena.league} · {arena.name}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {currentArenas.map((a, i) => (
              <div key={a.id} onClick={() => { if (i <= activeArena.arenaIndex || arenasWon.includes(currentArenas[i-1]?.id || '')) { setActiveArena(prev => ({ ...prev!, arenaIndex: i })); setCode(''); setWon(null); setBattleLog([{ text: `> Entering ${a.name}...`, type: 'muted' }]); } }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: arenasWon.includes(a.id) ? '#22C55E' : i === activeArena.arenaIndex ? '#EF4444' : '#2d1f4e', cursor: 'pointer' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '40%', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#1A0A0A', padding: '14px 18px', borderBottom: '1px solid #EF444433', flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: '#EF4444', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>{arena.league} · {arena.difficulty.toUpperCase()} · {arena.concept}</div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{arena.name}</h2>
              <div style={{ background: '#2F1A1A', border: '1px solid #EF444433', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#A1A1AA' }}>
                <span style={{ color: '#EF4444' }}>👾 {arena.enemy.name}</span> · HP: {arena.enemy.hp} · ATK: {arena.enemy.attack} · DEF: {arena.enemy.defense}
                <div style={{ marginTop: 4, color: '#555' }}>{arena.enemy.description}</div>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#C2C0BE', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{arena.story}</pre>
            </div>
            <div ref={logRef} style={{ height: 200, background: '#0A0A0E', padding: '10px 14px', overflowY: 'auto', fontFamily: 'Fira Code, monospace', fontSize: 11, lineHeight: 1.7, borderTop: '1px solid #1a1028', flexShrink: 0 }}>
              {battleLog.map((line, i) => <div key={i} style={{ color: termColors[line.type] || '#fff' }}>{line.text}</div>)}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 12px', height: 36, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#A1A1AA' }}>warrior.py · {arena.concept}</span>
              {won === true && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#22C55E' }}>✓ Victory!</span>}
              {won === false && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#EF4444' }}>✗ Defeated</span>}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Editor height="100%" language="python" value={code || arena.starterCode} onChange={v => setCode(v || '')} theme="vs-dark"
                options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'Fira Code, monospace', automaticLayout: true, padding: { top: 10 } }} />
            </div>
            <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', padding: '8px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={simulateBattle} disabled={battling} style={{ padding: '7px 20px', borderRadius: 7, border: 'none', background: battling ? '#2d1f4e' : '#EF4444', color: '#fff', fontSize: 13, fontWeight: 700, cursor: battling ? 'not-allowed' : 'pointer' }}>
                {battling ? 'Fighting...' : won === false ? '⚔️ Retry' : '⚔️ FIGHT'}
              </button>
              {won === true && !allArenasWon && activeArena.arenaIndex < currentArenas.length - 1 && (
                <button onClick={() => { setActiveArena(prev => ({ ...prev!, arenaIndex: prev!.arenaIndex + 1 })); setCode(''); setWon(null); setBattleLog([{ text: '> Next arena...', type: 'muted' }]); }}
                  style={{ padding: '7px 16px', borderRadius: 7, border: 'none', background: '#22C55E', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>→ Next arena</button>
              )}
              {allArenasWon && (
                <button onClick={completeLevelAndReturn} style={{ padding: '7px 16px', borderRadius: 7, border: 'none', background: '#F59E0B', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>🏆 Complete league!</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GameHub gameType="battle" title="Code Battles" icon="⚔️" accentColor="#EF4444" worlds={battleWorlds}
      onPlayLevel={level => { setActiveArena({ levelKey: level.id, arenaIndex: 0 }); setCode(''); setWon(null); setBattleLog([{ text: `> Entering ${level.title}...`, type: 'muted' }]); }} />
  );
}
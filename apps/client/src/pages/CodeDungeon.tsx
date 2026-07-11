import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';
import GameHub from '../components/GameHub';
import { completeNode, getCompletedNodes } from '../data/progression';

interface Room { id: string; name: string; description: string; puzzle: string; hint: string; solution: string; expectedOutput: string; concept: string; }
interface DungeonWorld { worldNumber: number; rooms: Room[]; }

const dungeonContent: Record<string, DungeonWorld> = {
  'w1-l1': { worldNumber: 1, rooms: [
    { id: 'r1', name: 'The Entry Vault', concept: 'Print & Variables',
      description: `You awaken in a cold stone chamber. Torches flicker on ancient walls. A heavy iron door blocks your path NORTH. Carved above it:\n\n"The door opens only when you speak the sum of the vault's treasures."\n\nOn a dusty table:\n  treasures = [42, 17, 83, 29, 61, 15, 74]`,
      puzzle: `# THE ENTRY VAULT\ntreasures = [42, 17, 83, 29, 61, 15, 74]\n\n# Calculate the total and open the door\ntotal = \nprint(f"OPEN: {total}")`,
      hint: `total = sum(treasures)`,
      solution: `treasures = [42, 17, 83, 29, 61, 15, 74]\ntotal = sum(treasures)\nprint(f"OPEN: {total}")`,
      expectedOutput: 'OPEN: 321' },
    { id: 'r2', name: 'The Mirror Maze', concept: 'List Filtering',
      description: `A hall of mirrors. Each shows a number. Only EVEN mirrors reveal the path EAST.\n\n"Filter the reflections. Count the even ones. That number is the key."\n\n  mirrors = [7, 12, 3, 44, 9, 18, 25, 6, 31, 88]`,
      puzzle: `# THE MIRROR MAZE\nmirrors = [7, 12, 3, 44, 9, 18, 25, 6, 31, 88]\n\n# Filter even mirrors\neven_mirrors = \nprint(f"KEY: {len(even_mirrors)}")`,
      hint: `even_mirrors = [m for m in mirrors if m % 2 == 0]`,
      solution: `mirrors = [7, 12, 3, 44, 9, 18, 25, 6, 31, 88]\neven_mirrors = [m for m in mirrors if m % 2 == 0]\nprint(f"KEY: {len(even_mirrors)}")`,
      expectedOutput: 'KEY: 5' },
  ]},
  'w1-l2': { worldNumber: 1, rooms: [
    { id: 'r3', name: 'The Cipher Chamber', concept: 'String Manipulation',
      description: `Spinning gears and encrypted tablets fill the room. The SOUTH door has a word lock.\n\n"Reverse the ancient word. Speak it backwards to pass."\n\n  ancient_word = "DUNGEON"`,
      puzzle: `# THE CIPHER CHAMBER\nancient_word = "DUNGEON"\n\n# Reverse the word\nreversed_word = \nprint(f"UNLOCK: {reversed_word}")`,
      hint: `reversed_word = ancient_word[::-1]`,
      solution: `ancient_word = "DUNGEON"\nreversed_word = ancient_word[::-1]\nprint(f"UNLOCK: {reversed_word}")`,
      expectedOutput: 'UNLOCK: NOEGNUD' },
    { id: 'r4', name: "The Dragon's Lair", concept: 'Max & Index',
      description: `FINAL CHAMBER. A dragon sleeps on gold. A riddle burns in fire:\n\n"Find my position — the index of the largest treasure — and I shall let you pass."\n\n  hoard = [234, 891, 445, 1205, 332, 778, 99, 2047, 156]`,
      puzzle: `# THE DRAGON'S LAIR\nhoard = [234, 891, 445, 1205, 332, 778, 99, 2047, 156]\n\nmax_value = \ndragon_position = \nprint(f"DRAGON SLEEPS AT INDEX: {dragon_position}")`,
      hint: `max_value = max(hoard)\ndragon_position = hoard.index(max_value)`,
      solution: `hoard = [234, 891, 445, 1205, 332, 778, 99, 2047, 156]\nmax_value = max(hoard)\ndragon_position = hoard.index(max_value)\nprint(f"DRAGON SLEEPS AT INDEX: {dragon_position}")`,
      expectedOutput: 'DRAGON SLEEPS AT INDEX: 7' },
  ]},
  'w2-l1': { worldNumber: 2, rooms: [
    { id: 'r5', name: 'The Loop Labyrinth', concept: 'For Loops',
      description: `World 2 — The Labyrinth of Loops.\n\nA maze of infinite corridors. A guardian spirit whispers:\n"Count every step from 1 to 10. Print each one. The pattern opens the way."\n\nPrint numbers 1 through 10, one per line.`,
      puzzle: `# THE LOOP LABYRINTH\n# Print numbers 1 through 10\n\nfor i in :\n    print(i)`,
      hint: `for i in range(1, 11):\n    print(i)`,
      solution: `for i in range(1, 11):\n    print(i)`,
      expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' },
    { id: 'r6', name: 'The Function Fortress', concept: 'Functions',
      description: `A fortress sealed by a function lock.\n\n"Define a function called greet that takes a name and returns 'Hello, [name]!'. Call it with 'Explorer'."\n\nThe door opens only when the function is properly defined and called.`,
      puzzle: `# THE FUNCTION FORTRESS\n# Define and call the greet function\n\ndef greet(name):\n    return \n\nprint(greet("Explorer"))`,
      hint: `def greet(name):\n    return f"Hello, {name}!"`,
      solution: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Explorer"))`,
      expectedOutput: 'Hello, Explorer!' },
  ]},
  'w3-l1': { worldNumber: 3, rooms: [
    { id: 'r7', name: 'The Dictionary Dungeon', concept: 'Dictionaries',
      description: `World 3 — Data Depths.\n\nAncient scrolls are organized by key. A voice echoes:\n"Build a dictionary of 3 items: apple=1.50, bread=2.30, milk=0.99. Calculate and print the total cost."`,
      puzzle: `# THE DICTIONARY DUNGEON\nprices = {\n    "apple": ,\n    "bread": ,\n    "milk": \n}\n\ntotal = sum(prices.values())\nprint(f"TOTAL: {total:.2f}")`,
      hint: `prices = {"apple": 1.50, "bread": 2.30, "milk": 0.99}\ntotal = sum(prices.values())`,
      solution: `prices = {"apple": 1.50, "bread": 2.30, "milk": 0.99}\ntotal = sum(prices.values())\nprint(f"TOTAL: {total:.2f}")`,
      expectedOutput: 'TOTAL: 4.79' },
  ]},
};

const dungeonWorlds = [
  { number: 1, name: 'The Ancient Vaults', description: 'Master variables, lists, and string operations to escape the dungeon.', color: '#8B5CF6', chapterRequired: 1,
    levels: [
      { id: 'w1-l1', nodeId: 'dungeon-1', world: 1, level: 1, title: 'Entry Vault & Mirror Maze', subtitle: '2 rooms · Variables and list filtering', xp: 150, concept: 'Lists', difficulty: 'Beginner' as const, icon: '🏚️' },
      { id: 'w1-l2', nodeId: 'dungeon-1', world: 1, level: 2, title: "Cipher Chamber & Dragon's Lair", subtitle: '2 rooms · Strings and indexing', xp: 200, concept: 'Strings', difficulty: 'Beginner' as const, icon: '🐉' },
    ]},
  { number: 2, name: 'The Labyrinth of Loops', description: 'Navigate with loops, conditionals, and functions.', color: '#3B82F6', chapterRequired: 2,
    levels: [
      { id: 'w2-l1', nodeId: 'dungeon-2', world: 2, level: 1, title: 'Loop Labyrinth & Function Fortress', subtitle: '2 rooms · Loops and functions', xp: 250, concept: 'Loops', difficulty: 'Intermediate' as const, icon: '🌀' },
    ]},
  { number: 3, name: 'Data Depths', description: 'Master dictionaries, sorting, and algorithms.', color: '#F59E0B', chapterRequired: 3,
    levels: [
      { id: 'w3-l1', nodeId: 'dungeon-3', world: 3, level: 1, title: 'Dictionary Dungeon', subtitle: '1 room · Dictionaries', xp: 300, concept: 'Dicts', difficulty: 'Advanced' as const, icon: '📚' },
    ]},
];

export default function CodeDungeon() {
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [roomIndex, setRoomIndex] = useState(0);
  const [code, setCode] = useState('');
  const [terminal, setTerminal] = useState<{ text: string; type: string }[]>([{ text: '> Dungeon terminal active.', type: 'muted' }]);
  const [showHint, setShowHint] = useState(false);
  const [roomsCleared, setRoomsCleared] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  const termColors: Record<string, string> = { prompt: '#22C55E', output: '#E2E8F0', error: '#F87171', muted: '#555', success: '#22C55E' };

  const currentRooms = activeLevel ? dungeonContent[activeLevel]?.rooms || [] : [];
  const room = currentRooms[roomIndex];
  const allRoomsCleared = currentRooms.every(r => roomsCleared.includes(r.id));

  const runCode = () => {
    setTerminal([{ text: '$ python dungeon.py', type: 'prompt' }]);
    setTimeout(() => {
      const passes = room && (code.includes('sum(') || code.includes('[::-1]') || code.includes('index(') || code.includes('range(') || code.includes('return') || code.includes('values()') || code.includes('even_mirrors') || code.includes('prices'));
      if (passes && code.includes('print(')) {
        room.expectedOutput.split('\n').slice(0, 3).forEach(line =>
          setTerminal(prev => [...prev, { text: line, type: 'output' }])
        );
        setTerminal(prev => [...prev,
          { text: 'Process finished with exit code 0', type: 'muted' },
          { text: `✓ Room cleared! +${Math.floor(room.id.length * 20)} XP`, type: 'success' },
        ]);
        setRoomsCleared(prev => [...new Set([...prev, room.id])]);
      } else {
        setTerminal(prev => [...prev, { text: 'The door does not respond. Check your logic.', type: 'error' }]);
      }
    }, 700);
  };

  const completeLevelAndReturn = () => {
    const levelKey = activeLevel!;
    const worldData = dungeonContent[levelKey];
    if (worldData) {
      const nodeMap: Record<number, string> = { 1: 'dungeon-1', 2: 'dungeon-2', 3: 'dungeon-3' };
      completeNode(nodeMap[worldData.worldNumber] || 'dungeon-1');
    }
    setActiveLevel(null);
    setRoomsCleared([]);
    setRoomIndex(0);
  };

  if (activeLevel && room) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
        <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setActiveLevel(null)} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>← World Map</button>
          <AQLogo size={20} />
          <span style={{ color: '#8B5CF6', fontWeight: 600, fontSize: 13 }}>Code Dungeon</span>
          <span style={{ color: '#444' }}>·</span>
          <span style={{ fontSize: 12, color: '#A1A1AA' }}>{room.name}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            {currentRooms.map((r, i) => (
              <div key={r.id} style={{ width: 8, height: 8, borderRadius: '50%', background: roomsCleared.includes(r.id) ? '#22C55E' : i === roomIndex ? '#8B5CF6' : '#2d1f4e' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '42%', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#0D0B1A', padding: '14px 18px', borderBottom: '1px solid #8B5CF644', flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>ROOM {roomIndex + 1} / {currentRooms.length} · {room.concept}</div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{room.name}</h2>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#C2C0BE', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{room.description}</pre>
            </div>
            <div style={{ padding: '12px 18px', borderTop: '1px solid #2d1f4e', flexShrink: 0 }}>
              <button onClick={() => setShowHint(h => !h)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #8B5CF644', background: showHint ? '#1A1028' : 'none', color: '#A78BFA', fontSize: 12, cursor: 'pointer' }}>
                {showHint ? '← Hide hint' : '⚡ Reveal hint'}
              </button>
              {showHint && <pre style={{ marginTop: 10, whiteSpace: 'pre-wrap', fontSize: 12, color: '#C4B5F5', fontFamily: 'Fira Code, monospace', background: '#1A1028', border: '1px solid #2d1f4e', borderRadius: 8, padding: 12 }}>{room.hint}</pre>}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 12px', display: 'flex', alignItems: 'center', height: 36, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#A1A1AA' }}>dungeon.py</span>
              {roomsCleared.includes(room.id) && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#22C55E' }}>✓ Room cleared</span>}
            </div>
            <div style={{ flex: 2, overflow: 'hidden' }}>
              <Editor height="100%" language="python" value={code || room.puzzle} onChange={v => setCode(v || '')} theme="vs-dark"
                options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'Fira Code, monospace', automaticLayout: true, padding: { top: 10 } }} />
            </div>
            <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', borderBottom: '1px solid #2d1f4e', padding: '6px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={runCode} style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>▶ Cast spell</button>
              {roomsCleared.includes(room.id) && !allRoomsCleared && (
                <button onClick={() => { setRoomIndex(i => i + 1); setCode(''); setShowHint(false); setTerminal([{ text: '> Next room...', type: 'muted' }]); }}
                  style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#22C55E', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>→ Next room</button>
              )}
              {allRoomsCleared && (
                <button onClick={completeLevelAndReturn} style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#F59E0B', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>🏆 Complete level!</button>
              )}
            </div>
            <div ref={termRef} style={{ flex: 1, background: '#0A0A0E', padding: '10px 14px', overflowY: 'auto', fontFamily: 'Fira Code, monospace', fontSize: 12, lineHeight: 1.8 }}>
              {terminal.map((line, i) => <div key={i} style={{ color: termColors[line.type] || '#fff' }}>{line.text}</div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GameHub
      gameType="dungeon"
      title="Code Dungeon"
      icon="🏰"
      accentColor="#8B5CF6"
      worlds={dungeonWorlds}
      onPlayLevel={(level) => {
        setActiveLevel(level.id);
        setRoomIndex(0);
        setCode('');
        setRoomsCleared([]);
        setTerminal([{ text: `> Entering ${level.title}...`, type: 'muted' }]);
      }}
    />
  );
}
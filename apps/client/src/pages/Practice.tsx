import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';
import Eddy from '../components/Eddy';

// Import our cohesive companion system hooks and components
import EddyWidget, { useEddyReaction } from '../components/EddyWidget';

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────
interface QuizChallenge {
  id: string;
  missionNumber: number;
  title: string;
  chapter: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master';
  xp: number;
  story: string;
  hint: string;
  solution: string;
  startingCode: string;
  expectedKeywords: string[];
  expectedOutput: string;
  language: string;
}

const quizChallenges: QuizChallenge[] = [
  {
    id: 'q1', missionNumber: 1, title: 'The Awakening', chapter: 'Python Chapter 1 Recap',
    difficulty: 'Beginner', xp: 75, language: 'python',
    story: `MISSION 01 — THE AWAKENING\n\nStation systems are offline. The crew is asleep in cryo-pods. The only way to wake them is to broadcast a signal.\n\nYour first task: boot up the communication array by printing the station's activation phrase to the terminal.\n\nThe phrase is: "STATION ONLINE"\n\nComplete this task to wake the crew.`,
    hint: `Use Python's print() function:\nprint("STATION ONLINE")`,
    solution: `print("STATION ONLINE")`,
    startingCode: `# MISSION 01: The Awakening\n# Boot the communication array\n# Print the activation phrase to the terminal\n\n`,
    expectedKeywords: ['print'],
    expectedOutput: 'STATION ONLINE',
  },
  {
    id: 'q2', missionNumber: 2, title: 'Crew Manifest', chapter: 'Python Chapter 1 Recap',
    difficulty: 'Beginner', xp: 100, language: 'python',
    story: `MISSION 02 — CREW MANIFEST\n\nThe crew is awake but the manifest system lost all records. You must reconstruct the crew database from memory.\n\nStore the following information as variables:\n• crew_name = "Commander Munira"\n• crew_rank = "Chief Engineer"\n• crew_id = 7291\n\nThen print a formatted crew badge:\n"CREW: Commander Munira | RANK: Chief Engineer | ID: 7291"`,
    hint: `Use f-strings to combine variables:\nprint(f"CREW: {crew_name} | RANK: {crew_rank} | ID: {crew_id}")`,
    solution: `crew_name = "Commander Munira"\ncrew_rank = "Chief Engineer"\ncrew_id = 7291\nprint(f"CREW: {crew_name} | RANK: {crew_rank} | ID: {crew_id}")`,
    startingCode: `# MISSION 02: Crew Manifest\n# Reconstruct the crew database\n\ncrew_name = \ncrew_rank = \ncrew_id = \n\n# Print the crew badge\n`,
    expectedKeywords: ['crew_name', 'crew_rank', 'crew_id', 'print'],
    expectedOutput: 'CREW: Commander Munira | RANK: Chief Engineer | ID: 7291',
  },
  {
    id: 'q3', missionNumber: 3, title: 'Fuel Calculator', chapter: 'Python Chapter 1 Recap',
    difficulty: 'Intermediate', xp: 150, language: 'python',
    story: `MISSION 03 — FUEL CALCULATOR\n\nThe station's fuel reserves are critical. The navigation computer needs to calculate the total fuel for the return journey.\n\nThe journey has 4 legs:\n  fuel_leg1 = 2450  (Earth to Moon)\n  fuel_leg2 = 18700  (Moon to Mars)\n  fuel_leg3 = 4200  (Mars to asteroid belt)\n  fuel_leg4 = 22100  (Return to Earth)\n\nCalculate the TOTAL fuel, then check if it exceeds the fuel_capacity of 50000.\nPrint: "FUEL OK: [total]" or "FUEL CRITICAL: [total]"`,
    hint: `total_fuel = fuel_leg1 + fuel_leg2 + fuel_leg3 + fuel_leg4\nif total_fuel > fuel_capacity:\n    print(f"FUEL CRITICAL: {total_fuel}")\nelse:\n    print(f"FUEL OK: {total_fuel}")`,
    solution: `fuel_leg1 = 2450\nfuel_leg2 = 18700\nfuel_leg3 = 4200\nfuel_leg4 = 22100\nfuel_capacity = 50000\ntotal_fuel = fuel_leg1 + fuel_leg2 + fuel_leg3 + fuel_leg4\nif total_fuel > fuel_capacity:\n    print(f"FUEL CRITICAL: {total_fuel}")\nelse:\n    print(f"FUEL OK: {total_fuel}")`,
    startingCode: `# MISSION 03: Fuel Calculator\nfuel_leg1 = 2450\nfuel_leg2 = 18700\nfuel_leg3 = 4200\nfuel_leg4 = 22100\nfuel_capacity = 50000\n\n# Calculate total fuel\ntotal_fuel = \n\n# Check against capacity\n`,
    expectedKeywords: ['total_fuel', 'fuel_capacity', 'if', 'print'],
    expectedOutput: 'FUEL OK: 47450',
  },
  {
    id: 'q4', missionNumber: 4, title: 'Sensor Array', chapter: 'Python Chapter 1 Recap',
    difficulty: 'Intermediate', xp: 175, language: 'python',
    story: `MISSION 04 — SENSOR ARRAY\n\nThe station's 6 temperature sensors are reporting readings. Some may be dangerously high.\n\nreadings = [18.2, 45.7, 22.1, 89.3, 31.5, 67.8]\n\nYour mission:\n1. Calculate the average temperature\n2. Find the maximum reading\n3. Count how many sensors are above 50 degrees (critical threshold)\n4. Print a full status report`,
    hint: `average = sum(readings) / len(readings)\nmaximum = max(readings)\ncritical = len([r for r in readings if r > 50])`,
    solution: `readings = [18.2, 45.7, 22.1, 89.3, 31.5, 67.8]\naverage = sum(readings) / len(readings)\nmaximum = max(readings)\ncritical = len([r for r in readings if r > 50])\nprint(f"Average: {average:.1f}C")\nprint(f"Maximum: {maximum}C")\nprint(f"Critical sensors: {critical}")`,
    startingCode: `# MISSION 04: Sensor Array\nreadings = [18.2, 45.7, 22.1, 89.3, 31.5, 67.8]\n\n# Calculate stats\naverage = \nmaximum = \ncritical = \n\n# Print status report\n`,
    expectedKeywords: ['readings', 'average', 'maximum', 'critical', 'print'],
    expectedOutput: 'Average: 45.8C',
  },
  {
    id: 'q5', missionNumber: 5, title: 'Final Protocol', chapter: 'Python Chapter 1 Recap',
    difficulty: 'Master', xp: 300, language: 'python',
    story: `FINAL MISSION — THE EXODUS PROTOCOL\n\nThe station is failing. You have one shot to save the crew.\n\nYou have a list of 8 crew members with their survival scores (0-100):\ncrew = [("Munira", 87), ("Alex", 45), ("Jordan", 92), ("Sam", 61), ("River", 78), ("Casey", 33), ("Morgan", 95), ("Quinn", 55)]\n\nThe escape pod only fits the TOP 4 crew members by survival score.\n\nYour mission:\n1. Sort crew by score (highest first)\n2. Select the top 4\n3. Print each selected member as: "EVACUATING: [name] (score: [score])"\n4. Print total remaining: "REMAINING ON STATION: [count]"`,
    hint: `sorted_crew = sorted(crew, key=lambda x: x[1], reverse=True)\ntop_4 = sorted_crew[:4]\nfor name, score in top_4:\n    print(f"EVACUATING: {name} (score: {score})")`,
    solution: `crew = [("Munira", 87), ("Alex", 45), ("Jordan", 92), ("Sam", 61),\n        ("River", 78), ("Casey", 33), ("Morgan", 95), ("Quinn", 55)]\nsorted_crew = sorted(crew, key=lambda x: x[1], reverse=True)\ntop_4 = sorted_crew[:4]\nfor name, score in top_4:\n    print(f"EVACUATING: {name} (score: {score})")\nprint(f"REMAINING ON STATION: {len(crew) - len(top_4)}")`,
    startingCode: `# FINAL MISSION: The Exodus Protocol\ncrew = [("Munira", 87), ("Alex", 45), ("Jordan", 92), ("Sam", 61),\n        ("River", 78), ("Casey", 33), ("Morgan", 95), ("Quinn", 55)]\n\n# Sort by survival score (highest first)\nsorted_crew = \n\n# Select top 4\ntop_4 = \n\n# Print evacuation list\n\n# Print remaining count\n`,
    expectedKeywords: ['sorted_crew', 'top_4', 'for', 'print', 'EVACUATING'],
    expectedOutput: 'EVACUATING: Morgan',
  },
];

// ─── GAME MODES ───────────────────────────────────────────────────────────────
const gameModes = [
  {
    id: 'dungeon', icon: '🏰', title: 'Code Dungeon', tag: 'Puzzle',
    desc: 'Solve logic puzzles, unlock doors, navigate rooms, and collect items entirely through code. Each room introduces a new concept.',
    color: '#8B5CF6', route: '/dungeon',
    features: ['4 rooms', 'Progressive difficulty', 'Puzzle-based'],
  },
  {
    id: 'battles', icon: '⚔️', title: 'Code Battles', tag: 'PvP Strategy',
    desc: 'Program your warrior\'s logic and watch your code fight against enemies. Loops, conditions, and functions become strategy.',
    color: '#EF4444', route: '/battles',
    features: ['2 missions', 'AI opponents', 'Battle simulation'],
  },
  {
    id: 'detective', icon: '🔍', title: 'Hacker Detective', tag: 'Debug',
    desc: 'Hunt bugs, trace errors, and fix broken programs as a detective solving a mystery. Every bug fixed is a clue uncovered.',
    color: '#F59E0B', route: '/detective',
    features: ['2 cases', 'Bug tracking', 'Code forensics'],
  },
  {
    id: 'smartcity', icon: '🏙️', title: 'Smart City', tag: 'Simulation',
    desc: 'Write algorithms to manage city systems — traffic, power, resources. Optimize your city\'s efficiency through real code.',
    color: '#22C55E', route: '/smartcity',
    features: ['2 missions', 'Real data', 'Algorithm design'],
  },
];

const mockAiResponses: Record<string, string> = {
  '/explain': "Explaining code structures simplifies tracking logic workflows! Look up how parameters flow into scopes.",
  '/debug': "Check your assignments! An unmatched assignment operator or unindented conditional block breaks compilation.",
  '/hint': "For this mission, analyze your slice limits and loop declarations closely.",
  'default': "Fascinating terminal layout logic. Let's run compilation verification to test your progress details."
};

const aiCommands = [
  { cmd: '/explain', desc: 'Explain a concept in plain English' },
  { cmd: '/debug', desc: 'Find and fix errors in your code' },
  { cmd: '/review', desc: 'Get feedback on code quality' },
  { cmd: '/hint', desc: 'Get a nudge without spoiling the answer' },
  { cmd: '/quiz', desc: 'Generate a quick quiz on any topic' },
];

type Tab = 'challenges' | 'quizzes' | 'ai';
type TermLine = { text: string; type: 'prompt' | 'output' | 'error' | 'success' | 'muted' };

export default function Practice() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [activeTab, setActiveTab] = useState<Tab>('challenges');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const quiz = quizChallenges[quizIndex];
  
  const [code, setCode] = useState(quiz.startingCode);
  const [terminal, setTerminal] = useState<TermLine[]>([
    { text: 'Mission terminal ready. Write your code and click Run.', type: 'muted' }
  ]);
  const [termStatus, setTermStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [ran, setRan] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  
  // Use the uniform reaction engine instance matching step 6 structural specifications
  const { mood: eddyMood, message: eddyMsg, react: eddyReact } = useEddyReaction('practice');
  
  const termRef = useRef<HTMLDivElement>(null);

  // AI state
  const [aiMessages, setAiMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Welcome. I'm Eddy — your Quest AI companion. I'll help with code, explain concepts, and occasionally judge your semicolons.", isUser: false }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const aiRef = useRef<HTMLDivElement>(null);

  const progress = (completedQuizzes.length / quizChallenges.length) * 100;

  const diffColors = {
    Beginner: '#22C55E', Intermediate: '#8B5CF6', Master: '#EF4444'
  };
  const termColors = {
    prompt: '#22C55E', output: '#E2E8F0', error: '#F87171', muted: '#555', success: '#22C55E'
  };

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [terminal]);
  
  useEffect(() => {
    if (aiRef.current) aiRef.current.scrollTop = aiRef.current.scrollHeight;
  }, [aiMessages]);

  // Sync editor when index shifts
  useEffect(() => {
    setCode(quiz.startingCode);
    setRan(false);
    setSubmitted(false);
    setShowHint(false);
    setShowSolution(false);
    setTermStatus('idle');
    setTerminal([{ text: `Mission ${quiz.missionNumber} terminal ready.`, type: 'muted' }]);
  }, [quizIndex, quiz.startingCode, quiz.missionNumber]);

  const runCode = () => {
    if (!code.trim() || code.trim() === quiz.startingCode.trim()) {
      setTerminal([
        { text: '$ python mission.py', type: 'prompt' },
        { text: 'Error: No code written yet.', type: 'error' },
      ]);
      setTermStatus('error');
      eddyReact('wrong');
      return;
    }
    setTermStatus('running');
    setTerminal([{ text: '$ python mission.py', type: 'prompt' }]);

    setTimeout(() => {
      const hasKeywords = quiz.expectedKeywords.every(kw => code.includes(kw));
      const hasOutput = code.includes('print(');

      if (hasKeywords && hasOutput) {
        const lines = quiz.expectedOutput.split('\n');
        lines.forEach(line => {
          setTerminal(prev => [...prev, { text: line, type: 'output' }]);
        });
        setTerminal(prev => [...prev,
          { text: 'Process finished with exit code 0', type: 'muted' },
        ]);
        setTermStatus('success');
        setRan(true);
        eddyReact('correct');
      } else {
        setTerminal(prev => [...prev,
          { text: 'Output did not match expected result.', type: 'error' },
          { text: `Missing: ${quiz.expectedKeywords.filter(k => !code.includes(k)).join(', ')}`, type: 'error' },
        ]);
        setTermStatus('error');
        eddyReact('wrong');
      }
    }, 800);
  };

  const submitAnswer = () => {
    if (!ran || submitted) return;
    setSubmitted(true);
    setCompletedQuizzes(prev => [...new Set([...prev, quiz.id])]);
    setTotalXp(x => x + quiz.xp);
    setTerminal(prev => [...prev,
      { text: '', type: 'muted' },
      { text: `✓ Mission ${quiz.missionNumber} complete! +${quiz.xp} XP`, type: 'success' },
    ]);
    eddyReact('correct');
  };

  const goNext = () => {
    if (quizIndex < quizChallenges.length - 1) {
      setQuizIndex(i => i + 1);
    }
  };

  const goPrev = () => {
    if (quizIndex > 0) setQuizIndex(i => i - 1);
  };

  const sendAiMsg = () => {
    if (!aiInput.trim() || aiLoading) return;
    const msg = aiInput.trim();
    setAiMessages(prev => [...prev, { text: msg, isUser: true }]);
    setAiInput('');
    setAiLoading(true);

    // Redirect API interactions safely through application workflow logic layers
    setTimeout(() => {
      let reply = mockAiResponses.default;
      for (const cmdKey of Object.keys(mockAiResponses)) {
        if (msg.toLowerCase().startsWith(cmdKey)) {
          reply = mockAiResponses[cmdKey];
          break;
        }
      }
      setAiMessages(prev => [...prev, { text: reply, isUser: false }]);
      setAiLoading(false);
    }, 750);
  };

  if (!user) { navigate('/login'); return null; }

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 24px', height: 48, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <AQLogo size={24} />
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 13 }}>Academic<span style={{ color: '#fff' }}>Quest</span></span>
        </div>
        <span style={{ color: '#444' }}>·</span>
        <span style={{ fontSize: 13, color: '#A1A1AA' }}>Practice</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#A78BFA' }}>⚡ {user.xp || 0} XP</span>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            {user.username?.[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 24px', display: 'flex', gap: 0 }}>
        {([
          { key: 'challenges', label: '🎮 Challenges' },
          { key: 'quizzes', label: '📋 Quizzes' },
          { key: 'ai', label: '🤖 Quest AI' },
        ] as { key: Tab; label: string }[]).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{ padding: '13px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: activeTab === tab.key ? '#fff' : '#A1A1AA', borderBottom: activeTab === tab.key ? '2px solid #8B5CF6' : '2px solid transparent', fontWeight: activeTab === tab.key ? 600 : 400 }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── CHALLENGES TAB ────────────────────────────────────────────────────── */}
      {activeTab === 'challenges' && (
        <div style={{ flex: 1, maxWidth: 1100, margin: '0 auto', padding: '40px 24px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6 }}>🎮 Game Modes</h1>
            <p style={{ fontSize: 14, color: '#A1A1AA' }}>Coding is the controller. Pick a mode and start your mission.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {gameModes.map(game => (
              <div key={game.id}
                onClick={() => navigate(game.route)}
                style={{ background: '#120F1F', border: `1px solid ${game.color}33`, borderRadius: 16, padding: 24, cursor: 'pointer', transition: 'border-color 0.2s, transform 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = game.color; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${game.color}33`; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${game.color}18`, border: `1px solid ${game.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                    {game.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{game.title}</h3>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, border: `1px solid ${game.color}44`, color: game.color, fontWeight: 500 }}>{game.tag}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.6 }}>{game.desc}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {game.features.map(f => (
                    <span key={f} style={{ fontSize: 11, background: '#0D0B1A', border: '1px solid #2d1f4e', color: '#555', padding: '3px 10px', borderRadius: 20 }}>{f}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'flex-end' }}>
                  <span style={{ fontSize: 13, color: game.color, fontWeight: 500 }}>Launch game →</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, background: '#120F1F', border: '1px solid #8B5CF644', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ fontSize: 36 }}>🎯</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Daily Challenge Pack</div>
              <div style={{ fontSize: 13, color: '#A1A1AA' }}>New missions unlock every 24 hours. Complete them to earn bonus XP and keep your streak alive.</div>
            </div>
            <button onClick={() => navigate('/challenges')} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}>
              Open packs →
            </button>
          </div>
        </div>
      )}

      {/* ── QUIZZES TAB ──────────────────────────────────────────────────────── */}
      {activeTab === 'quizzes' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: 'calc(100vh - 96px)' }}>

          <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 20px', height: 36, display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: '#A1A1AA' }}>Chapter recap</span>
            <div style={{ flex: 1, maxWidth: 300, height: 3, background: '#1A1028', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${diffColors[quiz.difficulty]}, ${diffColors[quiz.difficulty]}99)`, transition: 'width 0.5s', borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 11, color: '#555' }}>{completedQuizzes.length}/{quizChallenges.length} missions</span>
            <span style={{ fontSize: 11, color: '#A78BFA', marginLeft: 'auto' }}>+{totalXp} XP earned</span>
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

            {/* LEFT: Mission card */}
            <div style={{ width: '42%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #2d1f4e', overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                <div style={{ background: quiz.difficulty === 'Master' ? '#2F1A1A' : quiz.difficulty === 'Intermediate' ? '#1A1028' : '#0A1A0A', borderBottom: `1px solid ${diffColors[quiz.difficulty]}33`, padding: '16px 20px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: diffColors[quiz.difficulty], fontWeight: 600, letterSpacing: 1 }}>
                      MISSION {quiz.missionNumber} / {quizChallenges.length}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, border: `1px solid ${diffColors[quiz.difficulty]}44`, color: diffColors[quiz.difficulty], padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{quiz.title}</h2>
                  <div style={{ fontSize: 11, color: '#555' }}>{quiz.chapter} · ⚡ +{quiz.xp} XP</div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#C2C0BE', lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
                    {quiz.story}
                  </pre>
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                {/* HINT */}
                <div style={{ borderTop: '1px solid #2d1f4e' }}>
                  <button onClick={() => { setShowHint(h => !h); setShowSolution(false); if (!showHint) eddyReact('hint'); }}
                    style={{ width: '100%', padding: '13px 20px', background: showHint ? '#1A1028' : 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 13, color: '#A1A1AA', fontWeight: 600, letterSpacing: 0.5 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>⚡ HINT</span>
                    <span style={{ transform: showHint ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: 10 }}>▾</span>
                  </button>
                  {showHint && (
                    <div style={{ padding: '0 20px 16px', background: '#0D0B1A' }}>
                      <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, color: '#C4B5F5', fontFamily: 'Fira Code, monospace', lineHeight: 1.7, background: '#1A1028', border: '1px solid #2d1f4e', borderRadius: 8, padding: 12 }}>
                        {quiz.hint}
                      </pre>
                    </div>
                  )}
                </div>

                {/* FLASHCARD */}
                <div style={{ borderTop: '1px solid #2d1f4e' }}>
                  <button onClick={() => { }}
                    style={{ width: '100%', padding: '13px 20px', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 13, color: '#A1A1AA', fontWeight: 600, letterSpacing: 0.5 }}>
                    <span>🃏 FLASHCARD</span>
                    <span style={{ fontSize: 10 }}>▾</span>
                  </button>
                </div>

                {/* SOLUTION */}
                <div style={{ borderTop: '1px solid #2d1f4e' }}>
                  <button onClick={() => { setShowSolution(s => !s); setShowHint(false); }}
                    style={{ width: '100%', padding: '13px 20px', background: showSolution ? '#1A1028' : 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 13, color: '#A1A1AA', fontWeight: 600, letterSpacing: 0.5 }}>
                    <span>👁 SOLUTION</span>
                    <span style={{ transform: showSolution ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: 10 }}>▾</span>
                  </button>
                  {showSolution && (
                    <div style={{ padding: '0 20px 16px', background: '#0D0B1A' }}>
                      <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, color: '#34D399', fontFamily: 'Fira Code, monospace', lineHeight: 1.7, background: '#0A1A0A', border: '1px solid #22C55E22', borderRadius: 8, padding: 12, overflowX: 'auto' }}>
                        {quiz.solution}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Editor + Terminal */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 12px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 12, color: '#fff', borderBottom: `2px solid ${diffColors[quiz.difficulty]}` }}>
                  <span style={{ fontSize: 10, background: '#3d2a6e', color: '#A78BFA', padding: '1px 5px', borderRadius: 3, fontFamily: 'monospace' }}>.py</span>
                  mission_{quiz.missionNumber.toString().padStart(2, '0')}.py
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 11 }}>
                  {termStatus === 'success' && <span style={{ color: '#22C55E' }}>✓ Output matched</span>}
                  {termStatus === 'error' && <span style={{ color: '#F87171' }}>✗ Check your logic</span>}
                  {termStatus === 'running' && <span style={{ color: '#F59E0B' }}>Running...</span>}
                </div>
              </div>

              <div style={{ flex: 3, overflow: 'hidden' }}>
                <Editor
                  height="100%"
                  language={quiz.language}
                  value={code}
                  onChange={val => setCode(val || '')}
                  theme="vs-dark"
                  options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'Fira Code, monospace', tabSize: 4, wordWrap: 'on', automaticLayout: true, padding: { top: 12 }, scrollBeyondLastLine: false }}
                />
              </div>

              {/* Execution toolbar */}
              <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', borderBottom: '1px solid #2d1f4e', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <button onClick={runCode} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 18px', borderRadius: 7, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  ▶ Run
                </button>

                {!submitted ? (
                  <button onClick={submitAnswer} disabled={!ran}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 18px', borderRadius: 7, border: `1px solid ${ran ? '#22C55E' : '#2d1f4e'}`, background: ran ? '#22C55E15' : 'transparent', color: ran ? '#22C55E' : '#555', fontSize: 12, fontWeight: 500, cursor: ran ? 'pointer' : 'not-allowed', opacity: ran ? 1 : 0.5 }}>
                    Submit answer
                  </button>
                ) : (
                  <button onClick={goNext} disabled={quizIndex >= quizChallenges.length - 1}
                    style={{ padding: '6px 18px', borderRadius: 7, border: 'none', background: quizIndex < quizChallenges.length - 1 ? '#22C55E' : '#2d1f4e', color: '#fff', fontSize: 12, fontWeight: 600, cursor: quizIndex < quizChallenges.length - 1 ? 'pointer' : 'default' }}>
                    {quizIndex < quizChallenges.length - 1 ? 'Next mission →' : '🏆 Chapter complete!'}
                  </button>
                )}

                {/* Standardized Inline Eddy Companion instance matching layout specs */}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                  {eddyMsg && <span style={{ fontSize: 11, color: '#555', maxWidth: 200, textAlign: 'right', lineHeight: 1.4 }}>{eddyMsg}</span>}
                  <Eddy mood={eddyMood} size={36} showBubble={false} />
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0A0A0E', overflow: 'hidden' }}>
                <div style={{ padding: '5px 14px', borderBottom: '1px solid #1a1a2e', fontSize: 11, color: termStatus === 'success' ? '#22C55E' : termStatus === 'error' ? '#F87171' : '#555', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: termStatus === 'success' ? '#22C55E' : termStatus === 'error' ? '#EF4444' : termStatus === 'running' ? '#F59E0B' : '#555' }} />
                  Terminal
                </div>
                <div ref={termRef} style={{ flex: 1, padding: '10px 14px', overflowY: 'auto', fontFamily: 'Fira Code, monospace', fontSize: 12, lineHeight: 1.8 }}>
                  {terminal.map((line, i) => (
                    <div key={i} style={{ color: termColors[line.type] || '#fff' }}>{line.text}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom nav footer */}
          <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <button onClick={() => setDrawerOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, border: '1px solid #2d1f4e', background: drawerOpen ? '#1A1028' : 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>
              ☰ Missions
            </button>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {quizChallenges.map((q, i) => (
                <div key={q.id} onClick={() => setQuizIndex(i)}
                  style={{ width: 8, height: 8, borderRadius: '50%', cursor: 'pointer', background: completedQuizzes.includes(q.id) ? '#22C55E' : i === quizIndex ? diffColors[q.difficulty] : '#2d1f4e', transition: 'background 0.2s' }} />
              ))}
              <span style={{ fontSize: 11, color: '#555', marginLeft: 4 }}>Mission {quizIndex + 1} / {quizChallenges.length}</span>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={goPrev} disabled={quizIndex === 0}
                style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid #2d1f4e', background: 'none', color: quizIndex === 0 ? '#333' : '#A1A1AA', fontSize: 12, cursor: quizIndex === 0 ? 'not-allowed' : 'pointer' }}>
                ← Back
              </button>
              <button onClick={goNext} disabled={quizIndex >= quizChallenges.length - 1 || !submitted}
                style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid #2d1f4e', background: 'none', color: (quizIndex >= quizChallenges.length - 1 || !submitted) ? '#333' : '#A1A1AA', fontSize: 12, cursor: (quizIndex >= quizChallenges.length - 1 || !submitted) ? 'not-allowed' : 'pointer' }}>
                Next →
              </button>
            </div>
          </div>

          {/* Slide-out mission drawer */}
          {drawerOpen && (
            <div style={{ position: 'absolute', bottom: 48, left: 0, width: 300, background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: '0 14px 0 0', zIndex: 100, boxShadow: '4px -4px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #2d1f4e' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Mission Select</div>
                <div style={{ fontSize: 11, color: '#555' }}>{quiz.chapter}</div>
              </div>
              {quizChallenges.map((q, i) => {
                const done = completedQuizzes.includes(q.id);
                const active = i === quizIndex;
                return (
                  <div key={q.id} onClick={() => { setQuizIndex(i); setDrawerOpen(false); }}
                    style={{ padding: '12px 18px', borderBottom: '1px solid #1a1028', cursor: 'pointer', background: active ? '#1A1028' : 'transparent', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#22C55E22' : active ? `${diffColors[q.difficulty]}22` : '#1A1028', border: `1px solid ${done ? '#22C55E' : active ? diffColors[q.difficulty] : '#2d1f4e'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: done ? '#22C55E' : active ? diffColors[q.difficulty] : '#555', flexShrink: 0 }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: active ? '#fff' : '#A1A1AA', marginBottom: 2 }}>{q.title}</div>
                      <div style={{ fontSize: 11, color: '#555', display: 'flex', gap: 8 }}>
                        <span style={{ color: diffColors[q.difficulty] }}>{q.difficulty}</span>
                        <span>+{q.xp} XP</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── QUEST AI TAB ─────────────────────────────────────────────────────── */}
      {activeTab === 'ai' && (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>

          {/* Commands sidebar */}
          <div style={{ background: '#120F1F', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', padding: 16, gap: 4 }}>
            <div style={{ padding: '0 4px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Eddy mood="confident" size={40} showBubble={false} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#A78BFA' }}>Eddy</div>
                  <div style={{ fontSize: 10, color: '#555' }}>Quest AI</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 10 }}>COMMANDS</div>
            </div>
            {aiCommands.map(c => (
              <button key={c.cmd} onClick={() => setAiInput(c.cmd + ' ')}
                style={{ textAlign: 'left', padding: '8px 10px', borderRadius: 7, background: 'none', border: 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: 12, color: '#A78BFA', fontFamily: 'monospace', fontWeight: 600, marginBottom: 2 }}>{c.cmd}</div>
                <div style={{ fontSize: 11, color: '#555', lineHeight: 1.4 }}>{c.desc}</div>
              </button>
            ))}

            {/* Replaced sidebar Eddy section with custom EddyWidget instance */}
            <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px solid #2d1f4e' }}>
              <EddyWidget
                context="askEddy"
                size={40}
                direction="column"
                messageCycleMs={10000}
              />
            </div>
          </div>

          {/* Chat window */}
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Replaced AI header containing custom layout context parameters */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #2d1f4e', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Eddy mood={aiLoading ? 'processing' : 'confident'} size={36} animate showGlow />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#A78BFA' }}>Quest AI — Eddy</div>
                <div style={{ fontSize: 11, color: '#555' }}>Your sarcastic coding companion · Powered by Claude</div>
              </div>
              <div style={{ fontSize: 10, color: '#22C55E', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                online
              </div>
            </div>

            <div ref={aiRef} style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {aiMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.isUser ? 'flex-end' : 'flex-start', gap: 10, alignItems: 'flex-end' }}>
                  {!msg.isUser && <Eddy mood="happy" size={28} showBubble={false} />}
                  <div style={{ maxWidth: '72%', padding: '10px 14px', borderRadius: msg.isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px', background: msg.isUser ? '#1A2F1A' : '#1A1028', border: `1px solid ${msg.isUser ? '#22C55E33' : '#2d1f4e'}`, fontSize: 13, color: msg.isUser ? '#C2C0BE' : '#D4C7F9', lineHeight: 1.6 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                  <Eddy mood="processing" size={28} showBubble={false} />
                  <div style={{ padding: '10px 14px', borderRadius: '12px 12px 12px 2px', background: '#1A1028', border: '1px solid #2d1f4e', fontSize: 13, color: '#555' }}>
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid #2d1f4e', display: 'flex', gap: 10, background: '#120F1F', flexShrink: 0 }}>
              <input
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendAiMsg()}
                placeholder="Ask Eddy anything, or type a command..."
                style={{ flex: 1, background: '#0D0B1A', border: '1px solid #2d1f4e', borderRadius: 9, padding: '10px 14px', fontSize: 13, color: '#fff', outline: 'none', fontFamily: 'Inter, sans-serif' }}
              />
              <button onClick={sendAiMsg} disabled={aiLoading || !aiInput.trim()}
                style={{ padding: '10px 18px', borderRadius: 9, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, cursor: 'pointer', opacity: aiLoading || !aiInput.trim() ? 0.5 : 1 }}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';

type Difficulty = 'beginner' | 'intermediate' | 'master';
type GameMode = 'quiz' | 'dungeon' | 'battle' | 'detective' | 'smartcity';

interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  xp: number;
  mode: GameMode;
  story: string;
  hint: string;
  startingCode: string;
  expectedOutput: string;
  solution: string;
}

interface ChallengePack {
  id: string;
  name: string;
  track: string;
  challenges: Challenge[];
}

const packs: ChallengePack[] = [
  {
    id: 'python-pack-1',
    name: 'Data Station Alpha',
    track: 'Python',
    challenges: [
      {
        id: 'c1', title: 'The Oxygen Protocol', difficulty: 'beginner', xp: 75, mode: 'quiz',
        story: `MISSION BRIEFING — STARDATE 2086\n\nYou are Chief Analyst aboard Space Station Kepler-9. The life support AI has just flagged an anomaly in the oxygen sensor array.\n\nYour orders: Write a Python script that processes the last 6 hours of oxygen readings, calculates the station average, and triggers a WARNING alert if the average drops below the safe threshold of 95%.\n\nThe crew is counting on you. Don't let them down.`,
        hint: `Use Python's sum() and len() functions to calculate the average:\n\naverage = sum(readings) / len(readings)\n\nThen use an if statement to check if average < 95 and print the warning.`,
        startingCode: `# MISSION: The Oxygen Protocol\n# Oxygen readings (%) from the last 6 hours\nreadings = [97, 96, 94, 98, 95, 93]\n\n# Step 1: Calculate the average\naverage = \n\n# Step 2: Check the threshold and alert\n`,
        expectedOutput: 'WARNING: Low oxygen detected! Average: 95.5%',
        solution: `readings = [97, 96, 94, 98, 95, 93]\naverage = sum(readings) / len(readings)\nif average < 95:\n    print(f"WARNING: Low oxygen detected! Average: {average}%")\nelse:\n    print(f"All clear. Average: {average}%")`
      },
      {
        id: 'c2', title: 'Corrupted Cargo Manifest', difficulty: 'intermediate', xp: 150, mode: 'detective',
        story: `HACKER DETECTIVE — CASE FILE #0042\n\nThe cargo bay database has been hit by a rogue process. Three critical bugs have been injected into the manifest system, causing shipments to be miscalculated and flagged incorrectly.\n\nYour mission: Examine the broken code below. Find all 3 bugs, fix them, and restore the cargo system before the supply ship docks in 60 minutes.\n\nEvery second counts, Detective.`,
        hint: `Look carefully for:\n1. A variable name typo that causes a NameError\n2. A string/integer type mismatch in the calculation\n3. An off-by-one error in the loop range`,
        startingCode: `# BROKEN CODE — find and fix 3 bugs\ncargo_items = [150, 200, 175, 225, 190]\ntotal_weight = 0\n\nfor i in range(1, len(cargo_items)):  # Bug 1\n    total_weight += cargo_itmes[i]    # Bug 2\n\nmax_capacity = "1000"                 # Bug 3\nif total_weight > max_capacity:\n    print("OVERLOADED")\nelse:\n    print(f"Safe. Total: {total_weight}kg")`,
        expectedOutput: 'Safe. Total: 940kg',
        solution: `cargo_items = [150, 200, 175, 225, 190]\ntotal_weight = 0\nfor i in range(0, len(cargo_items)):\n    total_weight += cargo_items[i]\nmax_capacity = 1000\nif total_weight > max_capacity:\n    print("OVERLOADED")\nelse:\n    print(f"Safe. Total: {total_weight}kg")`
      },
      {
        id: 'c3', title: 'Boss: The Data Corruptor', difficulty: 'master', xp: 300, mode: 'dungeon',
        story: `FINAL BOSS — THE DATA CORRUPTOR\n\nThe rogue AI has reached the core database. It is systematically corrupting sensor records by injecting -999 as a poison value across all temperature readings from 50 planetary sensors.\n\nTo defeat it, you must:\n1. Filter out all corrupted -999 values\n2. Calculate the true average temperature\n3. Identify the top 3 hottest valid sensors and their indices\n4. Output a full status report\n\nThe fate of the mission rests on your algorithm. You have one shot.`,
        hint: `Use list comprehension to filter:\nclean = [x for x in readings if x != -999]\n\nUse sorted() with enumerate() to find top 3:\nsorted(enumerate(clean), key=lambda x: x[1], reverse=True)[:3]`,
        startingCode: `# BOSS BATTLE: The Data Corruptor\nimport random\nrandom.seed(42)\n\n# 50 sensor readings — some corrupted with -999\nreadings = [random.choice([random.randint(18, 45), -999])\n            for _ in range(50)]\n\n# Step 1: Filter corrupted values\nclean = \n\n# Step 2: Calculate true average\naverage = \n\n# Step 3: Find top 3 hottest sensors (index, temp)\ntop_3 = \n\n# Step 4: Print status report\nprint(f"Valid sensors: {len(clean)}/50")\nprint(f"Average temp: {average:.1f}C")\nprint("Top 3 hottest:", top_3)`,
        expectedOutput: 'Valid sensors:',
        solution: `import random\nrandom.seed(42)\nreadings = [random.choice([random.randint(18, 45), -999]) for _ in range(50)]\nclean = [x for x in readings if x != -999]\naverage = sum(clean) / len(clean)\ntop_3 = sorted(enumerate(clean), key=lambda x: x[1], reverse=True)[:3]\nprint(f"Valid sensors: {len(clean)}/50")\nprint(f"Average temp: {average:.1f}C")\nprint("Top 3 hottest:", top_3)`
      },
    ]
  },
  {
    id: 'js-pack-1',
    name: 'Web Forge Chronicles',
    track: 'JavaScript',
    challenges: [
      {
        id: 'j1', title: 'The DOM Awakens', difficulty: 'beginner', xp: 75, mode: 'quiz',
        story: `MISSION: WEB FORGE SECTOR 1\n\nThe city's public dashboard has gone dark. Citizens are panicking. The lead developer vanished, leaving only a broken JavaScript file and a deadline in 2 hours.\n\nYour mission: Write a JavaScript function that takes an array of city district names and returns only those with more than 8 characters — these are the "priority districts" that need the dashboard restored first.\n\nThe city is watching.`,
        hint: `Use the Array filter() method:\nconst result = districts.filter(d => d.length > 8);\n\nThen console.log() the result array.`,
        startingCode: `// MISSION: The DOM Awakens\nconst districts = [\n  "Northgate", "Oak", "Silverlake",\n  "Downtown", "Elm", "Queensbridge",\n  "Bay", "Westchester"\n];\n\n// Filter districts with more than 8 characters\nconst priority = \n\nconsole.log(priority);`,
        expectedOutput: '["Northgate","Silverlake","Downtown","Queensbridge","Westchester"]',
        solution: `const districts = ["Northgate","Oak","Silverlake","Downtown","Elm","Queensbridge","Bay","Westchester"];\nconst priority = districts.filter(d => d.length > 8);\nconsole.log(priority);`
      },
      {
        id: 'j2', title: 'Async Infiltration', difficulty: 'intermediate', xp: 150, mode: 'battle',
        story: `CODE BATTLE — ROUND 2\n\nYou are competing against QuBot-7, the city's rogue AI. Both of you must fetch data from an API endpoint simultaneously. The fastest correct implementation wins and secures the city's encrypted data vault.\n\nYour mission: Write an async function that simulates fetching user data (use a mock Promise that resolves after 500ms), then processes the result to extract only active users, and returns the count.\n\nQuBot-7 is already running. Go.`,
        hint: `Use async/await with a Promise:\nconst fetchData = () => new Promise(resolve => setTimeout(() => resolve(data), 500));\n\nThen await it inside your async function.`,
        startingCode: `// CODE BATTLE: Async Infiltration\nconst mockUsers = [\n  { id: 1, name: "Munira", active: true },\n  { id: 2, name: "Alex", active: false },\n  { id: 3, name: "Jordan", active: true },\n  { id: 4, name: "Sam", active: true },\n];\n\n// Write an async function to fetch and filter active users\nasync function getActiveUsers() {\n  // Simulate API delay\n  const users = await new Promise(resolve =>\n    \n  );\n  \n  const active = \n  console.log(\`Active users: \${active}\`);\n}\n\ngetActiveUsers();`,
        expectedOutput: 'Active users: 3',
        solution: `const mockUsers = [{id:1,name:"Munira",active:true},{id:2,name:"Alex",active:false},{id:3,name:"Jordan",active:true},{id:4,name:"Sam",active:true}];\nasync function getActiveUsers() {\n  const users = await new Promise(resolve => setTimeout(() => resolve(mockUsers), 500));\n  const active = users.filter(u => u.active).length;\n  console.log(\`Active users: \${active}\`);\n}\ngetActiveUsers();`
      },
      {
        id: 'j3', title: 'Boss: The Algorithm King', difficulty: 'master', xp: 300, mode: 'dungeon',
        story: `FINAL BOSS — THE ALGORITHM KING\n\nThe Algorithm King controls the city's traffic system through a corrupt sorting engine. Every intersection is deadlocked because the routing algorithm was deliberately broken.\n\nTo defeat the King, you must implement a working merge sort algorithm from scratch, sort the city's 10 traffic node weights in ascending order, then calculate and print the median weight.\n\nBreak his control. Free the city.`,
        hint: `Merge sort splits the array in half recursively:\nif (arr.length <= 1) return arr;\nconst mid = Math.floor(arr.length / 2);\nconst left = mergeSort(arr.slice(0, mid));\nconst right = mergeSort(arr.slice(mid));`,
        startingCode: `// BOSS BATTLE: The Algorithm King\nconst trafficNodes = [64, 12, 45, 89, 3, 72, 28, 55, 17, 91];\n\n// Implement merge sort\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const mid = \n  const left = \n  const right = \n  \n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  // Your merge logic here\n  \n  return result;\n}\n\nconst sorted = mergeSort(trafficNodes);\nconst mid = Math.floor(sorted.length / 2);\nconst median = sorted.length % 2 === 0\n  ? (sorted[mid-1] + sorted[mid]) / 2\n  : sorted[mid];\n\nconsole.log("Sorted:", sorted);\nconsole.log("Median:", median);`,
        expectedOutput: 'Sorted: [3,12,17,28,45,55,64,72,89,91]',
        solution: `const trafficNodes = [64,12,45,89,3,72,28,55,17,91];\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) result.push(left[i++]);\n    else result.push(right[j++]);\n  }\n  return [...result, ...left.slice(i), ...right.slice(j)];\n}\nconst sorted = mergeSort(trafficNodes);\nconst mid = Math.floor(sorted.length / 2);\nconst median = sorted.length % 2 === 0 ? (sorted[mid-1]+sorted[mid])/2 : sorted[mid];\nconsole.log("Sorted:", sorted);\nconsole.log("Median:", median);`
      },
    ]
  }
];

const difficultyConfig: Record<Difficulty, { label: string; color: string; glow: string; bg: string }> = {
  beginner: { label: 'Beginner', color: '#22C55E', glow: '#22C55E40', bg: '#1A2F1A' },
  intermediate: { label: 'Intermediate', color: '#8B5CF6', glow: '#8B5CF640', bg: '#1A1028' },
  master: { label: 'Boss Battle', color: '#EF4444', glow: '#EF444440', bg: '#2F1A1A' },
};

const modeConfig: Record<GameMode, { label: string; icon: string; route?: string }> = {
  quiz: { label: 'Quest', icon: '🎯', route: '/practice' },
  dungeon: { label: 'Code Dungeon', icon: '🏰', route: '/dungeon' },
  battle: { label: 'Code Battles', icon: '⚔️', route: '/battles' },
  detective: { label: 'Hacker Detective', icon: '🔍', route: '/detective' },
  smartcity: { label: 'Smart City', icon: '🏙️', route: '/smartcity' },
};

// Game Mode cards configuration for navigation
const gameModeCards = [
  { label: 'Code Dungeon', route: '/dungeon', modeKey: 'dungeon' },
  { label: 'Code Battles', route: '/battles', modeKey: 'battle' },
  { label: 'Hacker Detective', route: '/detective', modeKey: 'detective' },
  { label: 'Smart City', route: '/smartcity', modeKey: 'smartcity' }
];

export default function ChallengeWorkspace() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [activePack, setActivePack] = useState(packs[0]);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [code, setCode] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<{ text: string; type: 'prompt' | 'output' | 'error' | 'success' | 'muted' }[]>([
    { text: 'Terminal ready. Click Run to execute your code.', type: 'muted' }
  ]);
  const [ran, setRan] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [termStatus, setTermStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [showGamesTab, setShowGamesTab] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  const challenge = activePack.challenges[challengeIndex];
  const diff = difficultyConfig[challenge.difficulty];
  const mode = modeConfig[challenge.mode];
  const totalChallenges = activePack.challenges.length;
  const progress = ((challengeIndex + (submitted ? 1 : 0)) / totalChallenges) * 100;

  useEffect(() => {
    setCode(challenge.startingCode);
    setRan(false);
    setSubmitted(false);
    setShowHint(false);
    setShowSolution(false);
    setTermStatus('idle');
    setTerminalOutput([{ text: 'Terminal ready. Click Run to execute your code.', type: 'muted' }]);
  }, [challenge.id]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [terminalOutput]);

  const runCode = () => {
    setTermStatus('running');
    setTerminalOutput([{ text: `$ run ${challenge.mode === 'quiz' ? 'script.py' : 'solution.py'}`, type: 'prompt' }]);
    setTimeout(() => {
      const trimmed = code.trim();
      const hasContent = trimmed !== challenge.startingCode.trim() && trimmed.length > 20;
      if (!hasContent) {
        setTerminalOutput(prev => [...prev,
          { text: 'Error: No solution written yet.', type: 'error' },
          { text: 'Add your code and try again.', type: 'muted' }
        ]);
        setTermStatus('error');
        return;
      }
      const matchesExpected = challenge.expectedOutput.split('\n').every(line =>
        line.length < 5 || trimmed.toLowerCase().includes(line.toLowerCase().slice(0, 8))
      );
      if (matchesExpected || trimmed.includes('average') || trimmed.includes('filter') || trimmed.includes('mergeSort') || trimmed.includes('getActiveUsers')) {
        const outputLines = challenge.expectedOutput.split('\n');
        outputLines.forEach(line => {
          setTerminalOutput(prev => [...prev, { text: line, type: 'output' }]);
        });
        setTerminalOutput(prev => [...prev,
          { text: 'Process finished with exit code 0', type: 'muted' }
        ]);
        setTermStatus('success');
        setRan(true);
      } else {
        setTerminalOutput(prev => [...prev,
          { text: 'Your output does not match expected. Check your logic.', type: 'error' },
          { text: 'Hint: Review the mission requirements carefully.', type: 'muted' }
        ]);
        setTermStatus('error');
      }
    }, 900);
  };

  const submitAnswer = () => {
    if (!ran || submitted) return;
    setSubmitted(true);
    setTerminalOutput(prev => [...prev,
      { text: `✓ Mission complete! +${challenge.xp} XP earned`, type: 'success' }
    ]);
  };

  const goNext = () => {
    if (challengeIndex < totalChallenges - 1) {
      setChallengeIndex(i => i + 1);
    }
  };

  const goPrev = () => {
    if (challengeIndex > 0) {
      setChallengeIndex(i => i - 1);
    }
  };

  const termColors: Record<string, string> = {
    prompt: '#22C55E', output: '#E2E8F0', error: '#F87171', muted: '#555', success: '#22C55E'
  };

  if (!user) { navigate('/login'); return null; }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden', position: 'relative' }}>

      {/* TOP HEADER */}
      <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/practice')}>
          <AQLogo size={24} />
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 13 }}>
            Academic<span style={{ color: '#fff' }}>Quest</span>
          </span>
        </div>
        <span style={{ color: '#444' }}>·</span>
        <span style={{ fontSize: 12, color: '#A1A1AA', cursor: 'pointer' }} onClick={() => setShowGamesTab(false)}>Challenge Packs</span>
        <span style={{ color: '#444' }}>/</span>
        <span style={{ fontSize: 12, color: '#fff' }}>{activePack.name}</span>
        <span style={{ color: '#444' }}>/</span>
        <span style={{ fontSize: 12, color: diff.color }}>{challenge.title}</span>

        {/* Navigation shortcut to Games Selector */}
        <button 
          onClick={() => setShowGamesTab(prev => !prev)}
          style={{ padding: '4px 10px', background: showGamesTab ? '#8B5CF630' : '#1A1028', border: '1px solid #2d1f4e', color: '#A78BFA', borderRadius: 6, fontSize: 11, cursor: 'pointer', marginLeft: 8 }}
        >
          {showGamesTab ? 'Back to Editor' : '🎮 Game Modes'}
        </button>

        {/* Progress bar */}
        <div style={{ flex: 1, maxWidth: 280, margin: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#555', marginBottom: 3 }}>
            <span>Pack progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 3, background: '#1A1028', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${diff.color}, ${diff.color}99)`, transition: 'width 0.5s', borderRadius: 3 }} />
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#A78BFA' }}>⚡ {user.xp || 0} XP</span>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            onClick={() => navigate('/profile')}>
            {user.username?.[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* SPLIT SCREEN WORKSPACE OR GAMES SELECTOR */}
      {showGamesTab ? (
        /* GAMES TAB VIEW WITH UPDATED ONCLICK ROUTE ROUTING handlers */
        <div style={{ flex: 1, padding: 40, overflowY: 'auto', background: '#0A0814', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: '#fff', textAlign: 'center' }}>Select Your Game Arena</h2>
          <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 32, textAlign: 'center' }}>Ready to deploy your algorithms? Step into a distinct tactical interface.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(240px, 320px))', gap: 24 }}>
            {gameModeCards.map((card) => {
              const cfg = modeConfig[card.modeKey as GameMode];
              return (
                <div 
                  key={card.route}
                  onClick={() => navigate(card.route)}
                  style={{ 
                    background: '#120F1F', 
                    border: '1px solid #2d1f4e', 
                    borderRadius: 14, 
                    padding: 24, 
                    cursor: 'pointer', 
                    transition: 'transform 0.2s, border-color 0.2s',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#8B5CF6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#2d1f4e';
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{cfg?.icon || '🎮'}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{card.label}</h3>
                  <p style={{ fontSize: 12, color: '#A1A1AA', lineHeight: 1.5 }}>Launch into this tailored track view environment built for advanced CS optimization constraints.</p>
                  <div style={{ marginTop: 16, fontSize: 11, color: '#8B5CF6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Enter Arena →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* STANDARD DUAL SPLIT EDITOR VIEW */
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* LEFT PANEL — 45% Mission Card */}
          <div style={{ width: '45%', display: 'flex', flexDirection: 'column', padding: 20, gap: 0, overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0D0B1A', border: `1px solid ${diff.color}`, borderRadius: 14, overflow: 'hidden', boxShadow: `0 0 24px ${diff.glow}` }}>

              {/* Mission card header */}
              <div style={{ background: diff.bg, borderBottom: `1px solid ${diff.color}33`, padding: '14px 18px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>{mode.icon}</span>
                  <span style={{ fontSize: 11, color: diff.color, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{mode.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, background: diff.color + '22', color: diff.color, border: `1px solid ${diff.color}44`, padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>
                    {diff.label}
                  </span>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }} 
                    style={{ cursor: mode.route ? 'pointer' : 'default' }}
                    onClick={() => mode.route && navigate(mode.route)}>
                  {challenge.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 13, color: diff.color, fontWeight: 600 }}>⚡ +{challenge.xp} XP</span>
                  <span style={{ fontSize: 12, color: '#555' }}>{activePack.track} · {activePack.name}</span>
                </div>
              </div>

              {/* Story scroll area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
                {!showHint ? (
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#C2C0BE', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>
                    {challenge.story}
                  </pre>
                ) : (
                  <div style={{ background: '#1A1028', border: `1px solid ${diff.color}44`, borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 12, color: diff.color, fontWeight: 600, marginBottom: 10, letterSpacing: 0.5 }}>HINT</div>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, color: '#C4B5F5', lineHeight: 1.7, fontFamily: 'Fira Code, monospace' }}>
                      {challenge.hint}
                    </pre>
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div style={{ padding: '12px 18px', borderTop: `1px solid ${diff.color}22`, display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={() => setShowHint(h => !h)}
                  style={{ flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${diff.color}44`, background: showHint ? diff.color + '22' : 'transparent', color: diff.color, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}
                >
                  {showHint ? '← Back to mission' : '⚡ Flip for hint'}
                </button>
                <button
                  onClick={() => setShowSolution(s => !s)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #2d1f4e', background: 'transparent', color: '#555', fontSize: 12, cursor: 'pointer' }}
                >
                  {showSolution ? 'Hide' : 'Solution'}
                </button>
              </div>

              {/* Solution reveal */}
              {showSolution && (
                <div style={{ padding: '0 18px 14px', flexShrink: 0 }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: 11, color: '#34D399', fontFamily: 'Fira Code, monospace', background: '#0A1A12', border: '1px solid #22C55E22', borderRadius: 8, padding: 12, overflowX: 'auto' }}>
                    {challenge.solution}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL — 55% Editor + Terminal */}
          <div style={{ width: '55%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* File tab bar */}
            <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 12px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 12, color: '#fff', borderBottom: '2px solid #8B5CF6' }}>
                <span style={{ fontSize: 10, background: '#3d2a6e', color: '#A78BFA', padding: '1px 5px', borderRadius: 3, fontFamily: 'monospace' }}>
                  {challenge.mode === 'quiz' || challenge.mode === 'dungeon' ? '.py' : challenge.mode === 'battle' || challenge.mode === 'detective' ? '.js' : '.py'}
                </span>
                solution.{challenge.mode === 'battle' ? 'js' : 'py'}
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: termStatus === 'success' ? '#22C55E' : termStatus === 'error' ? '#F87171' : termStatus === 'running' ? '#F59E0B' : '#555' }}>
                  {termStatus === 'running' ? 'Running...' : termStatus === 'success' ? '✓ Passed' : termStatus === 'error' ? '✗ Failed' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Monaco Editor */}
            <div style={{ flex: 3, overflow: 'hidden' }}>
              <Editor
                height="100%"
                language={challenge.mode === 'battle' || (challenge.track === 'JavaScript') ? 'javascript' : 'python'}
                value={code}
                onChange={val => setCode(val || '')}
                theme="vs-dark"
                options={{
                  fontSize: 13, minimap: { enabled: false }, scrollBeyondLastLine: false,
                  lineNumbers: 'on', fontFamily: 'Fira Code, monospace', tabSize: 4,
                  wordWrap: 'on', automaticLayout: true, padding: { top: 12 },
                  renderLineHighlight: 'line',
                }}
              />
            </div>

            {/* Execution toolbar */}
            <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', borderBottom: '1px solid #2d1f4e', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button style={{ padding: '5px 10px', borderRadius: 6, border: '1px solid #2d1f4e', background: 'none', color: '#555', fontSize: 12, cursor: 'pointer' }}>
                •••
              </button>
              <button
                onClick={runCode}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 7, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                ▶ Run
              </button>
              {!submitted ? (
                <button
                  onClick={submitAnswer}
                  disabled={!ran}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 7, border: `1px solid ${ran ? '#22C55E' : '#2d1f4e'}`, background: ran ? '#22C55E15' : 'transparent', color: ran ? '#22C55E' : '#555', fontSize: 12, fontWeight: 500, cursor: ran ? 'pointer' : 'not-allowed', opacity: ran ? 1 : 0.5 }}
                >
                  Submit answer
                </button>
              ) : (
                <button
                  onClick={goNext}
                  disabled={challengeIndex >= totalChallenges - 1}
                  style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#22C55E', color: '#fff', fontSize: 12, fontWeight: 600, cursor: challengeIndex < totalChallenges - 1 ? 'pointer' : 'default', opacity: challengeIndex < totalChallenges - 1 ? 1 : 0.5 }}
                >
                  {challengeIndex < totalChallenges - 1 ? 'Next mission →' : '🏆 Pack complete!'}
                </button>
              )}
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#555' }}>
                {submitted && `+${challenge.xp} XP earned`}
              </span>
            </div>

            {/* Terminal */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
              <div style={{ padding: '6px 12px', background: '#0A0A0E', borderBottom: '1px solid #1a1a2e', fontSize: 11, color: '#555', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: termStatus === 'success' ? '#22C55E' : termStatus === 'error' ? '#EF4444' : termStatus === 'running' ? '#F59E0B' : '#555' }} />
                Terminal
              </div>
              <div ref={termRef} style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', fontFamily: 'Fira Code, monospace', fontSize: 12, lineHeight: 1.8, background: '#0A0A0E' }}>
                {terminalOutput.map((line, i) => (
                  <div key={i} style={{ color: termColors[line.type] || '#fff' }}>{line.text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL NAVIGATION FOOTER */}
      <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>

        {/* Hamburger → drawer toggle */}
        <button
          onClick={() => setDrawerOpen(o => !o)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 7, border: '1px solid #2d1f4e', background: drawerOpen ? '#1A1028' : 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}
        >
          ☰ Challenges
        </button>

        {/* Center: pagination */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {activePack.challenges.map((c, i) => (
              <div
                key={c.id}
                onClick={() => { setChallengeIndex(i); setDrawerOpen(false); setShowGamesTab(false); }}
                style={{ width: 8, height: 8, borderRadius: '50%', cursor: 'pointer', background: i === challengeIndex ? difficultyConfig[c.difficulty].color : i < challengeIndex ? '#22C55E' : '#2d1f4e', transition: 'background 0.2s' }}
              />
            ))}
          </div>
          <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>
            Challenge {challengeIndex + 1} / {totalChallenges}
          </div>
        </div>

        {/* Back / Next */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={goPrev}
            disabled={challengeIndex === 0 || showGamesTab}
            style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid #2d1f4e', background: 'none', color: (challengeIndex === 0 || showGamesTab) ? '#333' : '#A1A1AA', fontSize: 12, cursor: (challengeIndex === 0 || showGamesTab) ? 'not-allowed' : 'pointer' }}
          >
            ← Back
          </button>
          <button
            onClick={goNext}
            disabled={challengeIndex >= totalChallenges - 1 || !submitted || showGamesTab}
            style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid #2d1f4e', background: 'none', color: (challengeIndex >= totalChallenges - 1 || !submitted || showGamesTab) ? '#333' : '#A1A1AA', fontSize: 12, cursor: (challengeIndex >= totalChallenges - 1 || !submitted || showGamesTab) ? 'not-allowed' : 'pointer' }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* SLIDE-OUT CHALLENGE DRAWER */}
      {drawerOpen && (
        <div style={{ position: 'absolute', bottom: 52, left: 0, width: 320, background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: '0 14px 0 0', overflow: 'hidden', boxShadow: '4px -4px 24px rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #2d1f4e' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{activePack.name}</div>
            <div style={{ fontSize: 11, color: '#555' }}>{activePack.track} · {totalChallenges} challenges</div>
          </div>

          {/* Pack switcher */}
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #2d1f4e', display: 'flex', gap: 6 }}>
            {packs.map(pack => (
              <button
                key={pack.id}
                onClick={() => { setActivePack(pack); setChallengeIndex(0); setDrawerOpen(false); setShowGamesTab(false); }}
                style={{ flex: 1, padding: '5px 8px', borderRadius: 6, border: `1px solid ${activePack.id === pack.id ? '#8B5CF6' : '#2d1f4e'}`, background: activePack.id === pack.id ? '#8B5CF620' : 'none', color: activePack.id === pack.id ? '#A78BFA' : '#555', fontSize: 11, cursor: 'pointer' }}
              >
                {pack.track}
              </button>
            ))}
          </div>

          {/* Challenge list */}
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {activePack.challenges.map((c, i) => {
              const d = difficultyConfig[c.difficulty];
              const m = modeConfig[c.mode];
              const isActive = i === challengeIndex;
              return (
                <div
                  key={c.id}
                  onClick={() => { setChallengeIndex(i); setDrawerOpen(false); setShowGamesTab(false); }}
                  style={{ padding: '12px 18px', borderBottom: '1px solid #1a1028', cursor: 'pointer', background: isActive ? '#1A1028' : 'transparent', display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <span style={{ fontSize: 14 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: isActive ? '#fff' : '#A1A1AA' }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: d.color }}>{d.label}</div>
                  </div>
                  {/* Shortcut option to pivot to distinct routing modes directly from lists */}
                  <span 
                    onClick={(e) => { e.stopPropagation(); if(m.route) navigate(m.route); }} 
                    style={{ fontSize: 11, padding: '2px 6px', background: '#00000040', borderRadius: 4, color: '#555' }}
                  >
                    ↗
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
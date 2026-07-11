import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';
import GameHub from '../components/GameHub';
import { completeNode } from '../data/progression';

interface DetectiveCase {
  id: string;
  caseNumber: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  xp: number;
  concept: string;
  briefing: string;
  brokenCode: string;
  bugs: { line: number; description: string; keyword: string }[];
  solution: string;
  expectedOutput: string;
}

const caseFiles: Record<string, DetectiveCase[]> = {
  'w1-l1': [
    {
      id: 'case1', caseNumber: '#0042', title: 'The Corrupted Manifest', difficulty: 'Beginner', xp: 100, concept: 'Syntax Bugs',
      briefing: `CASE #0042 — THE CORRUPTED MANIFEST\n\nThe cargo bay system has been sabotaged. Three bugs were injected by a rogue process.\n\n🔍 CLUES:\n• Bug 1: Loop range starts at wrong index\n• Bug 2: Variable name has a typo\n• Bug 3: Wrong data type in comparison`,
      brokenCode: `# CASE #0042 - Find and fix 3 bugs\ncargo_items = [150, 200, 175, 225, 190]\ntotal_weight = 0\n\nfor i in range(1, len(cargo_items)):  # Bug 1\n    total_weight += cargo_itmes[i]    # Bug 2\n\nmax_capacity = "1000"                 # Bug 3\nif total_weight > max_capacity:\n    print("OVERLOADED")\nelse:\n    print(f"Safe. Total: {total_weight}kg")`,
      bugs: [
        { line: 5, description: 'range(1, ...) skips first item. Should be range(0, ...)', keyword: 'range(0' },
        { line: 6, description: '"cargo_itmes" typo — should be "cargo_items"', keyword: 'cargo_items[i]' },
        { line: 8, description: '"1000" is a string. Remove the quotes to make it an integer', keyword: 'max_capacity = 1000' },
      ],
      solution: `cargo_items = [150, 200, 175, 225, 190]\ntotal_weight = 0\nfor i in range(0, len(cargo_items)):\n    total_weight += cargo_items[i]\nmax_capacity = 1000\nif total_weight > max_capacity:\n    print("OVERLOADED")\nelse:\n    print(f"Safe. Total: {total_weight}kg")`,
      expectedOutput: 'Safe. Total: 940kg',
    },
  ],
  'w2-l1': [
    {
      id: 'case2', caseNumber: '#0107', title: 'The Broken Scoreboard', difficulty: 'Intermediate', xp: 200, concept: 'Logic Bugs',
      briefing: `CASE #0107 — THE BROKEN SCOREBOARD\n\nThe arcade scoreboard crashed. 4 logic bugs injected.\n\n🔍 CLUES:\n• Bug 1: Sort order is wrong (should be descending)\n• Bug 2: Slice is wrong (skips instead of takes)\n• Bug 3: Missing return statement\n• Bug 4: Wrong variable name passed to function`,
      brokenCode: `scores = [450, 1200, 890, 2100, 670, 1850, 340]\n\ndef get_top_scores(score_list, n):\n    sorted_scores = sorted(score_list)       # Bug 1\n    top = sorted_scores[n:]                   # Bug 2\n    result = top                              # Bug 3\n\ntop_3 = get_top_scores(score, 3)             # Bug 4\nprint(f"Top 3: {top_3}")`,
      bugs: [
        { line: 4, description: 'sorted() is ascending. Need reverse=True for descending', keyword: 'reverse=True' },
        { line: 5, description: '[n:] skips first n. Should be [:n] to TAKE first n', keyword: '[:n]' },
        { line: 6, description: 'Missing return statement — function returns None', keyword: 'return result' },
        { line: 8, description: '"score" is undefined. Should be "scores" (with s)', keyword: 'scores,' },
      ],
      solution: `scores = [450, 1200, 890, 2100, 670, 1850, 340]\ndef get_top_scores(score_list, n):\n    sorted_scores = sorted(score_list, reverse=True)\n    top = sorted_scores[:n]\n    return top\ntop_3 = get_top_scores(scores, 3)\nprint(f"Top 3: {top_3}")`,
      expectedOutput: 'Top 3: [2100, 1850, 1200]',
    },
  ],
  'w3-l1': [
    {
      id: 'case3', caseNumber: '#0291', title: 'The Algorithm Heist', difficulty: 'Advanced', xp: 350, concept: 'Algorithm Bugs',
      briefing: `CASE #0291 — THE ALGORITHM HEIST\n\nA sorting algorithm was deliberately corrupted with 5 bugs. Fix them all to restore the system.\n\n🔍 CLUES:\n• Bug 1: Wrong base case in recursive function\n• Bug 2: Mid calculation is off\n• Bug 3: Left slice is wrong\n• Bug 4: Right slice is wrong\n• Bug 5: Merge comparison is wrong`,
      brokenCode: `def merge_sort(arr):\n    if len(arr) <= 0:          # Bug 1 - wrong base case\n        return arr\n    \n    mid = len(arr) // 3        # Bug 2 - wrong mid calculation\n    left = arr[:mid + 1]       # Bug 3 - wrong left slice\n    right = arr[mid:]          # Bug 4 - wrong right slice\n    \n    return merge(merge_sort(left), merge_sort(right))\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] >= right[j]:  # Bug 5 - wrong comparison\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\n\nnums = [64, 12, 45, 89, 3, 72]\nprint(merge_sort(nums))`,
      bugs: [
        { line: 2, description: 'Base case should be <= 1 not <= 0 (empty list has no mid)', keyword: 'len(arr) <= 1' },
        { line: 5, description: 'Mid should be len(arr) // 2 not // 3', keyword: 'len(arr) // 2' },
        { line: 6, description: 'Left should be arr[:mid] not arr[:mid+1]', keyword: 'arr[:mid]' },
        { line: 7, description: 'Right should be arr[mid:] (this is actually correct — check others)', keyword: 'arr[mid:]' },
        { line: 15, description: 'Comparison should be < (ascending) not >= (descending)', keyword: 'left[i] <' },
      ],
      solution: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = arr[:mid]\n    right = arr[mid:]\n    return merge(merge_sort(left), merge_sort(right))\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    return result + left[i:] + right[j:]\n\nnums = [64, 12, 45, 89, 3, 72]\nprint(merge_sort(nums))`,
      expectedOutput: '[3, 12, 45, 64, 72, 89]',
    },
  ],
};

const detectiveWorlds = [
  { number: 1, name: 'Rookie Division', description: 'Simple syntax bugs — typos, type errors, range mistakes.', color: '#F59E0B', chapterRequired: 1,
    levels: [{ id: 'w1-l1', nodeId: 'detective-1', world: 1, level: 1, title: 'The Corrupted Manifest', subtitle: '1 case · 3 bugs to find', xp: 100, concept: 'Syntax', difficulty: 'Beginner' as const, icon: '🔍' }]},
  { number: 2, name: 'Detective Division', description: 'Logic bugs — wrong conditions, missing returns, bad variables.', color: '#8B5CF6', chapterRequired: 2,
    levels: [{ id: 'w2-l1', nodeId: 'detective-2', world: 2, level: 1, title: 'The Broken Scoreboard', subtitle: '1 case · 4 bugs to find', xp: 200, concept: 'Logic', difficulty: 'Intermediate' as const, icon: '🕵️' }]},
  { number: 3, name: 'Master Investigator', description: 'Algorithm bugs — corrupted sorting, recursion errors.', color: '#EF4444', chapterRequired: 3,
    levels: [{ id: 'w3-l1', nodeId: 'detective-3', world: 3, level: 1, title: 'The Algorithm Heist', subtitle: '1 case · 5 bugs to find', xp: 350, concept: 'Algorithms', difficulty: 'Advanced' as const, icon: '🧩' }]},
];

export default function HackerDetective() {
  const navigate = useNavigate();
  const [activeCase, setActiveCase] = useState<{ levelKey: string; caseIndex: number } | null>(null);
  const [code, setCode] = useState('');
  const [terminal, setTerminal] = useState<{ text: string; type: string }[]>([{ text: '> Detective terminal ready.', type: 'muted' }]);
  const [solvedBugs, setSolvedBugs] = useState<number[]>([]);
  const [caseSolved, setCaseSolved] = useState(false);
  const [showClues, setShowClues] = useState(false);
  const [totalXp, setTotalXp] = useState(0);

  const termColors: Record<string, string> = { prompt: '#F59E0B', output: '#E2E8F0', error: '#F87171', muted: '#555', success: '#22C55E' };

  const currentCases = activeCase ? caseFiles[activeCase.levelKey] || [] : [];
  const detCase = activeCase ? currentCases[activeCase.caseIndex] : null;

  const analyze = () => {
    if (!detCase) return;
    setTerminal([{ text: '$ python analyze.py', type: 'prompt' }]);
    setTimeout(() => {
      const solved = detCase.bugs.map((bug, i) => code.includes(bug.keyword) ? i : -1).filter(i => i >= 0);
      setSolvedBugs(solved);
      if (solved.length === detCase.bugs.length) {
        setTerminal(prev => [...prev,
          { text: detCase.expectedOutput, type: 'output' },
          { text: '', type: 'muted' },
          { text: `✓ CASE ${detCase.caseNumber} CLOSED — All ${detCase.bugs.length} bugs fixed`, type: 'success' },
          { text: `+${detCase.xp} XP earned`, type: 'success' },
        ]);
        setCaseSolved(true);
        setTotalXp(x => x + detCase.xp);
      } else {
        setTerminal(prev => [...prev,
          { text: `${solved.length}/${detCase.bugs.length} bugs fixed. Keep investigating.`, type: 'muted' },
          { text: `Still broken: check lines around ${detCase.bugs.filter((_, i) => !solved.includes(i)).map(b => b.line).join(', ')}`, type: 'error' },
        ]);
      }
    }, 600);
  };

  const completeCaseAndReturn = () => {
    if (!activeCase) return;
    const nodeMap: Record<number, string> = { 1: 'detective-1', 2: 'detective-2', 3: 'detective-3' };
    const worldNum = parseInt(activeCase.levelKey[1]);
    completeNode(nodeMap[worldNum] || 'detective-1');
    setActiveCase(null);
    setCaseSolved(false);
    setSolvedBugs([]);
    setTerminal([{ text: '> Detective terminal ready.', type: 'muted' }]);
  };

  if (activeCase && detCase) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
        <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setActiveCase(null)} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>← Case Files</button>
          <AQLogo size={20} />
          <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: 13 }}>Hacker Detective</span>
          <span style={{ color: '#444' }}>·</span>
          <span style={{ fontSize: 12, color: '#A1A1AA' }}>Case {detCase.caseNumber}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: '#F59E0B' }}>{solvedBugs.length}/{detCase.bugs.length} bugs fixed</span>
            <div style={{ width: 80, height: 3, background: '#1A1028', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(solvedBugs.length / detCase.bugs.length) * 100}%`, background: caseSolved ? '#22C55E' : '#F59E0B', borderRadius: 2, transition: 'width 0.4s' }} />
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '38%', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#0D0A00', padding: '14px 18px', borderBottom: '1px solid #F59E0B33', flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>CASE {detCase.caseNumber} · {detCase.difficulty.toUpperCase()} · {detCase.concept}</div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{detCase.title}</h2>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#C2C0BE', lineHeight: 1.8, fontFamily: 'Inter, sans-serif', marginBottom: 16 }}>{detCase.briefing}</pre>
              <div style={{ background: '#0D0B1A', border: '1px solid #2d1f4e', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>BUG TRACKER</span>
                  <span style={{ fontSize: 10, color: '#555' }}>{solvedBugs.length}/{detCase.bugs.length}</span>
                </div>
                {detCase.bugs.map((bug, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < detCase.bugs.length - 1 ? '1px solid #1a1028' : 'none' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: solvedBugs.includes(i) ? '#1A2F1A' : '#1A1028', border: `1px solid ${solvedBugs.includes(i) ? '#22C55E' : '#2d1f4e'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: solvedBugs.includes(i) ? '#22C55E' : '#555', flexShrink: 0, marginTop: 1 }}>
                      {solvedBugs.includes(i) ? '✓' : i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#555', marginBottom: 2 }}>Line ~{bug.line}</div>
                      {(showClues || solvedBugs.includes(i)) && <div style={{ fontSize: 12, color: solvedBugs.includes(i) ? '#22C55E' : '#A1A1AA', lineHeight: 1.5 }}>{bug.description}</div>}
                      {!showClues && !solvedBugs.includes(i) && <div style={{ fontSize: 12, color: '#333' }}>••••••••••</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '10px 18px', borderTop: '1px solid #2d1f4e', flexShrink: 0, display: 'flex', gap: 8 }}>
              <button onClick={() => setShowClues(s => !s)} style={{ flex: 1, padding: '7px', borderRadius: 7, border: '1px solid #F59E0B44', background: showClues ? '#1A1500' : 'none', color: '#F59E0B', fontSize: 11, cursor: 'pointer' }}>
                {showClues ? 'Hide clues' : '🔍 Reveal clues'}
              </button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 12px', height: 36, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#A1A1AA' }}>evidence.py — fix the bugs</span>
              {caseSolved && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#22C55E' }}>✓ Case closed!</span>}
            </div>
            <div style={{ flex: 2, overflow: 'hidden' }}>
              <Editor height="100%" language="python" value={code || detCase.brokenCode} onChange={v => setCode(v || '')} theme="vs-dark"
                options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'Fira Code, monospace', automaticLayout: true, padding: { top: 10 } }} />
            </div>
            <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', borderBottom: '1px solid #2d1f4e', padding: '6px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={analyze} style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#F59E0B', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>🔍 Analyze</button>
              {caseSolved && <button onClick={completeCaseAndReturn} style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#22C55E', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✓ Close case</button>}
            </div>
            <div style={{ flex: 1, background: '#0A0A0E', padding: '10px 14px', overflowY: 'auto', fontFamily: 'Fira Code, monospace', fontSize: 12, lineHeight: 1.8 }}>
              {terminal.map((line, i) => <div key={i} style={{ color: termColors[line.type] || '#fff' }}>{line.text}</div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GameHub gameType="detective" title="Hacker Detective" icon="🔍" accentColor="#F59E0B" worlds={detectiveWorlds}
      onPlayLevel={level => { setActiveCase({ levelKey: level.id, caseIndex: 0 }); setCode(''); setSolvedBugs([]); setCaseSolved(false); setTerminal([{ text: `> Case file ${level.title} opened.`, type: 'muted' }]); }} />
  );
}
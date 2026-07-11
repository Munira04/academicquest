import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';
import GameHub from '../components/GameHub';
import { completeNode } from '../data/progression';

interface CityMission {
  id: string;
  district: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  xp: number;
  concept: string;
  briefing: string;
  starterCode: string;
  hint: string;
  requiredKeywords: string[];
  successOutput: string;
  systemName: string;
  systemIcon: string;
}

const cityMissions: Record<string, CityMission[]> = {
  'w1-l1': [
    {
      id: 'cm1', district: 'District Alpha', title: 'Traffic Congestion Alert', difficulty: 'Beginner', xp: 120, concept: 'Filtering',
      systemName: 'Traffic Control', systemIcon: '🚦',
      briefing: `DISTRICT ALPHA — TRAFFIC CONTROL\n\nThe city's 8 intersections are gridlocked. Your algorithm must identify all critical intersections (congestion > 70%) and calculate the average congestion.\n\nData:\nintersections = {"North-A": 45, "North-B": 82, "Central": 91, "South-A": 78, "South-B": 34, "East": 88, "West": 55, "Harbor": 72}`,
      starterCode: `# SMART CITY: Traffic Congestion Alert\nintersections = {"North-A": 45, "North-B": 82, "Central": 91,\n                 "South-A": 78, "South-B": 34, "East": 88,\n                 "West": 55, "Harbor": 72}\n\n# Find critical intersections (> 70%)\ncritical = \n\n# Calculate average\naverage = sum(intersections.values()) / len(intersections)\n\nprint(f"Critical: {len(critical)}")\nprint(f"Average: {average:.1f}%")`,
      hint: `critical = {k: v for k, v in intersections.items() if v > 70}`,
      requiredKeywords: ['critical', 'average', 'for k', 'items()'],
      successOutput: 'Critical: 4\nAverage: 68.1%',
    },
    {
      id: 'cm2', district: 'District Alpha', title: 'Power Grid Balance', difficulty: 'Beginner', xp: 150, concept: 'Math & Logic',
      systemName: 'Power Grid', systemIcon: '⚡',
      briefing: `DISTRICT ALPHA — POWER GRID\n\nThe power grid has 5 districts. Total capacity is 400MW. Your algorithm must identify overloaded districts and calculate needed reductions.\n\npower = {"Residential": 95, "Commercial": 142, "Industrial": 88, "Medical": 61, "Data Center": 112}`,
      starterCode: `# SMART CITY: Power Grid Balance\npower = {"Residential": 95, "Commercial": 142,\n         "Industrial": 88, "Medical": 61, "Data Center": 112}\n\nCAPACITY = 400\nfair_share = CAPACITY / len(power)\n\n# Find overloaded districts\noverloaded = \n\nprint(f"Total: {sum(power.values())}MW/{CAPACITY}MW")\nprint(f"Fair share: {fair_share:.1f}MW")\nfor d, mw in overloaded.items():\n    print(f"Reduce {d} by {mw - fair_share:.1f}MW")`,
      hint: `overloaded = {k: v for k, v in power.items() if v > fair_share}`,
      requiredKeywords: ['overloaded', 'fair_share', 'CAPACITY', 'for d'],
      successOutput: 'Total: 498MW/400MW',
    },
  ],
  'w2-l1': [
    {
      id: 'cm3', district: 'District Beta', title: 'Emergency Response Router', difficulty: 'Intermediate', xp: 250, concept: 'Sorting & Loops',
      systemName: 'Emergency Services', systemIcon: '🚨',
      briefing: `DISTRICT BETA — EMERGENCY SERVICES\n\nMultiple incidents are active. Your routing algorithm must:\n1. Sort incidents by severity (highest first)\n2. Assign the nearest available unit\n3. Calculate total response time\n\nincidents = [("Fire-North", 9), ("Medical-East", 7), ("Accident-West", 5), ("Fire-South", 8), ("Medical-Central", 6)]`,
      starterCode: `# SMART CITY: Emergency Response Router\nincidents = [("Fire-North", 9), ("Medical-East", 7),\n             ("Accident-West", 5), ("Fire-South", 8),\n             ("Medical-Central", 6)]\n\n# Sort by severity descending\nsorted_incidents = \n\nprint("DISPATCH ORDER:")\nfor i, (location, severity) in enumerate(sorted_incidents):\n    print(f"  {i+1}. {location} (severity: {severity})")`,
      hint: `sorted_incidents = sorted(incidents, key=lambda x: x[1], reverse=True)`,
      requiredKeywords: ['sorted_incidents', 'sorted(', 'reverse=True', 'for i'],
      successOutput: 'DISPATCH ORDER:\n  1. Fire-North',
    },
  ],
  'w3-l1': [
    {
      id: 'cm4', district: 'District Omega', title: 'City Resource Optimizer', difficulty: 'Advanced', xp: 400, concept: 'Algorithms',
      systemName: 'City Core', systemIcon: '🏙️',
      briefing: `DISTRICT OMEGA — CITY CORE\n\nThe entire city depends on your master optimization algorithm.\n\nYou have 10 city resources with efficiency scores. Your algorithm must:\n1. Calculate overall efficiency\n2. Identify bottom 3 (needs upgrade)\n3. Simulate post-upgrade efficiency\n4. Print before/after comparison\n\nresources = [72, 45, 88, 61, 93, 38, 77, 52, 84, 29]`,
      starterCode: `# SMART CITY: City Resource Optimizer\nresources = [72, 45, 88, 61, 93, 38, 77, 52, 84, 29]\n\n# Current stats\ncurrent_avg = sum(resources) / len(resources)\n\n# Find bottom 3\nbottom_3 = \n\n# Simulate upgrade (bottom 3 → 75 each)\nupgraded = [75 if r in bottom_3 else r for r in resources]\nupgraded_avg = sum(upgraded) / len(upgraded)\n\nprint(f"Before: {current_avg:.1f}%")\nprint(f"After:  {upgraded_avg:.1f}%")\nprint(f"Improvement: +{upgraded_avg - current_avg:.1f}%")`,
      hint: `sorted_resources = sorted(resources)\nbottom_3 = sorted_resources[:3]`,
      requiredKeywords: ['bottom_3', 'sorted(', 'upgraded', 'current_avg'],
      successOutput: 'Before: 63.9%',
    },
  ],
};

const cityWorlds = [
  { number: 1, name: 'District Alpha', description: 'Build core city systems: traffic and power grid.', color: '#22C55E', chapterRequired: 1,
    levels: [{ id: 'w1-l1', nodeId: 'smartcity-1', world: 1, level: 1, title: 'Traffic & Power Systems', subtitle: '2 missions · Filtering and math', xp: 270, concept: 'Filtering', difficulty: 'Beginner' as const, icon: '🏗️' }]},
  { number: 2, name: 'District Beta', description: 'Expand with emergency services and logistics.', color: '#3B82F6', chapterRequired: 2,
    levels: [{ id: 'w2-l1', nodeId: 'smartcity-2', world: 2, level: 1, title: 'Emergency Response Router', subtitle: '1 mission · Sorting and loops', xp: 250, concept: 'Sorting', difficulty: 'Intermediate' as const, icon: '🚑' }]},
  { number: 3, name: 'District Omega', description: 'Master the full city with optimization algorithms.', color: '#8B5CF6', chapterRequired: 3,
    levels: [{ id: 'w3-l1', nodeId: 'smartcity-3', world: 3, level: 1, title: 'City Resource Optimizer', subtitle: '1 mission · Full algorithm', xp: 400, concept: 'Algorithms', difficulty: 'Advanced' as const, icon: '🏙️' }]},
];

export default function SmartCity() {
  const navigate = useNavigate();
  const [activeMission, setActiveMission] = useState<{ levelKey: string; missionIndex: number } | null>(null);
  const [code, setCode] = useState('');
  const [terminal, setTerminal] = useState<{ text: string; type: string }[]>([{ text: '> City Control Terminal online.', type: 'muted' }]);
  const [showHint, setShowHint] = useState(false);
  const [missionSolved, setMissionSolved] = useState(false);
  const [solvedMissions, setSolvedMissions] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(0);

  const termColors: Record<string, string> = { prompt: '#22C55E', output: '#E2E8F0', error: '#F87171', muted: '#555', success: '#22C55E' };

  const currentMissions = activeMission ? cityMissions[activeMission.levelKey] || [] : [];
  const mission = activeMission ? currentMissions[activeMission.missionIndex] : null;
  const allMissionsSolved = currentMissions.every(m => solvedMissions.includes(m.id));

  const deploy = () => {
    if (!mission) return;
    setTerminal([{ text: '$ deploy city_algorithm.py', type: 'prompt' }, { text: 'Connecting to city systems...', type: 'muted' }]);
    setTimeout(() => {
      const hasAll = mission.requiredKeywords.every(kw => code.includes(kw));
      if (hasAll) {
        mission.successOutput.split('\n').forEach(line => setTerminal(prev => [...prev, { text: line, type: 'output' }]));
        setTerminal(prev => [...prev,
          { text: '', type: 'muted' },
          { text: `✓ System deployed! District updated.`, type: 'success' },
          { text: `+${mission.xp} XP earned`, type: 'success' },
        ]);
        setMissionSolved(true);
        setSolvedMissions(prev => [...new Set([...prev, mission.id])]);
        setTotalXp(x => x + mission.xp);
      } else {
        const missing = mission.requiredKeywords.filter(k => !code.includes(k));
        setTerminal(prev => [...prev,
          { text: 'Algorithm validation failed.', type: 'error' },
          { text: `Missing logic: ${missing.join(', ')}`, type: 'error' },
        ]);
      }
    }, 800);
  };

  const completeLevelAndReturn = () => {
    if (!activeMission) return;
    const nodeMap: Record<number, string> = { 1: 'smartcity-1', 2: 'smartcity-2', 3: 'smartcity-3' };
    const worldNum = parseInt(activeMission.levelKey[1]);
    completeNode(nodeMap[worldNum] || 'smartcity-1');
    setActiveMission(null);
    setSolvedMissions([]);
    setMissionSolved(false);
    setTerminal([{ text: '> City Control Terminal online.', type: 'muted' }]);
  };

  if (activeMission && mission) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
        <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setActiveMission(null)} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>← City Map</button>
          <AQLogo size={20} />
          <span style={{ color: '#22C55E', fontWeight: 600, fontSize: 13 }}>Smart City</span>
          <span style={{ color: '#444' }}>·</span>
          <span style={{ fontSize: 12, color: '#A1A1AA' }}>{mission.district} · {mission.systemIcon} {mission.systemName}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {currentMissions.map((m, i) => (
              <div key={m.id} onClick={() => { if (i === 0 || solvedMissions.includes(currentMissions[i-1].id)) { setActiveMission(prev => ({ ...prev!, missionIndex: i })); setCode(''); setMissionSolved(false); setTerminal([{ text: `> ${m.title}...`, type: 'muted' }]); } }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: solvedMissions.includes(m.id) ? '#22C55E' : i === activeMission.missionIndex ? '#22C55E' : '#2d1f4e', cursor: 'pointer' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '40%', borderRight: '1px solid #2d1f4e', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#0A1A0A', padding: '14px 18px', borderBottom: '1px solid #22C55E33', flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: '#22C55E', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>{mission.district} · {mission.difficulty.toUpperCase()} · {mission.concept}</div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{mission.title}</h2>
              <div style={{ fontSize: 12, color: '#22C55E' }}>{mission.systemIcon} {mission.systemName}</div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#C2C0BE', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{mission.briefing}</pre>
            </div>
            <div style={{ padding: '10px 18px', borderTop: '1px solid #2d1f4e', flexShrink: 0 }}>
              <button onClick={() => setShowHint(h => !h)} style={{ width: '100%', padding: 7, borderRadius: 7, border: '1px solid #22C55E44', background: showHint ? '#0A1A0A' : 'none', color: '#22C55E', fontSize: 12, cursor: 'pointer' }}>
                {showHint ? '← Hide hint' : '💡 Algorithm hint'}
              </button>
              {showHint && <pre style={{ marginTop: 10, whiteSpace: 'pre-wrap', fontSize: 12, color: '#86EFAC', fontFamily: 'Fira Code, monospace', background: '#0A1A0A', border: '1px solid #22C55E22', borderRadius: 8, padding: 12 }}>{mission.hint}</pre>}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 12px', height: 36, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#A1A1AA' }}>city_algorithm.py</span>
              {missionSolved && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#22C55E' }}>✓ Deployed!</span>}
            </div>
            <div style={{ flex: 2, overflow: 'hidden' }}>
              <Editor height="100%" language="python" value={code || mission.starterCode} onChange={v => setCode(v || '')} theme="vs-dark"
                options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'Fira Code, monospace', automaticLayout: true, padding: { top: 10 } }} />
            </div>
            <div style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', borderBottom: '1px solid #2d1f4e', padding: '6px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={deploy} style={{ padding: '6px 18px', borderRadius: 7, border: 'none', background: '#22C55E', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>🏙️ Deploy</button>
              {missionSolved && !allMissionsSolved && activeMission.missionIndex < currentMissions.length - 1 && (
                <button onClick={() => { setActiveMission(prev => ({ ...prev!, missionIndex: prev!.missionIndex + 1 })); setCode(''); setMissionSolved(false); setTerminal([{ text: '> Next mission...', type: 'muted' }]); setShowHint(false); }}
                  style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#3B82F6', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>→ Next mission</button>
              )}
              {allMissionsSolved && (
                <button onClick={completeLevelAndReturn} style={{ padding: '6px 16px', borderRadius: 7, border: 'none', background: '#F59E0B', color: '#000', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>🏆 Complete district!</button>
              )}
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
    <GameHub gameType="smartcity" title="Smart City" icon="🏙️" accentColor="#22C55E" worlds={cityWorlds}
      onPlayLevel={level => { setActiveMission({ levelKey: level.id, missionIndex: 0 }); setCode(''); setSolvedMissions([]); setMissionSolved(false); setTerminal([{ text: `> Entering ${level.title}...`, type: 'muted' }]); }} />
  );
}
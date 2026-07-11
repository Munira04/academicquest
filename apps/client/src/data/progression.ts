// ─── PROGRESSION ENGINE ───────────────────────────────────────────────────────
// This is the single source of truth for ALL unlocks across the platform.
// Lessons → Quizzes → Game Levels → Next Chapter

export type UnlockStatus = 'locked' | 'unlocked' | 'completed';

export interface ProgressionNode {
  id: string;
  type: 'lesson' | 'quiz' | 'dungeon' | 'battle' | 'detective' | 'smartcity';
  chapter: number;
  order: number;
  title: string;
  xpReward: number;
  unlockRequires: string[]; // node IDs that must be completed first
}

export const progressionMap: ProgressionNode[] = [
  // ── CHAPTER 1: Python Basics ──────────────────────────────────────────────
  { id: 'lesson-1-1', type: 'lesson',    chapter: 1, order: 1, title: 'Welcome to Python',        xpReward: 50,  unlockRequires: [] },
  { id: 'lesson-1-2', type: 'lesson',    chapter: 1, order: 2, title: 'Variables & Strings',       xpReward: 50,  unlockRequires: ['lesson-1-1'] },
  { id: 'lesson-1-3', type: 'lesson',    chapter: 1, order: 3, title: 'Numbers & Math',            xpReward: 50,  unlockRequires: ['lesson-1-2'] },
  { id: 'lesson-1-4', type: 'lesson',    chapter: 1, order: 4, title: 'User Input',                xpReward: 50,  unlockRequires: ['lesson-1-3'] },
  { id: 'lesson-1-5', type: 'lesson',    chapter: 1, order: 5, title: 'Data Types',                xpReward: 50,  unlockRequires: ['lesson-1-4'] },
  { id: 'quiz-1',     type: 'quiz',      chapter: 1, order: 6, title: 'Chapter 1 Quiz',            xpReward: 200, unlockRequires: ['lesson-1-5'] },
  { id: 'dungeon-1',  type: 'dungeon',   chapter: 1, order: 7, title: 'Dungeon World 1',           xpReward: 300, unlockRequires: ['quiz-1'] },
  { id: 'battle-1',   type: 'battle',    chapter: 1, order: 7, title: 'Battle Arena 1',            xpReward: 300, unlockRequires: ['quiz-1'] },
  { id: 'detective-1',type: 'detective', chapter: 1, order: 7, title: 'Detective Case 1',          xpReward: 300, unlockRequires: ['quiz-1'] },
  { id: 'smartcity-1',type: 'smartcity', chapter: 1, order: 7, title: 'Smart City District 1',    xpReward: 300, unlockRequires: ['quiz-1'] },

  // ── CHAPTER 2: Control Flow ───────────────────────────────────────────────
  { id: 'lesson-2-1', type: 'lesson',    chapter: 2, order: 1, title: 'If Statements',             xpReward: 75,  unlockRequires: ['dungeon-1'] },
  { id: 'lesson-2-2', type: 'lesson',    chapter: 2, order: 2, title: 'Loops — For',               xpReward: 75,  unlockRequires: ['lesson-2-1'] },
  { id: 'lesson-2-3', type: 'lesson',    chapter: 2, order: 3, title: 'Loops — While',             xpReward: 75,  unlockRequires: ['lesson-2-2'] },
  { id: 'lesson-2-4', type: 'lesson',    chapter: 2, order: 4, title: 'Functions',                 xpReward: 75,  unlockRequires: ['lesson-2-3'] },
  { id: 'quiz-2',     type: 'quiz',      chapter: 2, order: 5, title: 'Chapter 2 Quiz',            xpReward: 250, unlockRequires: ['lesson-2-4'] },
  { id: 'dungeon-2',  type: 'dungeon',   chapter: 2, order: 6, title: 'Dungeon World 2',           xpReward: 400, unlockRequires: ['quiz-2'] },
  { id: 'battle-2',   type: 'battle',    chapter: 2, order: 6, title: 'Battle Arena 2',            xpReward: 400, unlockRequires: ['quiz-2'] },
  { id: 'detective-2',type: 'detective', chapter: 2, order: 6, title: 'Detective Case 2',          xpReward: 400, unlockRequires: ['quiz-2'] },
  { id: 'smartcity-2',type: 'smartcity', chapter: 2, order: 6, title: 'Smart City District 2',    xpReward: 400, unlockRequires: ['quiz-2'] },

  // ── CHAPTER 3: Data Structures ────────────────────────────────────────────
  { id: 'lesson-3-1', type: 'lesson',    chapter: 3, order: 1, title: 'Lists',                     xpReward: 100, unlockRequires: ['dungeon-2'] },
  { id: 'lesson-3-2', type: 'lesson',    chapter: 3, order: 2, title: 'Dictionaries',              xpReward: 100, unlockRequires: ['lesson-3-1'] },
  { id: 'lesson-3-3', type: 'lesson',    chapter: 3, order: 3, title: 'Tuples & Sets',             xpReward: 100, unlockRequires: ['lesson-3-2'] },
  { id: 'quiz-3',     type: 'quiz',      chapter: 3, order: 4, title: 'Chapter 3 Quiz',            xpReward: 300, unlockRequires: ['lesson-3-3'] },
  { id: 'dungeon-3',  type: 'dungeon',   chapter: 3, order: 5, title: 'Dungeon World 3',           xpReward: 500, unlockRequires: ['quiz-3'] },
  { id: 'battle-3',   type: 'battle',    chapter: 3, order: 5, title: 'Battle Arena 3',            xpReward: 500, unlockRequires: ['quiz-3'] },
  { id: 'detective-3',type: 'detective', chapter: 3, order: 5, title: 'Detective Case 3',          xpReward: 500, unlockRequires: ['quiz-3'] },
  { id: 'smartcity-3',type: 'smartcity', chapter: 3, order: 5, title: 'Smart City District 3',    xpReward: 500, unlockRequires: ['quiz-3'] },
];

// ─── SAVE / LOAD PROGRESS ─────────────────────────────────────────────────────
export function getCompletedNodes(): string[] {
  try {
    const saved = localStorage.getItem('aq_progress');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

export function completeNode(nodeId: string): void {
  const current = getCompletedNodes();
  if (!current.includes(nodeId)) {
    localStorage.setItem('aq_progress', JSON.stringify([...current, nodeId]));
  }
}

export function getNodeStatus(nodeId: string): UnlockStatus {
  const completed = getCompletedNodes();
  if (completed.includes(nodeId)) return 'completed';
  const node = progressionMap.find(n => n.id === nodeId);
  if (!node) return 'locked';
  if (node.unlockRequires.length === 0) return 'unlocked';
  const allMet = node.unlockRequires.every(req => completed.includes(req));
  return allMet ? 'unlocked' : 'locked';
}

export function getNodeXp(nodeId: string): number {
  return progressionMap.find(n => n.id === nodeId)?.xpReward || 0;
}

// Unlock all Chapter 1 content for demo purposes
export function seedDemoProgress(): void {
  const demo = ['lesson-1-1', 'lesson-1-2', 'lesson-1-3', 'lesson-1-4', 'lesson-1-5', 'quiz-1'];
  const current = getCompletedNodes();
  const merged = [...new Set([...current, ...demo])];
  localStorage.setItem('aq_progress', JSON.stringify(merged));
}
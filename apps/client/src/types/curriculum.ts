export interface FlashcardData {
  front: string;
  back: string;
}

export interface LeftPanelContent {
  chapterProgress: string;
  conceptText: string;
  instructions: string;
}

export interface LessonUtilities {
  hint: string;
  flashcard: FlashcardData;
  solution: string;
}

export interface RightPanelContent {
  startingCode: string;
  expectedOutput: string;
}

export type LessonType = 'learn' | 'practice' | 'supercharge' | 'project';

export interface Lesson {
  lessonId: string;
  title: string;
  type: LessonType;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  track: string;
  leftPanel: LeftPanelContent;
  utilities: LessonUtilities;
  rightPanel: RightPanelContent;
  xpReward: number;
}

export interface Section {
  sectionId: string;
  title: string;
  learningObjective: string;
  order: number;
  lessons: Lesson[];
  superchargeLessons?: Lesson[]; // Optional advanced challenges
  sectionProject?: Lesson; // Optional capstone project for the section
  xpReward: number;
  isLocked: boolean; // Computed based on previous section completion
  keyConcepts: string[]; // Key concepts mastered in this section
  estimatedMinutes: number; // Estimated time to complete section
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  philosophy: string;
  icon: string;
  color: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  pillar: string;
  xp: number;
  sections: Section[];
  capstoneProject?: Lesson; // Final course project
  totalLessons: number; // Computed
  totalXP: number; // Computed
}

// Per-section progress
export interface SectionProgress {
  sectionId: string;
  completedLessonIds: string[];
  completedSuperchargeIds: string[];
  projectCompleted: boolean;
  xpEarnedInSection: number;
  timeSpentMinutes: number;
  conceptsMastered: string[];
  completedAt?: string; // Timestamp when section was completed
}

// Per-course progress — now section-based
export interface CourseProgress {
  courseId: string;
  currentSectionIndex: number;
  currentLessonIndex: number;
  completedSectionIds: string[];
  sectionProgress: Record<string, SectionProgress>;
  xpEarnedInCourse: number;
  enrollmentDate: string;
  lastAccessedAt: string;
}

// Global user state holds a MAP of progress per course
export interface UserState {
  username: string;
  totalXp: number;
  level: number;
  streak: number;
  courseProgress: Record<string, CourseProgress>;
  achievements: Achievement[];
  // e.g. { "python-fundamentals": {...}, "html-basics": {...} }
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface StoryCollection {
  id: string;
  title: string;
  description: string;
  trackIds: string[]; // ordered course IDs in this collection
}
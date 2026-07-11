import type { Course, CourseProgress, Section } from '../types/curriculum';

/**
 * Computes whether a section should be locked based on user progress.
 * Section 1 is always unlocked. Section N is unlocked only if Section N-1 is completed.
 */
export function computeSectionLockStatus(
  section: Section,
  course: Course,
  progress?: CourseProgress
): boolean {
  // First section is always unlocked
  if (section.order === 1) {
    return false;
  }

  // If no progress data, lock all sections except the first
  if (!progress) {
    return true;
  }

  // Find the previous section
  const previousSection = course.sections.find(s => s.order === section.order - 1);
  
  if (!previousSection) {
    return false; // Should not happen, but safety fallback
  }

  // Section is unlocked if the previous section is completed
  const isPreviousSectionCompleted = progress.completedSectionIds.includes(previousSection.sectionId);
  
  return !isPreviousSectionCompleted;
}

/**
 * Computes lock status for all sections in a course based on user progress.
 */
export function computeAllSectionLockStatuses(
  course: Course,
  progress?: CourseProgress
): Record<string, boolean> {
  const lockStatuses: Record<string, boolean> = {};
  
  course.sections.forEach(section => {
    lockStatuses[section.sectionId] = computeSectionLockStatus(section, course, progress);
  });
  
  return lockStatuses;
}

/**
 * Calculates section completion summary including XP earned, lessons completed, time spent, and concepts mastered.
 */
export function calculateSectionCompletionSummary(
  section: Section,
  progress?: CourseProgress
): {
  xpEarned: number;
  lessonsCompleted: number;
  totalLessons: number;
  superchargeCompleted: number;
  totalSupercharge: number;
  projectCompleted: boolean;
  timeSpentMinutes: number;
  conceptsMastered: string[];
  isComplete: boolean;
} {
  const sectionProgress = progress?.sectionProgress[section.sectionId];
  
  const lessonsCompleted = sectionProgress?.completedLessonIds?.length || 0;
  const totalLessons = section.lessons.length;
  const superchargeCompleted = sectionProgress?.completedSuperchargeIds?.length || 0;
  const totalSupercharge = section.superchargeLessons?.length || 0;
  const projectCompleted = sectionProgress?.projectCompleted || false;
  const timeSpentMinutes = sectionProgress?.timeSpentMinutes || 0;
  const conceptsMastered = sectionProgress?.conceptsMastered || [];
  const xpEarned = sectionProgress?.xpEarnedInSection || 0;
  
  // Section is complete if all lessons and project are done
  const isComplete = lessonsCompleted === totalLessons && projectCompleted;
  
  return {
    xpEarned,
    lessonsCompleted,
    totalLessons,
    superchargeCompleted,
    totalSupercharge,
    projectCompleted,
    timeSpentMinutes,
    conceptsMastered,
    isComplete,
  };
}

/**
 * Gets the next unlockable section for a user.
 */
export function getNextUnlockableSection(
  course: Course,
  progress?: CourseProgress
): Section | null {
  for (const section of course.sections) {
    const isLocked = computeSectionLockStatus(section, course, progress);
    if (!isLocked) {
      const summary = calculateSectionCompletionSummary(section, progress);
      if (!summary.isComplete) {
        return section;
      }
    }
  }
  return null; // All sections completed
}

/**
 * Checks if the course capstone project is unlocked.
 * Capstone is unlocked when all sections are completed.
 */
export function isCapstoneUnlocked(
  course: Course,
  progress?: CourseProgress
): boolean {
  if (!course.capstoneProject) {
    return false;
  }
  
  // Capstone is unlocked when all sections are completed
  const allSectionsCompleted = course.sections.every(section => {
    const summary = calculateSectionCompletionSummary(section, progress);
    return summary.isComplete;
  });
  
  return allSectionsCompleted;
}

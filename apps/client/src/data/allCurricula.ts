// ─────────────────────────────────────────────────────────────────────────────
// AcademicQuest — Curriculum Registry
// Types live in types/curriculum.ts; course data lives in curricula/*.ts
// ─────────────────────────────────────────────────────────────────────────────

export type { Course, Lesson } from '../types/curriculum';

export { pythonCourse } from './curricula/pythonCurriculum';
export { javascriptCourse } from './curricula/javascriptCurriculum';
export { javaCourse } from './curricula/javaCurriculum';
export { htmlCourse } from './curricula/htmlCurriculum';
export { cssCourse } from './curricula/cssCurriculum';
export { typescriptCourse } from './curricula/typescriptCurriculum';
export { reactCourse } from './curricula/reactCurriculum';
export { sqlCourse } from './curricula/sqlCurriculum';
export { nodejsCourse } from './curricula/nodejsCurriculum';
export { cppCourse } from './curricula/cppCurriculum';
export { csharpCourse } from './curricula/csharpCurriculum';

import type { Course } from '../types/curriculum';
import { pythonCourse } from './curricula/pythonCurriculum';
import { javascriptCourse } from './curricula/javascriptCurriculum';
import { javaCourse } from './curricula/javaCurriculum';
import { htmlCourse } from './curricula/htmlCurriculum';
import { cssCourse } from './curricula/cssCurriculum';
import { typescriptCourse } from './curricula/typescriptCurriculum';
import { reactCourse } from './curricula/reactCurriculum';
import { sqlCourse } from './curricula/sqlCurriculum';
import { nodejsCourse } from './curricula/nodejsCurriculum';
import { cppCourse } from './curricula/cppCurriculum';
import { csharpCourse } from './curricula/csharpCurriculum';

/** All registered courses keyed by platform course id */
export const coursesById: Record<string, Course> = {
  py1: pythonCourse,
  web3: javascriptCourse,
  eng1: javaCourse,
  web1: htmlCourse,
  web2: cssCourse,
  'web-ts': typescriptCourse,
  web4: reactCourse,
  py4: sqlCourse,
  web5: nodejsCourse,
  eng2: cppCourse,
  eng3: csharpCourse,
};

export const allCourses: Course[] = Object.values(coursesById);

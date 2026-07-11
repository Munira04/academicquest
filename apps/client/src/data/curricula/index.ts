import { pythonCourse } from './pythonCurriculum';
import { htmlCourse } from './htmlCurriculum';
import { cssCourse } from './cssCurriculum';
import { javascriptCourse } from './javascriptCurriculum';
import { reactCourse } from './reactCurriculum';
import { nodejsCourse } from './nodejsCurriculum';
import { sqlCourse } from './sqlCurriculum';
import { javaCourse } from './javaCurriculum';
import { cppCourse } from './cppCurriculum';
import { csharpCourse } from './csharpCurriculum';
import { typescriptCourse } from './typescriptCurriculum';

export const curriculumMap: Record<string, any> = {
  py1: pythonCourse,
  web1: htmlCourse,
  web2: cssCourse,
  web3: javascriptCourse,
  web4: reactCourse,
  web5: nodejsCourse,
  py4: sqlCourse,
  eng1: javaCourse,
  eng2: cppCourse,
  eng3: csharpCourse,
  git1: { id: 'git1', title: 'Git & GitHub', tagline: 'Version control and collaboration', philosophy: 'Git is the industry standard for version control. GitHub is the platform for collaboration.', icon: '🦊', color: 'from-orange-600 to-orange-800', level: 'BEGINNER', pillar: 'Version Control & Developer Tools', xp: 200, sections: [], totalLessons: 0, totalXP: 200 },
  ai1: { id: 'ai1', title: 'Artificial Intelligence', tagline: 'Explore AI fundamentals', philosophy: 'AI is transforming every industry. Learn the fundamentals of neural networks and machine learning.', icon: '🤖', color: 'from-purple-600 to-purple-800', level: 'INTERMEDIATE', pillar: 'Artificial Intelligence', xp: 600, sections: [], totalLessons: 0, totalXP: 600 },
  'web-ts': typescriptCourse,
};

export const getCourseById = (courseId: string) => {
  return curriculumMap[courseId] || null;
};

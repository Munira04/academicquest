import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import CategorySection from '../components/CategorySection';

const allCourses = [
  // Web Development
  { id: 'web1', title: 'HTML', desc: 'Create your first website using the structural building blocks that make up every page on the web.', level: 'BEGINNER', xp: 150, pillar: 'Web Development' },
  { id: 'web2', title: 'CSS', desc: 'Style and animate your pages using modern layout systems, colors, fonts, and responsive design.', level: 'BEGINNER', xp: 200, pillar: 'Web Development' },
  { id: 'web3', title: 'JavaScript', desc: 'Add interactivity, events, and dynamic logic to your web pages with the language of the browser.', level: 'BEGINNER', xp: 300, pillar: 'Web Development' },
  { id: 'web4', title: 'React', desc: 'Build modern, component-based user interfaces using the most widely adopted frontend library.', level: 'INTERMEDIATE', xp: 400, pillar: 'Web Development' },
  { id: 'web5', title: 'Node.js', desc: 'Run JavaScript on the server side and build REST APIs and backend services at scale.', level: 'INTERMEDIATE', xp: 450, pillar: 'Web Development' },

  // Programming Languages
  { id: 'py1', title: 'Python', desc: 'Learn programming fundamentals — variables, loops, functions — with the world\'s most versatile language.', level: 'BEGINNER', xp: 200, pillar: 'Programming Languages' },
  { id: 'eng1', title: 'Java', desc: 'Master object-oriented programming and build enterprise-grade, platform-independent applications.', level: 'BEGINNER', xp: 300, pillar: 'Programming Languages' },
  { id: 'eng2', title: 'C++', desc: 'Write high-performance software with direct memory control, pointers, and systems-level design.', level: 'INTERMEDIATE', xp: 500, pillar: 'Programming Languages' },
  { id: 'eng3', title: 'C#', desc: 'Build enterprise apps, games, and Windows tools with Microsoft\'s versatile typed language.', level: 'BEGINNER', xp: 300, pillar: 'Programming Languages' },

  // Data Science
  { id: 'py4', title: 'SQL', desc: 'Query, filter, and manage structured databases with the language behind every data-driven system.', level: 'BEGINNER', xp: 250, pillar: 'Data Science' },
  { id: 'py5', title: 'Machine Learning', desc: 'Build predictive models that learn patterns from real data using Python\'s ML ecosystem.', level: 'INTERMEDIATE', xp: 700, pillar: 'Data Science' },

  // Artificial Intelligence
  { id: 'ai1', title: 'Artificial Intelligence', desc: 'Explore the fundamentals of AI, from neural networks to machine learning algorithms and practical applications.', level: 'INTERMEDIATE', xp: 600, pillar: 'Artificial Intelligence' },

  // Version Control & Developer Tools
  { id: 'git1', title: 'Git & GitHub', desc: 'Master version control, collaboration workflows, and manage your code like a professional.', level: 'BEGINNER', xp: 200, pillar: 'Version Control & Developer Tools' },
];

const categories = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Master the full web stack — from HTML structure and CSS styling to JavaScript interactivity and React components. Build complete, modern web applications.',
    color: '#3B82F6',
    icon: '🌐',
    courses: allCourses.filter(c => c.pillar === 'Web Development'),
    stats: {
      totalCourses: 5,
      certificates: 3,
      estimatedHours: 45,
    },
  },
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    description: 'Master the fundamentals of programming through Python, Java, C++, and C#. Build a strong foundation in computer science and software engineering.',
    color: '#F59E0B',
    icon: '💻',
    courses: allCourses.filter(c => c.pillar === 'Programming Languages'),
    stats: {
      totalCourses: 4,
      certificates: 2,
      estimatedHours: 50,
    },
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'From SQL databases to machine learning — master the complete data science pipeline and unlock insights from data.',
    color: '#10B981',
    icon: '📊',
    courses: allCourses.filter(c => c.pillar === 'Data Science'),
    stats: {
      totalCourses: 2,
      certificates: 1,
      estimatedHours: 30,
    },
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description: 'Explore the cutting edge of technology with AI fundamentals, neural networks, and machine learning algorithms.',
    color: '#8B5CF6',
    icon: '🤖',
    courses: allCourses.filter(c => c.pillar === 'Artificial Intelligence'),
    stats: {
      totalCourses: 1,
      certificates: 1,
      estimatedHours: 25,
    },
  },
  {
    id: 'devops',
    title: 'Version Control & Developer Tools',
    description: 'Master Git, GitHub, and modern development workflows. Learn to collaborate effectively and manage code like a professional.',
    color: '#EF4444',
    icon: '🔧',
    courses: allCourses.filter(c => c.pillar === 'Version Control & Developer Tools'),
    stats: {
      totalCourses: 1,
      certificates: 1,
      estimatedHours: 15,
    },
  },
];

const mockUserProgress: Record<string, number> = {
  py1: 60,
  web1: 100,
  web2: 40,
};

export default function Courses() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) { navigate('/login'); return null; }

  const handleCourseClick = (courseId: string) => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <AppHeader breadcrumb="Courses" />

      {/* Course Categories - Start directly with categories, no hero statistics */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px 64px' }}>
        {categories.map(category => (
          <CategorySection
            key={category.id}
            category={category}
            onCourseClick={handleCourseClick}
            userProgress={mockUserProgress}
          />
        ))}
      </div>
    </div>
  );
}

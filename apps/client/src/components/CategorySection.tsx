import { useState, useRef } from 'react';
import CourseCard from './CourseCard';

interface CategorySectionProps {
  category: {
    id: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    courses: Array<{
      id: string;
      title: string;
      desc: string;
      level: string;
      xp: number;
      pillar: string;
      courseNumber?: number;
    }>;
    stats: {
      totalCourses: number;
      certificates: number;
      estimatedHours: number;
    };
  };
  onCourseClick: (courseId: string) => void;
  userProgress?: Record<string, number>;
}

export default function CategorySection({ category, onCourseClick, userProgress }: CategorySectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -1160, behavior: 'smooth' }); // Scroll by 3 cards (360 + 20 gap) * 3 = 1160
      setScrollPosition(Math.max(0, scrollPosition - 1160));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 1160, behavior: 'smooth' });
      setScrollPosition(scrollPosition + 1160);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = carouselRef.current 
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    : false;

  return (
    <div style={{ marginBottom: 72 }}>
      {/* Category Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                background: `linear-gradient(135deg, ${category.color}, ${category.color}88)`,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 24 
              }}>
                {category.icon}
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>
                {category.title}
              </h2>
            </div>
            <p style={{ fontSize: 15, color: '#9CA3AF', lineHeight: 1.6, maxWidth: 600, margin: 0 }}>
              {category.description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: `1px solid ${canScrollLeft ? category.color : '#1E1A2E'}`,
                background: canScrollLeft ? `${category.color}22` : '#0D0B14',
                color: canScrollLeft ? category.color : '#4B5563',
                fontSize: 20,
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (canScrollLeft) {
                  e.currentTarget.style.background = `${category.color}33`;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${category.color}22`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: `1px solid ${canScrollRight ? category.color : '#1E1A2E'}`,
                background: canScrollRight ? `${category.color}22` : '#0D0B14',
                color: canScrollRight ? category.color : '#4B5563',
                fontSize: 20,
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (canScrollRight) {
                  e.currentTarget.style.background = `${category.color}33`;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${category.color}22`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Category Statistics */}
        <div style={{ display: 'flex', gap: 24 }}>
          <StatItem icon="📚" label="Courses" value={category.stats.totalCourses} />
          <StatItem icon="🏆" label="Certificates" value={category.stats.certificates} />
          <StatItem icon="⏱️" label="Hours" value={category.stats.estimatedHours} />
        </div>
      </div>

      {/* Course Carousel - Shows exactly 3 cards at a time */}
      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '4px',
          // Calculate width to show exactly 3 cards: 360 * 3 + 20 * 2 = 1160
          maxWidth: 1160,
        }}
        onScroll={(e) => {
          setScrollPosition(e.currentTarget.scrollLeft);
        }}
      >
        {category.courses.map((course, index) => (
          <CourseCard
            key={course.id}
            course={{ ...course, courseNumber: index + 1 }}
            progress={userProgress?.[course.id]}
            onClick={() => onCourseClick(course.id)}
          />
        ))}
      </div>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
      </div>
    </div>
  );
}

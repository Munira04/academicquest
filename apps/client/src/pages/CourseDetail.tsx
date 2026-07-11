import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../data/curricula';
import type { Course, Section, Lesson } from '../types/curriculum';

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  
  const course = courseId ? getCourseById(courseId) : null;

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>Course Not Found</h1>
        <p style={{ color: '#A1A1AA', marginBottom: 24 }}>The course you're looking for doesn't exist or hasn't been completed yet.</p>
        <button
          onClick={() => navigate('/courses')}
          style={{ background: '#8B5CF6', border: 'none', color: '#fff', padding: '12px 24px', borderRadius: 8, cursor: 'pointer' }}
        >
          Back to Courses
        </button>
      </div>
    );
  }
  
  const [expandedSection, setExpandedSection] = useState<string | null>(course.sections[0]?.sectionId || null);

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'learn': return '📖';
      case 'practice': return '💪';
      case 'supercharge': return '⚡';
      case 'project': return '🎯';
      case 'capstone': return '🏆';
      default: return '📝';
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'learn': return '#8B5CF6';
      case 'practice': return '#22C55E';
      case 'supercharge': return '#F59E0B';
      case 'project': return '#EF4444';
      case 'capstone': return '#EC4899';
      default: return '#A1A1AA';
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleLessonClick = (lessonId: string) => {
    navigate(`/learn/${lessonId}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 28px' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => navigate('/courses')}
          style={{ background: 'none', border: 'none', color: '#A1A1AA', fontSize: 14, cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          ← Back to Courses
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 48 }}>{course.icon}</div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{course.title}</h1>
            <p style={{ fontSize: 14, color: '#A1A1AA' }}>{course.tagline}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 8, padding: '8px 16px', fontSize: 12 }}>
            <span style={{ color: '#A78BFA' }}>{course.sections.length} Sections</span>
          </div>
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 8, padding: '8px 16px', fontSize: 12 }}>
            <span style={{ color: '#A78BFA' }}>{course.totalLessons || course.sections.reduce((sum: number, s: any) => sum + (s.lessons?.length || 0), 0)} Lessons</span>
          </div>
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 8, padding: '8px 16px', fontSize: 12 }}>
            <span style={{ color: '#A78BFA' }}>{course.totalXP || course.xp} XP</span>
          </div>
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 8, padding: '8px 16px', fontSize: 12 }}>
            <span style={{ color: '#A78BFA' }}>{course.level}</span>
          </div>
          {course.capstoneProject && (
            <div style={{ background: 'linear-gradient(135deg, #EC489922, #F472B622)', border: '1px solid #EC4899', borderRadius: 8, padding: '8px 16px', fontSize: 12 }}>
              <span style={{ color: '#EC4899' }}>🏆 Capstone Project</span>
            </div>
          )}
        </div>
      </div>

      {/* Course Philosophy */}
      <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 8 }}>About this course</h3>
        <p style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.6 }}>{course.philosophy}</p>
      </div>

      {/* Course Coming Soon Message if no sections */}
      {course.sections.length === 0 && (
        <div style={{ background: 'linear-gradient(135deg, #F59E0B22, #FBBF2422)', border: '1px solid #F59E0B', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Course Coming Soon</h2>
          <p style={{ fontSize: 14, color: '#A1A1AA', lineHeight: 1.6 }}>This course is currently being developed. Check back soon for complete lessons, projects, and capstone challenges!</p>
        </div>
      )}

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {course.sections.map((section: Section, sectionIndex: number) => {
          const isExpanded = expandedSection === section.sectionId;
          const isLocked = section.isLocked;
          
          return (
            <div
              key={section.sectionId}
              style={{
                background: '#120F1F',
                border: isLocked ? '1px solid #2d1f4e' : '1px solid #2d1f4e',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLocked ? 0.6 : 1,
              }}
            >
              {/* Section Header */}
              <div
                onClick={() => !isLocked && toggleSection(section.sectionId)}
                style={{
                  padding: 20,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => !isLocked && (e.currentTarget.style.background = '#1A1028')}
                onMouseLeave={(e) => !isLocked && (e.currentTarget.style.background = '#120F1F')}
              >
                <div style={{
                  width: 40, height: 40,
                  background: isLocked ? '#2d1f4e' : 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {isLocked ? '🔒' : sectionIndex + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{section.title}</div>
                  <div style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 8 }}>{section.learningObjective}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#555', flexWrap: 'wrap' }}>
                    <span>{section.lessons?.length || 0} Lessons</span>
                    {section.superchargeLessons && section.superchargeLessons.length > 0 && <span>⚡ {section.superchargeLessons.length} Supercharge</span>}
                    <span>{section.xpReward} XP</span>
                    {section.estimatedMinutes && <span>~{section.estimatedMinutes} min</span>}
                    {section.sectionProject && <span>🎯 Project</span>}
                  </div>
                </div>
                <div style={{ fontSize: 20, color: '#A1A1AA' }}>
                  {isLocked ? '🔒' : (isExpanded ? '▼' : '▶')}
                </div>
              </div>

              {/* Section Content */}
              {isExpanded && !isLocked && (
                <div style={{ borderTop: '1px solid #2d1f4e', padding: '20px 20px 20px 76' }}>
                  
                  {/* Lessons */}
                  {section.lessons && section.lessons.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: (section.sectionProject || section.superchargeLessons) ? 20 : 0 }}>
                      {section.lessons.map((lesson: Lesson) => (
                        <div
                          key={lesson.lessonId}
                          onClick={() => handleLessonClick(lesson.lessonId)}
                          style={{
                            background: '#1A1028',
                            border: '1px solid #2d1f4e',
                            borderRadius: 8,
                            padding: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = getLessonTypeColor(lesson.type);
                            e.currentTarget.style.background = '#1A1028AA';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#2d1f4e';
                            e.currentTarget.style.background = '#1A1028';
                          }}
                        >
                          <div style={{
                            width: 32, height: 32,
                            background: `${getLessonTypeColor(lesson.type)}22`,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 16
                          }}>
                            {getLessonTypeIcon(lesson.type)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 2 }}>{lesson.title}</div>
                            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#555' }}>
                              <span style={{ textTransform: 'capitalize' }}>{lesson.type}</span>
                              <span>•</span>
                              <span>{lesson.difficulty}</span>
                              <span>•</span>
                              <span>{lesson.xpReward} XP</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 14, color: '#A1A1AA' }}>→</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Supercharge Lessons */}
                  {section.superchargeLessons && section.superchargeLessons.length > 0 && (
                    <div style={{ marginTop: 16, marginBottom: section.sectionProject ? 20 : 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#F59E0B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>⚡ Supercharge Challenges</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {section.superchargeLessons.map((lesson: Lesson) => (
                          <div
                            key={lesson.lessonId}
                            onClick={() => handleLessonClick(lesson.lessonId)}
                            style={{
                              background: 'linear-gradient(135deg, #F59E0B22, #FBBF2422)',
                              border: '1px solid #F59E0B',
                              borderRadius: 8,
                              padding: 12,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#FBBF24';
                              e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B33, #FBBF2433)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#F59E0B';
                              e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B22, #FBBF2422)';
                            }}
                          >
                            <div style={{
                              width: 32, height: 32,
                              background: '#F59E0B',
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 16
                            }}>
                              ⚡
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 2 }}>{lesson.title}</div>
                              <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#888' }}>
                                <span style={{ textTransform: 'capitalize' }}>{lesson.type}</span>
                                <span>•</span>
                                <span>{lesson.difficulty}</span>
                                <span>•</span>
                                <span>{lesson.xpReward} XP</span>
                              </div>
                            </div>
                            <div style={{ fontSize: 14, color: '#F59E0B' }}>→</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section Project */}
                  {section.sectionProject && (
                    <div
                      onClick={() => handleLessonClick(section.sectionProject!.lessonId)}
                      style={{
                        background: 'linear-gradient(135deg, #8B5CF622, #A78BFA22)',
                        border: '2px solid #8B5CF6',
                        borderRadius: 12,
                        padding: 16,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#A78BFA';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #8B5CF633, #A78BFA33)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#8B5CF6';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #8B5CF622, #A78BFA22)';
                      }}
                    >
                      <div style={{
                        width: 40, height: 40,
                        background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20
                      }}>
                        🎯
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Section Project</div>
                        <div style={{ fontSize: 12, color: '#A78BFA' }}>{section.sectionProject.title}</div>
                      </div>
                      <div style={{ fontSize: 11, color: '#A78BFA', fontWeight: 600 }}>{section.sectionProject.xpReward} XP</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Course Capstone Project */}
      {course.capstoneProject && (
        <div style={{ marginTop: 32 }}>
          <div
            onClick={() => handleLessonClick(course.capstoneProject!.lessonId)}
            style={{
              background: 'linear-gradient(135deg, #EC489922, #F472B622)',
              border: '2px solid #EC4899',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#F472B6';
              e.currentTarget.style.background = 'linear-gradient(135deg, #EC489933, #F472B633)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#EC4899';
              e.currentTarget.style.background = 'linear-gradient(135deg, #EC489922, #F472B622)';
            }}
          >
            <div style={{
              width: 56, height: 56,
              background: 'linear-gradient(135deg, #EC4899, #F472B6)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28
            }}>
              🏆
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Course Capstone Project</div>
              <div style={{ fontSize: 14, color: '#EC4899', marginBottom: 8 }}>{course.capstoneProject.title}</div>
              <div style={{ fontSize: 12, color: '#888' }}>The final achievement combining everything learned in this course</div>
            </div>
            <div style={{ fontSize: 14, color: '#EC4899', fontWeight: 700 }}>{course.capstoneProject.xpReward} XP</div>
          </div>
        </div>
      )}
    </div>
  );
}

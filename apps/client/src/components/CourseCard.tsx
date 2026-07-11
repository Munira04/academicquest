import { useState } from 'react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    desc: string;
    level: string;
    xp: number;
    pillar: string;
    courseNumber: number;
  };
  progress?: number;
  onClick: () => void;
}

const levelColors: Record<string, string> = {
  BEGINNER: '#22C55E',
  INTERMEDIATE: '#8B5CF6',
  ADVANCED: '#F59E0B',
};

const levelBgColors: Record<string, string> = {
  BEGINNER: 'rgba(34, 197, 94, 0.15)',
  INTERMEDIATE: 'rgba(139, 92, 246, 0.15)',
  ADVANCED: 'rgba(245, 158, 11, 0.15)',
};

export default function CourseCard({ course, progress, onClick }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 360,
        height: 220,
        background: '#0D0B14',
        border: `1px solid ${isHovered ? '#8B5CF6' : '#1E1A2E'}`,
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? '0 25px 50px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1)' 
          : '0 8px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Illustrated Banner - 45% of card height */}
      <div style={{ height: 100, position: 'relative', overflow: 'hidden' }}>
        <CourseBanner courseTitle={course.title} isHovered={isHovered} />
      </div>

      {/* Course Info - Clean, minimal section */}
      <div style={{ padding: '16px 20px', height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Course Number */}
          <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 600, letterSpacing: 1.5, marginBottom: 6 }}>
            COURSE {course.courseNumber}
          </div>

          {/* Title */}
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.2 }}>
            {course.title}
          </h3>

          {/* Description - Two lines max */}
          <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {course.desc}
          </p>
        </div>

        {/* Bottom row: Difficulty badge and progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: levelColors[course.level],
              background: levelBgColors[course.level],
              padding: '5px 12px',
              borderRadius: 6,
              border: `1px solid ${levelColors[course.level]}33`,
            }}
          >
            {course.level}
          </span>

          {progress !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 60, height: 4, background: '#1E1A2E', borderRadius: 2, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: progress === 100 ? '#22C55E' : '#8B5CF6',
                    borderRadius: 2,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{progress}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseBanner({ courseTitle, isHovered }: { courseTitle: string; isHovered: boolean }) {
  const bannerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  };

  switch (courseTitle) {
    case 'Python':
      return <PythonBanner isHovered={isHovered} style={bannerStyle} />;
    case 'HTML':
      return <HTMLBanner isHovered={isHovered} style={bannerStyle} />;
    case 'CSS':
      return <CSSBanner isHovered={isHovered} style={bannerStyle} />;
    case 'JavaScript':
      return <JavaScriptBanner isHovered={isHovered} style={bannerStyle} />;
    case 'React':
      return <ReactBanner isHovered={isHovered} style={bannerStyle} />;
    case 'Node.js':
      return <NodeBanner isHovered={isHovered} style={bannerStyle} />;
    case 'SQL':
      return <SQLBanner isHovered={isHovered} style={bannerStyle} />;
    case 'Git & GitHub':
      return <GitBanner isHovered={isHovered} style={bannerStyle} />;
    case 'Machine Learning':
      return <AIBanner isHovered={isHovered} style={bannerStyle} />;
    default:
      return <DefaultBanner isHovered={isHovered} style={bannerStyle} />;
  }
}

// Python: Jungle with animated snake
function PythonBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #0D2818 0%, #1A4D2E 50%, #0D2818 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background trees */}
        <g opacity="0.3">
          <path d="M20 100 L20 40 L30 30 L40 40 L40 100" fill="#1A5F3A" style={{ animation: 'treeSway 4s ease-in-out infinite' }} />
          <path d="M320 100 L320 50 L330 40 L340 50 L340 100" fill="#1A5F3A" style={{ animation: 'treeSway 3.5s ease-in-out infinite 0.5s' }} />
          <path d="M60 100 L60 60 L70 50 L80 60 L80 100" fill="#146C3A" style={{ animation: 'treeSway 4.5s ease-in-out infinite 1s' }} />
        </g>

        {/* Animated leaves */}
        <g style={{ animation: 'leafFloat 6s ease-in-out infinite' }}>
          <ellipse cx="50" cy="30" rx="8" ry="4" fill="#2ECC71" transform="rotate(-30 50 30)" opacity="0.6" />
          <ellipse cx="300" cy="25" rx="6" ry="3" fill="#27AE60" transform="rotate(20 300 25)" opacity="0.5" />
        </g>

        {/* Python snake - stylized SVG */}
        <g filter="url(#glow)" style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'snakeMove 3s ease-in-out infinite' : 'snakeBreathe 4s ease-in-out infinite'
        }}>
          <path d="M-40 0 Q-30 -15 -15 -10 Q0 -5 15 -10 Q30 -15 40 0" 
                stroke="#F4D03F" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M-40 0 Q-30 15 -15 10 Q0 5 15 10 Q30 15 40 0" 
                stroke="#F39C12" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="40" cy="0" r="8" fill="#F4D03F" />
          <circle cx="43" cy="-2" r="2" fill="#2C3E50" />
          <circle cx="43" cy="2" r="2" fill="#2C3E50" />
        </g>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={i}
            cx={40 + i * 70}
            cy={20 + (i % 2) * 30}
            r="1.5"
            fill="#2ECC71"
            opacity="0.4"
            style={{ animation: `particleFloat ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s` }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes treeSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes leafFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes snakeBreathe {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.05); }
        }
        @keyframes snakeMove {
          0%, 100% { transform: translate(180, 50) rotate(-3deg); }
          50% { transform: translate(180, 50) rotate(3deg); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-12px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

// HTML: Construction site
function HTMLBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #1A1A2E 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="constructionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E67E22" />
            <stop offset="100%" stopColor="#D35400" />
          </linearGradient>
        </defs>

        {/* Floating building blocks */}
        <g style={{ animation: 'blockFloat 4s ease-in-out infinite' }}>
          <rect x="30" y="20" width="20" height="20" fill="#E67E22" opacity="0.4" rx="2" />
          <rect x="310" y="25" width="16" height="16" fill="#D35400" opacity="0.3" rx="2" />
        </g>

        {/* Scaffolding */}
        <g stroke="#95A5A6" strokeWidth="1" opacity="0.3">
          <line x1="80" y1="100" x2="80" y2="30" />
          <line x1="120" y1="100" x2="120" y2="40" />
          <line x1="80" y1="50" x2="120" y2="50" />
          <line x1="80" y1="70" x2="120" y2="70" />
        </g>

        {/* HTML tag symbol */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'tagPulse 2s ease-in-out infinite' : 'tagFloat 4s ease-in-out infinite'
        }}>
          <path d="M-15 -20 L-20 0 L-15 20 L-5 20 L-10 0 L-5 -20" 
                stroke="#E67E22" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 -20 L0 0 L5 20 L15 20 L10 0 L15 -20" 
                stroke="#D35400" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="-3" y1="-12" x2="3" y2="-12" stroke="#E67E22" strokeWidth="2" />
          <line x1="-3" y1="12" x2="3" y2="12" stroke="#E67E22" strokeWidth="2" />
        </g>

        {/* Crane */}
        <g style={{ animation: 'craneSway 5s ease-in-out infinite' }}>
          <line x1="260" y1="100" x2="260" y2="20" stroke="#7F8C8D" strokeWidth="2" />
          <line x1="260" y1="20" x2="300" y2="35" stroke="#7F8C8D" strokeWidth="2" />
          <rect x="295" y="30" width="10" height="15" fill="#E67E22" opacity="0.5" />
        </g>

        {/* Building structure rising */}
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x={140 + i * 18}
            y={60 + (i % 2) * 10}
            width="14"
            height={30 + (i % 3) * 10}
            fill="url(#constructionGrad)"
            opacity="0.2"
            style={{ animation: `buildRise ${3 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes blockFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes tagFloat {
          0%, 100% { transform: translate(180, 50) translateY(0); }
          50% { transform: translate(180, 50) translateY(-5px); }
        }
        @keyframes tagPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.1); }
        }
        @keyframes craneSway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes buildRise {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}

// CSS: Artist studio
function CSSBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #1E1E3F 0%, #2D2D5A 50%, #1E1E3F 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cssGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3498DB" />
            <stop offset="50%" stopColor="#2980B9" />
            <stop offset="100%" stopColor="#1A5276" />
          </linearGradient>
        </defs>

        {/* Floating color palette circles */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={i}
            cx={30 + i * 70}
            cy={25 + (i % 2) * 20}
            r="6"
            fill={['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6'][i]}
            opacity="0.4"
            style={{ animation: `colorPulse ${2.5 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
          />
        ))}

        {/* Paint brush strokes */}
        <g style={{ animation: 'brushSway 4s ease-in-out infinite' }}>
          <path d="M40 70 Q50 60 60 70" stroke="#E74C3C" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M300 65 Q310 55 320 65" stroke="#3498DB" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round" />
        </g>

        {/* CSS logo */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'cssPulse 2s ease-in-out infinite' : 'cssFloat 4s ease-in-out infinite'
        }}>
          <text x="-20" y="8" fontSize="28" fontWeight="900" fill="#3498DB" style={{ textShadow: '0 0 15px rgba(52, 152, 219, 0.5)' }}>CSS</text>
        </g>

        {/* Typography elements */}
        <g opacity="0.3">
          <text x="50" y="45" fontSize="16" fontWeight="700" fill="#ECF0F1" style={{ animation: 'typeFloat 5s ease-in-out infinite' }}>Aa</text>
          <text x="290" y="40" fontSize="14" fontWeight="700" fill="#ECF0F1" style={{ animation: 'typeFloat 4.5s ease-in-out infinite 0.5s' }}>Bb</text>
        </g>

        {/* Gradient flow at bottom */}
        <rect x="0" y="85" width="360" height="15" fill="url(#cssGrad)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>

      <style>{`
        @keyframes colorPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        @keyframes brushSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes cssFloat {
          0%, 100% { transform: translate(180, 50) translateY(0); }
          50% { transform: translate(180, 50) translateY(-4px); }
        }
        @keyframes cssPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.08); }
        }
        @keyframes typeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

// JavaScript: Cyberpunk city
function JavaScriptBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 50%, #0D0D1A 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7DF1E" />
            <stop offset="100%" stopColor="#F0DB4F" />
          </linearGradient>
        </defs>

        {/* Neon buildings */}
        <g opacity="0.4">
          <rect x="20" y="40" width="25" height="60" fill="#FF00FF" style={{ animation: 'buildingPulse 3s ease-in-out infinite' }} />
          <rect x="315" y="50" width="20" height="50" fill="#00FFFF" style={{ animation: 'buildingPulse 2.5s ease-in-out infinite 0.5s' }} />
          <rect x="55" y="55" width="18" height="45" fill="#FFFF00" style={{ animation: 'buildingPulse 3.5s ease-in-out infinite 1s' }} />
        </g>

        {/* Electric lines */}
        {[...Array(3)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={30 + i * 20}
            x2="360"
            y2={30 + i * 20}
            stroke="#00FFFF"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="10,5"
          >
            <animate attributeName="strokeDashoffset" from="0" to="30" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}

        {/* Energy particles */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={30 + i * 55}
            cy={25 + (i % 2) * 25}
            r="2"
            fill="#FFFF00"
            opacity="0.6"
            style={{ animation: `particleFloat ${2 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` }}
          />
        ))}

        {/* JS logo */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'jsElectric 1.5s ease-in-out infinite' : 'jsFloat 4s ease-in-out infinite'
        }}>
          <text x="-15" y="8" fontSize="32" fontWeight="900" fill="#F7DF1E" style={{ textShadow: '0 0 20px rgba(247, 223, 30, 0.5)' }}>JS</text>
        </g>

        {/* Digital billboards */}
        <g opacity="0.5">
          <rect x="90" y="20" width="30" height="15" fill="#00FFFF" rx="2" style={{ animation: 'billboardFlicker 2s ease-in-out infinite' }} />
          <rect x="240" y="25" width="25" height="12" fill="#FF00FF" rx="2" style={{ animation: 'billboardFlicker 1.5s ease-in-out infinite 0.3s' }} />
        </g>
      </svg>

      <style>{`
        @keyframes buildingPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(0.6); opacity: 1; }
        }
        @keyframes jsFloat {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.08); }
        }
        @keyframes jsElectric {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(247, 223, 30, 0.5)); }
          50% { filter: drop-shadow(0 0 25px rgba(247, 223, 30, 0.8)); }
        }
        @keyframes billboardFlicker {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

// React: Tech lab with atom
function ReactBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #0A0A1A 0%, #1A1A3A 50%, #0A0A1A 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="reactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#61DAFB" />
            <stop offset="100%" stopColor="#21A1F1" />
          </linearGradient>
        </defs>

        {/* Energy rings */}
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx="180"
            cy="50"
            rx={30 + i * 15}
            ry={15 + i * 8}
            fill="none"
            stroke={['#61DAFB', '#21A1F1', '#0D8ECF'][i]}
            strokeWidth="2"
            opacity={0.4 - i * 0.1}
            style={{ 
              transformOrigin: 'center',
              animation: `ringSpin ${3 + i}s linear infinite`,
              transform: `rotate(${i * 30}deg)`
            }}
          />
        ))}

        {/* Orbiting components */}
        {[...Array(3)].map((_, i) => (
          <circle
            key={i}
            cx={180 + Math.cos((i * 120) * Math.PI / 180) * 50}
            cy={50 + Math.sin((i * 120) * Math.PI / 180) * 25}
            r="4"
            fill="#61DAFB"
            opacity="0.6"
            style={{ animation: `orbit ${4 + i}s linear infinite` }}
          />
        ))}

        {/* React atom */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'atomSpin 2s linear infinite' : 'atomPulse 3s ease-in-out infinite'
        }}>
          <circle cx="0" cy="0" r="12" fill="url(#reactGrad)" />
          <circle cx="0" cy="0" r="6" fill="#0A0A1A" />
          <circle cx="0" cy="0" r="3" fill="#61DAFB" />
        </g>

        {/* Holographic elements */}
        <g opacity="0.3">
          <text x="50" y="40" fontSize="12" fontWeight="700" fill="#61DAFB" style={{ animation: 'holoFloat 3s ease-in-out infinite' }}>{'< />'}</text>
          <text x="290" y="35" fontSize="10" fontWeight="700" fill="#61DAFB" style={{ animation: 'holoFloat 2.5s ease-in-out infinite 1s' }}>{'{ }'}</text>
        </g>

        {/* Data flow lines */}
        {[...Array(3)].map((_, i) => (
          <line
            key={i}
            x1={20 + i * 30}
            y1="0"
            x2={20 + i * 30}
            y2="100"
            stroke="#61DAFB"
            strokeWidth="1"
            opacity="0.2"
          >
            <animate attributeName="y1" values="0;100;0" dur={`${3 + i}s`} repeatCount="indefinite" />
            <animate attributeName="y2" values="0;100;0" dur={`${3 + i}s`} repeatCount="indefinite" />
          </line>
        ))}
      </svg>

      <style>{`
        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes atomPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.1); }
        }
        @keyframes atomSpin {
          0% { transform: translate(180, 50) rotate(0deg); }
          100% { transform: translate(180, 50) rotate(360deg); }
        }
        @keyframes holoFloat {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-8px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// Node.js: Digital forest
function NodeBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #0A1A0A 0%, #0D2D0D 50%, #0A1A0A 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#68A063" />
            <stop offset="100%" stopColor="#4A7C45" />
          </linearGradient>
        </defs>

        {/* Glowing trees */}
        <g opacity="0.3">
          <path d="M20 100 L20 50 L30 40 L40 50 L40 100" fill="#68A063" style={{ animation: 'treeGlow 3s ease-in-out infinite' }} />
          <path d="M320 100 L320 55 L330 45 L340 55 L340 100" fill="#68A063" style={{ animation: 'treeGlow 2.5s ease-in-out infinite 0.5s' }} />
          <path d="M60 100 L60 60 L70 50 L80 60 L80 100" fill="#5A8C55" style={{ animation: 'treeGlow 3.5s ease-in-out infinite 1s' }} />
        </g>

        {/* Network pathways */}
        <g stroke="#68A063" strokeWidth="1" opacity="0.2">
          <path d="M20 70 Q90 50 160 70 T300 70" fill="none" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M60 80 Q120 60 180 80 T300 80" fill="none" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Glowing lanterns */}
        {[...Array(3)].map((_, i) => (
          <circle
            key={i}
            cx={80 + i * 100}
            cy={30 + (i % 2) * 15}
            r="5"
            fill="#68A063"
            opacity="0.5"
            style={{ animation: `lanternPulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.4}s` }}
          />
        ))}

        {/* Node.js logo */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'nodeGlow 1.5s ease-in-out infinite' : 'nodePulse 3s ease-in-out infinite'
        }}>
          <text x="-18" y="8" fontSize="24" fontWeight="900" fill="#68A063" style={{ textShadow: '0 0 15px rgba(104, 160, 99, 0.5)' }}>Node</text>
        </g>

        {/* Server nodes */}
        <g opacity="0.3">
          <rect x="260" y="25" width="20" height="15" fill="#68A063" rx="2" style={{ animation: 'serverBlink 3s ease-in-out infinite' }} />
          <rect x="280" y="45" width="15" height="12" fill="#68A063" rx="2" style={{ animation: 'serverBlink 2.5s ease-in-out infinite 1s' }} />
        </g>
      </svg>

      <style>{`
        @keyframes treeGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes lanternPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes nodePulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.08); }
        }
        @keyframes nodeGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(104, 160, 99, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(104, 160, 99, 0.8)); }
        }
        @keyframes serverBlink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// SQL: Underground vault
function SQLBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #1A1A2E 0%, #0F0F1A 50%, #1A1A2E 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#44A08D" />
          </linearGradient>
        </defs>

        {/* Database stacks */}
        <g opacity="0.3">
          <ellipse cx="50" cy="70" rx="15" ry="5" fill="#4ECDC4" />
          <rect x="35" y="70" width="30" height="20" fill="#4ECDC4" />
          <ellipse cx="50" cy="90" rx="15" ry="5" fill="#4ECDC4" />
          
          <ellipse cx="310" cy="65" rx="12" ry="4" fill="#4ECDC4" />
          <rect x="298" y="65" width="24" height="15" fill="#4ECDC4" />
          <ellipse cx="310" cy="80" rx="12" ry="4" fill="#4ECDC4" />
        </g>

        {/* Floating crystals */}
        {[...Array(5)].map((_, i) => (
          <polygon
            key={i}
            points={`${30 + i * 65},25 ${35 + i * 65},35 ${25 + i * 65},35`}
            fill="#4ECDC4"
            opacity="0.4"
            style={{ animation: `crystalFloat ${2.5 + i * 0.3}s ease-in-out infinite ${i * 0.4}s` }}
          />
        ))}

        {/* Data streams */}
        {[...Array(3)].map((_, i) => (
          <path
            key={i}
            d={`M${20 + i * 30},0 Q${30 + i * 30},50 ${20 + i * 30},100`}
            stroke="#4ECDC4"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            strokeDasharray="8,4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur={`${1.5 + i * 0.5}s`} repeatCount="indefinite" />
          </path>
        ))}

        {/* SQL logo */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'sqlGlow 1.5s ease-in-out infinite' : 'sqlPulse 3s ease-in-out infinite'
        }}>
          <text x="-15" y="8" fontSize="28" fontWeight="900" fill="#4ECDC4" style={{ textShadow: '0 0 15px rgba(78, 205, 196, 0.5)' }}>SQL</text>
        </g>

        {/* Vault door */}
        <g opacity="0.3">
          <rect x="300" y="20" width="40" height="60" fill="none" stroke="#4ECDC4" strokeWidth="2" rx="3" />
          <circle cx="320" cy="50" r="8" fill="#4ECDC4" opacity="0.5" />
        </g>
      </svg>

      <style>{`
        @keyframes crystalFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(10deg); }
        }
        @keyframes sqlPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.08); }
        }
        @keyframes sqlGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.8)); }
        }
      `}</style>
    </div>
  );
}

// Git/GitHub: Harbor with ships
function GitBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #1A2A3A 0%, #0D1A2A 50%, #1A2A3A 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="gitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F05032" />
            <stop offset="100%" stopColor="#D03E25" />
          </linearGradient>
        </defs>

        {/* Islands */}
        <g opacity="0.3">
          <ellipse cx="50" cy="85" rx="25" ry="10" fill="#8B7355" />
          <ellipse cx="310" cy="80" rx="20" ry="8" fill="#8B7355" />
        </g>

        {/* Bridges */}
        <g stroke="#F05032" strokeWidth="2" opacity="0.4">
          <path d="M75 85 Q120 70 165 85" fill="none" strokeDasharray="5,3" />
          <path d="M195 85 Q250 70 290 80" fill="none" strokeDasharray="5,3" />
        </g>

        {/* Branching routes */}
        <g stroke="#F05032" strokeWidth="1.5" opacity="0.3">
          <path d="M20 70 Q50 50 80 70 T140 70" fill="none" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M20 70 Q50 90 80 70 T140 70" fill="none" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Ships */}
        <g style={{ animation: 'shipSail 5s ease-in-out infinite' }}>
          <path d="M100 50 L110 60 L90 60 Z" fill="#F05032" opacity="0.5" />
          <line x1="100" y1="50" x2="100" y2="35" stroke="#F05032" strokeWidth="1" opacity="0.5" />
        </g>

        {/* Git logo */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'gitSpin 2s linear infinite' : 'gitPulse 3s ease-in-out infinite'
        }}>
          <circle cx="0" cy="0" r="15" fill="url(#gitGrad)" />
          <circle cx="0" cy="0" r="8" fill="#0D1A2A" />
          <circle cx="0" cy="0" r="4" fill="#F05032" />
        </g>

        {/* Water effect */}
        <rect x="0" y="85" width="360" height="15" fill="url(#gitGrad)" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.3;0.2" dur="3s" repeatCount="indefinite" />
        </rect>
      </svg>

      <style>{`
        @keyframes shipSail {
          0% { transform: translateX(0); }
          50% { transform: translateX(15px); }
          100% { transform: translateX(0); }
        }
        @keyframes gitPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.08); }
        }
        @keyframes gitSpin {
          0% { transform: translate(180, 50) rotate(0deg); }
          100% { transform: translate(180, 50) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// AI: Research center
function AIBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #1A0A2E 0%, #0D0D1A 50%, #1A0A2E 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF00FF" />
            <stop offset="100%" stopColor="#00FFFF" />
          </linearGradient>
        </defs>

        {/* Neural network nodes */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={40 + (i % 3) * 140}
            cy={30 + Math.floor(i / 3) * 40}
            r="4"
            fill="#FF00FF"
            opacity="0.6"
            style={{ animation: `nodePulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
          />
        ))}

        {/* Neural connections */}
        <g stroke="#00FFFF" strokeWidth="1" opacity="0.3">
          {[...Array(4)].map((_, i) => (
            <line
              key={i}
              x1={40 + (i % 2) * 140}
              y1="30"
              x2={55 + (i % 2) * 140}
              y2="70"
            >
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
            </line>
          ))}
        </g>

        {/* Digital particles */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={20 + i * 42}
            cy={20 + (i % 3) * 25}
            r="1.5"
            fill="#00FFFF"
            opacity="0.5"
            style={{ animation: `particleFloat ${2 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
          />
        ))}

        {/* AI logo */}
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'aiGlow 1.5s ease-in-out infinite' : 'aiPulse 3s ease-in-out infinite'
        }}>
          <text x="-12" y="8" fontSize="24" fontWeight="900" fill="#FF00FF" style={{ textShadow: '0 0 15px rgba(255, 0, 255, 0.5)' }}>AI</text>
        </g>

        {/* Holographic screens */}
        <g opacity="0.3">
          <rect x="50" y="20" width="25" height="18" fill="none" stroke="#FF00FF" strokeWidth="1" rx="2" style={{ animation: 'holoPulse 3s ease-in-out infinite' }} />
          <rect x="285" y="25" width="20" height="14" fill="none" stroke="#00FFFF" strokeWidth="1" rx="2" style={{ animation: 'holoPulse 2.5s ease-in-out infinite 0.5s' }} />
        </g>
      </svg>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-15px) scale(0.6); opacity: 1; }
        }
        @keyframes aiPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.08); }
        }
        @keyframes aiGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 25px rgba(255, 0, 255, 0.8)); }
        }
        @keyframes holoPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// Default banner for other courses
function DefaultBanner({ isHovered, style }: { isHovered: boolean; style: React.CSSProperties }) {
  return (
    <div style={{ ...style, background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 360 100" preserveAspectRatio="xMidYMid slice">
        <g style={{ 
          transform: 'translate(180, 50)',
          animation: isHovered ? 'defaultPulse 1.5s ease-in-out infinite' : 'defaultFloat 3s ease-in-out infinite'
        }}>
          <rect x="-20" y="-15" width="40" height="30" fill="#8B5CF6" opacity="0.3" rx="4" />
          <text x="-12" y="8" fontSize="24" fontWeight="900" fill="#8B5CF6" style={{ textShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}>AQ</text>
        </g>
      </svg>

      <style>{`
        @keyframes defaultFloat {
          0%, 100% { transform: translate(180, 50) translateY(0); }
          50% { transform: translate(180, 50) translateY(-8px); }
        }
        @keyframes defaultPulse {
          0%, 100% { transform: translate(180, 50) scale(1); }
          50% { transform: translate(180, 50) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

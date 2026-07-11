import { useState, useEffect, useRef, useCallback } from 'react';
import type { EddyMood } from './eddyPersonality';

interface EddyProps {
  mood?: EddyMood;
  size?: number;
  animate?: boolean;
  showGlow?: boolean;
  className?: string;
}

// Mood → visual config
const moodConfig: Record<EddyMood, {
  eyeH: number; eyeColor: string; mouthPath: string;
  glowColor: string; bodyTilt: number; browAngle: number;
}> = {
  happy:       { eyeH: 5,  eyeColor: '#22C55E', mouthPath: 'M12 24 Q18 28 24 24', glowColor: '#8B5CF6', bodyTilt: 0,   browAngle: 0   },
  smug:        { eyeH: 4,  eyeColor: '#A78BFA', mouthPath: 'M12 24 Q16 27 20 24 Q22 23 25 25', glowColor: '#8B5CF6', bodyTilt: -2, browAngle: -5 },
  thinking:    { eyeH: 3,  eyeColor: '#F59E0B', mouthPath: 'M14 25 Q18 24 22 24', glowColor: '#F59E0B', bodyTilt: 3,  browAngle: 10  },
  surprised:   { eyeH: 9,  eyeColor: '#FFFFFF', mouthPath: 'M14 24 Q18 30 22 24', glowColor: '#EC4899', bodyTilt: 0,  browAngle: -15 },
  celebrating: { eyeH: 6,  eyeColor: '#F59E0B', mouthPath: 'M11 23 Q18 30 25 23', glowColor: '#F59E0B', bodyTilt: 5,  browAngle: -8  },
  disappointed:{ eyeH: 3,  eyeColor: '#6B7280', mouthPath: 'M13 26 Q18 22 23 26', glowColor: '#6B7280', bodyTilt: -3, browAngle: 8   },
  sarcastic:   { eyeH: 3,  eyeColor: '#A78BFA', mouthPath: 'M13 25 Q17 27 20 25 Q23 23 26 25', glowColor: '#8B5CF6', bodyTilt: -2, browAngle: -8 },
  proud:       { eyeH: 5,  eyeColor: '#22C55E', mouthPath: 'M12 23 Q18 28 24 23', glowColor: '#22C55E', bodyTilt: 0,  browAngle: -5  },
  idle:        { eyeH: 4,  eyeColor: '#4B5563', mouthPath: 'M14 25 Q18 25 22 25', glowColor: '#374151', bodyTilt: 1,  browAngle: 0   },
  sleeping:    { eyeH: 1,  eyeColor: '#4B5563', mouthPath: 'M14 25 Q18 26 22 25', glowColor: '#1F2937', bodyTilt: 5,  browAngle: 0   },
  processing:  { eyeH: 5,  eyeColor: '#8B5CF6', mouthPath: 'M14 25 Q18 25 22 25', glowColor: '#8B5CF6', bodyTilt: 0,  browAngle: 0   },
  determined:  { eyeH: 4,  eyeColor: '#3B82F6', mouthPath: 'M13 24 Q18 27 23 24', glowColor: '#3B82F6', bodyTilt: 0,  browAngle: 5   },
  laughing:    { eyeH: 2,  eyeColor: '#F59E0B', mouthPath: 'M11 22 Q18 31 25 22', glowColor: '#F59E0B', bodyTilt: 3,  browAngle: -10 },
  judging:     { eyeH: 3,  eyeColor: '#8B5CF6', mouthPath: 'M14 25 Q18 24 22 25', glowColor: '#8B5CF6', bodyTilt: -1, browAngle: 12  },
  confident:   { eyeH: 5,  eyeColor: '#8B5CF6', mouthPath: 'M12 24 Q18 29 24 24', glowColor: '#8B5CF6', bodyTilt: -3, browAngle: -3  },
};

export default function Eddy({ mood = 'happy', size = 80, animate = true, showGlow = true }: EddyProps) {
  const [blink, setBlink] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [scanLine, setScanLine] = useState(10);
  const [currentMood, setCurrentMood] = useState<EddyMood>(mood);
  const [prevMood, setPrevMood] = useState<EddyMood>(mood);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const blinkTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scanTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Smooth mood transition
  useEffect(() => {
    if (mood !== prevMood) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMood(mood);
        setIsTransitioning(false);
        setPrevMood(mood);
      }, 150);
    }
  }, [mood, prevMood]);

  // Natural blink
  useEffect(() => {
    if (!animate) return;
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3000;
      blinkTimer.current = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => { if (blinkTimer.current) clearTimeout(blinkTimer.current); };
  }, [animate]);

  // Scanline animation
  useEffect(() => {
    if (!animate) return;
    scanTimer.current = setInterval(() => {
      setScanLine(s => s >= 26 ? 10 : s + 0.5);
    }, 50);
    return () => { if (scanTimer.current) clearInterval(scanTimer.current); };
  }, [animate]);

  // Celebration bounce
  useEffect(() => {
    if (currentMood === 'celebrating' || currentMood === 'laughing') {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 800);
      return () => clearTimeout(t);
    }
  }, [currentMood]);

  // Glitch on processing
  useEffect(() => {
    if (currentMood === 'processing') {
      const interval = setInterval(() => setGlitch(g => !g), 200);
      return () => clearInterval(interval);
    }
    setGlitch(false);
  }, [currentMood]);

  const cfg = moodConfig[currentMood];
  const eyeDisplayH = blink ? 0.5 : cfg.eyeH;
  const eyeY = blink ? 17.5 : (18 - cfg.eyeH / 2);

  const transformStr = [
    `rotate(${cfg.bodyTilt}deg)`,
    bounce ? 'translateY(-6px) scale(1.04)' : '',
    glitch ? `translateX(${Math.random() > 0.5 ? 2 : -2}px)` : '',
  ].filter(Boolean).join(' ');

  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      transform: transformStr,
      transition: glitch ? 'none' : 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      filter: showGlow ? `drop-shadow(0 0 ${size * 0.18}px ${cfg.glowColor}55)` : 'none',
      opacity: isTransitioning ? 0.7 : 1,
    }}>
      <svg viewBox="0 0 36 40" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`bg-${mood}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={cfg.glowColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={cfg.glowColor} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`body-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id={`screen-${mood}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D0B1A" />
            <stop offset="100%" stopColor="#1A1028" />
          </linearGradient>
          <filter id={`glow-${mood}`}>
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="18" cy="20" r="18" fill={`url(#bg-${mood})`} />

        {/* Antenna */}
        <line x1="18" y1="1.5" x2="18" y2="6" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="18" cy="1" r="1.3" fill={cfg.eyeColor}>
          {animate && currentMood !== 'sleeping' && (
            <animate attributeName="opacity" values="1;0.2;1"
              dur={currentMood === 'celebrating' ? '0.4s' : '2s'}
              repeatCount="indefinite" />
          )}
        </circle>

        {/* Left ear bolt */}
        <circle cx="6.5" cy="18" r="2.2" fill="#7C3AED" opacity="0.8" />
        <circle cx="6.5" cy="18" r="1.1" fill={cfg.eyeColor} opacity="0.5">
          {animate && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />}
        </circle>

        {/* Right ear bolt */}
        <circle cx="29.5" cy="18" r="2.2" fill="#7C3AED" opacity="0.8" />
        <circle cx="29.5" cy="18" r="1.1" fill={cfg.eyeColor} opacity="0.5">
          {animate && <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" begin="1s" />}
        </circle>

        {/* Head */}
        <rect x="7" y="7" width="22" height="22" rx="5" fill={`url(#body-${mood})`} />

        {/* Face screen */}
        <rect x="9" y="9" width="18" height="16" rx="3" fill={`url(#screen-${mood})`} />

        {/* Scan line */}
        {animate && currentMood !== 'sleeping' && (
          <rect x="9" y={scanLine} width="18" height="0.8" rx="0.4" fill={cfg.eyeColor} opacity="0.12" />
        )}

        {/* Eyebrows */}
        <line
          x1="10" y1={eyeY - 2.5}
          x2="15" y2={eyeY - 2.5 + cfg.browAngle * 0.1}
          stroke={cfg.eyeColor} strokeWidth="1" strokeLinecap="round" opacity="0.7"
          style={{ transition: 'all 0.3s ease' }}
        />
        <line
          x1="21" y1={eyeY - 2.5 + cfg.browAngle * 0.1}
          x2="26" y2={eyeY - 2.5}
          stroke={cfg.eyeColor} strokeWidth="1" strokeLinecap="round" opacity="0.7"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Left eye */}
        <rect
          x="10" y={eyeY}
          width="5.5" height={eyeDisplayH}
          rx="1.5"
          fill={cfg.eyeColor}
          filter={`url(#glow-${mood})`}
          style={{ transition: 'all 0.15s ease' }}
        >
          {animate && !blink && currentMood !== 'sleeping' && (
            <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" />
          )}
        </rect>
        {/* Eye shine */}
        {!blink && eyeDisplayH > 2 && (
          <rect x="11" y={eyeY + 1} width="1.5" height="1.5" rx="0.5" fill="#fff" opacity="0.6" />
        )}

        {/* Right eye */}
        <rect
          x="20.5" y={eyeY}
          width="5.5" height={eyeDisplayH}
          rx="1.5"
          fill={cfg.eyeColor}
          filter={`url(#glow-${mood})`}
          style={{ transition: 'all 0.15s ease' }}
        >
          {animate && !blink && currentMood !== 'sleeping' && (
            <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" begin="0.4s" />
          )}
        </rect>
        {!blink && eyeDisplayH > 2 && (
          <rect x="21.5" y={eyeY + 1} width="1.5" height="1.5" rx="0.5" fill="#fff" opacity="0.6" />
        )}

        {/* Thinking dots */}
        {currentMood === 'thinking' && (
          <>
            {[0, 1, 2].map(i => (
              <circle key={i} cx={12 + i * 4} cy="24" r="0.9" fill={cfg.eyeColor}>
                <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </>
        )}

        {/* Processing ring */}
        {currentMood === 'processing' && (
          <circle cx="18" cy="24" r="2" fill="none" stroke={cfg.eyeColor} strokeWidth="0.8" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0 12;12 0;0 12" dur="1s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Mouth */}
        {currentMood !== 'thinking' && currentMood !== 'processing' && (
          <path
            d={cfg.mouthPath}
            stroke={cfg.eyeColor} strokeWidth="1.3" fill="none"
            strokeLinecap="round"
            opacity={currentMood === 'sleeping' ? 0.3 : 0.85}
            style={{ transition: 'all 0.3s ease' }}
          />
        )}

        {/* Sleeping ZZZ */}
        {currentMood === 'sleeping' && (
          <>
            <text x="24" y="14" fontSize="3.5" fill={cfg.eyeColor} opacity="0.5" fontWeight="bold">
              z
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
            </text>
            <text x="26" y="11" fontSize="2.5" fill={cfg.eyeColor} opacity="0.4" fontWeight="bold">
              z
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" begin="0.4s" repeatCount="indefinite" />
            </text>
          </>
        )}

        {/* Celebration sparkles */}
        {currentMood === 'celebrating' && (
          <>
            <text x="2" y="10" fontSize="4" fill="#F59E0B">✦</text>
            <text x="28" y="8" fontSize="3" fill="#22C55E">✦</text>
            <text x="30" y="18" fontSize="2.5" fill="#8B5CF6">✦</text>
          </>
        )}

        {/* Glitch lines */}
        {glitch && (
          <>
            <rect x="9" y="13" width="18" height="1.5" fill={cfg.eyeColor} opacity="0.3" />
            <rect x="9" y="18" width="11" height="0.8" fill="#EF4444" opacity="0.2" />
          </>
        )}

        {/* Neck */}
        <rect x="15" y="29" width="6" height="3.5" rx="1" fill="#7C3AED" opacity="0.7" />

        {/* Body base */}
        <rect x="10" y="32.5" width="16" height="6" rx="3" fill="#6D28D9" opacity="0.5" />

        {/* Circuit lines */}
        <line x1="9" y1="28" x2="12" y2="28" stroke={cfg.eyeColor} strokeWidth="0.4" opacity="0.3" />
        <circle cx="12" cy="28" r="0.4" fill={cfg.eyeColor} opacity="0.5" />
        <line x1="24" y1="28" x2="27" y2="28" stroke={cfg.eyeColor} strokeWidth="0.4" opacity="0.3" />
        <circle cx="24" cy="28" r="0.4" fill={cfg.eyeColor} opacity="0.5" />

        {/* Floating animation */}
        {animate && currentMood !== 'sleeping' && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 -1.5;0 0"
            dur="3s"
            repeatCount="indefinite"
            additive="sum"
          />
        )}
      </svg>
    </div>
  );
}
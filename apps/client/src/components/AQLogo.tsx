export default function AQLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow effect */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D0B1A" />
          <stop offset="100%" stopColor="#1A1028" />
        </linearGradient>
      </defs>

      {/* Outer glow circle */}
      <circle cx="20" cy="20" r="19" fill="url(#glow)" />

      {/* Antenna */}
      <line x1="20" y1="3" x2="20" y2="8" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="2.5" r="1.5" fill="#22C55E">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Head body */}
      <rect x="8" y="9" width="24" height="20" rx="5" fill="url(#bodyGrad)" />

      {/* Screen/face area */}
      <rect x="10" y="11" width="20" height="14" rx="3" fill="url(#screenGrad)" />

      {/* Left eye */}
      <rect x="12" y="14" width="6" height="5" rx="1.5" fill="#8B5CF6">
        <animate attributeName="fill" values="#8B5CF6;#22C55E;#8B5CF6" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="13.5" y="15.5" width="2" height="2" rx="0.5" fill="#fff" opacity="0.8" />

      {/* Right eye */}
      <rect x="22" y="14" width="6" height="5" rx="1.5" fill="#8B5CF6">
        <animate attributeName="fill" values="#8B5CF6;#22C55E;#8B5CF6" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </rect>
      <rect x="23.5" y="15.5" width="2" height="2" rx="0.5" fill="#fff" opacity="0.8" />

      {/* Mouth — scan line */}
      <rect x="13" y="21" width="14" height="2" rx="1" fill="#8B5CF620" />
      <rect x="13" y="21" width="4" height="2" rx="1" fill="#22C55E">
        <animate attributeName="x" values="13;23;13" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </rect>

      {/* Ear bolts */}
      <circle cx="8" cy="17" r="2" fill="#7C3AED" />
      <circle cx="8" cy="17" r="1" fill="#A78BFA" />
      <circle cx="32" cy="17" r="2" fill="#7C3AED" />
      <circle cx="32" cy="17" r="1" fill="#A78BFA" />

      {/* Neck */}
      <rect x="17" y="29" width="6" height="3" rx="1" fill="#7C3AED" />

      {/* Circuit lines on body */}
      <line x1="11" y1="27" x2="14" y2="27" stroke="#A78BFA" strokeWidth="0.5" opacity="0.4" />
      <line x1="26" y1="27" x2="29" y2="27" stroke="#A78BFA" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
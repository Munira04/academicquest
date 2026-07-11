import { useState, useEffect } from 'react';
import type { EddyMood } from './eddyPersonality';

interface EddySpeechBubbleProps {
  message: string;
  mood?: EddyMood;
  position?: 'right' | 'left' | 'top';
  onDismiss?: () => void;
  autoDismiss?: number; // ms
  typing?: boolean;
}

const moodBubbleColor: Record<string, string> = {
  happy: '#22C55E', smug: '#8B5CF6', thinking: '#F59E0B',
  surprised: '#EC4899', celebrating: '#F59E0B', disappointed: '#6B7280',
  sarcastic: '#8B5CF6', proud: '#22C55E', idle: '#374151',
  sleeping: '#1F2937', processing: '#8B5CF6', determined: '#3B82F6',
  laughing: '#F59E0B', judging: '#8B5CF6', confident: '#8B5CF6',
};

export default function EddySpeechBubble({
  message, mood = 'happy', position = 'right',
  onDismiss, autoDismiss, typing = true,
}: EddySpeechBubbleProps) {
  const [displayed, setDisplayed] = useState(typing ? '' : message);
  const [visible, setVisible] = useState(true);
  const color = moodBubbleColor[mood] || '#8B5CF6';

  // Typing effect
  useEffect(() => {
    if (!typing) { setDisplayed(message); return; }
    setDisplayed('');
    let i = 0;
    const speed = message.length > 60 ? 18 : 25;
    const interval = setInterval(() => {
      setDisplayed(message.slice(0, i + 1));
      i++;
      if (i >= message.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [message, typing]);

  // Auto-dismiss
  useEffect(() => {
    if (!autoDismiss) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoDismiss);
    return () => clearTimeout(t);
  }, [autoDismiss, onDismiss]);

  if (!visible) return null;

  const tailStyles: Record<string, React.CSSProperties> = {
    right: {
      position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
      width: 0, height: 0,
      borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
      borderRight: `8px solid ${color}22`,
    },
    left: {
      position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)',
      width: 0, height: 0,
      borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
      borderLeft: `8px solid ${color}22`,
    },
    top: {
      position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
      width: 0, height: 0,
      borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
      borderTop: `8px solid ${color}22`,
    },
  };

  return (
    <div style={{
      position: 'relative',
      background: `${color}18`,
      border: `1px solid ${color}55`,
      borderRadius: position === 'right' ? '12px 12px 12px 2px' :
                    position === 'left' ? '12px 12px 2px 12px' : '12px',
      padding: '10px 14px',
      maxWidth: 260,
      fontSize: 13,
      color: '#E5DDFA',
      lineHeight: 1.5,
      boxShadow: `0 0 14px ${color}20`,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={tailStyles[position]} />
      <span>{displayed}</span>
      {typing && displayed.length < message.length && (
        <span style={{ opacity: 0.5 }}>▌</span>
      )}
      {onDismiss && displayed === message && (
        <button
          onClick={() => { setVisible(false); onDismiss(); }}
          style={{ position: 'absolute', top: 4, right: 6, background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 12 }}>
          ×
        </button>
      )}
    </div>
  );
}
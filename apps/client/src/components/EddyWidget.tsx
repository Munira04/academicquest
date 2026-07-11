import { useState, useEffect, useCallback } from 'react';
import Eddy from './Eddy';
import EddySpeechBubble from './EddySpeechBubble';
import { getEddyLine, getReactionForAttempt } from './eddyPersonality';
import type { EddyContext, EddyMood } from './eddyPersonality';

interface EddyWidgetProps {
  context: EddyContext;
  size?: number;
  direction?: 'row' | 'column';
  autoMessage?: boolean;
  messageCycleMs?: number;
  showBubble?: boolean;
  fixedMessage?: string;
  fixedMood?: EddyMood;
  onEddyClick?: () => void;
}

export default function EddyWidget({
  context, size = 60, direction = 'row', autoMessage = true,
  messageCycleMs = 8000, showBubble = true,
  fixedMessage, fixedMood, onEddyClick,
}: EddyWidgetProps) {
  const [currentLine, setCurrentLine] = useState(() => getEddyLine(context));
  const [key, setKey] = useState(0);

  const cycleMessage = useCallback(() => {
    setCurrentLine(getEddyLine(context));
    setKey(k => k + 1);
  }, [context]);

  useEffect(() => {
    if (!autoMessage || fixedMessage) return;
    setCurrentLine(getEddyLine(context));
    const interval = setInterval(cycleMessage, messageCycleMs);
    return () => clearInterval(interval);
  }, [context, autoMessage, messageCycleMs, cycleMessage, fixedMessage]);

  const mood = fixedMood || currentLine.mood;
  const message = fixedMessage || currentLine.text;

  if (!showBubble) return <Eddy mood={mood} size={size} />;

  return (
    <div style={{
      display: 'flex',
      flexDirection: direction,
      alignItems: direction === 'row' ? 'center' : 'flex-start',
      gap: direction === 'row' ? 12 : 8,
      cursor: onEddyClick ? 'pointer' : 'default',
    }} onClick={onEddyClick}>
      <Eddy mood={mood} size={size} animate showGlow />
      <EddySpeechBubble
        key={key}
        message={message}
        mood={mood}
        position={direction === 'row' ? 'right' : 'top'}
        typing
      />
    </div>
  );
}

// ── EXPORTED REACTION HELPER ──────────────────────────────────────────────────
// Use this in LessonView, Practice, etc to get a reaction state
export function useEddyReaction(context: EddyContext) {
  const [mood, setMood] = useState<EddyMood>('happy');
  const [message, setMessage] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  const react = useCallback((event: 'correct' | 'wrong' | 'hint' | 'solution' | 'levelUp') => {
    if (event === 'wrong') {
      const count = attemptCount + 1;
      setAttemptCount(count);
      const line = getReactionForAttempt(count);
      setMood(line.mood);
      setMessage(line.text);
    } else {
      const ctxMap: Record<string, EddyContext> = {
        correct: 'correct', hint: 'hint', solution: 'solution', levelUp: 'levelUp',
      };
      const line = getEddyLine(ctxMap[event] as EddyContext || context);
      setMood(line.mood);
      setMessage(line.text);
      if (event === 'correct') setAttemptCount(0);
    }
  }, [context, attemptCount]);

  const setContext = useCallback((ctx: EddyContext) => {
    const line = getEddyLine(ctx);
    setMood(line.mood);
    setMessage(line.text);
  }, []);

  return { mood, message, react, setContext };
}
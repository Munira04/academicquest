import { useState, useCallback } from 'react';

type EddyMood = 'happy' | 'thinking' | 'surprised' | 'confident' | 'idle' | 'celebrating' | 'disappointed' | 'sarcastic' | 'processing';

interface EddyState {
  mood: EddyMood;
  message: string;
}

const messages = {
  login: [
    "Oh. You're back. I was beginning to enjoy the peace and quiet.",
    "Welcome back. Your keyboard missed you. Probably.",
    "Ah. The human returns. Let's see if you remember anything.",
  ],
  dashboard: [
    "Your streak is alive. Please don't kill it.",
    "You've been away. I've been here. Thinking. Judging.",
    "Today's mission is waiting. Unlike your laundry.",
    "Ready to earn some XP? Or are we just browsing today?",
  ],
  streak: [
    "Seven days. I'm legally required to act impressed.",
    "Streak maintained. Your compiler is proud. I'm... adjusting.",
    "100 days. I have no sarcastic comment. That's genuinely impressive.",
  ],
  correct: [
    "...Not bad. I only had to cringe twice.",
    "Correct. Don't let it go to your head.",
    "See? I knew you'd get it. Eventually.",
    "Who gave you permission to become competent?",
  ],
  wrong: [
    "Interesting. Wrong. But interesting.",
    "I'm starting to think the bug is sitting in front of the monitor.",
    "The compiler isn't angry. Just deeply disappointed.",
    "You and semicolons are clearly in a complicated relationship.",
  ],
  thinking: [
    "Let me think about that...",
    "Processing... unlike some humans I know.",
    "Calculating... try not to interrupt.",
  ],
  idle: [
    "Did you freeze? Or was it just the Wi-Fi?",
    "I've finished calculating pi. You're still gone.",
    "...Are you coding or staring dramatically at your screen?",
  ],
  celebrate: [
    "Mission complete. +XP earned. You may celebrate.",
    "Achievement unlocked. Try not to let it go to your head.",
    "That bug didn't stand a chance. Nice work.",
  ],
  build: [
    "You've created something that didn't exist yesterday. That's actually cool.",
    "Excellent architecture. I'll pretend I expected that.",
    "I admire your confidence. Your compiler... is adjusting.",
  ],
  community: [
    "Excellent. Now you can confuse each other together.",
    "People actually liked your project. I'm shocked.",
    "Bold choice posting that. I respect it.",
  ],
};

export function useEddy(context: keyof typeof messages = 'dashboard') {
  const getRandomMessage = useCallback((ctx: keyof typeof messages) => {
    const pool = messages[ctx];
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const [state, setState] = useState<EddyState>({
    mood: 'happy',
    message: getRandomMessage(context),
  });

  const setMood = useCallback((mood: EddyMood, ctx?: keyof typeof messages) => {
    setState({
      mood,
      message: getRandomMessage(ctx || context),
    });
  }, [context, getRandomMessage]);

  const react = useCallback((event: 'correct' | 'wrong' | 'thinking' | 'celebrate' | 'idle') => {
    const moodMap: Record<string, EddyMood> = {
      correct: 'confident',
      wrong: 'sarcastic',
      thinking: 'thinking',
      celebrate: 'celebrating',
      idle: 'idle',
    };
    setState({
      mood: moodMap[event],
      message: getRandomMessage(event as keyof typeof messages),
    });
  }, [getRandomMessage]);

  return { ...state, setMood, react };
}
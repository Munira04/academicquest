// ─────────────────────────────────────────────────────────────────────────────
// EDDY PERSONALITY ENGINE
// The single source of truth for all Eddy dialogue and reactions
// ─────────────────────────────────────────────────────────────────────────────

export type EddyMood =
  | 'happy' | 'smug' | 'thinking' | 'surprised' | 'celebrating'
  | 'disappointed' | 'sarcastic' | 'proud' | 'idle' | 'sleeping'
  | 'processing' | 'determined' | 'laughing' | 'judging' | 'confident';

export type EddyContext =
  | 'login' | 'dashboard' | 'lesson' | 'practice' | 'build'
  | 'community' | 'achievement' | 'streak' | 'idle'
  | 'correct' | 'wrong' | 'firstWrong' | 'repeatedWrong'
  | 'hint' | 'solution' | 'levelUp' | 'welcome' | 'onboarding'
  | 'debugging' | 'cleanCode' | 'infiniteLoop' | 'askEddy' | 'processing';

interface EddyLine {
  text: string;
  mood: EddyMood;
}

// ── PERSONALITY BANK ──────────────────────────────────────────────────────────
export const eddyLines: Record<EddyContext, EddyLine[]> = {
  login: [
    { text: "Oh. You're back. I was beginning to enjoy the peace and quiet.", mood: 'sarcastic' },
    { text: "Three days away? I've seen houseplants with better attendance.", mood: 'judging' },
    { text: "Welcome back. Your keyboard missed you. Probably.", mood: 'smug' },
    { text: "Ah. The human returns. Let's see if you remember anything.", mood: 'sarcastic' },
    { text: "Memory leak detected. Oh wait, that's just you forgetting your streak.", mood: 'laughing' },
  ],
  welcome: [
    { text: "Welcome to AcademicQuest. Don't worry — I'll do most of the thinking.", mood: 'smug' },
    { text: "Another human who wants to learn to code. I've seen worse starts.", mood: 'sarcastic' },
    { text: "Let's see what you've got.", mood: 'confident' },
    { text: "I'm Eddy. Try not to disappoint me.", mood: 'smug' },
  ],
  dashboard: [
    { text: "Your streak is alive. Please don't kill it.", mood: 'judging' },
    { text: "Today's mission is waiting. Unlike your laundry.", mood: 'sarcastic' },
    { text: "Ready for another mission?", mood: 'confident' },
    { text: "You've been away. I've been here. Thinking. Judging.", mood: 'sarcastic' },
    { text: "I've computed 47 solutions while you've typed nothing.", mood: 'smug' },
    { text: "Challenge accepted... well, by me at least. Your turn.", mood: 'smug' },
    { text: "Don't let it go to your head. You're improving.", mood: 'proud' },
  ],
  lesson: [
    { text: "This one isn't too painful. Probably.", mood: 'smug' },
    { text: "I'll guide you through this one. Try to keep up.", mood: 'confident' },
    { text: "You'll survive. I think.", mood: 'sarcastic' },
    { text: "Let's see what you've got.", mood: 'judging' },
  ],
  correct: [
    { text: "...Well.", mood: 'surprised' },
    { text: "I was going to tell you the answer. You beat me to it.", mood: 'smug' },
    { text: "I'll admit it... that was cleaner than I expected.", mood: 'proud' },
    { text: "Not bad. I only had to cringe twice.", mood: 'sarcastic' },
    { text: "Who gave you permission to become competent?", mood: 'laughing' },
    { text: "Correct. Don't let it go to your head.", mood: 'smug' },
    { text: "See? I knew you'd get it. Eventually.", mood: 'smug' },
  ],
  wrong: [
    { text: "Interesting. Wrong. But interesting.", mood: 'judging' },
    { text: "Bold strategy.", mood: 'sarcastic' },
    { text: "The compiler has... concerns.", mood: 'sarcastic' },
    { text: "Your code and logic are currently in separate rooms.", mood: 'laughing' },
    { text: "Ah yes, another semicolon has escaped.", mood: 'sarcastic' },
    { text: "I've seen worse. Barely.", mood: 'judging' },
  ],
  firstWrong: [
    { text: "Interesting. Not quite right though.", mood: 'judging' },
    { text: "Close. Try looking at the logic again.", mood: 'thinking' },
    { text: "Almost. The compiler isn't convinced.", mood: 'sarcastic' },
  ],
  repeatedWrong: [
    { text: "Okay. Let's solve this together.", mood: 'determined' },
    { text: "Every programmer has been here. We're not giving up.", mood: 'determined' },
    { text: "Let's take a different approach. You've got this.", mood: 'happy' },
    { text: "I'll be real with you — let's look at the hint.", mood: 'thinking' },
    { text: "No judgment. Let's work through this step by step.", mood: 'determined' },
  ],
  hint: [
    { text: "Fine. Here's a nudge. Don't get used to it.", mood: 'judging' },
    { text: "I'll help. But only because watching you struggle is inefficient.", mood: 'smug' },
    { text: "A hint. Use it wisely.", mood: 'thinking' },
  ],
  solution: [
    { text: "The answer. Please study it, not just copy it.", mood: 'judging' },
    { text: "Here's the solution. I trust you'll understand the 'why'.", mood: 'thinking' },
    { text: "Revealing the solution. Next time, you'll get there yourself.", mood: 'proud' },
  ],
  levelUp: [
    { text: "...", mood: 'surprised' },
    { text: "I'm impressed. That's not a sentence I say often.", mood: 'proud' },
    { text: "Level up. You've earned that.", mood: 'celebrating' },
    { text: "New level unlocked. I knew you'd get there.", mood: 'celebrating' },
  ],
  achievement: [
    { text: "Achievement unlocked. Try not to let it go to your head.", mood: 'smug' },
    { text: "New badge. I'll pretend I'm surprised.", mood: 'laughing' },
    { text: "I'm proud of you. I'll deny saying that later.", mood: 'proud' },
  ],
  streak: [
    { text: "Seven days. I'm legally required to act impressed.", mood: 'smug' },
    { text: "100 days. I have no sarcastic comment. Genuinely impressive.", mood: 'proud' },
    { text: "Streak maintained. Your compiler is proud. I'm... adjusting.", mood: 'sarcastic' },
  ],
  practice: [
    { text: "Let's see if you actually learned anything.", mood: 'judging' },
    { text: "The game begins. Try not to embarrass us both.", mood: 'smug' },
    { text: "I've prepared your next challenge.", mood: 'confident' },
  ],
  build: [
    { text: "Are you coding... or staring dramatically at the screen?", mood: 'sarcastic' },
    { text: "You've created something that didn't exist yesterday. That's cool.", mood: 'proud' },
    { text: "Need a hint? I'll wait.", mood: 'smug' },
    { text: "Excellent architecture. I'll pretend I expected that.", mood: 'smug' },
  ],
  community: [
    { text: "Excellent. Now you can confuse each other together.", mood: 'laughing' },
    { text: "People liked your project. I'm shocked.", mood: 'surprised' },
    { text: "Bold choice posting that. I respect it.", mood: 'confident' },
  ],
  idle: [
    { text: "Did you freeze? Or was it just the Wi-Fi?", mood: 'idle' },
    { text: "I've finished calculating pi. You're still gone.", mood: 'sleeping' },
    { text: "...*taps holographic desk*...", mood: 'sleeping' },
    { text: "Still here. In case you were wondering.", mood: 'idle' },
  ],
  debugging: [
    { text: "I found your problem. Unfortunately, it's your code.", mood: 'sarcastic' },
    { text: "Ah. A classic off-by-one error. Timeless.", mood: 'judging' },
    { text: "The bug is on line... you know what, let's look together.", mood: 'thinking' },
  ],
  cleanCode: [
    { text: "Clean code. I respect that.", mood: 'proud' },
    { text: "Good variable names. You're learning.", mood: 'happy' },
    { text: "That's a clean solution. Well done.", mood: 'proud' },
  ],
  infiniteLoop: [
    { text: "Planning to run this forever?", mood: 'judging' },
    { text: "I see you've discovered the infinite loop. A rite of passage.", mood: 'laughing' },
    { text: "Time to add a break condition.", mood: 'thinking' },
  ],
  onboarding: [
    { text: "Hi. I'm Eddy. Try not to disappoint me.", mood: 'smug' },
    { text: "Let's get you set up. I'll ask the questions.", mood: 'confident' },
    { text: "Welcome. This is going to be interesting.", mood: 'happy' },
  ],
  askEddy: [
    { text: "Ask me anything. I'll try not to be too condescending.", mood: 'smug' },
    { text: "I am Quest AI. Powered by actual intelligence.", mood: 'confident' },
    { text: "What do you need? I have approximately infinite patience.", mood: 'happy' },
  ],
  processing: [
    { text: "Processing...", mood: 'processing' },
    { text: "Thinking. Don't rush me.", mood: 'thinking' },
    { text: "Computing a response...", mood: 'processing' },
  ],
};

// ── RANDOM LINE PICKER ────────────────────────────────────────────────────────
export function getEddyLine(context: EddyContext): EddyLine {
  const pool = eddyLines[context];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── CONTEXT-AWARE REACTION ────────────────────────────────────────────────────
export function getReactionForAttempt(attemptNumber: number): EddyLine {
  if (attemptNumber === 1) return getEddyLine('firstWrong');
  if (attemptNumber >= 3) return getEddyLine('repeatedWrong');
  return getEddyLine('wrong');
}
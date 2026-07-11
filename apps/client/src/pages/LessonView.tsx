import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import AQLogo from '../components/AQLogo';
import Eddy from '../components/Eddy';
import EddyWidget, { useEddyReaction } from '../components/EddyWidget';
import { coursesById } from '../data/allCurricula';
import type { Course, Lesson as CurriculumLesson } from '../types/curriculum';

interface Message { text: string; isUser: boolean; }
interface Lesson {
  id: string;
  title: string;
  content: string[];
  instructions: string;
  chapterProgress: string;
  hint: string;
  flashcard: string;
  solution: string;
  startingCode: string;
  expectedOutput: string;
  xpReward: number;
  type: string;
}

function mapCurriculumLesson(lesson: CurriculumLesson): Lesson {
  return {
    id: lesson.lessonId,
    title: lesson.title,
    content: lesson.leftPanel.conceptText.split(/\n\n+/).filter(Boolean),
    instructions: lesson.leftPanel.instructions,
    chapterProgress: lesson.leftPanel.chapterProgress,
    hint: lesson.utilities.hint,
    flashcard: lesson.utilities.flashcard.back,
    solution: lesson.utilities.solution,
    startingCode: lesson.rightPanel.startingCode,
    expectedOutput: lesson.rightPanel.expectedOutput,
    xpReward: lesson.xpReward,
    type: lesson.type,
  };
}

function mapCourse(course: Course) {
  const allLessons: Lesson[] = [];
  course.sections.forEach(section => {
    section.lessons.forEach(l => allLessons.push(mapCurriculumLesson(l)));
    if (section.sectionProject) {
      allLessons.push(mapCurriculumLesson(section.sectionProject));
    }
  });
  return {
    id: course.id,
    name: course.title,
    sections: course.sections,
    lessons: allLessons,
  };
}
interface UserProgress {
  currentTrack: 'beginner' | 'intermediate' | 'advanced';
  unlockedTracks: string[];
  xp: number;
  currentLessonIndex: number;
  completedLessonIds: string[];
  currentSectionIndex: number;
  completedSectionIds: string[];
}

const trackOrder = ['beginner', 'intermediate', 'advanced'];

function initializeUserProgress(chosenLevel: string): UserProgress {
  return { currentTrack: chosenLevel as any, unlockedTracks: [chosenLevel], xp: 0, currentLessonIndex: 0, completedLessonIds: [], currentSectionIndex: 0, completedSectionIds: [] };
}

function handleSubmitLesson(progress: UserProgress, lesson: Lesson, currentLessons: Lesson[]) {
  const newProgress: UserProgress = {
    ...progress,
    xp: progress.xp + lesson.xpReward,
    completedLessonIds: [...progress.completedLessonIds, lesson.id],
  };
  const trackComplete = currentLessons.every(l => newProgress.completedLessonIds.includes(l.id));
  let leveledUp = false;
  if (trackComplete) {
    const idx = trackOrder.indexOf(progress.currentTrack);
    const nextTrack = trackOrder[idx + 1];
    if (nextTrack && !newProgress.unlockedTracks.includes(nextTrack)) {
      newProgress.unlockedTracks = [...newProgress.unlockedTracks, nextTrack];
      leveledUp = true;
    }
  }
  return { newProgress, leveledUp };
}

const aiResponses: Record<string, string> = {
  print: "The print() function outputs text to the terminal. Use it like: print('your text here')",
  syntax: "A syntax error means Python cannot read your code. Check for missing brackets, quotes, or colons.",
  hello: "Type print('Hello World') exactly — capital H and W with a space between them.",
  xp: "You earn XP by completing lessons and submitting correct answers. Beat boss battles for bonus XP!",
  error: "Check your code carefully. Make sure you have matching quotes and parentheses.",
  default: "Great question! Try running your code first — I can give more specific help once I see the terminal output.",
};

const companions: Record<string, string> = { cat: '🐱', fox: '🦊', panda: '🐼', lion: '🦁' };

export default function LessonView() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const companionKey = localStorage.getItem('companion') || 'cat';

  const rawCourse = courseId ? coursesById[courseId] : undefined;
  const course = useMemo(() => (rawCourse ? mapCourse(rawCourse) : undefined), [rawCourse]);
  const lessons = course?.lessons || [];
  const lessonIndex = parseInt(localStorage.getItem(`lesson_${courseId}`) || '0');
  const lesson = lessons[lessonIndex] || lessons[0];

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure new fields exist for backward compatibility
      return {
        ...parsed,
        currentSectionIndex: parsed.currentSectionIndex ?? 0,
        completedSectionIds: parsed.completedSectionIds ?? [],
      };
    }
    return initializeUserProgress('beginner');
  });

  const lessonProgressPct = Math.round(((lessonIndex) / (lessons.length || 1)) * 100);

  const [code, setCode] = useState(lesson?.startingCode || '');
  const [activeTab, setActiveTab] = useState<'editor' | 'output'>('editor');
  const [terminalOutput, setTerminalOutput] = useState<{ text: string; type: string }[]>([
    { text: 'Click Run to execute your code...', type: 'muted' }
  ]);
  const [ran, setRan] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [termStatus, setTermStatus] = useState('Ready');
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    { text: 'Hi! I am Quest AI. Run your code and I will help if anything goes wrong!', isUser: false }
  ]);
  const [aiInput, setAiInput] = useState('');
  
  // Custom mock loading state for AI response generation
  const [aiLoading, setAiLoading] = useState(false);

  // Step 6: Instantiate the reaction engine hook
  const { mood: eddyMood, message: eddyMessage, react: eddyReact } = useEddyReaction('lesson');

  // Resizable panel state
  const [leftWidthPct, setLeftWidthPct] = useState(50);
  const [terminalHeightPct, setTerminalHeightPct] = useState(38);
  const draggingCol = useRef(false);
  const draggingRow = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const terminalRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lesson) {
      setCode(lesson.startingCode);
    }
  }, [lessonIndex, courseId]);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  };
  useEffect(() => { scrollToBottom(terminalRef); }, [terminalOutput]);
  useEffect(() => { scrollToBottom(aiRef); }, [aiMessages, aiOpen]);

  // Drag handlers for column resize (left/right panels)
  const onColMouseDown = () => { draggingCol.current = true; document.body.style.cursor = 'col-resize'; };
  const onRowMouseDown = () => { draggingRow.current = true; document.body.style.cursor = 'row-resize'; };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (draggingCol.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      pct = Math.min(70, Math.max(28, pct));
      setLeftWidthPct(pct);
    }
    if (draggingRow.current && rightColRef.current) {
      const rect = rightColRef.current.getBoundingClientRect();
      let pct = ((rect.bottom - e.clientY) / rect.height) * 100;
      pct = Math.min(70, Math.max(18, pct));
      setTerminalHeightPct(pct);
    }
  }, []);

  const onMouseUp = useCallback(() => {
    draggingCol.current = false;
    draggingRow.current = false;
    document.body.style.cursor = '';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const addAiMessage = (text: string, isUser = false) => {
    setAiMessages(prev => [...prev, { text, isUser }]);
    if (!isUser) setAiOpen(true);
  };

  const saveProgress = (p: UserProgress) => {
    setProgress(p);
    localStorage.setItem('userProgress', JSON.stringify(p));
  };

  const runCode = () => {
    if (!lesson) return;
    const trimmed = code.trim();
    setActiveTab('editor');
    setTerminalOutput([{ text: '$ python script.py', type: 'prompt' }]);
    setTermStatus('Running...');

    setTimeout(() => {
      if (!trimmed || trimmed === lesson.startingCode.trim()) {
        setTerminalOutput(prev => [...prev, { text: 'Error: No code written.', type: 'error' }]);
        setTermStatus('Error');
        
        // Step 6: Call eddyReact on failure
        eddyReact('wrong');
        
        addAiMessage('Your editor looks empty! Try writing some code first.');
        return;
      }
      const printMatch = trimmed.match(/print\(([^)]+)\)/g);
      if (printMatch) {
        const lastPrint = printMatch[printMatch.length - 1];
        const strMatch = lastPrint.match(/['"](.+)['"]/);
        const output = strMatch ? strMatch[1] : lastPrint.replace(/print\(|\)/g, '');
        setTerminalOutput(prev => [...prev,
          { text: output, type: 'output' },
          { text: 'Process finished with exit code 0', type: 'muted' }
        ]);
        setTermStatus('Success');
        setRan(true);
        if (output.toLowerCase().replace(/\s/g, '').includes(lesson.expectedOutput.toLowerCase().replace(/\s/g, '').replace(/[\[\],]/g, ''))) {
          // Step 6: Call eddyReact on compilation success
          eddyReact('correct');
          addAiMessage(`Your code ran perfectly! Click Submit Answer to earn your ${lesson.xpReward} XP!`);
        } else {
          // Step 6: Call eddyReact on logical evaluation failures
          eddyReact('wrong');
          addAiMessage(`Your code ran and showed: "${output}". Check the instructions to see what's expected.`);
        }
      } else {
        setTerminalOutput(prev => [...prev, { text: 'SyntaxError: invalid syntax', type: 'error' }]);
        setTermStatus('Error');
        
        // Step 6: Call eddyReact on structural compilation error
        eddyReact('wrong');
        
        addAiMessage('There is a syntax error. Check your code against the hint!');
      }
    }, 800);
  };

  const handleSubmit = () => {
    if (!ran || submitted || !lesson) return;
    const { newProgress, leveledUp } = handleSubmitLesson(progress, lesson, lessons);
    saveProgress(newProgress);
    setSubmitted(true);
    setTerminalOutput(prev => [...prev, { text: `✓ Correct! +${lesson.xpReward} XP earned`, type: 'success' }]);
    
    // Step 6: Call eddyReact on submission lifecycle match
    eddyReact('correct');

    if (leveledUp) {
      addAiMessage(`🎉 Level up! You unlocked the ${newProgress.unlockedTracks.at(-1)} track!`);
    } else {
      addAiMessage(`Lesson complete! +${lesson.xpReward} XP added. Ready for the next one?`);
    }
  };

  const handleNextLesson = () => {
    const nextIdx = lessonIndex + 1;
    localStorage.setItem(`lesson_${courseId}`, String(nextIdx));
    setSubmitted(false);
    setRan(false);
    setOpenAccordion(null);
    setTermStatus('Ready');
    setTerminalOutput([{ text: 'Click Run to execute your code...', type: 'muted' }]);
  };

  const sendAiMessage = () => {
    if (!aiInput.trim()) return;
    addAiMessage(aiInput, true);
    const lower = aiInput.toLowerCase();
    let response = aiResponses.default;
    for (const key of Object.keys(aiResponses)) {
      if (lower.includes(key)) { response = aiResponses[key]; break; }
    }
    setAiInput('');
    setAiLoading(true);

    setTimeout(() => {
      setAiLoading(false);
      addAiMessage(response);
    }, 600);
  };

  const toggleAccordion = (key: string) => setOpenAccordion(prev => prev === key ? null : key);

  const termColors: Record<string, string> = {
    prompt: '#22C55E', output: '#E2E8F0', error: '#F87171', muted: '#666', success: '#22C55E',
  };

  if (!user) { navigate('/login'); return null; }
  if (!course || !lesson) {
    return (
      <div style={{ padding: 24, background: '#08080C', color: '#fff', height: '100vh' }}>
        Course or lesson not found. <button onClick={() => navigate('/courses')} style={{ background: '#8B5CF6', border: 'none', padding: '8px 16px', borderRadius: 6, color: '#fff', cursor: 'pointer' }}>Back to Courses</button>
      </div>
    );
  }

  const isLastLesson = lessonIndex >= lessons.length - 1;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080C', color: '#fff', overflow: 'hidden', position: 'relative' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', background: '#120F1F', borderBottom: '1px solid #2d1f4e', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => navigate('/courses')}>
            <AQLogo size={20} />
            <span style={{ color: '#8B5CF6', fontWeight: 600 }}>AcademicQuest</span>
          </div>
          <span style={{ color: '#444' }}>/</span>
          <span style={{ color: '#A1A1AA' }}>{course.name}</span>
          <span style={{ color: '#444' }}>/</span>
          <span style={{ color: '#fff' }}>{lesson.title}</span>
        </div>

        <div style={{ flex: 1, maxWidth: 340, margin: '0 24px' }}>
          <div style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 4, textAlign: 'center' }}>
            Lesson {lessonIndex + 1} of {lessons.length} — {lessonProgressPct}% complete
          </div>
          <div style={{ height: 5, background: '#1A1A2E', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${lessonProgressPct}%`, background: 'linear-gradient(90deg, #8B5CF6, #A78BFA)', borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 13, color: '#A78BFA', fontWeight: 500 }}>⚡ {progress.xp} XP</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#22C55E' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
            Connected
          </div>
          <div
            style={{ width: 30, height: 30, borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            {user.username?.[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Resizable split */}
      <div ref={containerRef} style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT PANEL */}
        <div style={{ width: `${leftWidthPct}%`, background: '#120F1F', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
            <div style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1.2, marginBottom: 8 }}>
              {lesson.chapterProgress || `${course.name.toUpperCase()} · CHAPTER ${lessonIndex + 1}`}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 18 }}>
              {lesson.title}
            </div>
            {lesson.content.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: '#C2C0BE', lineHeight: 1.85, marginBottom: 16 }}>{p}</p>
            ))}

            {lesson.id === 'py-fund-01' && (
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
                {['Data analysis and visualization', 'Artificial Intelligence and Machine Learning', 'Web development and backend APIs', 'Automation and everyday scripting'].map((point, i) => (
                  <li key={i} style={{ fontSize: 15, color: '#C2C0BE', padding: '5px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#8B5CF6', flexShrink: 0, display: 'inline-block' }} />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            <div style={{ background: '#1A1028', border: '1px solid #8B5CF6', borderRadius: 10, padding: 18, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#8B5CF6', fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>📋 Instructions</div>
              <p style={{ fontSize: 14, color: '#D4C7F9', lineHeight: 1.7 }}>
                {lesson.instructions || <>Write code in the editor on the right to produce: <code style={{ color: '#fff', background: '#2d1f4e', padding: '2px 6px', borderRadius: 4 }}>{lesson.expectedOutput}</code>. Click <strong>Run</strong>, then <strong>Submit Answer</strong> to earn XP.</>}
              </p>
            </div>
          </div>

          {/* Vertical stack: HINT / FLASHCARD / SOLUTION — expandable */}
          <div style={{ flexShrink: 0, maxHeight: '55%', overflowY: 'auto' }}>
            {[
              { key: 'hint', label: 'HINT', icon: 'ti-bulb' },
              { key: 'flashcard', label: 'FLASHCARD', icon: 'ti-cards' },
              { key: 'solution', label: 'SOLUTION', icon: 'ti-eye' },
            ].map(acc => (
              <div key={acc.key} style={{ borderTop: '1px solid #2d1f4e' }}>
                <button
                  onClick={() => toggleAccordion(acc.key)}
                  style={{ width: '100%', padding: '16px 24px', background: openAccordion === acc.key ? '#1A1028' : 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#C2C0BE', textAlign: 'left', letterSpacing: 0.5, fontWeight: 600 }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className={`ti ${acc.icon}`} style={{ fontSize: 17 }} />
                    {acc.label}
                  </span>
                  <i className="ti ti-chevron-down" style={{ fontSize: 14, transform: openAccordion === acc.key ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>

                {openAccordion === acc.key && acc.key === 'flashcard' && (
                  <div style={{ padding: '0 24px 22px', background: '#0D0B1A' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'linear-gradient(135deg, #1A1028, #211538)', border: '1px solid #8B5CF6', borderRadius: 12, padding: 18 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#211538', border: '2px solid #8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                        {companions[companionKey]}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, marginBottom: 6 }}>✨ DID YOU KNOW?</div>
                        <p style={{ fontSize: 14, color: '#E5DDFA', lineHeight: 1.7 }}>{lesson.flashcard}</p>
                      </div>
                    </div>
                  </div>
                )}

                {openAccordion === acc.key && acc.key === 'hint' && (
                  <div style={{ padding: '0 24px 22px', fontSize: 14, color: '#C2C0BE', lineHeight: 1.8, background: '#0D0B1A' }}>
                    💡 {lesson.hint}
                  </div>
                )}

                {openAccordion === acc.key && acc.key === 'solution' && (
                  <div style={{ padding: '0 24px 22px', background: '#0D0B1A' }}>
                    <pre style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 8, padding: 14, overflowX: 'auto' }}>
                      <code style={{ color: '#34D399', fontFamily: 'Fira Code, monospace', fontSize: 13, whiteSpace: 'pre-wrap' }}>{lesson.solution}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column drag handle */}
        <div
          onMouseDown={onColMouseDown}
          style={{ width: 6, cursor: 'col-resize', background: '#2d1f4e', flexShrink: 0, position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 3, height: 36, background: '#8B5CF6', borderRadius: 3 }} />
        </div>

        {/* RIGHT PANEL */}
        <div ref={rightColRef} style={{ width: `${100 - leftWidthPct}%`, display: 'flex', flexDirection: 'column', background: '#0D0B1A', overflow: 'hidden' }}>

          <div style={{ display: 'flex', alignItems: 'center', background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 10px', flexShrink: 0 }}>
            <div
              onClick={() => setActiveTab('editor')}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 14px', fontSize: 13, color: activeTab === 'editor' ? '#fff' : '#A1A1AA', borderBottom: activeTab === 'editor' ? '2px solid #8B5CF6' : '2px solid transparent', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 11, background: '#3d2a6e', color: '#A78BFA', padding: '1px 5px', borderRadius: 3, fontFamily: 'monospace' }}>.py</span>
              script.py
            </div>
            <div
              onClick={() => setActiveTab('output')}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 14px', fontSize: 13, color: activeTab === 'output' ? '#fff' : '#A1A1AA', borderBottom: activeTab === 'output' ? '2px solid #8B5CF6' : '2px solid transparent', cursor: 'pointer' }}
            >
              <i className="ti ti-eye" style={{ fontSize: 13 }} />
              Output
            </div>
          </div>

          <div style={{ flex: `1 1 ${100 - terminalHeightPct}%`, overflow: 'hidden', minHeight: 0 }}>
            {activeTab === 'editor' ? (
              <Editor
                height="100%"
                defaultLanguage="python"
                value={code}
                onChange={(val) => setCode(val || '')}
                theme="vs-dark"
                options={{
                  fontSize: 15, minimap: { enabled: false }, scrollBeyondLastLine: false,
                  lineNumbers: 'on', fontFamily: 'Fira Code, monospace', tabSize: 4,
                  wordWrap: 'on', automaticLayout: true, padding: { top: 14 },
                }}
              />
            ) : (
              <div style={{ padding: 20, fontSize: 14, color: '#A1A1AA', fontFamily: 'monospace' }}>
                {ran ? 'Last run completed — see terminal below for details.' : 'Run your code to see output here.'}
              </div>
            )}
          </div>

          {/* Row drag handle */}
          <div
            onMouseDown={onRowMouseDown}
            style={{ height: 6, cursor: 'row-resize', background: '#2d1f4e', flexShrink: 0, position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 36, height: 3, background: '#8B5CF6', borderRadius: 3 }} />
          </div>

          {/* Terminal */}
          <div style={{ flex: `0 0 ${terminalHeightPct}%`, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            <div style={{ padding: '8px 14px', background: '#120F1F', borderBottom: '1px solid #2d1f4e', fontSize: 13, color: '#A1A1AA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <span><i className="ti ti-terminal" style={{ marginRight: 6, fontSize: 14 }} />Terminal</span>
              <span style={{ fontSize: 11, color: termStatus === 'Success' ? '#22C55E' : termStatus === 'Error' ? '#F87171' : '#555' }}>{termStatus}</span>
            </div>
            <div ref={terminalRef} style={{ flex: 1, padding: 14, overflowY: 'auto', fontFamily: 'Fira Code, monospace', fontSize: 13, lineHeight: 1.9 }}>
              {terminalOutput.map((line, i) => (
                <div key={i} style={{ color: termColors[line.type] || '#fff' }}>{line.text}</div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, padding: '10px 14px', borderTop: '1px solid #2d1f4e', flexShrink: 0 }}>
              <button
                onClick={runCode}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: '#8B5CF6', color: '#fff' }}
              >
                <i className="ti ti-player-play" style={{ fontSize: 14 }} />
                Run
              </button>

              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!ran}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 8, border: `1px solid ${ran ? '#22C55E' : '#2d1f4e'}`, cursor: ran ? 'pointer' : 'not-allowed', fontSize: 13, color: ran ? '#22C55E' : '#555', background: 'transparent', opacity: ran ? 1 : 0.5 }}
                >
                  <i className="ti ti-check" style={{ fontSize: 14 }} />
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextLesson}
                  disabled={isLastLesson}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: isLastLesson ? 'default' : 'pointer', fontSize: 13, fontWeight: 600, background: isLastLesson ? '#2d1f4e' : '#22C55E', color: '#fff' }}
                >
                  {isLastLesson ? 'Track complete! 🎉' : 'Next Lesson →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step 6: Replace the floating button / AI integration toggle */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 10 }}>
        {aiOpen ? (
          // The AI Chat box view handles the opened drawer
          null
        ) : (
          <div
            onClick={() => setAiOpen(true)}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
          >
            <EddyWidget
              context="lesson"
              size={52}
              direction="column"
              fixedMood={eddyMood}
              fixedMessage={eddyMessage || undefined}
              showBubble={!!eddyMessage}
              autoMessage={false}
            />
          </div>
        )}
      </div>

      {/* Chat drawer display overlay panel */}
      {aiOpen && (
        <div style={{ position: 'absolute', bottom: 16, right: 16, width: 320, height: 400, background: '#0B0B0F', border: '1px solid #2d1f4e', borderRadius: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 10, boxShadow: '0 10px 28px rgba(0,0,0,0.55)' }}>
          
          {/* Step 6: Replace dynamic header row */}
          <div style={{ padding: '10px 14px', background: '#120F1F', borderBottom: '1px solid #2d1f4e', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <Eddy mood={aiLoading ? 'processing' : 'confident'} size={32} animate showGlow={false} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#A78BFA' }}>Quest AI — Eddy</div>
              <div style={{ fontSize: 10, color: '#555' }}>Your sarcastic coding companion</div>
            </div>
            <button onClick={() => setAiOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16 }}>×</button>
          </div>

          <div ref={aiRef} style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            {aiMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{
                  background: msg.isUser ? '#1A2F1A' : '#1A1028',
                  border: `1px solid ${msg.isUser ? '#22C55E33' : '#2d1f4e'}`,
                  borderRadius: 10, padding: '9px 12px', fontSize: 13,
                  color: msg.isUser ? '#C2C0BE' : '#D4C7F9', lineHeight: 1.6,
                  textAlign: msg.isUser ? 'right' : 'left',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '10px', borderTop: '1px solid #2d1f4e', flexShrink: 0 }}>
            <input
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendAiMessage()}
              placeholder="Ask a question..."
              style={{ flex: 1, background: '#1A1028', border: '1px solid #2d1f4e', borderRadius: 7, padding: '8px 10px', fontSize: 13, color: '#fff', outline: 'none' }}
            />
            <button onClick={sendAiMessage} style={{ background: '#8B5CF6', border: 'none', borderRadius: 7, padding: '8px 12px', color: '#fff', fontSize: 12, cursor: 'pointer' }}>
              <i className="ti ti-send" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
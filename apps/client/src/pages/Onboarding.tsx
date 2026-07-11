import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const steps = [
  {
    question: "What is your current level of study?",
    field: "studyLevel",
    type: "single",
    options: ["High School", "Diploma", "Undergraduate", "Masters", "PhD", "Self-Learner"],
  },
  {
    question: "How would you rate your coding skills?",
    field: "codingLevel",
    type: "single",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
  },
  {
    question: "Which programming languages do you want to focus on?",
    field: "languages",
    type: "multi",
    options: ["Java", "Python", "JavaScript", "C++", "C#", "PHP", "SQL", "Kotlin", "Swift"],
  },
  {
    question: "Why are you using AcademicQuest?",
    field: "learningGoal",
    type: "single",
    options: ["Improve coding skills", "Prepare for exams", "Complete assignments", "Learn programming from scratch", "Improve problem-solving", "Prepare for interviews"],
  },
  {
    question: "What challenges do you face when studying?",
    field: "challenges",
    type: "multi",
    options: ["Understanding code", "Remembering concepts", "Time management", "Concentration", "Exam anxiety", "Debugging programs"],
  },
  {
    question: "How do you learn best?",
    field: "learnStyle",
    type: "single",
    options: ["Visual explanations", "Interactive games", "Quizzes", "Flashcards", "Practice coding exercises"],
  },
  {
    question: "How much time can you study daily?",
    field: "studyTime",
    type: "single",
    options: ["15 minutes", "30 minutes", "1 hour", "2 hours", "More than 2 hours"],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || JSON.parse(localStorage.getItem('user') || '{}').id;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const toggleOption = (option: string) => {
    const field = current.field;
    if (current.type === 'single') {
      setAnswers(prev => ({ ...prev, [field]: option }));
    } else {
      const existing: string[] = answers[field] || [];
      if (existing.includes(option)) {
        setAnswers(prev => ({ ...prev, [field]: existing.filter(o => o !== option) }));
      } else {
        setAnswers(prev => ({ ...prev, [field]: [...existing, option] }));
      }
    }
  };

  const isSelected = (option: string) => {
    const val = answers[current.field];
    if (current.type === 'single') return val === option;
    return Array.isArray(val) && val.includes(option);
  };

  const canNext = () => {
    const val = answers[current.field];
    if (!val) return false;
    if (current.type === 'multi') return Array.isArray(val) && val.length > 0;
    return true;
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      setLoading(true);
      try {
        await api.post('/auth/onboarding', { userId, ...answers });
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...user, onboardingDone: true, ...answers }));
        navigate('/dashboard');
      } catch {
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-accent-purple font-semibold text-lg mb-1">
            Academic<span className="text-white">Quest</span>
          </h1>
          <p className="text-txt-secondary text-sm">Let's personalize your experience</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-txt-secondary mb-2">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #8B5CF6, #A78BFA)' }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-bg-secondary border border-border-purple rounded-2xl p-8">
          <h2 className="text-white text-xl font-semibold mb-2">{current.question}</h2>
          {current.type === 'multi' && (
            <p className="text-txt-secondary text-xs mb-6">Select all that apply</p>
          )}
          {current.type === 'single' && <div className="mb-6" />}

          <div className="grid grid-cols-2 gap-3">
            {current.options.map(option => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`p-3 rounded-xl border text-sm text-left transition-all ${
                  isSelected(option)
                    ? 'border-accent-purple bg-bg-card text-white'
                    : 'border-border-light bg-bg-card/50 text-txt-secondary hover:border-accent-purple/50 hover:text-white'
                }`}
              >
                {isSelected(option) && <span className="text-accent-purple mr-2">✓</span>}
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canNext() || loading}
            className="w-full mt-8 py-3 rounded-xl text-white font-medium transition-opacity disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' }}
          >
            {loading ? 'Saving...' : step === steps.length - 1 ? 'Get started 🚀' : 'Continue →'}
          </button>

          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="w-full mt-3 py-2 text-txt-secondary text-sm hover:text-white transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
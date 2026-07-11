import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import Onboarding from './pages/Onboarding';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Practice from './pages/Practice';
import Build from './pages/Build';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Account from './pages/Account';
import ChallengeWorkspace from './pages/ChallengeWorkspace';
import CodeDungeon from './pages/CodeDungeon';
import CodeBattles from './pages/CodeBattles';
import HackerDetective from './pages/HackerDetective';
import SmartCity from './pages/SmartCity';
import Progress from './pages/Progress';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/learn/:courseId" element={<LessonView />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/build" element={<Build />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/challenges" element={<ChallengeWorkspace />} />
        <Route path="/code-dungeon" element={<CodeDungeon />} />
        <Route path="/code-battles" element={<CodeBattles />} />
        <Route path="/hacker-detective" element={<HackerDetective />} />
        <Route path="/smart-city" element={<SmartCity />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
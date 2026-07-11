import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';

const router = express.Router();
const prisma = new PrismaClient();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function issueTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existing) {
      return res.status(409).json({ error: 'Username or email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = generateCode();
    const verifyExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyExpiry,
      },
    });

    await sendVerificationEmail(email, username, verifyCode);

    res.status(201).json({
      message: 'Account created! Check your email for the verification code.',
      userId: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error });
  }
});

// VERIFY EMAIL
router.post('/verify-email', async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.status(400).json({ error: 'Already verified' });
    if (user.verifyCode !== code) return res.status(400).json({ error: 'Invalid code' });
    if (!user.verifyExpiry || user.verifyExpiry < new Date()) {
      return res.status(400).json({ error: 'Code has expired. Please request a new one.' });
    }

    const { accessToken, refreshToken } = issueTokens(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyExpiry: null,
        refreshToken,
      },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, secure: false, sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Email verified successfully!',
      accessToken,
      user: {
        id: user.id, username: user.username, email: user.email,
        xp: user.xp, level: user.level, onboardingDone: user.onboardingDone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed', details: error });
  }
});

// RESEND VERIFICATION CODE
router.post('/resend-code', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.status(400).json({ error: 'Already verified' });

    const verifyCode = generateCode();
    const verifyExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({ where: { id: user.id }, data: { verifyCode, verifyExpiry } });
    await sendVerificationEmail(user.email, user.username, verifyCode);

    res.json({ message: 'New verification code sent!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resend code' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    if (!user.isVerified) {
      return res.status(403).json({
        error: 'Please verify your email first.',
        userId: user.id,
        needsVerification: true,
      });
    }

    const { accessToken, refreshToken } = issueTokens(user.id);

    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, secure: false, sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: `Welcome back, ${user.username}!`,
      accessToken,
      user: {
        id: user.id, username: user.username, email: user.email,
        xp: user.xp, level: user.level, onboardingDone: user.onboardingDone,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });
  }
});

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: 'No account found with that email' });

    const resetCode = generateCode();
    const resetExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({ where: { id: user.id }, data: { resetCode, resetExpiry } });
    await sendPasswordResetEmail(email, user.username, resetCode);

    res.json({ message: 'Reset code sent to your email!', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reset code' });
  }
});

// RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const { userId, code, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.resetCode !== code) return res.status(400).json({ error: 'Invalid code' });
    if (!user.resetExpiry || user.resetExpiry < new Date()) {
      return res.status(400).json({ error: 'Code has expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetCode: null, resetExpiry: null },
    });

    res.json({ message: 'Password reset successfully! Please login.' });
  } catch (error) {
    res.status(500).json({ error: 'Password reset failed' });
  }
});

// SAVE ONBOARDING
router.post('/onboarding', async (req, res) => {
  try {
    const { userId, studyLevel, codingLevel, languages, learningGoal, challenges, learnStyle, studyTime } = req.body;

    await prisma.user.update({
      where: { id: userId },
      data: {
        studyLevel, codingLevel,
        languages: JSON.stringify(languages),
        learningGoal,
        challenges: JSON.stringify(challenges),
        learnStyle, studyTime,
        onboardingDone: true,
      },
    });

    res.json({ message: 'Onboarding complete!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save onboarding' });
  }
});

// REFRESH TOKEN
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

    const user = await prisma.user.findFirst({ where: { refreshToken } });
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(refreshToken, REFRESH_SECRET, (err: any) => {
      if (err) return res.status(403).json({ error: 'Expired refresh token' });
      const { accessToken } = issueTokens(user.id);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: 'Token refresh failed' });
  }
});

// LOGOUT
router.post('/logout', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await prisma.user.updateMany({ where: { refreshToken }, data: { refreshToken: null } });
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

export default router;
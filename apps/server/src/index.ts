import express from 'express';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('AcademicQuest API is running');
});

app.use('/api/auth', authRoutes);

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, xp: true, level: true, createdAt: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
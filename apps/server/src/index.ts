import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AcademicQuest API is running');
});

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: error });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
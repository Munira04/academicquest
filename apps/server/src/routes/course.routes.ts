import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET all courses for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const courses = await prisma.course.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// CREATE a course
router.post('/', async (req, res) => {
  try {
    const { title, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' });
    }
    const course = await prisma.course.create({
      data: { title, userId },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// DELETE a course
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;

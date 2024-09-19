import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      const todo = await prisma.todo.create({
        data: { title },
      });
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Error adding todo' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

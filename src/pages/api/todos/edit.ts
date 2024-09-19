import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, title, completed } = req.body;
    if (!id) return res.status(400).json({ error: 'ID is required' });

    try {
      const todo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { title, completed },
      });
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Error updating todo' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID is required' });

    try {
      await prisma.todo.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting todo' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

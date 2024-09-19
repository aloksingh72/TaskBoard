import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, completed } = req.body;
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed },
    });
    res.status(200).json(todo);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Todo deleted' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

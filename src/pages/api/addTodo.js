import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title } = req.body;

      if (!title || title.trim() === "") {
        return res.status(400).json({ error: 'Title is required' });
      }

      const todo = await prisma.todo.create({
        data: { title },
      });

      res.status(200).json(todo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Failed to create todo" });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

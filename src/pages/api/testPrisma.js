import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Prisma connection error:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}

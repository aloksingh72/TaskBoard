import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const todos = await prisma.todo.findMany();
  res.status(200).json(todos);
}

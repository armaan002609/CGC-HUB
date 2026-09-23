import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  try {
    const res = await prisma.$executeRaw`
      INSERT INTO public."User" (id, email, name)
      VALUES (
        '123e4567-e89b-12d3-a456-426614174003',
        'simplest@example.com',
        'Simplest User'
      )
    `;
    console.log("Success:", res);
  } catch (error) {
    console.error("Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();

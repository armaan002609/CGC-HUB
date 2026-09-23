import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  try {
    const res = await prisma.$executeRaw`
      INSERT INTO public."User" (id, email, name, role, "emailVerified")
      VALUES (
        '123e4567-e89b-12d3-a456-426614174002',
        'triggertime@example.com',
        'Trigger User Time',
        coalesce(null, 'STUDENT')::"Role",
        now()
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

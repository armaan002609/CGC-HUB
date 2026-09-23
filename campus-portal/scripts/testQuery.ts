import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  try {
    const res = await prisma.$queryRaw`SELECT typname FROM pg_type WHERE typname ILIKE '%role%'`;
    console.log(res);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

run();

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const events = await prisma.sportsEvent.findMany()
  console.log(events)
}

main().finally(() => prisma.$disconnect())

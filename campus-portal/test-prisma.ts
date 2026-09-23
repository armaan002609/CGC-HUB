import { PrismaClient } from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()
  try {
    const events = await prisma.sportsEvent.findMany({
      include: { managers: true }
    })
    console.log("SUCCESS:", events)
  } catch (e) {
    console.error("ERROR:", e)
  } finally {
    await prisma.$disconnect()
  }
}

main()

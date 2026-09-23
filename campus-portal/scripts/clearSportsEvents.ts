import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing Sports Events data...')
  const deleted = await prisma.sportsEvent.deleteMany({})
  console.log(`Deleted ${deleted.count} events! ✨`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

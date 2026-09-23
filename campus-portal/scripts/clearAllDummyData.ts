import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning up all dummy data from events and ledgers...')

  // Delete all MedalLedgers
  const ledgerResult = await prisma.medalLedger.deleteMany({})
  console.log(`Deleted ${ledgerResult.count} MedalLedger records.`)

  // Delete all SportsEvents
  const sportsResult = await prisma.sportsEvent.deleteMany({})
  console.log(`Deleted ${sportsResult.count} SportsEvent records.`)

  // Delete all CulturalEvents
  const culturalResult = await prisma.culturalEvent.deleteMany({})
  console.log(`Deleted ${culturalResult.count} CulturalEvent records.`)

  // Delete all Hackathons
  const hackathonResult = await prisma.hackathon.deleteMany({})
  console.log(`Deleted ${hackathonResult.count} Hackathon records.`)

  console.log('Cleanup complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

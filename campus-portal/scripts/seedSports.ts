import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Sports data...')

  // 1. Create a dummy user for the player profiles
  const user1 = await prisma.user.upsert({
    where: { email: 'mjohnson@cgc.edu' },
    update: {},
    create: {
      email: 'mjohnson@cgc.edu',
      name: 'Marcus Johnson',
      department: 'Engineering',
      role: 'STUDENT',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'schen@cgc.edu' },
    update: {},
    create: {
      email: 'schen@cgc.edu',
      name: 'Sarah Chen',
      department: 'Science',
      role: 'STUDENT',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'dkim@cgc.edu' },
    update: {},
    create: {
      email: 'dkim@cgc.edu',
      name: 'David Kim',
      department: 'Business',
      role: 'STUDENT',
    },
  })

  // 2. Create Player Profiles
  await prisma.playerProfile.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      department: 'Engineering',
      sports: ['Basketball'],
      stats: { ppg: '18.5', apg: '7.2', role: 'Point Guard' },
      bio: 'Team captain for the Engineering basketball squad.',
    },
  })

  await prisma.playerProfile.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      department: 'Science',
      sports: ['Volleyball'],
      stats: { assists: '45', aces: '12', role: 'Setter' },
      bio: 'Leading the Science volleyball team to victory.',
    },
  })

  await prisma.playerProfile.upsert({
    where: { userId: user3.id },
    update: {},
    create: {
      userId: user3.id,
      department: 'Business',
      sports: ['Football'],
      stats: { goals: '14', assists: '5', role: 'Striker' },
      bio: 'Top scorer of the season.',
    },
  })

  // 3. Create Sports Events (Live & Upcoming)
  // Clear existing to avoid duplicates on multiple seed runs
  await prisma.sportsEvent.deleteMany({})

  await prisma.sportsEvent.createMany({
    data: [
      {
        title: 'Inter-Department Semi-Finals',
        sport: 'Basketball',
        teams: ['Engineering', 'Business'],
        venue: 'Main Indoor Arena',
        schedule: new Date(),
        status: 'LIVE',
        liveScoreState: { scoreA: 82, scoreB: 78, status: 'Q4 - 02:14' },
      },
      {
        title: 'Varsity Match',
        sport: 'Volleyball',
        teams: ['Arts', 'Science'],
        venue: 'North Courts',
        schedule: new Date(),
        status: 'LIVE',
        liveScoreState: { scoreA: 2, scoreB: 1, status: 'Set 4' },
      },
      {
        title: 'Group Stage Match',
        sport: 'Football',
        teams: ['Business', 'Arts'],
        venue: 'Campus Stadium',
        schedule: new Date(Date.now() + 86400000), // Tomorrow
        status: 'UPCOMING',
      },
      {
        title: 'Championship Final',
        sport: 'Tennis',
        teams: ['Law', 'Medical'],
        venue: 'North Courts',
        schedule: new Date(Date.now() + 86400000 * 2), // Day after tomorrow
        status: 'UPCOMING',
      },
    ],
  })

  // 4. Create Medal Ledger entries
  await prisma.medalLedger.deleteMany({})
  
  await prisma.medalLedger.createMany({
    data: [
      {
        year: 2023,
        event: 'Annual Inter-Department Athletics',
        sport: 'Overall',
        winnerType: 'TEAM',
        winnerRefs: ['Engineering', 'Business'], // 0 is winner, 1 is runner up
        medal: 'GOLD',
        trophyName: 'Marcus Johnson (MVP)',
      },
      {
        year: 2023,
        event: 'Spring Basketball Tournament',
        sport: 'Basketball',
        winnerType: 'TEAM',
        winnerRefs: ['Engineering', 'Science'],
        medal: 'GOLD',
        trophyName: 'Sarah Chen (MVP)',
      },
      {
        year: 2022,
        event: 'Winter Football Cup',
        sport: 'Football',
        winnerType: 'TEAM',
        winnerRefs: ['Business', 'Arts'],
        medal: 'GOLD',
        trophyName: 'David Kim (MVP)',
      },
      {
        year: 2022,
        event: 'Campus Tennis Open',
        sport: 'Tennis',
        winnerType: 'TEAM',
        winnerRefs: ['Medical', 'Law'],
        medal: 'GOLD',
        trophyName: 'Elena Rodriguez (MVP)',
      },
    ],
  })

  console.log('Seeding complete! ✨')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

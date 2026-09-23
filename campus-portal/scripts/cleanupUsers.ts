import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning up dummy users...')

  // Delete all users EXCEPT the admin account (admin@cgc.edu)
  const result = await prisma.user.deleteMany({
    where: {
      email: {
        not: 'admin@cgc.edu'
      }
    }
  })

  console.log(`Deleted ${result.count} dummy users.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

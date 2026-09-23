import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testInsert() {
  try {
    const user = await prisma.user.create({
      data: {
        id: '123e4567-e89b-12d3-a456-426614174000', // a valid UUID
        email: 'test@example.com',
        name: 'Test User',
        role: 'STUDENT',
      }
    })
    console.log('Insert successful:', user)
  } catch (error) {
    console.error('Insert failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testInsert()

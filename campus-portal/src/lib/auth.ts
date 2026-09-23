import { createClient } from "@/utils/supabase/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {}

export async function getServerSession(options?: any) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    // Fetch the user from Prisma to get their actual role
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: dbUser?.name || user.user_metadata?.name || 'User',
        role: dbUser?.role || 'STUDENT'
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

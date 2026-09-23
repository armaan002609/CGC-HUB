import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get the currently authenticated user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already exists in Prisma
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!existingUser) {
      // Determine name (Google provides full_name, regular signup might not have it)
      const name = user.user_metadata?.full_name || user.user_metadata?.name || 'Student'
      
      // Create user in Prisma
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: name,
          role: 'STUDENT',
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error syncing user:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

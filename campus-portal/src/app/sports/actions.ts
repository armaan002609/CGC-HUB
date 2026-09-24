"use server"

import prisma from "@/lib/db"

export async function getLiveSportsEvents() {
  return await prisma.sportsEvent.findMany({
    where: { status: 'LIVE' },
    orderBy: { schedule: 'asc' }
  })
}

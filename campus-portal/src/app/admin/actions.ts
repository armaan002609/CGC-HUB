"use server"

import prisma from "@/lib/db"

import { authOptions, getServerSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createSportsEvent(formData: FormData) {
  // Verify Admin or Moderator Role
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    throw new Error("Unauthorized")
  }

  const title = formData.get("title") as string
  const sport = formData.get("sport") as string
  const teamA = formData.get("teamA") as string
  const teamB = formData.get("teamB") as string
  const venue = formData.get("venue") as string
  const scheduleString = formData.get("schedule") as string
  const status = formData.get("status") as "UPCOMING" | "LIVE" | "COMPLETED"

  if (!title || !sport || !teamA || !teamB || !venue || !scheduleString || !status) {
    throw new Error("Missing required fields")
  }

  // Parse the local datetime string from the form into a Date object
  const scheduleDate = new Date(scheduleString)

  // Initialize live score state for LIVE events
  const liveScoreState = status === "LIVE" ? { scoreA: 0, scoreB: 0, status: "Starting..." } : null

  await prisma.sportsEvent.create({
    data: {
      title,
      sport,
      teams: [teamA, teamB],
      venue,
      schedule: scheduleDate,
      status,
      liveScoreState
    }
  })

  // Invalidate the cache for the public pages so the new event appears instantly
  revalidatePath("/sports/schedule")
  revalidatePath("/sports/live")
  
  return { success: true }
}

export async function bulkCreateSportsEvents(events: any[]) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    throw new Error("Unauthorized")
  }

  if (!events || events.length === 0) {
    throw new Error("No events provided")
  }

  const validEvents = events.map(event => {
    return {
      title: event.title,
      sport: event.sport,
      teams: [event.teamA, event.teamB],
      venue: event.venue,
      schedule: new Date(event.schedule),
      status: event.status || "UPCOMING",
      liveScoreState: event.status === "LIVE" ? { scoreA: 0, scoreB: 0, status: "Starting..." } : null
    }
  })

  await prisma.sportsEvent.createMany({
    data: validEvents
  })

  revalidatePath("/sports/schedule")
  revalidatePath("/sports/live")
  revalidatePath("/admin/sports")

  return { success: true, count: validEvents.length }
}

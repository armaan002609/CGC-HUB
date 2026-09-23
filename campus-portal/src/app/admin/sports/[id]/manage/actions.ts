"use server"

import prisma from "@/lib/db" // cache buster

import { authOptions, getServerSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { EventStatus } from "@prisma/client"

// Helper to check if user has access to manage this event
async function verifyAccess(eventId: string) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  if (session.user.role === "ADMIN") return true

  // If not admin, check if they are in the managers list for this event
  const event = await prisma.sportsEvent.findUnique({
    where: { id: eventId },
    include: { managers: true }
  })

  if (!event) throw new Error("Event not found")

  const isManager = event.managers.some(m => m.id === session.user.id)
  if (!isManager) {
    throw new Error("Unauthorized: You are not assigned to manage this event.")
  }

  return true
}

export async function assignManager(eventId: string, email: string) {
  // Only admins can assign managers
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Admins can assign managers.")
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error(`No user found with email: ${email}`)
  }

  await prisma.sportsEvent.update({
    where: { id: eventId },
    data: {
      managers: {
        connect: { id: user.id }
      }
    }
  })

  revalidatePath(`/admin/sports/${eventId}/manage`)
  return { success: true, userName: user.name }
}

export async function removeManager(eventId: string, userId: string) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.sportsEvent.update({
    where: { id: eventId },
    data: {
      managers: {
        disconnect: { id: userId }
      }
    }
  })

  revalidatePath(`/admin/sports/${eventId}/manage`)
  return { success: true }
}

export async function updateLiveScore(eventId: string, liveScoreState: any) {
  await verifyAccess(eventId)

  await prisma.sportsEvent.update({
    where: { id: eventId },
    data: { liveScoreState }
  })

  revalidatePath(`/admin/sports/${eventId}/manage`)
  revalidatePath(`/sports/${eventId}`) 
  revalidatePath(`/sports/live`) 
  return { success: true }
}

export async function updateEventStatus(eventId: string, status: EventStatus) {
  await verifyAccess(eventId)

  await prisma.sportsEvent.update({
    where: { id: eventId },
    data: { status }
  })

  revalidatePath(`/admin/sports/${eventId}/manage`)
  revalidatePath(`/sports/${eventId}`)
  revalidatePath(`/sports/live`)
  revalidatePath(`/sports/schedule`)
  return { success: true }
}

"use server"

import prisma from "@/lib/db"
import { authOptions, getServerSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { MediaType } from "@prisma/client"

export async function createHighlight(data: { title: string, tag: string, type: MediaType, url: string }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.galleryHighlight.create({
    data
  })

  revalidatePath("/")
  revalidatePath("/admin/highlights")
  return { success: true }
}

export async function deleteHighlight(id: string) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  await prisma.galleryHighlight.delete({
    where: { id }
  })

  revalidatePath("/")
  revalidatePath("/admin/highlights")
  return { success: true }
}

"use server"

import prisma from "@/lib/db"

import { authOptions, getServerSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Role } from "@prisma/client"

export async function updateUserRole(userId: string, newRole: Role) {
  // STRICT SECURITY: Only ADMIN can change roles. MODERATOR cannot.
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Administrators can manage user roles.")
  }

  // Prevent an admin from demoting themselves by accident
  if (userId === session.user.id) {
    throw new Error("You cannot change your own role.")
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  })

  revalidatePath("/admin/users")
  return { success: true }
}

export async function createUser(data: { name: string, email: string, role: Role, department: string }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Administrators can create users.")
  }

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department
    }
  })

  revalidatePath("/admin/users")
  return { success: true }
}

export async function bulkCreateUsers(users: { name: string, email: string, role: string, department: string }[]) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only Administrators can bulk import users.")
  }

  // Filter out invalid rows (e.g., empty rows at the end of a CSV)
  const validUsers = users.filter(u => u.email && u.email.includes('@'))

  if (validUsers.length === 0) {
    throw new Error("No valid users found in the imported file.")
  }

  // Format data for Prisma
  const data = validUsers.map(u => ({
    name: u.name || '',
    email: u.email,
    role: (u.role as Role) || 'STUDENT',
    department: u.department || ''
  }))

  // createMany will skip duplicates if skipDuplicates is true
  const result = await prisma.user.createMany({
    data,
    skipDuplicates: true 
  })

  revalidatePath("/admin/users")
  return { success: true, count: result.count }
}

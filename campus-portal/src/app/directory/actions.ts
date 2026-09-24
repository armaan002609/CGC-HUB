"use server"

import prisma from "@/lib/db"
import { Role } from "@prisma/client"

export async function uploadDirectoryCSV(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    const text = await file.text()
    
    // Basic CSV parsing
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    
    if (lines.length < 2) {
      return { success: false, error: "File seems empty or only has headers" }
    }
    
    // Assume header format: name,email,role,department
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    
    const nameIdx = headers.indexOf('name')
    const emailIdx = headers.indexOf('email')
    const roleIdx = headers.indexOf('role')
    const deptIdx = headers.indexOf('department')
    
    if (nameIdx === -1 || emailIdx === -1) {
      return { success: false, error: "CSV must contain at least 'name' and 'email' columns." }
    }
    
    const usersToCreate = []
    
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim())
      
      const name = parts[nameIdx]
      const email = parts[emailIdx]
      
      if (!name || !email) continue
      
      let role = 'STUDENT'
      if (roleIdx !== -1 && parts[roleIdx]) {
        const parsedRole = parts[roleIdx].toUpperCase()
        if (['STUDENT', 'FACULTY', 'MODERATOR', 'ADMIN'].includes(parsedRole)) {
          role = parsedRole
        }
      }
      
      const department = deptIdx !== -1 ? (parts[deptIdx] || null) : null
      
      usersToCreate.push({
        name,
        email,
        role: role as Role,
        department
      })
    }
    
    // Perform bulk upsert or insert. We'll use upsert to avoid duplicate email errors.
    let count = 0
    for (const u of usersToCreate) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: {
          name: u.name,
          role: u.role,
          department: u.department
        },
        create: {
          name: u.name,
          email: u.email,
          role: u.role,
          department: u.department
        }
      })
      count++
    }
    
    return { success: true, count }
  } catch (error: any) {
    console.error("CSV Upload Error:", error)
    return { success: false, error: error.message || "Failed to process file" }
  }
}

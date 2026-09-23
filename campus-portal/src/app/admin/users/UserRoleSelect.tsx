"use client"

import { useState } from "react"
import { Role } from "@prisma/client"
import { updateUserRole } from "./actions"

export function UserRoleSelect({ userId, currentRole }: { userId: string, currentRole: Role }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [role, setRole] = useState(currentRole)

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role
    setIsUpdating(true)
    setRole(newRole)
    
    try {
      await updateUserRole(userId, newRole)
    } catch (error) {
      alert("Failed to update role. You might not have permission.")
      setRole(currentRole) // revert
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <select 
      value={role} 
      onChange={handleChange}
      disabled={isUpdating}
      className={`text-sm font-bold px-3 py-1.5 rounded-full border-none outline-none appearance-none cursor-pointer pr-8 ${
        role === 'ADMIN' ? 'bg-brand/10 text-brand' :
        role === 'MODERATOR' ? 'bg-[#FBD38D]/30 text-[#DD6B20]' :
        'bg-surface-alt text-ink/70'
      }`}
    >
      <option value="STUDENT">Student</option>
      <option value="FACULTY">Faculty</option>
      <option value="MODERATOR">Moderator</option>
      <option value="ADMIN">Admin</option>
    </select>
  )
}

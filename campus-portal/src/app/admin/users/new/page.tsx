"use client"

import { useState } from "react"
import { createUser } from "../actions"
import { useRouter } from "next/navigation"
import { Users, Mail, Building } from "lucide-react"

export default function NewUserPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      await createUser({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as any,
        department: formData.get("department") as string
      })
      router.push("/admin/users")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to create user.")
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      
      <div>
        <h1 className="text-4xl font-display font-black text-brand tracking-tight">Add New User</h1>
        <p className="text-muted font-medium mt-2">Manually register a student, faculty member, or moderator.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand/5 space-y-8">
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Full Name</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="name"
                type="text" 
                placeholder="e.g. Jane Doe" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="email"
                type="email" 
                placeholder="e.g. jane@cgc.edu" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Platform Role</label>
            <select name="role" required className="w-full bg-surface-alt text-ink font-medium px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors appearance-none">
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="MODERATOR">Moderator</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Department</label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="department"
                type="text" 
                placeholder="e.g. Computer Science" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5 flex justify-end">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full md:w-auto md:px-12 bg-brand hover:bg-brand-dark text-white rounded-full py-4 font-bold text-sm tracking-wider transition-colors shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading ? "CREATING..." : "CREATE USER"}
          </button>
        </div>
      </form>
    </div>
  )
}

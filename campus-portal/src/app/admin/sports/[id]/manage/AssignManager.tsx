"use client"

import { useState } from "react"
import { assignManager, removeManager } from "./actions"
import { UserPlus, X, Mail } from "lucide-react"

export function AssignManager({ eventId, currentManagers }: { eventId: string, currentManagers: any[] }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError("")
    
    try {
      await assignManager(eventId, email)
      setEmail("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (userId: string) => {
    try {
      await removeManager(eventId, userId)
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand/5 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand">Event Managers</h2>
        <p className="text-sm text-muted mt-1">Assign users who are authorized to update the live score.</p>
      </div>

      <div className="space-y-3">
        {currentManagers.length === 0 ? (
          <p className="text-sm font-medium text-muted bg-surface-alt p-4 rounded-xl text-center">
            No managers assigned yet. Only system admins can update scores.
          </p>
        ) : (
          currentManagers.map(manager => (
            <div key={manager.id} className="flex items-center justify-between bg-surface-alt px-4 py-3 rounded-xl border border-black/5">
              <div className="flex flex-col">
                <span className="font-bold text-ink text-sm">{manager.name}</span>
                <span className="text-xs font-medium text-muted">{manager.email}</span>
              </div>
              <button 
                onClick={() => handleRemove(manager.id)}
                className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                title="Remove Manager"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAssign} className="pt-4 border-t border-black/5">
        {error && <p className="text-xs text-red-500 font-bold mb-2">{error}</p>}
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand/50" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Student's email..." 
              className="w-full bg-surface-alt text-ink font-medium pl-10 pr-4 py-2.5 rounded-xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors text-sm"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-brand hover:bg-brand-dark text-white rounded-xl px-4 py-2.5 font-bold text-xs tracking-wider transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            ASSIGN
          </button>
        </div>
      </form>
    </div>
  )
}

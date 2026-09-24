"use client"

import { useState } from "react"
import { assignParticipant, removeParticipant } from "./actions"
import { UserPlus, X, Mail, Users } from "lucide-react"

export function AssignParticipant({ eventId, currentParticipants }: { eventId: string, currentParticipants: any[] }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError("")
    
    try {
      await assignParticipant(eventId, email)
      setEmail("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (userId: string) => {
    try {
      await removeParticipant(eventId, userId)
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand/5 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand flex items-center gap-2">
          <Users className="w-5 h-5 text-[#3182CE]" />
          Event Participants
        </h2>
        <p className="text-sm text-muted mt-1">Add students or faculty who are participating in this event.</p>
      </div>

      <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {currentParticipants.length === 0 ? (
          <p className="text-sm font-medium text-muted bg-surface-alt p-4 rounded-xl text-center">
            No participants added yet.
          </p>
        ) : (
          currentParticipants.map(user => (
            <div key={user.id} className="flex items-center justify-between bg-surface-alt px-4 py-3 rounded-xl border border-black/5">
              <div className="flex flex-col">
                <span className="font-bold text-ink text-sm">{user.name || "Unknown Name"}</span>
                <span className="text-xs font-medium text-muted">{user.email}</span>
              </div>
              <button 
                onClick={() => handleRemove(user.id)}
                className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                title="Remove Participant"
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
              placeholder="Participant's email..." 
              className="w-full bg-surface-alt text-ink font-medium pl-10 pr-4 py-2.5 rounded-xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors text-sm"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-[#3182CE] hover:bg-[#2B6CB0] text-white rounded-xl px-4 py-2.5 font-bold text-xs tracking-wider transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            ADD
          </button>
        </div>
      </form>
    </div>
  )
}

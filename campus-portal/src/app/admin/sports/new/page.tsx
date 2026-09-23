"use client"

import { useState } from "react"
import { createSportsEvent } from "../../actions"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Trophy, Users } from "lucide-react"

export default function NewSportsEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      await createSportsEvent(formData)
      // Redirect back to admin dashboard after creation
      router.push("/admin")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to create event.")
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      
      <div>
        <h1 className="text-4xl font-display font-black text-brand tracking-tight">Create Sports Event</h1>
        <p className="text-muted font-medium mt-2">Schedule a new match or tournament for the campus.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand/5 space-y-8">
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Event Title</label>
            <input 
              name="title"
              type="text" 
              placeholder="e.g. Inter-Department Semi-Finals" 
              className="w-full bg-surface-alt text-ink font-medium px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
              required
            />
          </div>

          {/* Sport */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Sport</label>
            <div className="relative">
              <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <select name="sport" required className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors appearance-none">
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Table Tennis">Table Tennis</option>
                <option value="Athletics">Athletics</option>
                <option value="Swimming">Swimming</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Initial Status</label>
            <select name="status" required className="w-full bg-surface-alt text-ink font-medium px-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors appearance-none">
              <option value="UPCOMING">Upcoming</option>
              <option value="LIVE">Live Now</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Teams */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Team A</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="teamA"
                type="text" 
                placeholder="e.g. Engineering" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Team B</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="teamB"
                type="text" 
                placeholder="e.g. Business" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Date & Time</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="schedule"
                type="datetime-local" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Venue</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
              <input 
                name="venue"
                type="text" 
                placeholder="e.g. Main Indoor Arena" 
                className="w-full bg-surface-alt text-ink font-medium pl-12 pr-6 py-4 rounded-2xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full md:w-auto md:px-12 bg-brand hover:bg-brand-dark text-white rounded-full py-4 font-bold text-sm tracking-wider transition-colors shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading ? "CREATING..." : "CREATE EVENT"}
          </button>
        </div>
      </form>
    </div>
  )
}

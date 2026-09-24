"use client"

import { useState } from "react"
import { awardMedal } from "./actions"
import { Medal, Mail, Award } from "lucide-react"

export function AwardMedal({ eventId }: { eventId: string }) {
  const [email, setEmail] = useState("")
  const [medalType, setMedalType] = useState<"GOLD" | "SILVER" | "BRONZE">("GOLD")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleAward = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    setError("")
    setSuccessMsg("")
    
    try {
      await awardMedal(eventId, email, medalType)
      setSuccessMsg(`Successfully awarded ${medalType} medal!`)
      setEmail("")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
      setTimeout(() => setSuccessMsg(""), 5000)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#D69E2E]/20 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#D69E2E] flex items-center gap-2">
          <Award className="w-5 h-5" />
          Award Medals
        </h2>
        <p className="text-sm text-muted mt-1">Officially log a medal achievement to a participant's profile.</p>
      </div>

      <form onSubmit={handleAward} className="space-y-4">
        {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
        {successMsg && <p className="text-xs text-green-600 font-bold">{successMsg}</p>}
        
        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D69E2E]/50" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Winner's email address..." 
              className="w-full bg-[#FFFFF0] text-ink font-medium pl-10 pr-4 py-2.5 rounded-xl border-2 border-transparent focus:border-[#D69E2E]/30 outline-none transition-colors text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(["GOLD", "SILVER", "BRONZE"] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setMedalType(type)}
                className={`py-2 rounded-xl text-xs font-bold tracking-wider transition-all border-2 ${
                  medalType === type 
                    ? type === 'GOLD' ? 'bg-[#ECC94B] border-[#D69E2E] text-white' :
                      type === 'SILVER' ? 'bg-[#E2E8F0] border-[#CBD5E0] text-slate-700' :
                      'bg-[#ED8936] border-[#DD6B20] text-white'
                    : 'bg-transparent border-black/5 text-muted hover:border-black/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#D69E2E] hover:bg-[#B7791F] text-white rounded-xl px-4 py-3 font-bold text-sm tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Medal className="w-5 h-5" />
          AWARD ACHIEVEMENT
        </button>
      </form>
    </div>
  )
}

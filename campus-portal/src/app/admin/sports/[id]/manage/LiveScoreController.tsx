"use client"

import { useState } from "react"
import { updateLiveScore, updateEventStatus } from "./actions"
import { EventStatus } from "@prisma/client"
import { Activity, CheckCircle, Save, Calendar } from "lucide-react"

export function LiveScoreController({ event }: { event: any }) {
  const [status, setStatus] = useState<EventStatus>(event.status)
  
  // Default structure to match what is expected in DB and live display
  const defaultScore = {
    scoreA: 0,
    scoreB: 0,
    status: "1st Half"
  }

  const [scoreData, setScoreData] = useState<any>(event.liveScoreState || defaultScore)
  const [isSaving, setIsSaving] = useState(false)

  const handleStatusChange = async (newStatus: EventStatus) => {
    setStatus(newStatus)
    await updateEventStatus(event.id, newStatus)
  }

  const handleSaveScore = async () => {
    setIsSaving(true)
    try {
      await updateLiveScore(event.id, scoreData)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand/5 space-y-8">
      
      {/* Status Controller */}
      <div>
        <h2 className="text-xl font-bold text-brand mb-4">Match Status</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => handleStatusChange('UPCOMING')}
            className={`px-4 py-2 rounded-full font-bold text-xs tracking-wider border-2 transition-colors flex items-center gap-2 ${
              status === 'UPCOMING' ? 'bg-[#dd6b20]/10 border-[#dd6b20] text-[#dd6b20]' : 'border-black/5 text-muted hover:border-black/10'
            }`}
          >
            <Calendar className="w-4 h-4" /> UPCOMING
          </button>
          
          <button 
            onClick={() => handleStatusChange('LIVE')}
            className={`px-4 py-2 rounded-full font-bold text-xs tracking-wider border-2 transition-colors flex items-center gap-2 ${
              status === 'LIVE' ? 'bg-[#e53e3e]/10 border-[#e53e3e] text-[#e53e3e]' : 'border-black/5 text-muted hover:border-black/10'
            }`}
          >
            <Activity className={`w-4 h-4 ${status === 'LIVE' ? 'animate-pulse' : ''}`} /> LIVE
          </button>
          
          <button 
            onClick={() => handleStatusChange('COMPLETED')}
            className={`px-4 py-2 rounded-full font-bold text-xs tracking-wider border-2 transition-colors flex items-center gap-2 ${
              status === 'COMPLETED' ? 'bg-[#38a169]/10 border-[#38a169] text-[#38a169]' : 'border-black/5 text-muted hover:border-black/10'
            }`}
          >
            <CheckCircle className="w-4 h-4" /> COMPLETED
          </button>
        </div>
      </div>

      {/* Score Controller */}
      <div className="pt-8 border-t border-black/5">
        <h2 className="text-xl font-bold text-brand mb-6">Live Score Control</h2>
        
        <div className="grid grid-cols-2 gap-6 items-center text-center">
          
          {/* Team A */}
          <div className="space-y-4">
            <h3 className="font-bold text-ink uppercase tracking-wider">{event.teams[0] || 'Team A'}</h3>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setScoreData({...scoreData, scoreA: Math.max(0, (scoreData.scoreA || 0) - 1)})}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center font-bold text-xl hover:bg-brand/10 hover:text-brand transition-colors"
              >-</button>
              <div className="text-5xl font-black font-display text-brand">{scoreData.scoreA || 0}</div>
              <button 
                onClick={() => setScoreData({...scoreData, scoreA: (scoreData.scoreA || 0) + 1})}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center font-bold text-xl hover:bg-brand/10 hover:text-brand transition-colors"
              >+</button>
            </div>
          </div>
          
          {/* Team B */}
          <div className="space-y-4">
            <h3 className="font-bold text-ink uppercase tracking-wider">{event.teams[1] || 'Team B'}</h3>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setScoreData({...scoreData, scoreB: Math.max(0, (scoreData.scoreB || 0) - 1)})}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center font-bold text-xl hover:bg-brand/10 hover:text-brand transition-colors"
              >-</button>
              <div className="text-5xl font-black font-display text-brand">{scoreData.scoreB || 0}</div>
              <button 
                onClick={() => setScoreData({...scoreData, scoreB: (scoreData.scoreB || 0) + 1})}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center font-bold text-xl hover:bg-brand/10 hover:text-brand transition-colors"
              >+</button>
            </div>
          </div>

        </div>

        {/* Match Info */}
        <div className="mt-8 pt-6 border-t border-black/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-1/2">
            <label className="text-xs font-bold uppercase tracking-widest text-ink/70 pl-2">Current Period / Info</label>
            <input 
              type="text" 
              value={scoreData.status || ""}
              onChange={(e) => setScoreData({...scoreData, status: e.target.value})}
              className="w-full mt-1 bg-surface-alt text-ink font-medium px-4 py-2.5 rounded-xl border-2 border-transparent focus:border-brand/20 outline-none transition-colors text-sm"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <button 
              onClick={async () => {
                const finalScore = { ...scoreData, status: "Final" }
                setScoreData(finalScore)
                setStatus('COMPLETED')
                setIsSaving(true)
                try {
                  await updateLiveScore(event.id, finalScore)
                  await updateEventStatus(event.id, 'COMPLETED')
                } catch (err: any) {
                  alert(err.message)
                } finally {
                  setIsSaving(false)
                }
              }}
              disabled={isSaving || status === 'COMPLETED'}
              className="w-full sm:w-auto bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 rounded-full px-6 py-3.5 font-bold text-sm tracking-wider transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              END MATCH
            </button>

            <button 
              onClick={handleSaveScore}
              disabled={isSaving}
              className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white rounded-full px-8 py-3.5 font-bold text-sm tracking-wider transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSaving ? "SAVING..." : "PUBLISH SCORE"}
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

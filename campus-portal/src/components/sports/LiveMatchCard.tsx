import { Trophy, MapPin, Clock } from "lucide-react"

export function LiveMatchCard({ match }: { match: any }) {
  const scoreData = match.liveScoreState || { scoreA: 0, scoreB: 0, status: 'Starting...' }
  const teamA = match.teams[0] || 'Team A'
  const teamB = match.teams[1] || 'Team B'

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full min-w-[280px] sm:min-w-[320px]">
      
      {/* Header Section */}
      <div className="bg-surface-alt px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center border-b border-black/5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-brand font-bold text-[10px] sm:text-xs tracking-wide uppercase">
          <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-[150px]">{match.sport} • {match.venue}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full shadow-sm border border-black/5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e53e3e] animate-pulse shrink-0"></span>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#e53e3e] tracking-widest uppercase">
            {(scoreData as any).status || 'Live'}
          </span>
        </div>
      </div>

      {/* Score Section */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
        
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Team A */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-brand/10 flex items-center justify-center text-xs sm:text-sm font-bold text-brand uppercase shrink-0">
                {teamA.substring(0, 2)}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink truncate max-w-[140px] sm:max-w-[180px]" title={teamA}>
                {teamA}
              </h3>
            </div>
            <div className="text-xl sm:text-2xl font-black font-display text-ink tabular-nums shrink-0">
              {(scoreData as any).scoreA ?? 0}
            </div>
          </div>
          
          {/* Team B */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-brand/10 flex items-center justify-center text-xs sm:text-sm font-bold text-brand uppercase shrink-0">
                {teamB.substring(0, 2)}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink truncate max-w-[140px] sm:max-w-[180px]" title={teamB}>
                {teamB}
              </h3>
            </div>
            <div className="text-xl sm:text-2xl font-black font-display text-ink tabular-nums shrink-0">
              {(scoreData as any).scoreB ?? 0}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-surface-alt/50 px-4 sm:px-6 py-2 sm:py-3 border-t border-black/5 flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-muted">
        <Clock className="w-3 h-3 shrink-0" />
        <span>Started {new Date(match.schedule).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

    </div>
  )
}

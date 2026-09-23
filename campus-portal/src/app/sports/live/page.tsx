import { Trophy, Activity, MapPin, Clock } from "lucide-react"
import prisma from "@/lib/db"
import { LiveScoresRefresh } from "./LiveScoresRefresh"

// Server Component (Data fetching happens on the server)
export default async function LiveScoresPage() {
  // Fetch only LIVE events
  const liveEvents = await prisma.sportsEvent.findMany({
    where: {
      status: 'LIVE'
    },
    orderBy: {
      schedule: 'asc'
    }
  })

  // Helper to safely parse liveScoreState JSON
  const getScoreData = (event: any) => {
    return event.liveScoreState || { scoreA: 0, scoreB: 0, status: 'Starting...' }
  }

  return (
    <div className="container mx-auto px-6 max-w-[1450px] space-y-10 mt-8 mb-20">
      <LiveScoresRefresh />
      
      <div className="border-b border-black/5 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-6 h-6 text-[#e53e3e] animate-pulse" />
          <h1 className="text-3xl font-display font-black text-brand tracking-tight">Live Matches</h1>
        </div>
        <p className="text-muted font-medium">Real-time scoring and updates from ongoing campus events.</p>
      </div>

      {liveEvents.length === 0 ? (
        <div className="p-16 text-center bg-white border border-brand/5 rounded-3xl shadow-sm">
          <Trophy className="w-12 h-12 text-brand/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-ink">No live matches right now</h2>
          <p className="text-muted mt-2">Check the schedule for upcoming games and tournaments.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {liveEvents.map((match) => {
            const scoreData = getScoreData(match)
            const teamA = match.teams[0] || 'Team A'
            const teamB = match.teams[1] || 'Team B'

            return (
              <div key={match.id} className="bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col">
                
                {/* Header Section */}
                <div className="bg-surface-alt px-8 py-4 flex justify-between items-center border-b border-black/5">
                  <div className="flex items-center gap-2 text-brand font-bold text-sm tracking-wide uppercase">
                    <Trophy className="w-4 h-4" />
                    {match.sport}
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-black/5">
                    <span className="w-2 h-2 rounded-full bg-[#e53e3e] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#e53e3e] tracking-widest uppercase">
                      {(scoreData as any).status || 'Live'}
                    </span>
                  </div>
                </div>

                {/* Score Section */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center relative">
                  
                  {/* VS Badge */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-alt text-muted text-sm font-bold tracking-widest px-3 py-1 rounded-lg border border-black/5">
                    VS
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {/* Team A */}
                    <div className="text-center w-[45%]">
                      <div className="text-5xl sm:text-6xl font-black font-display text-ink mb-4 tabular-nums tracking-tighter">
                        {(scoreData as any).scoreA ?? 0}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-ink/80 truncate px-2" title={teamA}>
                        {teamA}
                      </h3>
                    </div>
                    
                    {/* Team B */}
                    <div className="text-center w-[45%]">
                      <div className="text-5xl sm:text-6xl font-black font-display text-ink mb-4 tabular-nums tracking-tighter">
                        {(scoreData as any).scoreB ?? 0}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-ink/80 truncate px-2" title={teamB}>
                        {teamB}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="bg-surface-alt/50 px-8 py-4 border-t border-black/5 flex items-center justify-between text-xs font-medium text-muted">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {match.venue}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Started {match.schedule.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

import { Trophy, Activity } from "lucide-react"
import prisma from "@/lib/db"
import { LiveMatchCard } from "@/components/sports/LiveMatchCard"
import { LiveMatchListClient } from "@/components/sports/LiveMatchListClient"

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
    <div className="container mx-auto px-4 sm:px-6 max-w-[1450px] space-y-6 sm:space-y-10 mt-6 sm:mt-8 mb-20">
      
      <div className="border-b border-black/5 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#e53e3e] animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-display font-black text-brand tracking-tight">Live Matches</h1>
        </div>
        <p className="text-sm sm:text-base text-muted font-medium">Real-time scoring and updates from ongoing campus events.</p>
      </div>

      {liveEvents.length === 0 ? (
        <div className="p-10 sm:p-16 text-center bg-white border border-brand/5 rounded-2xl sm:rounded-3xl shadow-sm">
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-brand/20 mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-bold text-ink">No live matches right now</h2>
          <p className="text-sm sm:text-base text-muted mt-2">Check the schedule for upcoming games and tournaments.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <LiveMatchListClient initialMatches={liveEvents} layout="grid" />
        </div>
      )}
    </div>
  )
}

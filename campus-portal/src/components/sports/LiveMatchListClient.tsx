"use client"

import { useEffect, useState } from "react"
import { LiveMatchCard } from "./LiveMatchCard"
import { getLiveSportsEvents } from "@/app/sports/actions"

export function LiveMatchListClient({ initialMatches, layout = 'carousel' }: { initialMatches: any[], layout?: 'carousel' | 'grid' }) {
  const [matches, setMatches] = useState(initialMatches)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedMatches = await getLiveSportsEvents()
        setMatches(updatedMatches)
      } catch (error) {
        console.error("Failed to fetch live scores", error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {matches.map((match) => (
        layout === 'carousel' ? (
          <div key={match.id} className="snap-center shrink-0 w-[85vw] sm:w-[400px] lg:w-auto">
            <LiveMatchCard match={match} />
          </div>
        ) : (
          <LiveMatchCard key={match.id} match={match} />
        )
      ))}
    </>
  )
}

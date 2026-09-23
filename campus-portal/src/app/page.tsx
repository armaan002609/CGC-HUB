import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/db"
import { LiveMatchCard } from "@/components/sports/LiveMatchCard"
import { Activity } from "lucide-react"

export default async function Home() {
  // Fetch LIVE sports events
  const liveEvents = await prisma.sportsEvent.findMany({
    where: { status: 'LIVE' },
    orderBy: { schedule: 'asc' }
  })

  return (
    <div className="flex flex-col min-h-screen px-4 pb-20">
      
      {/* Live Matches Section - Only shows if there are live matches */}
      {liveEvents.length > 0 && (
        <section className="container mx-auto max-w-[1450px] mt-4 mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#e53e3e] animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-display font-black text-brand tracking-tight">Happening Now</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {liveEvents.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Massive Purple Hero Block - Only shows if NO live matches */}
      {liveEvents.length === 0 && (
        <section className="container mx-auto max-w-[1450px] mt-2 relative overflow-hidden rounded-[2.5rem] bg-brand text-white min-h-[500px] flex items-center">
          
          {/* Abstract/Floral Illustration Placeholder (Left side) */}
          <div className="absolute left-0 bottom-0 w-[55%] h-full">
             <Image src="/hero.jpg" alt="Hero art" fill priority className="object-cover mix-blend-overlay opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/50 to-brand"></div>
          </div>

          {/* Hero Content (Right side) */}
          <div className="relative z-10 w-full flex justify-end px-12 lg:px-24 py-20">
            <div className="max-w-[450px] space-y-8">
              
              {/* Small icon at top */}
              <div className="w-12 h-12 rounded-full bg-[#1A0B2E] border-2 border-dashed border-[#F687B3] flex items-center justify-center mb-8 shadow-xl">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>

              <h1 className="text-2xl lg:text-[26px] font-display font-medium leading-snug">
                Welcome to the <span className="font-bold">Campus Portal</span>. Discover events, manage sports teams, and track cultural activities across the university.
              </h1>
              
              <button className="rounded-full bg-white text-brand border border-white hover:bg-surface-alt px-8 py-3.5 font-bold text-xs tracking-wider uppercase mt-2 shadow-lg transition-colors">
                Explore The Portal
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Content below the hero */}
      <section className="container mx-auto max-w-[1450px] px-12 pt-24 space-y-6">
         <p className="text-[11px] font-black tracking-[0.2em] text-brand uppercase">Explore Your Campus</p>
         <h2 className="text-4xl lg:text-5xl font-display font-medium text-brand leading-[1.1] max-w-3xl">
           Join the community and stay connected with everything happening on campus.
         </h2>
      </section>

    </div>
  )
}

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
        <>
          <section className="container mx-auto max-w-[1450px] mt-2 relative overflow-hidden rounded-[2.5rem] bg-brand text-white min-h-[400px] flex items-center">
            
            {/* Abstract/Floral Illustration Placeholder (Left side) */}
            <div className="absolute left-0 bottom-0 w-[55%] h-full">
               <Image src="/hero.jpg" alt="Hero art" fill priority className="object-cover mix-blend-overlay opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/50 to-brand"></div>
            </div>

            {/* Hero Content (Right side) */}
            <div className="relative z-10 w-full flex justify-end px-12 lg:px-24 py-16">
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

          {/* Past Highlights Gallery (Images and Videos) */}
          <section className="container mx-auto max-w-[1450px] mt-12 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-brand tracking-tight">Recent Highlights</h2>
                <p className="text-sm text-muted mt-2">Relive the best moments from our sports and cultural events</p>
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-brand hover:text-brand-dark px-4 py-2 bg-brand/5 hover:bg-brand/10 rounded-full transition-colors">
                View All Media
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {/* Highlight 1 - Large Span */}
              <div className="col-span-2 row-span-2 rounded-2xl sm:rounded-3xl overflow-hidden relative group">
                <Image src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80" alt="Basketball Match" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand/90 px-3 py-1 rounded-full mb-3 inline-block">Basketball Finals</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">Inter-College Championship 2026</h3>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="col-span-2 md:col-span-1 row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group">
                <Image src="https://images.unsplash.com/photo-1518605368461-1e1e1db7593c?w=800&q=80" alt="Soccer Match" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-[#e53e3e]/90 px-2 py-0.5 rounded-full mb-2 inline-block">Football</span>
                </div>
              </div>

              {/* Highlight 3 - Video Placeholder */}
              <div className="col-span-2 md:col-span-1 row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group bg-black">
                {/* Fallback image if video fails */}
                <Image src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Cultural Event" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white pl-1 shadow-xl">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-[#dd6b20]/90 px-2 py-0.5 rounded-full mb-2 inline-block">Cultural Fest</span>
                </div>
              </div>

              {/* Highlight 4 */}
              <div className="col-span-2 md:col-span-2 row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group">
                <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&q=80" alt="Hackathon" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#38a169]/90 px-3 py-1 rounded-full mb-2 inline-block">Hackathon</span>
                  <h3 className="text-lg font-bold font-display">48-Hour Coding Marathon</h3>
                </div>
              </div>
            </div>
          </section>
        </>
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

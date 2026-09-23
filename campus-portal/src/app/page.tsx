import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/db"
import { LiveMatchCard } from "@/components/sports/LiveMatchCard"
import { Activity } from "lucide-react"
import { VideoHighlight } from "@/components/VideoHighlight"
import { HeroSlider } from "@/components/HeroSlider"

export default async function Home() {
  // Fetch LIVE sports events
  const liveEvents = await prisma.sportsEvent.findMany({
    where: { status: 'LIVE' },
    orderBy: { schedule: 'asc' }
  })

  // Fetch Gallery Highlights
  const highlights = await prisma.galleryHighlight.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 4
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

      {/* Hero Image Slider - Only shows if NO live matches */}
      {liveEvents.length === 0 && (
        <>
          <HeroSlider />

          {/* Past Highlights Gallery (Images and Videos) */}
          <section className="container mx-auto max-w-[1450px] mt-12 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-brand tracking-tight">Recent Highlights</h2>
                <p className="text-sm text-muted mt-2">Relive the best moments from our sports and cultural events</p>
              </div>
              {/* <button className="text-xs font-bold uppercase tracking-wider text-brand hover:text-brand-dark px-4 py-2 bg-brand/5 hover:bg-brand/10 rounded-full transition-colors">
                View All Media
              </button> */}
            </div>
            
            <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0 md:grid-cols-4 gap-4 md:auto-rows-[200px] scrollbar-hide">
              
              {highlights.length > 0 ? (
                highlights.map((h, i) => {
                  let spanClass = "min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-1 md:row-span-1"
                  if (i === 0) spanClass = "min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-2 md:row-span-2"
                  else if (i === 3) spanClass = "min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-2 md:row-span-1"

                  return (
                    <div key={h.id} className={`${spanClass} rounded-2xl sm:rounded-3xl overflow-hidden relative group bg-black`}>
                      {h.type === 'VIDEO' ? (
                        <VideoHighlight url={h.url} title={h.title} tag={h.tag} isLarge={i === 0 || i === 3} />
                      ) : (
                        <>
                          <Image src={h.url} alt={h.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                          
                          <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-brand/90 px-3 py-1 rounded-full mb-2 inline-block">
                              {h.tag}
                            </span>
                            {(i === 0 || i === 3) && (
                               <h3 className="text-lg sm:text-2xl font-bold font-display leading-tight drop-shadow-md">{h.title}</h3>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })
              ) : (
                /* Fallback Placeholders if no highlights added yet */
                <>
                  <div className="min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-2 md:row-span-2 rounded-2xl sm:rounded-3xl overflow-hidden relative group">
                    <Image src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80" alt="Basketball Match" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-brand/90 px-3 py-1 rounded-full mb-3 inline-block">Basketball Finals</span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">Inter-College Championship 2026</h3>
                    </div>
                  </div>
                  <div className="min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-1 md:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group">
                    <Image src="https://images.unsplash.com/photo-1518605368461-1e1e1db7593c?w=800&q=80" alt="Soccer Match" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-[#e53e3e]/90 px-2 py-0.5 rounded-full mb-2 inline-block">Football</span>
                    </div>
                  </div>
                  <div className="min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-1 md:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group bg-black">
                    <Image src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Cultural Event" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-[#dd6b20]/90 px-2 py-0.5 rounded-full mb-2 inline-block">Cultural Fest</span>
                    </div>
                  </div>
                  <div className="min-w-[85vw] h-[400px] md:min-w-0 md:h-auto snap-center shrink-0 md:col-span-2 md:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative group">
                    <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&q=80" alt="Hackathon" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#38a169]/90 px-3 py-1 rounded-full mb-2 inline-block">Hackathon</span>
                      <h3 className="text-lg font-bold font-display">48-Hour Coding Marathon</h3>
                    </div>
                  </div>
                </>
              )}

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

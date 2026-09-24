import prisma from "@/lib/db"
import { Navbar } from "@/components/layout/Navbar"
import { Users, Award, Shield, Code, Trophy, MapPin, Activity } from "lucide-react"
import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function StudentDirectoryPage() {
  const session = await getServerSession(authOptions)
  
  // Fetch users with their nested participation data
  const users = await prisma.user.findMany({
    include: {
      sportsParticipated: true,
      hackathonsCoordinated: true,
      culturalParticipated: true,
      culturalCoordinated: true,
      registrations: {
        include: { registration: { include: { hackathon: true } } }
      },
      medals: true,
      dutyAssignments: true,
    },
    orderBy: { name: 'asc' }
  })

  // Filter to just show students and faculty (skip admins if needed, but let's show all for a unified directory)
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar dbRole={session?.user?.role} />
      
      <main className="container mx-auto px-6 py-12 max-w-[1450px]">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#6B46C1]/10 text-[#6B46C1] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-6">
              <Users className="w-4 h-4" />
              Campus Directory
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-brand tracking-tight mb-4">
              Student & Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B46C1] to-[#38A169]">Profiles</span>
            </h1>
            <p className="text-lg text-muted font-medium">
              Explore the amazing individuals driving our sports, cultural events, and hackathons.
            </p>
          </div>
          
          <div className="flex gap-4">
             {/* Future search/filter could go here */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => {
            const hasData = 
              user.sportsParticipated.length > 0 || 
              user.registrations.length > 0 || 
              user.culturalParticipated.length > 0 ||
              user.medals.length > 0 ||
              user.dutyAssignments.length > 0;
            
            // For a cleaner directory, optionally skip users who haven't done anything
            if (!hasData && user.role !== 'MODERATOR' && user.role !== 'ADMIN') return null;

            return (
              <div key={user.id} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 hover:border-[#6B46C1]/20 transition-all hover:-translate-y-1 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#6B46C1]/10 text-[#6B46C1] flex items-center justify-center font-bold text-xl font-display">
                      {user.name?.charAt(0) || <Users className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-ink text-lg leading-tight group-hover:text-[#6B46C1] transition-colors">{user.name || 'Anonymous'}</h3>
                      <p className="text-xs font-medium text-muted mt-0.5">{user.department || user.role}</p>
                    </div>
                  </div>
                  
                  {user.medals.length > 0 && (
                    <div className="bg-[#ECC94B]/10 text-[#D69E2E] px-2.5 py-1 rounded-lg font-black text-[10px] flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {user.medals.length}
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-black/5">
                  {/* Sports */}
                  {user.sportsParticipated.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Trophy className="w-4 h-4 text-[#38A169] mt-0.5 opacity-70" />
                      <div>
                        <span className="text-xs font-bold text-ink">Sports Events: </span>
                        <span className="text-xs font-medium text-muted">{user.sportsParticipated.length} played</span>
                      </div>
                    </div>
                  )}

                  {/* Hackathons */}
                  {user.registrations.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Code className="w-4 h-4 text-[#3182CE] mt-0.5 opacity-70" />
                      <div>
                        <span className="text-xs font-bold text-ink">Hackathons: </span>
                        <span className="text-xs font-medium text-muted">{user.registrations.length} teams</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Cultural */}
                  {(user.culturalParticipated.length > 0 || user.dutyAssignments.length > 0) && (
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-[#D53F8C] mt-0.5 opacity-70" />
                      <div>
                        <span className="text-xs font-bold text-ink">Cultural: </span>
                        <span className="text-xs font-medium text-muted">{user.culturalParticipated.length + user.dutyAssignments.length} involvements</span>
                      </div>
                    </div>
                  )}

                  {/* Top Medals Preview */}
                  {user.medals.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-black/5 flex flex-wrap gap-2">
                      {user.medals.map(medal => (
                        <span key={medal.id} className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-surface-alt text-muted" title={medal.event}>
                          <span className={`w-2 h-2 rounded-full ${medal.medal === 'GOLD' ? 'bg-[#ECC94B]' : medal.medal === 'SILVER' ? 'bg-[#E2E8F0]' : 'bg-[#ED8936]'}`} />
                          {medal.sport}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

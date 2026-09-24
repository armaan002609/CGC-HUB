"use client"

import { useState } from "react"
import { Users, Award, Code, Trophy, Activity, ChevronDown, ChevronUp } from "lucide-react"

export function DirectoryClient({ users }: { users: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {users.map((user) => {
        const hasData = 
          user.sportsParticipated.length > 0 || 
          user.registrations.length > 0 || 
          user.culturalParticipated.length > 0 ||
          user.medals.length > 0 ||
          user.dutyAssignments.length > 0;
        
        if (!hasData && user.role !== 'MODERATOR' && user.role !== 'ADMIN') return null;

        const isExpanded = expandedId === user.id;

        return (
          <div 
            key={user.id} 
            className={`relative group bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-[#6B46C1]/40 shadow-md ring-4 ring-[#6B46C1]/5' : 'border-black/5 hover:border-[#6B46C1]/30 hover:shadow-[0_8px_30px_rgb(107,70,193,0.12)] hover:-translate-y-0.5 cursor-pointer'}`}
          >
            {/* Subtle Gradient Background Effect on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-[#6B46C1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isExpanded ? 'opacity-100' : ''}`} />

            {/* Header (Always visible) */}
            <div 
              className="relative p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none z-10"
              onClick={() => setExpandedId(isExpanded ? null : user.id)}
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#6B46C1] to-[#38A169] rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${isExpanded ? 'opacity-50' : ''}`} />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-black/5 text-[#6B46C1] flex items-center justify-center font-black text-2xl font-display shadow-sm">
                    {user.name?.charAt(0) || <Users className="w-6 h-6 text-muted" />}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-black text-ink text-xl sm:text-2xl leading-tight group-hover:text-[#6B46C1] transition-colors">{user.name || 'Anonymous'}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs sm:text-sm font-bold text-muted/80 uppercase tracking-wider">{user.department || user.role}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 z-10">
                {/* Summary Badges */}
                <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-black/5">
                  {user.medals.length > 0 && (
                    <span className="bg-gradient-to-br from-[#ECC94B]/20 to-[#D69E2E]/10 text-[#D69E2E] px-3 py-1.5 rounded-lg font-black text-xs flex items-center gap-1.5 border border-[#ECC94B]/20">
                      <Award className="w-3.5 h-3.5" /> {user.medals.length}
                    </span>
                  )}
                  {user.sportsParticipated.length > 0 && (
                    <span className="bg-gradient-to-br from-[#38A169]/20 to-[#2F855A]/10 text-[#2F855A] px-3 py-1.5 rounded-lg font-black text-xs flex items-center gap-1.5 border border-[#38A169]/20">
                      <Trophy className="w-3.5 h-3.5" /> {user.sportsParticipated.length}
                    </span>
                  )}
                  {user.sportsParticipated.length === 0 && user.medals.length === 0 && (
                    <span className="text-xs font-medium text-muted/50 italic px-2">Click to view details</span>
                  )}
                </div>

                <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-[#6B46C1] text-white shadow-md' : 'bg-surface-alt text-muted group-hover:bg-[#6B46C1]/10 group-hover:text-[#6B46C1]'}`}>
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="relative z-10 px-5 sm:px-6 pb-6 pt-2 border-t border-black/5 bg-white/80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  
                  {/* Sports */}
                  {(user.sportsParticipated.length > 0 || user.medals.length > 0) && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5">
                      <h4 className="font-bold text-ink flex items-center gap-2 mb-3 text-sm">
                        <Trophy className="w-4 h-4 text-[#38A169]" />
                        Sports & Achievements
                      </h4>
                      <ul className="space-y-2">
                        {user.medals.map((medal: any) => (
                          <li key={medal.id} className="text-sm font-medium flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${medal.medal === 'GOLD' ? 'bg-[#ECC94B]' : medal.medal === 'SILVER' ? 'bg-[#E2E8F0]' : 'bg-[#ED8936]'}`} />
                            <span className="text-ink">{medal.medal} Medal</span>
                            <span className="text-muted text-xs">in {medal.sport} ({medal.event})</span>
                          </li>
                        ))}
                        {user.sportsParticipated.map((sport: any) => (
                          <li key={sport.id} className="text-sm font-medium text-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            Participated in {sport.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Hackathons */}
                  {user.registrations.length > 0 && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5">
                      <h4 className="font-bold text-ink flex items-center gap-2 mb-3 text-sm">
                        <Code className="w-4 h-4 text-[#3182CE]" />
                        Hackathons
                      </h4>
                      <ul className="space-y-2">
                        {user.registrations.map((reg: any) => (
                          <li key={reg.id} className="text-sm font-medium text-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            {reg.registration?.hackathon?.title || "Team Member"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cultural */}
                  {(user.culturalParticipated.length > 0 || user.dutyAssignments.length > 0) && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5">
                      <h4 className="font-bold text-ink flex items-center gap-2 mb-3 text-sm">
                        <Activity className="w-4 h-4 text-[#D53F8C]" />
                        Cultural Events
                      </h4>
                      <ul className="space-y-2">
                        {user.culturalParticipated.map((event: any) => (
                          <li key={event.id} className="text-sm font-medium text-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            Participant in {event.title}
                          </li>
                        ))}
                        {user.dutyAssignments.map((duty: any) => (
                          <li key={duty.id} className="text-sm font-medium text-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            Duty: {duty.role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!hasData && (
                    <div className="col-span-2 text-center p-4">
                      <p className="text-sm text-muted font-medium">No recorded campus involvements.</p>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

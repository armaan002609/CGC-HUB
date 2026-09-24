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
            className={`bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border transition-all overflow-hidden ${isExpanded ? 'border-[#6B46C1]/30' : 'border-black/5 hover:border-black/15 cursor-pointer'}`}
          >
            {/* Header (Always visible) */}
            <div 
              className="p-5 flex items-center justify-between cursor-pointer select-none"
              onClick={() => setExpandedId(isExpanded ? null : user.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6B46C1]/10 text-[#6B46C1] flex items-center justify-center font-bold text-xl font-display flex-shrink-0">
                  {user.name?.charAt(0) || <Users className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-ink text-lg leading-tight group-hover:text-[#6B46C1] transition-colors">{user.name || 'Anonymous'}</h3>
                  <p className="text-xs font-medium text-muted mt-0.5">{user.department || user.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Summary Badges (Optional, but nice to have before expanding) */}
                <div className="hidden sm:flex gap-2">
                  {user.medals.length > 0 && (
                    <span className="bg-[#ECC94B]/10 text-[#D69E2E] px-2 py-1 rounded-md font-bold text-[10px] flex items-center gap-1">
                      <Award className="w-3 h-3" /> {user.medals.length}
                    </span>
                  )}
                  {user.sportsParticipated.length > 0 && (
                    <span className="bg-[#38A169]/10 text-[#2F855A] px-2 py-1 rounded-md font-bold text-[10px] flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> {user.sportsParticipated.length}
                    </span>
                  )}
                </div>

                <div className="text-muted bg-surface p-2 rounded-full">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-2 border-t border-black/5 bg-surface-alt/30">
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

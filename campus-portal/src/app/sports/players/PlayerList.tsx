"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type PlayerListProps = {
  playerProfiles: any[];
};

export default function PlayerList({ playerProfiles }: PlayerListProps) {
  const [search, setSearch] = useState("");

  const filteredProfiles = playerProfiles.filter((profile) => 
    profile.user.name?.toLowerCase().includes(search.toLowerCase()) ||
    profile.department?.toLowerCase().includes(search.toLowerCase()) ||
    profile.sports.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const palette = { color: "bg-surface-alt", accent: "text-brand", badge: "bg-brand" };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-display font-black text-brand tracking-tight">Player Profiles</h1>
          <p className="text-muted font-medium mt-2">Discover the top athletes across all departments.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search athletes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-alt text-brand font-medium pl-12 pr-4 py-3 rounded-full border-2 border-transparent focus:border-brand/20 outline-none transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => {
          const stats = (typeof profile.stats === 'object' && profile.stats !== null) 
            ? profile.stats as Record<string, string> 
            : {};
          const { role, ...displayStats } = stats;
          
          return (
            <div key={profile.id} className={`${palette.color} rounded-3xl p-8 hover:-translate-y-1 transition-transform shadow-sm relative overflow-hidden group`}>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-16 h-16 rounded-full ${palette.badge} text-white flex items-center justify-center text-2xl font-black font-display shadow-lg group-hover:scale-110 transition-transform`}>
                  {profile.user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-ink">{profile.user.name}</h3>
                  <p className={`text-sm font-bold uppercase tracking-widest ${palette.accent}`}>{profile.sports[0] || 'Athlete'}</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-muted font-medium text-sm">Role</span>
                  <span className="font-bold text-ink">{role || 'Player'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-2">
                  <span className="text-muted font-medium text-sm">Department</span>
                  <span className="font-bold text-ink">{profile.department}</span>
                </div>
                
                <div className="pt-2 flex gap-4">
                  {Object.entries(displayStats).map(([key, value]) => (
                    <div key={key} className="flex-1 bg-white/50 rounded-2xl p-3 text-center">
                      <div className="text-2xl font-black font-display text-ink leading-none">{String(value)}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted mt-1">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          );
        })}
        {filteredProfiles.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted font-medium">
            No athletes found matching "{search}"
          </div>
        )}
      </div>
    </>
  );
}

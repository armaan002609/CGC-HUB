import { notFound } from "next/navigation"
import prisma from "@/lib/db"

export default async function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const player = await prisma.playerProfile.findUnique({
    where: { id },
    include: {
      user: true
    }
  })

  if (!player) {
    notFound()
  }

  const stats = (typeof player.stats === 'object' && player.stats !== null) 
    ? player.stats as Record<string, string> 
    : {};
  const { role, ...displayStats } = stats;
  const palette = { color: "bg-surface-alt", accent: "text-brand", badge: "bg-brand" };

  return (
    <div className="container mx-auto px-6 max-w-[800px] space-y-8 mt-12 mb-20">
      <div className={`${palette.color} rounded-3xl p-12 shadow-sm relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 relative z-10">
          <div className={`w-32 h-32 rounded-full ${palette.badge} text-white flex items-center justify-center text-5xl font-black font-display shadow-lg`}>
            {player.user.name?.charAt(0) || 'U'}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-display font-black text-ink">{player.user.name}</h1>
            <p className={`text-lg font-bold uppercase tracking-widest mt-2 ${palette.accent}`}>{player.sports.join(', ') || 'Athlete'}</p>
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-2xl p-6">
              <span className="text-muted font-medium text-sm block mb-1">Role</span>
              <span className="font-bold text-ink text-lg">{role || 'Player'}</span>
            </div>
            <div className="bg-white/50 rounded-2xl p-6">
              <span className="text-muted font-medium text-sm block mb-1">Department</span>
              <span className="font-bold text-ink text-lg">{player.department || 'N/A'}</span>
            </div>
          </div>
          
          {Object.keys(displayStats).length > 0 && (
            <div>
              <h3 className="text-xl font-bold font-display text-ink mb-4">Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(displayStats).map(([key, value]) => (
                  <div key={key} className="bg-white/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-black font-display text-ink leading-none">{String(value)}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted mt-2">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {player.bio && (
            <div>
              <h3 className="text-xl font-bold font-display text-ink mb-2">Biography</h3>
              <p className="text-muted leading-relaxed">{player.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

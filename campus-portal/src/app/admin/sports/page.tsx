import prisma from "@/lib/db"
import Link from "next/link"
import { Trophy, Plus, MapPin, Calendar, Activity } from "lucide-react"
import { CSVImportButton } from "./CSVImportButton"

export default async function AdminSportsPage() {
  const events = await prisma.sportsEvent.findMany({
    orderBy: { schedule: 'desc' }
  })

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-brand tracking-tight">Sports Events</h1>
          <p className="text-muted font-medium mt-2">Manage all university athletic competitions.</p>
        </div>
        
        <div className="flex gap-4">
          <CSVImportButton />
          <Link 
            href="/admin/sports/new" 
            className="bg-brand hover:bg-brand-dark text-white rounded-full px-8 py-3.5 font-bold text-sm tracking-wider transition-colors shadow-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            CREATE EVENT
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-brand/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-alt text-brand">
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Match</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Sport</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Venue & Time</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Status</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted font-medium">
                    No sports events found.
                  </td>
                </tr>
              ) : events.map((event) => (
                <tr key={event.id} className="hover:bg-brand/5 transition-colors group">
                  <td className="p-6">
                    <h4 className="font-bold text-ink text-lg">{event.title}</h4>
                    <p className="text-sm font-medium text-muted mt-1">{event.teams.join(' vs ')}</p>
                  </td>
                  <td className="p-6">
                    <div className="inline-flex items-center gap-2 bg-[#F3F0FF] text-[#6B46C1] px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider">
                      <Trophy className="w-3.5 h-3.5" />
                      {event.sport}
                    </div>
                  </td>
                  <td className="p-6 space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-ink/80">
                      <Calendar className="w-4 h-4 opacity-70" />
                      {event.schedule.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted">
                      <MapPin className="w-4 h-4 opacity-70" />
                      {event.venue}
                    </div>
                  </td>
                  <td className="p-6">
                    {event.status === 'LIVE' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e53e3e] bg-[#e53e3e]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        <Activity className="w-3.5 h-3.5 animate-pulse" /> LIVE
                      </span>
                    )}
                    {event.status === 'UPCOMING' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#dd6b20] bg-[#dd6b20]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        UPCOMING
                      </span>
                    )}
                    {event.status === 'COMPLETED' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38a169] bg-[#38a169]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        COMPLETED
                      </span>
                    )}
                  </td>
                  <td className="p-6 text-right space-x-4">
                    <Link href={`/admin/sports/${event.id}/manage`} className="text-brand font-bold text-sm hover:underline">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

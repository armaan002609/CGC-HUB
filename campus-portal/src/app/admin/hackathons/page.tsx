import prisma from "@/lib/db"
import { Code, Plus, Calendar, Activity, Users } from "lucide-react"

export default async function AdminHackathonsPage() {
  const events = await prisma.hackathon.findMany({
    orderBy: { eventStartDate: 'desc' },
    include: {
      _count: {
        select: { registrations: true }
      }
    }
  })

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-brand tracking-tight">Hackathons</h1>
          <p className="text-muted font-medium mt-2">Manage coding competitions and project submissions.</p>
        </div>
        
        <button className="bg-brand hover:bg-brand-dark text-white rounded-full px-8 py-3.5 font-bold text-sm tracking-wider transition-colors shadow-md flex items-center gap-2">
          <Plus className="w-5 h-5" />
          CREATE HACKATHON
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-brand/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-alt text-brand">
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Event Name</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Event Dates</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Registrations</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Status</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted font-medium">
                    No hackathons found. Click "Create Hackathon" to add one!
                  </td>
                </tr>
              ) : events.map((event) => (
                <tr key={event.id} className="hover:bg-brand/5 transition-colors group">
                  <td className="p-6">
                    <h4 className="font-bold text-ink text-lg">{event.title}</h4>
                    <p className="text-sm font-medium text-muted mt-1 truncate max-w-[300px]">{event.description}</p>
                  </td>
                  <td className="p-6 space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-ink/80">
                      <Calendar className="w-4 h-4 opacity-70" />
                      {event.eventStartDate.toLocaleDateString()} - {event.eventEndDate.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-ink/70">
                      <Users className="w-4 h-4" />
                      {event._count.registrations} Teams
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
                    <button className="text-brand font-bold text-sm hover:underline">Manage</button>
                    <button className="text-brand font-bold text-sm hover:underline">Edit</button>
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

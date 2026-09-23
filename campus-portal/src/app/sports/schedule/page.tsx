import { Calendar as CalendarIcon, MapPin } from "lucide-react"
import prisma from "@/lib/db"

export default async function SchedulePage() {
  const schedule = await prisma.sportsEvent.findMany({
    where: {
      status: 'UPCOMING'
    },
    orderBy: {
      schedule: 'asc'
    }
  })

  // Format helpers
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  // Predefined style palettes for the schedule rows
  const palettes = [
    { bgColor: "bg-[#F3F0FF]", textColor: "text-[#6B46C1]", badgeColor: "bg-[#6B46C1] text-white" },
    { bgColor: "bg-[#FBD38D]/30", textColor: "text-[#DD6B20]", badgeColor: "bg-[#DD6B20] text-white" },
    { bgColor: "bg-[#C6F6D5]/50", textColor: "text-[#2F855A]", badgeColor: "bg-[#38A169] text-white" }
  ]

  return (
    <div className="container mx-auto px-6 max-w-[1450px] space-y-8 mt-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-display font-black text-brand tracking-tight">Tournament Schedule</h1>
          <p className="text-muted font-medium mt-2">Find out when and where your team is playing.</p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-surface-alt text-brand font-bold px-4 py-2 rounded-full border-none outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B46C1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_10px] bg-[right_14px_center]">
            <option>All Sports</option>
            <option>Basketball</option>
            <option>Football</option>
          </select>
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className="p-12 text-center bg-surface-alt rounded-[3rem]">
          <h2 className="text-xl font-bold text-ink">No upcoming matches.</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {schedule.map((match, index) => {
            const palette = palettes[index % palettes.length]
            const timeStr = formatTime(match.schedule)
            const [hour, minute] = timeStr.split(':')
            
            return (
              <div key={match.id} className={`${palette.bgColor} rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:scale-[1.01] transition-transform shadow-sm`}>
                
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center ${palette.badgeColor} shadow-md`}>
                    <span className="text-xs font-black uppercase tracking-widest opacity-80">{formatDate(match.schedule)}</span>
                    <span className="text-2xl font-black font-display leading-none mt-1">{hour}</span>
                    <span className="text-sm font-bold opacity-80">:{minute}</span>
                  </div>
                  
                  <div>
                    <div className={`text-xs font-black uppercase tracking-widest mb-1 ${palette.textColor}`}>
                      {match.title} • {match.sport}
                    </div>
                    <h3 className="text-2xl font-display font-black text-ink">
                      {match.teams.join(' vs ')}
                    </h3>
                    
                    <div className="flex items-center gap-4 mt-3 text-muted font-medium text-sm">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                      </div>
                    </div>
                  </div>
                </div>

                <button className={`${palette.badgeColor} rounded-full px-8 py-3 font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity`}>
                  Add to Calendar
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

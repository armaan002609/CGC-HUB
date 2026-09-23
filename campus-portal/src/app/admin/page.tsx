import Link from "next/link"
import { Trophy, Code, Activity, Plus } from "lucide-react"

export default function AdminDashboard() {
  const quickActions = [
    {
      title: "Add Sports Event",
      description: "Schedule a new match or tournament.",
      href: "/admin/sports/new",
      icon: Trophy,
      color: "bg-[#F3F0FF]",
      accent: "text-[#6B46C1]"
    },
    {
      title: "Create Hackathon",
      description: "Set up a new coding competition.",
      href: "/admin/hackathons/new",
      icon: Code,
      color: "bg-[#FBD38D]/30",
      accent: "text-[#DD6B20]"
    },
    {
      title: "New Cultural Event",
      description: "Organize a festival or club gathering.",
      href: "/admin/cultural/new",
      icon: Activity,
      color: "bg-[#C6F6D5]/50",
      accent: "text-[#2F855A]"
    }
  ]

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
      
      <div>
        <h1 className="text-4xl font-display font-black text-brand tracking-tight">Welcome, Admin</h1>
        <p className="text-muted font-medium mt-2">Manage campus events, approve registrations, and oversee the portal.</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link 
                key={action.title}
                href={action.href}
                className={`${action.color} p-6 rounded-3xl hover:-translate-y-1 transition-transform group`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center ${action.accent} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black font-display text-ink">{action.title}</h3>
                <p className="text-sm font-medium text-muted mt-1">{action.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/50 group-hover:text-ink transition-colors">
                  <Plus className="w-3 h-3" /> Get Started
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="bg-white border border-brand/5 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-ink mb-2">System Status</h2>
        <p className="text-sm text-muted font-medium mb-6">Everything is running smoothly.</p>
        
        <div className="flex items-center gap-2 text-sm font-bold text-[#38A169] bg-[#C6F6D5]/30 px-4 py-2 rounded-full inline-flex">
          <span className="w-2 h-2 rounded-full bg-[#38A169] animate-pulse"></span>
          Database Connected
        </div>
      </div>

    </div>
  )
}

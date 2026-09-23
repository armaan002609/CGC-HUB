"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Activity, Calendar, Users, Medal } from "lucide-react"

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const tabs = [
    { name: "Live Scores", href: "/sports/live", icon: Activity },
    { name: "Schedule", href: "/sports/schedule", icon: Calendar },
    { name: "Player Profiles", href: "/sports/players", icon: Users },
    { name: "Medal Ledger", href: "/sports/ledger", icon: Medal },
  ]

  return (
    <div className="flex flex-col flex-1 pb-20">
      
      {/* Playful Floating Sub-navigation */}
      <div className="bg-surface pt-8 pb-4">
        <div className="container mx-auto px-6 max-w-[1450px]">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              const Icon = tab.icon
              return (
                <Link 
                  key={tab.name}
                  href={tab.href} 
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm
                    ${isActive 
                      ? 'bg-brand text-white shadow-brand/20' 
                      : 'bg-surface-alt text-brand hover:bg-brand/10'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-surface">
        {children}
      </div>
    </div>
  )
}

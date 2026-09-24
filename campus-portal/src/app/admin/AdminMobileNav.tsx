"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Shield, Trophy, Code, Activity, Users as UsersIcon, Settings, Image as ImageIcon, MonitorPlay } from "lucide-react"

export function AdminMobileNav({ isAdmin }: { isAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: "Dashboard", href: "/admin", icon: Shield },
    { name: "Hero Banner", href: "/admin/hero", icon: MonitorPlay },
    { name: "Sports Events", href: "/admin/sports", icon: Trophy },
    { name: "Hackathons", href: "/admin/hackathons", icon: Code },
    { name: "Cultural Events", href: "/admin/cultural", icon: Activity },
    { name: "Highlights", href: "/admin/highlights", icon: ImageIcon },
  ]

  if (isAdmin) {
    links.push(
      { name: "Users", href: "/admin/users", icon: UsersIcon },
      { name: "Settings", href: "/admin/settings", icon: Settings }
    )
  }

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-brand/10">
        <h2 className="text-xl font-display font-black text-brand">Admin Portal</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-brand/5 rounded-lg text-brand">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden flex flex-col p-4 bg-white border-b border-brand/10 space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link 
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-ink hover:bg-brand/5 hover:text-brand rounded-xl transition-colors"
              >
                <Icon className="w-5 h-5 opacity-70" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      )}
    </>
  )
}

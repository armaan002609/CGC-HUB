
import { authOptions, getServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, Trophy, Code, Activity, Users, Settings } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Role-Based Access Control: Only ADMIN or MODERATOR allowed
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    redirect("/")
  }

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: Shield },
    { name: "Sports Events", href: "/admin/sports", icon: Trophy },
    { name: "Hackathons", href: "/admin/hackathons", icon: Code },
    { name: "Cultural Events", href: "/admin/cultural", icon: Activity },
  ]

  // Only real Admins can manage users or settings
  if (session.user.role === "ADMIN") {
    sidebarLinks.push(
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings }
    )
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-brand/5">
          <h2 className="text-xl font-display font-black text-brand tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Admin Portal
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link 
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-ink hover:bg-brand/5 hover:text-brand rounded-xl transition-colors"
              >
                <Icon className="w-4 h-4 opacity-70" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

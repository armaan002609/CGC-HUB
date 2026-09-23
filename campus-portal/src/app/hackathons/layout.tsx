import Link from "next/link"
import { Calendar, Code, LayoutGrid } from "lucide-react"

export default function HackathonsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-1">
      <div className="bg-surface-alt border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center gap-6 overflow-x-auto">
          <Link href="/hackathons/upcoming" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent-hackathons whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            Upcoming
          </Link>
          <Link href="/hackathons/showcase" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent-hackathons whitespace-nowrap">
            <LayoutGrid className="w-4 h-4" />
            Showcase
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-surface">
        {children}
      </div>
    </div>
  )
}

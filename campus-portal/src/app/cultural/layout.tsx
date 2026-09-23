import Link from "next/link"
import { Calendar, Palette, Users, Image as ImageIcon } from "lucide-react"

export default function CulturalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-1">
      <div className="bg-surface-alt border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center gap-6 overflow-x-auto">
          <Link href="/cultural/schedule" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent-cultural whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            Schedule
          </Link>
          <Link href="/cultural/rosters" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent-cultural whitespace-nowrap">
            <Users className="w-4 h-4" />
            Duty Rosters
          </Link>
          <Link href="/cultural/gallery" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-accent-cultural whitespace-nowrap">
            <ImageIcon className="w-4 h-4" />
            Galleries
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-surface">
        {children}
      </div>
    </div>
  )
}

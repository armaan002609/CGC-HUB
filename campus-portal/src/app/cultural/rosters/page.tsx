import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import prisma from "@/lib/db"

export default async function RosterListPage() {
  const events = await prisma.culturalEvent.findMany({
    orderBy: {
      schedule: 'asc'
    },
    include: {
      _count: {
        select: { assignments: true }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div>
        <Badge variant="cultural" className="mb-2">Staff & Faculty</Badge>
        <h1 className="text-3xl font-display font-bold">Duty Rosters</h1>
        <p className="text-muted mt-2">Manage assignments and track check-ins for cultural events.</p>
      </div>

      <div className="grid gap-4">
        {events.length === 0 ? (
          <div className="p-12 text-center bg-surface-alt rounded-3xl">
            <h2 className="text-xl font-bold text-ink">No events found.</h2>
          </div>
        ) : events.map((event) => {
          const isPast = new Date() > event.schedule
          const dateStr = event.schedule.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

          return (
            <Card key={event.id} className={`flex flex-col sm:flex-row transition-colors ${isPast ? 'opacity-70' : 'hover:border-accent-cultural/50'}`}>
              <CardContent className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold font-display">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted mt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {dateStr}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-ink">
                        <Users className="w-4 h-4 text-accent-cultural" />
                        {event._count.assignments} assigned
                      </div>
                    </div>
                  </div>
                  <Badge variant={isPast ? "secondary" : "default"}>{isPast ? 'Completed' : 'Upcoming'}</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 sm:pt-6 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-border bg-surface-alt/50">
                <Button className="w-full sm:w-auto" asChild>
                  <Link href={`/cultural/rosters/${event.id}`}>Manage Roster</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

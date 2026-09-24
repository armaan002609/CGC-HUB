import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"

export default async function CulturalSchedulePage() {
  const events = await prisma.culturalEvent.findMany({
    where: {
      status: { in: ['UPCOMING', 'LIVE'] }
    },
    orderBy: {
      schedule: 'asc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold">Cultural Events</h1>
          <p className="text-muted mt-2">Upcoming schedules and announcements.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {events.length === 0 ? (
          <div className="p-12 text-center bg-surface-alt rounded-3xl">
            <h2 className="text-xl font-bold text-ink">No upcoming events.</h2>
          </div>
        ) : events.map((event) => {
          const dateStr = event.schedule.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          const timeStr = event.schedule.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          
          return (
            <Card key={event.id} className="hover:border-accent-cultural/50 transition-colors flex flex-col sm:flex-row">
              <CardContent className="p-6 flex-1 flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-1 min-w-[140px]">
                  <span className="font-semibold text-ink">{dateStr}</span>
                  <span className="text-sm text-muted">{timeStr}</span>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant={event.status === 'LIVE' ? 'live' : 'default'}>{event.status}</Badge>
                  </div>
                  <h3 className="text-xl font-bold font-display">{event.title}</h3>
                  <p className="text-sm text-muted">📍 {event.venue}</p>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 sm:pt-6 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-border bg-surface-alt/50">
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href={`/cultural/events/${event.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

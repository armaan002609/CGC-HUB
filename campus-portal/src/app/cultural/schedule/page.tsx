import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CulturalSchedulePage() {
  const events = [
    { id: "e1", title: "Annual Drama Club Play: 'The Tempest'", date: "Nov 12, 2023", time: "06:00 PM", venue: "Main Auditorium", status: "Upcoming", type: "Theatre" },
    { id: "e2", title: "Founders' Day Celebration", date: "Dec 05, 2023", time: "10:00 AM", venue: "Open Air Theatre", status: "Announced", type: "Ceremony" },
    { id: "e3", title: "Inter-College Music Fest", date: "Jan 15, 2024", time: "04:00 PM", venue: "Campus Grounds", status: "Registration Open", type: "Music" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold">Cultural Events</h1>
          <p className="text-muted mt-2">Upcoming schedules and announcements.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:border-accent-cultural/50 transition-colors flex flex-col sm:flex-row">
            <CardContent className="p-6 flex-1 flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-1 min-w-[140px]">
                <span className="font-semibold text-ink">{event.date}</span>
                <span className="text-sm text-muted">{event.time}</span>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant="cultural">{event.type}</Badge>
                  <Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'}>{event.status}</Badge>
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
        ))}
      </div>
    </div>
  )
}

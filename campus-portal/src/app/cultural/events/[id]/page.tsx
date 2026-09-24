import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/db"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const event = await prisma.culturalEvent.findUnique({
    where: { id },
    include: {
      coordinators: true,
      reports: {
        include: {
          publishedBy: true
        }
      }
    }
  })

  if (!event) {
    notFound()
  }

  const report = event.reports[0] // just show the first report if it exists

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={event.status === 'LIVE' ? 'live' : 'default'}>{event.status}</Badge>
        </div>
        <h1 className="text-4xl font-display font-bold">{event.title}</h1>
        {event.description && (
          <p className="text-lg text-muted">{event.description}</p>
        )}
        
        <div className="flex flex-wrap gap-6 text-sm text-muted py-4 border-y border-border">
          <div>
            <strong className="block text-ink">Date & Time</strong>
            {event.schedule.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {event.schedule.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div>
            <strong className="block text-ink">Venue</strong>
            {event.venue}
          </div>
          {event.coordinators.length > 0 && (
            <div>
              <strong className="block text-ink">Coordinator</strong>
              {event.coordinators.map(c => c.name).join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="default" asChild>
          <Link href={`/cultural/gallery?eventId=${id}`}>View Gallery</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/cultural/rosters/${id}`}>View Duty Roster</Link>
        </Button>
      </div>

      {/* Post-Event Report */}
      {report && (
        <Card className="bg-surface-alt/30 border-dashed">
          <CardHeader>
            <CardTitle>Post-Event Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <strong className="block text-ink mb-1">Execution Summary</strong>
              <p className="text-muted">{report.summary}</p>
            </div>
            {report.outcomes && (
              <div>
                <strong className="block text-ink mb-1">Outcomes / Incidents</strong>
                <p className="text-muted">{report.outcomes}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <strong className="block text-ink mb-1">Attendance</strong>
                <p className="text-muted tabular-nums">{report.attendanceCount} Attendees</p>
              </div>
              <div>
                <strong className="block text-ink mb-1">Published By</strong>
                <p className="text-muted">{report.publishedBy?.name || 'Unknown'} ({report.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

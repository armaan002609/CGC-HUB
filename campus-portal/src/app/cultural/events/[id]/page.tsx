import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="cultural">Theatre</Badge>
          <Badge variant="default">Completed</Badge>
        </div>
        <h1 className="text-4xl font-display font-bold">Event Details: {id}</h1>
        <p className="text-lg text-muted">A modern adaptation of Shakespeare's classic, performed by the University Drama Society.</p>
        
        <div className="flex flex-wrap gap-6 text-sm text-muted py-4 border-y border-border">
          <div>
            <strong className="block text-ink">Date & Time</strong>
            Nov 12, 2023 • 06:00 PM
          </div>
          <div>
            <strong className="block text-ink">Venue</strong>
            Main Auditorium
          </div>
          <div>
            <strong className="block text-ink">Coordinator</strong>
            Dr. Emily Chen
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="default" asChild>
          <Link href={`/cultural/gallery/${id}`}>View Gallery</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/cultural/rosters/${id}`}>View Duty Roster</Link>
        </Button>
      </div>

      {/* Post-Event Report */}
      <Card className="bg-surface-alt/30 border-dashed">
        <CardHeader>
          <CardTitle>Post-Event Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <strong className="block text-ink mb-1">Execution Summary</strong>
            <p className="text-muted">The event was successfully executed with a full house. Minor audio feedback issues during the second act were resolved quickly by the tech crew.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <strong className="block text-ink mb-1">Attendance</strong>
              <p className="text-muted tabular-nums">450+ Attendees</p>
            </div>
            <div>
              <strong className="block text-ink mb-1">Published By</strong>
              <p className="text-muted">Dr. Emily Chen (Nov 14, 2023)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

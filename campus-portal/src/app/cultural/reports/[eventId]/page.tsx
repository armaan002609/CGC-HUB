import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Calendar } from "lucide-react"
import prisma from "@/lib/db"

export default async function EventReportPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = await params
  const eventId = resolvedParams.eventId

  const report = await prisma.eventReport.findFirst({
    where: { eventId },
    include: {
      event: true,
      publishedBy: true
    }
  })

  if (!report) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div>
        <Badge variant="cultural" className="mb-2">Post-Event Report</Badge>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink">{report.event.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {report.event.schedule.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            Published by {report.publishedBy?.name || 'Admin'}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {report.attendanceCount} Attendees
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="border-accent-cultural/20 bg-surface-alt/30">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted leading-relaxed whitespace-pre-wrap">{report.summary}</p>
          </CardContent>
        </Card>

        {report.outcomes && (
          <Card className="border-accent-cultural/20 bg-surface-alt/30">
            <CardHeader>
              <CardTitle>Outcomes & Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted leading-relaxed whitespace-pre-wrap">{report.outcomes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

import { notFound } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"

export default async function RosterDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = await params;
  const eventId = resolvedParams.eventId;

  const event = await prisma.culturalEvent.findUnique({
    where: { id: eventId },
    include: {
      assignments: {
        include: { user: true },
        orderBy: { shiftStart: 'asc' }
      }
    }
  })

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="cultural" className="mb-2">Duty Roster</Badge>
          <h1 className="text-3xl font-display font-bold">{event.title} - Roster</h1>
          <p className="text-muted mt-2">Manage assignments and track check-ins for this event.</p>
        </div>
        <Button>Assign Duty</Button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Shift Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {event.assignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted">
                  No assignments found for this event.
                </TableCell>
              </TableRow>
            ) : event.assignments.map((row) => {
              const shiftTime = `${row.shiftStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${row.shiftEnd.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
              let status = "Pending"
              if (row.checkInTime) status = "Checked In"
              if (row.checkOutTime) status = "Checked Out"

              return (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.role}</TableCell>
                  <TableCell>{row.user.name}</TableCell>
                  <TableCell className="text-muted">{shiftTime}</TableCell>
                  <TableCell>
                    <Badge variant={status === 'Checked In' ? 'success' : (status === 'Checked Out' ? 'default' : 'warning')}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-brand">Edit</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

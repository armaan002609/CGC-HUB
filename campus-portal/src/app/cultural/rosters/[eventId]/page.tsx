import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function RosterDetailPage() {
  const assignments = [
    { id: 1, role: "Stage Manager", user: "Vikram Singh", shift: "04:00 PM - 09:00 PM", status: "Checked In" },
    { id: 2, role: "Audio Tech", user: "Neha Gupta", shift: "03:30 PM - 09:30 PM", status: "Checked In" },
    { id: 3, role: "Usher (Front)", user: "Amit Kumar", shift: "05:00 PM - 07:00 PM", status: "Pending" },
    { id: 4, role: "Usher (Balcony)", user: "Priya Sharma", shift: "05:00 PM - 07:00 PM", status: "Pending" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="cultural" className="mb-2">Duty Roster</Badge>
          <h1 className="text-3xl font-display font-bold">The Tempest - Stage Crew</h1>
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
            {assignments.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.role}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell className="text-muted">{row.shift}</TableCell>
                <TableCell>
                  <Badge variant={row.status === 'Checked In' ? 'success' : 'warning'}>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-brand">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

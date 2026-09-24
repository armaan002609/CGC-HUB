import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, ArrowRight } from "lucide-react"
import prisma from "@/lib/db"

export default async function MyRegistrationsPage() {
  // In a real app, you would filter by the logged-in user's ID
  // For now, we'll fetch all registrations as a demonstration
  const registrations = await prisma.registration.findMany({
    include: {
      hackathon: true,
      members: {
        include: { user: true }
      }
    },
    orderBy: {
      submittedAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">My Registrations</h1>
        <p className="text-muted mt-2">Manage your hackathon participations and team details.</p>
      </div>

      <div className="grid gap-6">
        {registrations.length === 0 ? (
          <div className="p-12 text-center bg-surface-alt rounded-3xl">
            <h2 className="text-xl font-bold text-ink">You haven't registered for any hackathons yet.</h2>
            <Button className="mt-4" asChild>
              <Link href="/hackathons/upcoming">Browse Upcoming Hackathons</Link>
            </Button>
          </div>
        ) : registrations.map((reg) => (
          <Card key={reg.id} className="flex flex-col md:flex-row border-accent-hackathons/30">
            <CardHeader className="md:w-1/3 bg-surface-alt/30 border-b md:border-b-0 md:border-r border-border">
              <div className="mb-2">
                <Badge variant={reg.status === 'CONFIRMED' ? 'success' : (reg.status === 'WAITLISTED' ? 'warning' : 'secondary')}>
                  {reg.status}
                </Badge>
              </div>
              <CardTitle className="text-xl mb-1">{reg.hackathon.title}</CardTitle>
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Calendar className="w-4 h-4" />
                {reg.hackathon.eventStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-ink mb-1">Team: {reg.teamName}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <Users className="w-4 h-4" />
                    {reg.members.length} Members
                  </div>
                </div>
              </div>
              <div className="bg-surface-alt/50 rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-2">Team Members</h4>
                <div className="flex flex-wrap gap-2">
                  {reg.members.map(member => (
                    <Badge key={member.id} variant="outline" className={member.isLeader ? 'border-brand text-brand' : ''}>
                      {member.user.name} {member.isLeader && '(Leader)'}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 md:border-l border-border bg-surface-alt/10 flex flex-col justify-center">
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href={`/hackathons/${reg.hackathon.id}`}>
                  Event Hub
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

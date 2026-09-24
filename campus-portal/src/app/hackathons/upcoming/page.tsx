import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"
import prisma from "@/lib/db"

export default async function HackathonsUpcomingPage() {
  const hackathons = await prisma.hackathon.findMany({
    where: {
      status: { in: ['UPCOMING', 'LIVE'] }
    },
    include: {
      _count: {
        select: { registrations: true }
      }
    },
    orderBy: {
      eventStartDate: 'asc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Upcoming Hackathons</h1>
        <p className="text-muted mt-2">Find and register for upcoming coding events.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {hackathons.length === 0 ? (
          <div className="p-12 text-center bg-surface-alt rounded-3xl md:col-span-2">
            <h2 className="text-xl font-bold text-ink">No upcoming hackathons.</h2>
          </div>
        ) : hackathons.map((hackathon) => {
          const now = new Date()
          const isRegistrationOpen = now >= hackathon.registrationOpen && now <= hackathon.registrationClose
          
          let closesIn = null
          if (isRegistrationOpen) {
            const diffDays = Math.ceil((hackathon.registrationClose.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            closesIn = `${diffDays} day${diffDays !== 1 ? 's' : ''}`
          }

          const datesStr = `${hackathon.eventStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${hackathon.eventEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
          const statusText = isRegistrationOpen ? 'Registration Open' : hackathon.status

          return (
            <Card key={hackathon.id} className="flex flex-col border-accent-hackathons/30 hover:border-accent-hackathons transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={isRegistrationOpen ? 'live' : 'secondary'}>
                    {statusText}
                  </Badge>
                  {closesIn && (
                    <span className="text-xs font-medium text-status-live bg-status-live/10 px-2 py-1 rounded">
                      Closes in {closesIn}
                    </span>
                  )}
                </div>
                <CardTitle className="text-2xl">{hackathon.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-muted">{hackathon.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-ink">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-muted" />
                    {datesStr}
                  </div>
                  {hackathon._count.registrations > 0 && (
                    <div className="flex items-center gap-1.5 text-accent-hackathons font-medium">
                      <Users className="w-4 h-4 text-muted" />
                      {hackathon._count.registrations} teams registered
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={isRegistrationOpen ? 'default' : 'outline'} asChild>
                  <Link href={`/hackathons/${hackathon.id}`}>
                    {isRegistrationOpen ? 'Register Now' : 'View Details'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

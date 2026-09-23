import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"

export default function HackathonsUpcomingPage() {
  const hackathons = [
    {
      id: "h1",
      title: "Winter CodeFest 2024",
      status: "Registration Open",
      dates: "Dec 15 - Dec 17",
      teamSize: "2-4 members",
      registered: 142,
      description: "A 48-hour hackathon focused on building sustainable tech solutions for the campus.",
      closesIn: "2 days"
    },
    {
      id: "h2",
      title: "AI Innovate",
      status: "Announced",
      dates: "Jan 20 - Jan 21",
      teamSize: "1-3 members",
      registered: 0,
      description: "Explore the frontiers of generative AI. Registration opens next week.",
      closesIn: null
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Upcoming Hackathons</h1>
        <p className="text-muted mt-2">Find and register for upcoming coding events.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {hackathons.map((hackathon) => (
          <Card key={hackathon.id} className="flex flex-col border-accent-hackathons/30 hover:border-accent-hackathons transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={hackathon.status === 'Registration Open' ? 'live' : 'secondary'}>
                  {hackathon.status}
                </Badge>
                {hackathon.closesIn && (
                  <span className="text-xs font-medium text-status-live bg-status-live/10 px-2 py-1 rounded">
                    Closes in {hackathon.closesIn}
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
                  {hackathon.dates}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-muted" />
                  {hackathon.teamSize}
                </div>
                {hackathon.registered > 0 && (
                  <div className="flex items-center gap-1.5 text-accent-hackathons font-medium">
                    {hackathon.registered} teams registered
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={hackathon.status === 'Registration Open' ? 'default' : 'outline'} asChild>
                <Link href={`/hackathons/${hackathon.id}`}>
                  {hackathon.status === 'Registration Open' ? 'Register Now' : 'View Details'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

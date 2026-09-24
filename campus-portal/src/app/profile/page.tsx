import { notFound } from "next/navigation"
import prisma from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function ProfilePage() {
  // Mocking the current logged-in user by taking the first user in the DB
  const user = await prisma.user.findFirst({
    include: {
      playerProfile: true,
      registrations: {
        include: {
          registration: {
            include: { hackathon: true }
          }
        }
      },
      dutyAssignments: {
        include: { event: true }
      }
    }
  })

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Please log in to view your profile.</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 p-8 bg-surface-alt rounded-3xl">
        <div className="w-24 h-24 rounded-full bg-brand text-white flex items-center justify-center text-4xl font-display font-black">
          {user.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-ink">{user.name}</h1>
          <p className="text-muted">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <Badge variant="outline">{user.role}</Badge>
            {user.playerProfile && (
              <Badge variant="sports">Athlete</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hackathon Participations */}
        <Card>
          <CardHeader>
            <CardTitle>Hackathons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.registrations.length === 0 ? (
              <p className="text-muted text-sm">No hackathons joined yet.</p>
            ) : (
              user.registrations.map((member) => (
                <div key={member.id} className="p-3 bg-surface-alt/50 rounded-lg border border-border">
                  <div className="font-bold text-sm text-ink">{member.registration.hackathon.title}</div>
                  <div className="text-xs text-muted flex justify-between mt-1">
                    <span>Team: {member.registration.teamName}</span>
                    <span className={member.isLeader ? "text-brand font-medium" : ""}>
                      {member.isLeader ? "Leader" : "Member"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Cultural Duties */}
        <Card>
          <CardHeader>
            <CardTitle>Cultural Duties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.dutyAssignments.length === 0 ? (
              <p className="text-muted text-sm">No duties assigned.</p>
            ) : (
              user.dutyAssignments.map((duty) => (
                <div key={duty.id} className="p-3 bg-surface-alt/50 rounded-lg border border-border">
                  <div className="font-bold text-sm text-ink">{duty.event.title}</div>
                  <div className="text-xs text-muted flex justify-between items-center mt-1">
                    <span>Role: {duty.role}</span>
                    <Badge variant={duty.checkInTime ? "success" : "secondary"} className="text-[10px] px-1 py-0 h-4">
                      {duty.checkInTime ? "Checked In" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import prisma from "@/lib/db"

export default async function HackathonRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const hackathon = await prisma.hackathon.findUnique({
    where: { id }
  })

  if (!hackathon) {
    notFound()
  }

  const now = new Date()
  const isRegistrationOpen = now >= hackathon.registrationOpen && now <= hackathon.registrationClose

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <Badge variant={isRegistrationOpen ? "live" : "secondary"} className="mb-2">
          {isRegistrationOpen ? 'Registration Open' : hackathon.status}
        </Badge>
        <h1 className="text-3xl font-display font-bold">{hackathon.title}</h1>
        <p className="text-muted mt-2">
          {hackathon.eventStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {hackathon.eventEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
        <p className="mt-4 text-ink">{hackathon.description}</p>
      </div>

      {/* Registration Form (Progressive Disclosure Mock) */}
      <Card>
        <CardHeader className="border-b border-border bg-surface-alt/50">
          <div className="flex items-center justify-between">
            <CardTitle>Team Registration</CardTitle>
            <div className="text-sm font-medium text-muted">Step 1 of 3</div>
          </div>
          <CardDescription>Enter your team details to begin.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input id="teamName" placeholder="e.g. Byte Me" disabled={!isRegistrationOpen} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="track">Project Track</Label>
            <select 
              id="track" 
              className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isRegistrationOpen}
              defaultValue=""
            >
              <option value="" disabled>Select a track</option>
              <option value="sustainability">Sustainable Tech</option>
              <option value="edtech">EdTech Solutions</option>
              <option value="open">Open Innovation</option>
            </select>
          </div>

          <div className="p-4 rounded-md bg-status-info/10 border border-status-info/20 text-sm text-status-info">
            <strong className="block mb-1">Eligibility Note</strong>
            All team members must be currently enrolled students. You will add member details in the next step.
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t border-border pt-6">
          <Button variant="outline">Cancel</Button>
          <Button disabled={!isRegistrationOpen}>
            {isRegistrationOpen ? 'Continue to Members' : 'Registration Closed'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

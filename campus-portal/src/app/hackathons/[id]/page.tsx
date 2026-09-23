import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function HackathonRegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <Badge variant="hackathons" className="mb-2">Registration Open</Badge>
        <h1 className="text-3xl font-display font-bold">Winter CodeFest 2024</h1>
        <p className="text-muted mt-2">Dec 15 - Dec 17 • Team Size: 2-4 members</p>
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
            <Input id="teamName" placeholder="e.g. Byte Me" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="track">Project Track</Label>
            <select 
              id="track" 
              className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <option value="" disabled selected>Select a track</option>
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
          <Button>Continue to Members</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

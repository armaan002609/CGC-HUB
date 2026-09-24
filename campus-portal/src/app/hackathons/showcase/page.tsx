import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, ExternalLink, Trophy } from "lucide-react"
import prisma from "@/lib/db"

export default async function HackathonShowcasePage() {
  const projects = await prisma.submission.findMany({
    orderBy: [
      { rank: 'asc' },
      { submittedAt: 'desc' }
    ],
    include: {
      registration: {
        include: {
          hackathon: true
        }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Project Showcase</h1>
        <p className="text-muted mt-2">Explore projects from past hackathons.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="p-12 text-center bg-surface-alt rounded-3xl md:col-span-2">
            <h2 className="text-xl font-bold text-ink">No projects showcased yet.</h2>
          </div>
        ) : projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="hackathons">{project.registration.hackathon.title}</Badge>
                {project.rank && (
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500 font-bold text-sm bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">
                    <Trophy className="w-4 h-4" />
                    {project.rank}{project.rank === 1 ? 'st' : project.rank === 2 ? 'nd' : project.rank === 3 ? 'rd' : 'th'} Place
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl">{project.projectTitle}</CardTitle>
              <p className="text-sm font-medium text-muted">by Team {project.registration.teamName}</p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-ink/80">{project.description}</p>
            </CardContent>
            <CardFooter className="flex gap-4 border-t border-border pt-6 bg-surface-alt/30">
              {project.repoUrl && (
                <Button variant="outline" className="flex-1 gap-2" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <GitBranch className="w-4 h-4" />
                    Repository
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

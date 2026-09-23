import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, ExternalLink, Trophy } from "lucide-react"

export default function HackathonShowcasePage() {
  const projects = [
    {
      id: "p1",
      title: "EcoTrack",
      team: "Byte Me",
      hackathon: "Sustainability Hack 2023",
      rank: "1st Place",
      description: "An IoT-based dashboard for tracking energy consumption across campus buildings in real-time.",
      tags: ["React", "Node.js", "IoT"],
      repo: "#",
      demo: "#"
    },
    {
      id: "p2",
      title: "StudySync",
      team: "Null Pointers",
      hackathon: "EdTech Innovation 2023",
      rank: "2nd Place",
      description: "A collaborative notes and flashcard application built for study groups.",
      tags: ["Next.js", "Supabase"],
      repo: "#",
      demo: "#"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Project Showcase</h1>
        <p className="text-muted mt-2">Explore winning projects from past hackathons.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="hackathons">{project.hackathon}</Badge>
                {project.rank && (
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500 font-bold text-sm bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">
                    <Trophy className="w-4 h-4" />
                    {project.rank}
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <p className="text-sm font-medium text-muted">by Team {project.team}</p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-ink/80">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 border-t border-border pt-6 bg-surface-alt/30">
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="w-4 h-4" />
                  Repository
                </a>
              </Button>
              <Button className="flex-1 gap-2" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

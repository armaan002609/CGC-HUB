import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, ExternalLink, Trophy, Users } from "lucide-react"
import prisma from "@/lib/db"

export default async function ShowcaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const project = await prisma.submission.findUnique({
    where: { id },
    include: {
      registration: {
        include: {
          hackathon: true,
          members: {
            include: { user: true }
          }
        }
      },
      mediaAssets: true
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="hackathons">{project.registration.hackathon.title}</Badge>
          {project.rank && (
            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500 font-bold text-sm bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">
              <Trophy className="w-4 h-4" />
              {project.rank}{project.rank === 1 ? 'st' : project.rank === 2 ? 'nd' : project.rank === 3 ? 'rd' : 'th'} Place
            </div>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink">{project.projectTitle}</h1>
        <p className="text-xl text-muted leading-relaxed max-w-3xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {project.repoUrl && (
            <Button variant="outline" className="gap-2" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <GitBranch className="w-4 h-4" />
                View Repository
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Team Info */}
      <div className="bg-surface-alt/30 rounded-2xl p-6 md:p-8 border border-border">
        <h3 className="text-xl font-bold font-display text-ink mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent-hackathons" />
          Team {project.registration.teamName}
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {project.registration.members.map((member) => (
            <div key={member.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-hackathons/10 text-accent-hackathons flex items-center justify-center font-bold text-lg font-display">
                {member.user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-bold text-ink">{member.user.name}</p>
                <p className="text-xs font-medium text-muted uppercase tracking-widest">{member.isLeader ? 'Leader' : 'Member'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Assets (if any) */}
      {project.mediaAssets && project.mediaAssets.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold font-display text-ink">Project Screenshots</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.mediaAssets.map((media) => (
              <div key={media.id} className="rounded-xl overflow-hidden border border-border bg-surface-alt aspect-video">
                {media.type === 'IMAGE' ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={media.url} alt="Project screenshot" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted">
                    Media format not supported in preview
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle } from "lucide-react"
import prisma from "@/lib/db"

export default async function EventGalleryPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = await params
  const eventId = resolvedParams.eventId

  const event = await prisma.culturalEvent.findUnique({
    where: { id: eventId },
    include: {
      mediaAssets: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!event || event.mediaAssets.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="cultural" className="mb-2">Event Gallery</Badge>
          <h1 className="text-3xl font-display font-bold text-ink">{event.title}</h1>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/cultural/gallery">
            <ArrowLeft className="w-4 h-4" />
            Back to All Galleries
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {event.mediaAssets.map((asset) => (
          <div key={asset.id} className="relative group rounded-xl overflow-hidden aspect-square border border-border bg-surface-alt">
            {asset.type === 'IMAGE' ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={asset.url} 
                alt={`${event.title} image`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted group-hover:bg-surface transition-colors">
                <PlayCircle className="w-12 h-12 mb-2 opacity-50" />
                <span className="font-medium text-sm">Video Player</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-medium drop-shadow-md">
                Uploaded {asset.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

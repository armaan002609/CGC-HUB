import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/db"

export default async function CulturalGalleryPage() {
  const images = await prisma.mediaAsset.findMany({
    where: {
      culturalEventId: { not: null },
      type: 'IMAGE'
    },
    include: {
      culturalEvent: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Group events for badges (unique event titles)
  const eventTitles = Array.from(new Set(images.map(img => img.culturalEvent?.title).filter(Boolean)))

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Media Galleries</h1>
        <p className="text-muted mt-2">Photos and videos from past cultural events.</p>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto">
        <Badge variant="cultural">All Media</Badge>
        {eventTitles.map((title, idx) => (
          <Badge key={idx} variant="outline">{title}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.length === 0 ? (
           <div className="col-span-2 md:col-span-4 p-12 text-center bg-surface-alt rounded-3xl">
            <h2 className="text-xl font-bold text-ink">No media uploaded yet.</h2>
          </div>
        ) : images.map((img, index) => {
          // Add some visual variation to spans like the original design
          const span = index % 5 === 0 ? "row-span-2 col-span-2" : (index % 4 === 3 ? "col-span-2" : "col-span-1")
          const alt = img.culturalEvent?.title || "Cultural event image"
          
          return (
            <Card key={img.id} className={`overflow-hidden rounded-xl border-0 ${span} relative group cursor-pointer`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.url} 
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-surface font-medium text-sm">{alt}</span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

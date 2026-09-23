import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CulturalGalleryPage() {
  const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", span: "row-span-2 col-span-2", alt: "Concert stage" },
    { id: 2, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", span: "col-span-1", alt: "Crowd cheering" },
    { id: 3, url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&q=80", span: "col-span-1", alt: "Theatre performance" },
    { id: 4, url: "https://images.unsplash.com/photo-1470229722913-7c092fb6224c?w=800&q=80", span: "col-span-2", alt: "Festival lights" },
    { id: 5, url: "https://images.unsplash.com/photo-1520110120835-c96534a4c984?w=800&q=80", span: "col-span-1 row-span-2", alt: "Dancers" },
    { id: 6, url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", span: "col-span-1", alt: "Band playing" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Media Galleries</h1>
        <p className="text-muted mt-2">Photos and videos from past cultural events.</p>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto">
        <Badge variant="cultural">All Media</Badge>
        <Badge variant="outline">Founders' Day 2023</Badge>
        <Badge variant="outline">The Tempest</Badge>
        <Badge variant="outline">Diwali Fest</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.map((img) => (
          <Card key={img.id} className={`overflow-hidden rounded-xl border-0 ${img.span} relative group cursor-pointer`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.url} 
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-surface font-medium text-sm">{img.alt}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

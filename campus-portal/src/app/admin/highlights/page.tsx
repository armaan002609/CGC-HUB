import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { HighlightsManager } from "./HighlightsManager"

export default async function AdminHighlightsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  const highlights = await prisma.galleryHighlight.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <div className="mb-8 border-b border-black/5 pb-4">
        <h1 className="text-3xl font-display font-black text-brand tracking-tight">Manage Homepage Highlights</h1>
        <p className="text-muted mt-2">Upload images and videos to display on the main landing page.</p>
      </div>

      <HighlightsManager initialHighlights={highlights} />
    </div>
  )
}

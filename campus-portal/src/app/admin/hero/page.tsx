import { getServerSession } from "@/lib/auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { HeroManager } from "./HeroManager"

export default async function AdminHeroPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
    redirect("/")
  }

  const banners = await prisma.heroBanner.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-black text-brand tracking-tight mb-2">Hero Banner Manager</h1>
        <p className="text-muted">Upload and manage images for the homepage hero carousel.</p>
      </div>

      <HeroManager initialBanners={banners} />
    </div>
  )
}

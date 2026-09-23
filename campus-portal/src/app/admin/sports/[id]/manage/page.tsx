import prisma from "@/lib/db" // cache buster

import { authOptions, getServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AssignManager } from "./AssignManager"
import { LiveScoreController } from "./LiveScoreController"
import Link from "next/link"
import { ArrowLeft, Trophy } from "lucide-react"

export default async function ManageEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/")
  }

  const event = await prisma.sportsEvent.findUnique({
    where: { id: resolvedParams.id },
    include: { managers: true }
  })

  if (!event) {
    redirect("/admin/sports")
  }

  // Access Control: Must be ADMIN or in the managers list
  const isAdmin = session.user.role === "ADMIN"
  const isManager = event.managers.some(m => m.id === session.user.id)

  if (!isAdmin && !isManager) {
    redirect("/admin/sports") // block unauthorized access
  }

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-10">
      
      <div className="flex items-center gap-4">
        <Link href="/admin/sports" className="p-3 rounded-full hover:bg-black/5 transition-colors text-muted">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 bg-[#F3F0FF] text-[#6B46C1] px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider">
              <Trophy className="w-3 h-3" /> {event.sport}
            </span>
          </div>
          <h1 className="text-3xl font-display font-black text-brand tracking-tight">{event.title}</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          {/* Live Score Controller is visible to both Admins and assigned Managers */}
          <LiveScoreController event={event} />
        </div>
        
        <div className="space-y-6">
          {/* Assign Managers is ONLY visible to true Admins */}
          {isAdmin ? (
            <AssignManager eventId={event.id} currentManagers={event.managers} />
          ) : (
            <div className="bg-brand/5 rounded-3xl p-6 border border-brand/10">
              <h3 className="font-bold text-brand">Manager View</h3>
              <p className="text-sm text-muted mt-2 font-medium">You have been explicitly authorized to update the live score for this specific match. Please ensure all score updates are accurate before publishing.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

import prisma from "@/lib/db"
import { Users } from "lucide-react"
import { DirectoryClient } from "./DirectoryClient"

export const dynamic = "force-dynamic"

export default async function StudentDirectoryPage() {
  
  // Fetch users with their nested participation data
  const users = await prisma.user.findMany({
    include: {
      sportsParticipated: true,
      hackathonsCoordinated: true,
      culturalParticipated: true,
      culturalCoordinated: true,
      registrations: {
        include: { registration: { include: { hackathon: true } } }
      },
      medals: true,
      dutyAssignments: true,
    },
    orderBy: { name: 'asc' }
  })

  // Filter to just show students and faculty
  return (
    <div className="w-full">
      <main className="container mx-auto px-6 py-12 max-w-[1450px]">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#6B46C1]/10 text-[#6B46C1] px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-6">
              <Users className="w-4 h-4" />
              Campus Directory
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-brand tracking-tight mb-4">
              Student & Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B46C1] to-[#38A169]">Profiles</span>
            </h1>
            <p className="text-lg text-muted font-medium">
              Explore the amazing individuals driving our sports, cultural events, and hackathons.
            </p>
          </div>
          
          <div className="flex gap-4">
             {/* Future search/filter could go here */}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <DirectoryClient users={users} />
        </div>
      </main>
    </div>
  )
}

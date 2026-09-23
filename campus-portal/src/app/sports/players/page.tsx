import prisma from "@/lib/db"
import PlayerList from "./PlayerList"

export const dynamic = "force-dynamic"

export default async function PlayersPage() {
  const playerProfiles = await prisma.playerProfile.findMany({
    include: {
      user: true
    }
  })

  return (
    <div className="container mx-auto px-6 max-w-[1450px] space-y-8 mt-8">
      <PlayerList playerProfiles={playerProfiles} />
    </div>
  )
}

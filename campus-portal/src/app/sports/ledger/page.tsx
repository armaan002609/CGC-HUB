import { Trophy } from "lucide-react"
import prisma from "@/lib/db"

export default async function LedgerPage() {
  const records = await prisma.medalLedger.findMany({
    orderBy: [
      { year: 'desc' },
      { event: 'asc' }
    ]
  })

  return (
    <div className="container mx-auto px-6 max-w-[1450px] space-y-8 mt-8">
      
      <div>
        <h1 className="text-4xl font-display font-black text-brand tracking-tight">Medal Ledger</h1>
        <p className="text-muted font-medium mt-2">The historical archive of campus sporting excellence.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-brand/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-brand text-white">
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Year</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Event</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Winner</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Runner Up</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">MVP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand/5">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-brand/5 transition-colors group">
                  <td className="p-6 font-display font-bold text-ink/70 group-hover:text-brand transition-colors">{record.year}</td>
                  <td className="p-6 font-medium text-ink">{record.event}</td>
                  <td className="p-6">
                    <div className="inline-flex items-center gap-2 bg-[#FBD38D]/30 text-[#DD6B20] px-3 py-1 rounded-full font-bold text-sm">
                      <Trophy className="w-3 h-3" />
                      {record.winnerRefs[0] || 'Unknown'}
                    </div>
                  </td>
                  <td className="p-6 font-medium text-muted">{record.winnerRefs[1] || 'Unknown'}</td>
                  <td className="p-6 font-bold text-ink">{record.trophyName || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-surface-alt p-6 flex justify-between items-center text-sm font-bold text-brand">
          <button className="hover:opacity-70 transition-opacity">← Previous Page</button>
          <span>Page 1 of 1</span>
          <button className="hover:opacity-70 transition-opacity">Next Page →</button>
        </div>
      </div>

    </div>
  )
}

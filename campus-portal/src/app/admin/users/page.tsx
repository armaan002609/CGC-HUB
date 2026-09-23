import prisma from "@/lib/db"

import { authOptions, getServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Users, Search, Plus } from "lucide-react"
import { UserRoleSelect } from "./UserRoleSelect"
import { CsvUploader } from "./CsvUploader"
import Link from "next/link"

export default async function UsersManagementPage() {
  const session = await getServerSession(authOptions)

  // Only real Admins can view this page. Moderators are blocked.
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin")
  }

  const users = await prisma.user.findMany({
    orderBy: { role: 'asc' }
  })

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-10">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-brand tracking-tight">User Management</h1>
          <p className="text-muted font-medium mt-2">Promote users to Moderators so they can help update scores.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow sm:min-w-[250px]">
            <input 
              type="text" 
              placeholder="Search by email..." 
              className="w-full bg-white text-brand font-medium pl-12 pr-4 py-3 rounded-full border border-black/5 focus:border-brand/20 outline-none transition-colors shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/50" />
          </div>
          
          <CsvUploader />
          
          <Link 
            href="/admin/users/new"
            className="bg-brand hover:bg-brand-dark text-white rounded-full px-6 py-3.5 font-bold text-sm tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            ADD USER
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-brand/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-alt text-brand">
                <th className="p-6 font-bold uppercase tracking-widest text-xs">User</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Email</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Department</th>
                <th className="p-6 font-bold uppercase tracking-widest text-xs">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-brand/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold font-display">
                        {user.name?.charAt(0) || <Users className="w-4 h-4" />}
                      </div>
                      <span className="font-bold text-ink">{user.name || 'Unnamed User'}</span>
                    </div>
                  </td>
                  <td className="p-6 font-medium text-muted">{user.email}</td>
                  <td className="p-6 font-medium text-ink/70">{user.department || '-'}</td>
                  <td className="p-6">
                    {/* Admins cannot demote themselves */}
                    {user.id === session.user.id ? (
                      <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-brand/10 text-brand">
                        ADMIN
                      </span>
                    ) : (
                      <UserRoleSelect userId={user.id} currentRole={user.role} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

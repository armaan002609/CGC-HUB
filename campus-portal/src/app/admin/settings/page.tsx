import { Settings, Shield, Bell, Database } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      
      <div>
        <h1 className="text-4xl font-display font-black text-brand tracking-tight">System Settings</h1>
        <p className="text-muted font-medium mt-2">Configure portal preferences and security policies.</p>
      </div>

      <div className="space-y-6">
        
        {/* General Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-brand/5 overflow-hidden">
          <div className="p-6 border-b border-black/5 bg-surface-alt/50 flex items-center gap-3">
            <Settings className="w-5 h-5 text-brand" />
            <h2 className="text-lg font-bold text-ink">General Configuration</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-ink">Maintenance Mode</h3>
                <p className="text-sm text-muted font-medium mt-1">Temporarily disable access to the public portal for maintenance.</p>
              </div>
              <div className="w-12 h-6 bg-black/10 rounded-full relative cursor-pointer hover:bg-black/20 transition-colors">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-black/5">
              <div>
                <h3 className="font-bold text-ink">Academic Year</h3>
                <p className="text-sm text-muted font-medium mt-1">Set the default active academic year for leaderboards and ledgers.</p>
              </div>
              <select className="bg-surface-alt text-brand font-bold px-4 py-2 rounded-xl border-none outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B46C1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_10px] bg-[right_14px_center]">
                <option>2023-2024</option>
                <option>2024-2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-brand/5 overflow-hidden">
          <div className="p-6 border-b border-black/5 bg-surface-alt/50 flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#38a169]" />
            <h2 className="text-lg font-bold text-ink">Security & Authentication</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-ink">Allow Student Registration</h3>
                <p className="text-sm text-muted font-medium mt-1">Let new students sign up for the portal via email.</p>
              </div>
              <div className="w-12 h-6 bg-[#38a169] rounded-full relative cursor-pointer transition-colors">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function DirectoryDownload({ data }: { data: any[] }) {
  const handleDownload = () => {
    // Generate CSV string
    const headers = ["Name", "Email", "Role", "Department"]
    const rows = data.map(user => [
      `"${user.name || ''}"`,
      `"${user.email || ''}"`,
      `"${user.role || 'STUDENT'}"`,
      `"${user.department || ''}"`
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n")

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "campus_directory.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button 
      onClick={handleDownload}
      variant="outline"
      className="gap-2 border-[#6B46C1] text-[#6B46C1] hover:bg-[#6B46C1]/10"
    >
      <Download className="w-4 h-4" />
      Download CSV
    </Button>
  )
}

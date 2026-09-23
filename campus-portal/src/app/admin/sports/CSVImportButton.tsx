"use client"

import { useState, useRef } from "react"
import { FileUp } from "lucide-react"
import Papa from "papaparse"
import { bulkCreateSportsEvents } from "../actions"
import { useRouter } from "next/navigation"

export function CSVImportButton() {
  const router = useRouter()
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsImporting(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const events = results.data.map((row: any) => ({
            title: row.title?.trim(),
            sport: row.sport?.trim(),
            teamA: row.teamA?.trim(),
            teamB: row.teamB?.trim(),
            venue: row.venue?.trim(),
            schedule: row.schedule?.trim(),
            status: row.status?.trim()
          }))
          
          await bulkCreateSportsEvents(events)
          alert(`Successfully imported ${events.length} events!`)
          router.refresh()
        } catch (error: any) {
          console.error("Import error:", error)
          alert(error.message || "Failed to import events")
        } finally {
          setIsImporting(false)
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      },
      error: (error) => {
        console.error("CSV Parse Error:", error)
        alert("Failed to parse CSV file")
        setIsImporting(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    })
  }

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="bg-surface-alt hover:bg-black/5 text-brand rounded-full px-6 py-3.5 font-bold text-sm tracking-wider transition-colors shadow-sm flex items-center gap-2 border border-brand/10 disabled:opacity-50"
      >
        <FileUp className="w-5 h-5" />
        {isImporting ? "IMPORTING..." : "IMPORT CSV"}
      </button>
    </>
  )
}

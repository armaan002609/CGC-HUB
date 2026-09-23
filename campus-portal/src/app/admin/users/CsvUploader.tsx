"use client"

import { useState, useRef } from "react"
import { bulkCreateUsers } from "./actions"
import Papa from "papaparse"
import { Upload } from "lucide-react"

export function CsvUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const res = await bulkCreateUsers(results.data as any[])
          alert(`Successfully imported ${res.count} users!`)
        } catch (error: any) {
          alert(`Import failed: ${error.message}`)
        } finally {
          setIsUploading(false)
          if (fileInputRef.current) fileInputRef.current.value = ""
        }
      },
      error: (error) => {
        alert(`Error parsing CSV: ${error.message}`)
        setIsUploading(false)
      }
    })
  }

  return (
    <>
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="bg-brand/10 hover:bg-brand/20 text-brand rounded-full px-6 py-3.5 font-bold text-sm tracking-wider transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap flex-shrink-0"
      >
        <Upload className="w-5 h-5" />
        {isUploading ? "IMPORTING..." : "IMPORT CSV"}
      </button>
    </>
  )
}

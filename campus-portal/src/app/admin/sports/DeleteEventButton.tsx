"use client"

import { useTransition } from "react"
import { deleteSportsEvent } from "@/app/admin/actions"

export function DeleteEventButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this sports event? This action cannot be undone.")) {
      startTransition(async () => {
        try {
          await deleteSportsEvent(id)
        } catch (error) {
          console.error("Failed to delete event:", error)
          alert("Failed to delete event")
        }
      })
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-[#e53e3e] font-bold text-sm hover:underline disabled:opacity-50 transition-opacity"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  )
}

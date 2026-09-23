"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function LiveScoresRefresh({ intervalMs = 5000 }: { intervalMs?: number }) {
  const router = useRouter()

  useEffect(() => {
    // Silently refresh the server component data in the background
    const intervalId = setInterval(() => {
      router.refresh()
    }, intervalMs)

    return () => clearInterval(intervalId)
  }, [router, intervalMs])

  return null
}

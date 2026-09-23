"use client"

import { useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        // Automatically sync the user to Prisma whenever they sign in
        fetch('/api/auth/sync', { method: 'POST' })
          .catch(err => console.error('Failed to sync user:', err))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <>{children}</>
}

"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "../stores/authStore"
import { useAuth } from "../types/auth-context"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const sessionReady = useAuthStore((s) => s.sessionReady)
  const router = useRouter()

  useEffect(() => {
    if (sessionReady && !user) router.replace("/login")
  }, [sessionReady, user, router])

  if (!user) return null

  return <>{children}</>
}

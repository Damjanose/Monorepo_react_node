"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "../stores/authStore"
import { useAuth } from "../types/auth-context"

export const StaffRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const sessionReady = useAuthStore((s) => s.sessionReady)
  const router = useRouter()

  const ok =
    !!user &&
    (user.permissions.includes("admin") ||
      user.permissions.includes("product.write") ||
      user.permissions.includes("order.write"))

  useEffect(() => {
    if (!sessionReady) return
    if (!user) router.replace("/login")
    else if (!ok) router.replace("/")
  }, [sessionReady, user, ok, router])

  if (!ok) return null

  return <>{children}</>
}

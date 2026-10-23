"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

/** Unknown routes fall back to the home page. */
export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/")
  }, [router])

  return null
}

"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function SyncMicrosoftProfile() {
  const { isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/sync-microsoft-profile", {
        method: "POST",
      })
    }
  }, [isSignedIn])

  return null
}

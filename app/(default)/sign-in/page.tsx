"use client"

import { useClerk } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"

function SignInForm() {
  const clerk = useClerk()
  const searchParams = useSearchParams()
  const redirectCallbackUrl = searchParams.get("redirect_url") ?? "/"
  const errorParam = searchParams.get("error")

  const [error, setError] = useState<string | null>(
    errorParam === "domain" ? "Only @dlsud.edu.ph accounts are allowed to sign in." : null
  )
  const [loading, setLoading] = useState(false)

  async function handleMicrosoftSignIn() {
    setError(null)
    setLoading(true)

    try {
      await clerk.client.signIn.authenticateWithRedirect({
        strategy: "oauth_microsoft",
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: redirectCallbackUrl,
      })
    } catch (err: any) {
      const message = err?.errors?.[0]?.longMessage ?? err?.errors?.[0]?.message ?? "Sign in failed."
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        className="w-full"
        onClick={handleMicrosoftSignIn}
        disabled={loading}
      >
        {loading ? "Redirecting…" : "Sign in with Microsoft"}
      </Button>
      {IS_PRODUCTION && (
        <p className="text-center text-xs text-muted-foreground">
          Only @dlsud.edu.ph accounts are allowed.
        </p>
      )}
    </div>
  )
}

export default function SignInPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Use your Microsoft account to continue.
          </p>
        </div>
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  )
}

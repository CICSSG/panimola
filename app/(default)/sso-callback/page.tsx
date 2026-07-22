"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
const ALLOWED_DOMAIN = "@dlsud.edu.ph"

function SSOHandler() {
  const clerk = useClerk()
  const { isLoaded } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectCallbackUrl = searchParams.get("redirect_url") ?? "/onboarding"

  function triggerSSO(){
    clerk
      .handleRedirectCallback({
        signInFallbackRedirectUrl: redirectCallbackUrl,
        signUpFallbackRedirectUrl: redirectCallbackUrl,
      })
      .then(async () => {
        if (!IS_PRODUCTION) return

        // After session is set, check the primary email domain
        const email = clerk.user?.primaryEmailAddress?.emailAddress ?? ""
        if (!email.includes(ALLOWED_DOMAIN)) {
          await clerk.signOut()
          router.replace(`/sign-in?error=domain`)
        }
      })
      .catch(() => {
        router.replace("/sign-in")
      })
  }
  
  useEffect(() => {
    if (isLoaded) {
      triggerSSO()
    }
  }, [isLoaded]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-svh items-center justify-center flex-col gap-4">
      <p className="text-sm text-muted-foreground">Completing sign in…</p>
      <div id="clerk-captcha" />    
    </div>
  )
}

export default function SSOCallbackPage() {
  return (
    <Suspense>
      <SSOHandler />
    </Suspense>
  )
}

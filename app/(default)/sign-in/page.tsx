"use client"

import { useClerk } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { motion } from "framer-motion"

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
    <div className="flex flex-col gap-4">
      {error && (
        <div className="border-4 border-black bg-red-100 px-4 py-3 text-sm font-bold text-red-800" style={{ boxShadow: "3px 3px 0 black" }}>
          {error}
        </div>
      )}
      <motion.button
        onClick={handleMicrosoftSignIn}
        disabled={loading}
        className="w-full border-4 border-black bg-[#7dd3fc] px-6 py-3 text-base font-extrabold uppercase disabled:opacity-50"
        style={{ boxShadow: "4px 4px 0 black" }}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, boxShadow: "2px 2px 0 black" }}
        transition={{ duration: 0.1 }}
      >
        {loading ? "Redirecting…" : "Sign in with Microsoft"}
      </motion.button>
      {IS_PRODUCTION && (
        <p className="text-center text-xs font-bold uppercase tracking-wide text-black/40">
          Only @dlsud.edu.ph accounts are allowed.
        </p>
      )}
    </div>
  )
}

export default function SignInPage() {
  return (
    <div
      className="relative flex min-h-svh items-center justify-center overflow-hidden p-6"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Blobs */}
      <motion.svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute bottom-0 left-0 w-56 opacity-70"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.7, scale: 1, y: [0, -8, 0] }}
        transition={{ scale: { duration: 0.5, type: "spring" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}>
        <polygon points="0,60 80,0 200,20 200,140 120,200 0,180" fill="#fde047" stroke="black" strokeWidth="5" />
      </motion.svg>
      <motion.svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute top-10 right-0 w-40 opacity-60"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.6, scale: 1, y: [0, -10, 0] }}
        transition={{ scale: { duration: 0.5, delay: 0.1, type: "spring" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}>
        <polygon points="10,40 100,0 190,30 200,160 110,200 0,170" fill="#f9a8d4" stroke="black" strokeWidth="5" />
      </motion.svg>

      {/* Card */}
      <motion.div
        className="relative w-full max-w-sm border-4 border-black bg-white"
        style={{ boxShadow: "6px 6px 0 black" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Card header stripe */}
        <div className="border-b-4 border-black bg-[#fde047] px-6 py-5">
          <div className="mb-1 text-xs font-extrabold uppercase tracking-widest text-black/50">DLSUD · CICS SG</div>
          <h1 className="text-3xl font-black uppercase leading-none">Sign In</h1>
        </div>

        <div className="flex flex-col gap-5 px-6 py-7">
          <p className="text-sm font-bold text-black/60">
            Use your Microsoft school account to continue.
          </p>
          <Suspense>
            <SignInForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  )
}

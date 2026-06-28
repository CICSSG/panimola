"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { LogOut } from "lucide-react"

function Field({
  id, label, hint, required, children,
}: {
  id?: string
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-extrabold uppercase tracking-wide">
        {label}
        {hint && <span className="ml-1.5 text-xs font-semibold normal-case tracking-normal text-black/40">{hint}</span>}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full border-4 border-black bg-white px-3 py-2 text-sm font-semibold outline-none transition-shadow focus:shadow-[3px_3px_0_black] disabled:bg-black/5 disabled:text-black/40"

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  const [cys, setCys] = useState("")
  const [studentNumber, setStudentNumber] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isLoaded) return null

  const firstName = user?.firstName ?? ""
  const lastName = user?.lastName ?? ""
  const email = user?.primaryEmailAddress?.emailAddress ?? ""

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, cys, studentNumber, facebookLink }),
    })

    if (res.ok) {
      router.push("/")
    } else {
      const data = await res.json()
      setError(data.message ?? "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div
      className="relative flex min-h-svh items-center justify-center overflow-hidden p-4 sm:p-6"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Blobs */}
      <motion.svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute top-10 -left-8 w-48 opacity-60"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.6, scale: 1, y: [0, -8, 0] }}
        transition={{ scale: { duration: 0.5, type: "spring" }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}>
        <polygon points="20,10 180,0 200,80 190,190 10,200 0,100" fill="#86efac" stroke="black" strokeWidth="5" />
      </motion.svg>
      <motion.svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute bottom-0 right-0 w-44 opacity-60"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.6, scale: 1, y: [0, -10, 0] }}
        transition={{ scale: { duration: 0.5, delay: 0.1, type: "spring" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}>
        <polygon points="10,40 100,0 190,30 200,160 110,200 0,170" fill="#7dd3fc" stroke="black" strokeWidth="5" />
      </motion.svg>

      {/* Card */}
      <motion.div
        className="relative w-full max-w-md border-4 border-black bg-white"
        style={{ boxShadow: "6px 6px 0 black" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Header stripe */}
        <div className="border-b-4 border-black bg-[#f9a8d4] px-6 py-5">
          <div className="mb-1 text-xs font-extrabold uppercase tracking-widest text-black/50">Almost there</div>
          <h1 className="text-3xl font-black uppercase leading-none">
            Welcome{firstName ? `, ${firstName}` : ""}!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-7">
          <p className="text-sm font-bold text-black/50">Complete your profile to continue.</p>

          {/* Read-only from Clerk */}
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2">
            <Field label="First Name" required>
              <input className={inputClass} value={firstName} disabled />
            </Field>
            <Field label="Last Name" required>
              <input className={inputClass} value={lastName} disabled />
            </Field>
          </div>

          <Field label="Email" required>
            <input className={inputClass} value={email} disabled />
          </Field>

          {/* Editable */}
          <Field id="cys" label="CYS" hint="e.g. BIT11, BCS11" required>
            <input
              id="cys"
              className={inputClass}
              value={cys}
              onChange={(e) => {
                const val = e.target.value.toUpperCase()
                if (/^[A-Z]{0,3}\d{0,2}$/.test(val)) setCys(val)
              }}
              placeholder="BIT11"
              maxLength={5}
              required
            />
          </Field>

          <Field id="studentNumber" label="Student Number" required>
            <input
              id="studentNumber"
              className={inputClass}
              value={studentNumber}
              onChange={(e) => {
                if (/^\d{0,9}$/.test(e.target.value)) setStudentNumber(e.target.value)
              }}
              placeholder="202612345"
              maxLength={9}
              required
            />
          </Field>

          <Field id="facebookLink" label="Facebook Link" hint="optional">
            <input
              id="facebookLink"
              className={inputClass}
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              placeholder="https://facebook.com/yourprofile"
              type="url"
            />
          </Field>

          {error && (
            <div className="border-4 border-black bg-red-100 px-4 py-3 text-sm font-bold text-red-800" style={{ boxShadow: "3px 3px 0 black" }}>
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full border-4 border-black bg-[#fde047] px-6 py-3 text-base font-extrabold uppercase disabled:opacity-50"
            style={{ boxShadow: "4px 4px 0 black" }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0, boxShadow: "2px 2px 0 black" }}
            transition={{ duration: 0.1 }}
          >
            {loading ? "Saving…" : "Complete Setup"}
          </motion.button>

          <SignOutButton>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 border-4 border-black bg-white px-4 py-2.5 text-sm font-extrabold uppercase transition-colors hover:bg-black/5"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </SignOutButton>
        </form>
      </motion.div>
    </div>
  )
}

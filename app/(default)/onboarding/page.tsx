"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOutIcon } from "lucide-react"

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
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        cys,
        studentNumber,
        facebookLink,
      }),
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
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-1 text-2xl font-semibold">Welcome!</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Complete your profile to continue.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                className="rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"
                value={firstName}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                className="rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"
                value={lastName}
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              className="rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"
              value={email}
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cys" className="text-sm font-medium">
              CYS{" "}
              <span className="text-muted-foreground">
                (e.g. BIT11, BCS11){" "}
              </span>
              <span className="text-destructive">*</span>
            </label>
            <input
              id="cys"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={cys}
              onChange={(e) => {
                const val = e.target.value.toUpperCase()
                if (/^[A-Z]{0,3}\d{0,2}$/.test(val)) setCys(val)
              }}
              placeholder="BIT11"
              maxLength={5}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="studentNumber" className="text-sm font-medium">
              Student Number <span className="text-destructive">*</span>
            </label>
            <input
              id="studentNumber"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={studentNumber}
              onChange={(e) => {
                if (/^\d{0,9}$/.test(e.target.value))
                  setStudentNumber(e.target.value)
              }}
              placeholder="202612345"
              maxLength={9}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="facebookLink" className="text-sm font-medium">
              Facebook Link{" "}
              <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="facebookLink"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              placeholder="https://facebook.com/yourprofile"
              type="url"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Saving…" : "Complete Setup"}
          </button>
        </form>

        <div className="mt-4">
          <SignOutButton>
            <button className="flex w-full items-center justify-center gap-2 rounded-md border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              <LogOutIcon className="h-4 w-4" />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  )
}

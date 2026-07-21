"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LogOut } from "lucide-react"
import GridBackground from "@/components/grid-background"

function Field({
  id,
  label,
  hint,
  required,
  children,
}: {
  id?: string
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-extrabold tracking-wide uppercase"
      >
        {label}
        {hint && (
          <span className="ml-1.5 text-xs font-semibold tracking-normal text-black/40 normal-case">
            {hint}
          </span>
        )}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full border-2 border-black bg-white px-3 py-2 text-sm font-semibold outline-none transition-shadow focus:shadow-[3px_3px_0_black] disabled:bg-black/10 disabled:text-black/75 focus:text-black placeholder:text-black/30 text-black/75"

export default function OnboardingPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const { user, isLoaded } = useUser()
  const [cys, setCys] = useState("")
  const [studentNumber, setStudentNumber] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const scrollYProgress = useTransform(scrollY, [0, 400], [0, 1])

  // Stars fly outward from center on scroll
  const starTLX = useTransform(scrollYProgress, [0, 1], [0, -120])
  const starTLY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const starTLR = useTransform(scrollYProgress, [0, 1], [0, -60])

  const starTRX = useTransform(scrollYProgress, [0, 1], [0, 120])
  const starTRY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const starTRR = useTransform(scrollYProgress, [0, 1], [0, 60])

  const starBLX = useTransform(scrollYProgress, [0, 1], [0, -150])
  const starBLY = useTransform(scrollYProgress, [0, 1], [0, 250])
  const starBLR = useTransform(scrollYProgress, [0, 1], [0, 58])

  const starBRX = useTransform(scrollYProgress, [0, 1], [0, 120])
  const starBRY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const starBRR = useTransform(scrollYProgress, [0, 1], [0, -60])

  const pencilX = useTransform(scrollYProgress, [0, 1], [0, 100])
  const pencilY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const pencilR = useTransform(scrollYProgress, [0, 1], [0, 30])

  // Logo moves up and shrinks on scroll
  const logoScrollY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const logoOpacity = useTransform(scrollYProgress, [0, 1], [1, 1])

  // Buttons shrink + move up on scroll (same feel as logo)
  const btnScrollY = useTransform(scrollYProgress, [0, 1], [0, -250])
  const btnScale = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const btnOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 1])

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
      window.location.href = "/success"
    } else {
      const data = await res.json()
      setError(data.message ?? "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <GridBackground className="min-h-[90svh] w-full overflow-y-hidden">
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center px-4 py-8"
      >
        {/* StarTL — scroll wrapper (position + scroll transforms) > float wrapper (idle bob) */}
        <motion.div
          className="pointer-events-none absolute top-1 left-2 xl:top-[17%] xl:left-[12%] 2xl:top-[15%] 2xl:left-[10%]"
          style={{
            zIndex: 15,
            x: starTLX,
            y: starTLY,
            rotate: starTLR,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.4 },
            scale: {
              duration: 0.5,
              type: "spring" as const,
              stiffness: 200,
              damping: 14,
            },
          }}
        >
          <motion.img
            src="/assets/StarTL.png"
            alt=""
            aria-hidden
            style={{ width: "clamp(80px, 10vw, 130px)" }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            }}
          />
        </motion.div>

        {/* StarTR */}
        <motion.div
          className="pointer-events-none absolute -top-12 -right-10 xl:-top-1/6 xl:right-1/6 2xl:right-2/7"
          style={{
            zIndex: 15,
            x: starTRX,
            y: starTRY,
            rotate: starTRR,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.4, delay: 0.1 },
            scale: {
              duration: 0.5,
              delay: 0.1,
              type: "spring" as const,
              stiffness: 200,
              damping: 14,
            },
          }}
        >
          <motion.img
            src="/assets/StarTR.png"
            alt=""
            aria-hidden
            className="max-w-40 md:max-w-60 xl:max-w-120"
            style={{ width: "clamp(320px, 16vw, 340px)" }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              y: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              },
              rotate: { duration: 22, repeat: Infinity, ease: "linear" },
            }}
          />
        </motion.div>

        {/* StarBL */}
        <motion.div
          className="pointer-events-none absolute bottom-0 -left-10 lg:bottom-20 lg:left-10 xl:bottom-[-12%] xl:left-[3%]"
          style={{
            zIndex: 15,
            x: starBLX,
            y: starBLY,
            rotate: starBLR,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.4, delay: 0.2 },
            scale: {
              duration: 0.5,
              delay: 0.2,
              type: "spring" as const,
              stiffness: 200,
              damping: 14,
            },
          }}
        >
          <motion.img
            src="/assets/StarBL.png"
            alt=""
            aria-hidden
            className="max-w-30 md:max-w-50 lg:max-w-60 xl:max-w-200"
            style={{ width: "clamp(380px, 25vw, 450px)" }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              y: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
        </motion.div>

        {/* StarBR */}
        <motion.div
          className="pointer-events-none absolute right-0 bottom-10 md:bottom-30 xl:right-[5%] xl:bottom-[25%]"
          style={{
            zIndex: 15,
            x: starBRX,
            y: starBRY,
            rotate: starBRR,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.4, delay: 0.15 },
            scale: {
              duration: 0.5,
              delay: 0.15,
              type: "spring" as const,
              stiffness: 200,
              damping: 14,
            },
          }}
        >
          <motion.img
            src="/assets/StarBR.png"
            alt=""
            aria-hidden
            className="max-w-20 md:max-w-100"
            style={{ width: "clamp(100px, 13vw, 190px)" }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
          />
        </motion.div>

        {/* Pencil */}
        <motion.div
          className="pointer-events-none absolute -right-25 bottom-25 md:-right-20 md:bottom-70 xl:right-[12%] xl:bottom-[29%]"
          style={{
            zIndex: 30,
            x: pencilX,
            y: pencilY,
            rotate: pencilR,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.5 },
            scale: {
              duration: 0.5,
              delay: 0.5,
              type: "spring" as const,
              stiffness: 140,
              damping: 14,
            },
          }}
        >
          <motion.img
            src="/assets/Pencil.png"
            alt=""
            aria-hidden
            style={{ width: "clamp(160px, 20vw, 300px)" }}
            // {...float(4, 8, 0.4)}
          />
        </motion.div>

        {/* TV + logo */}
        <div className="relative mt-8 flex w-full items-center justify-center sm:mt-0">
          {/* Logo — scroll wrapper holds scroll transforms, inner div floats */}
          <motion.div
            className="pointer-events-none absolute z-20"
            style={{
              width: "min(95vw, 900px)",
              bottom: "38%",
              y: logoScrollY,
              scale: logoScale,
              opacity: logoOpacity,
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.5, delay: 0.35 },
              scale: {
                duration: 0.6,
                delay: 0.35,
                type: "spring" as const,
                stiffness: 120,
                damping: 20,
              },
            }}
          ></motion.div>

          {/* TV — floats, unaffected by scroll */}
          <div className="relative">
            
            <div className="">
              {/* Card */}
              <motion.div
                className="relative w-full max-w-md border-4 border-black bg-white"
                style={{ boxShadow: "6px 6px 0 black" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {/* Header stripe */}
                <div className="border-b-4 border-black bg-[#94ce56] px-6 py-5">
                  <div className="mb-1 text-xs font-extrabold tracking-widest text-black/50 uppercase">
                    Almost there
                  </div>
                  <h1 className="font-blackhansans text-3xl leading-none text-white uppercase [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                    Welcome{firstName ? `, ${firstName}` : ""}!
                  </h1>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 px-6 py-7"
                >
                  <p className="text-sm font-bold text-black/50">
                    Complete your profile to continue.
                  </p>

                  {/* Read-only from Clerk */}
                  <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="First Name" required>
                      <input
                        className={inputClass}
                        value={firstName}
                        disabled
                      />
                    </Field>
                    <Field label="Last Name" required>
                      <input className={inputClass} value={lastName} disabled />
                    </Field>
                  </div>

                  <Field label="Email" required>
                    <input className={inputClass} value={email} disabled />
                  </Field>

                  {/* Editable */}
                  <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      id="cys"
                      label="CYS"
                      hint="e.g. BIT11, BCS11"
                      required
                    >
                      <input
                        id="cys"
                        className={inputClass}
                        value={cys}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase()
                          if (/^[A-Z]{0,3}\d{0,2}$/.test(val)) setCys(val)
                        }}
                        placeholder=""
                        maxLength={5}
                        required
                        autoFocus
                      />
                    </Field>

                    <Field id="studentNumber" label="Student Number" required>
                      <input
                        id="studentNumber"
                        className={inputClass}
                        value={studentNumber}
                        onChange={(e) => {
                          if (/^\d{0,9}$/.test(e.target.value))
                            setStudentNumber(e.target.value)
                        }}
                        placeholder="e.g., 202612345"
                        maxLength={9}
                        required
                      />
                    </Field>
                  </div>

                  <Field
                    id="facebookLink"
                    label="Facebook Link"
                    hint="(optional)"
                  >
                    <input
                      id="facebookLink"
                      className={inputClass}
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      placeholder="e.g., https://facebook.com/yourprofile"
                      type="url"
                    />
                  </Field>

                  {error && (
                    <div
                      className="border-4 border-black bg-red-100 px-4 py-3 text-sm font-bold text-red-800"
                      style={{ boxShadow: "3px 3px 0 black" }}
                    >
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full border-4 border-black bg-accent px-6 py-3 font-blackhansans text-base text-white uppercase [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] disabled:opacity-50"
                    style={{ boxShadow: "4px 4px 0 black" }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0, boxShadow: "2px 2px 0 black" }}
                    transition={{ duration: 0.1 }}
                  >
                    {loading ? "Saving…" : "Complete Setup"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </GridBackground>
  )
}

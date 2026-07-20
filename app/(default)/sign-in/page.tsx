"use client"

import { useClerk, useAuth } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { useState, Suspense, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import GridBackground from "@/components/grid-background"
import Image from "next/image"
import { InfoIcon } from "lucide-react"

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"

function SignInForm() {
  const clerk = useClerk()
  const { isLoaded, isSignedIn } = useAuth()
  const searchParams = useSearchParams()
  const redirectCallbackUrl = searchParams.get("redirect_url") ?? "/"
  const errorParam = searchParams.get("error")

  const [error, setError] = useState<string | null>(
    errorParam === "domain"
      ? "Only @dlsud.edu.ph accounts are allowed to sign in."
      : null
  )
  const [loading, setLoading] = useState(false)

  if (!isLoaded || isSignedIn) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    )
  }

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
      const message =
        err?.errors?.[0]?.longMessage ??
        err?.errors?.[0]?.message ??
        "Sign in failed."
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div
          className="border-4 border-black bg-red-100 px-4 py-3 text-sm font-bold text-red-800"
          style={{ boxShadow: "3px 3px 0 black" }}
        >
          {error}
        </div>
      )}
      <motion.button
        onClick={handleMicrosoftSignIn}
        disabled={loading}
        className="w-full border-4 border-black bg-accent px-6 py-3 font-blackhansans text-base text-white uppercase [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] disabled:opacity-50"
        style={{ boxShadow: "4px 4px 0 black" }}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, boxShadow: "2px 2px 0 black" }}
        transition={{ duration: 0.1 }}
      >
        {loading ? "Redirecting…" : "Sign in with Microsoft"}
      </motion.button>      
    </div>
  )
}

export default function SignInPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
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

  return (
    <>
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
              <motion.img
                src="/assets/TV.png"
                alt="Retro TV"
                className="invisible relative z-10 w-[min(92vw,820px)] md:visible"
                initial={{ opacity: 0, y: 0, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.2 },
                  scale: {
                    duration: 0.6,
                    delay: 0.2,
                    type: "spring" as const,
                    stiffness: 140,
                    damping: 18,
                  },
                }}
              />

              <div className="absolute top-0 left-1/2 my-6 flex h-[75%] w-[90%] -translate-x-1/2 flex-col items-center justify-center md:bg-white"></div>

              <motion.div
                className="absolute top-2/5 left-1/2 -translate-1/2 z-50 w-full border-4 border-black bg-white md:max-w-md lg:max-w-lg"
                style={{ boxShadow: "6px 6px 0 black" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="flex flex-row items-center border-b-4 border-black bg-[#95cf56] px-6 py-3">
                  <Image
                    src="/PionniThumbsUp.png"
                    alt="Pionni Thumbs Up"
                    width={50}
                    height={50}
                    className="size-16"
                  />
                  <h1 className="font-blackhansans text-3xl leading-none text-white [-webkit-text-stroke:1px_black]">
                    Sign in
                  </h1>
                </div>

                <div className="flex flex-col gap-5 px-6 py-7">
                  <div>
                    <p className="text-sm font-bold text-black">
                      Use your Microsoft school account.
                    </p>
                    <p className="text-sm font-bold text-black/60">
                      Only 
                      <span className="text-black/90">@dlsud.edu.ph</span>
                       accounts can sign in
                    </p>
                  </div>
                  <Suspense>
                    <SignInForm />
                  </Suspense>
                  <div className="flex flex-row items-center border-2 border-black bg-[#fef085] px-4 py-2 text-xs">
                    <InfoIcon className="mr-1 inline-block h-4 w-4" />
                    Personal or non-school Microsoft accounts will be rejected
                    after sign in.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </GridBackground>
    </>
  )
}

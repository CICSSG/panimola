"use client"

import { useUser, SignOutButton } from "@clerk/nextjs"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LogOut } from "lucide-react"
import GridBackground from "@/components/grid-background"
import Image from "next/image"
import Link from "next/link"

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

export default function SuccessPage() {
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
              initial={{ opacity: 1, scale: 1 }}
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
                initial={{ opacity: 1, y: 0, scale: 1 }}
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
                className="absolute top-2/5 left-1/2 z-50 w-full -translate-1/2 md:max-w-md lg:max-w-lg flex flex-col items-center gap-6 md:gap-12"
                
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="border-4 border-black bg-white w-full" style={{ boxShadow: "6px 6px 0 black" }}>
                  <div className="relative flex flex-row items-center gap-2 border-b-4 border-black bg-[#95cf56] px-6 py-3">
                    <Image
                      src="/PionniThumbsUp.png"
                      alt="Pionni Thumbs Up"
                      width={50}
                      height={50}
                      className="size-16"
                    />
                    <h1 className="font-blackhansans text-3xl leading-none text-white [-webkit-text-stroke:1px_black]">
                      Let's Go!
                    </h1>
                    <Image
                      src="/stickers/cics froshies.png"
                      alt="CICS Froshies Sticker"
                      width={180}
                      height={180}
                      className="absolute -top-6 -right-8 size-32 -rotate-4 lg:-top-16 lg:-right-12 lg:size-44"
                    />
                  </div>

                  <div className="flex flex-col gap-5 px-6 py-7">
                    <div>
                      <p className="text-center text-2xl text-black">
                        See you at Panimola and <br /> CICS College Orientation!
                      </p>
                    </div>
                  </div>
                </div>

                <Link href={"/"} className="bg-accent text-white font-blackhansans [-webkit-text-stroke:1px_black] px-6 py-3 text-lg border-2 border-black hover:bg-accent/90 hover:-translate-y-0.5 hover:scale-105 transition-all duration-500" style={{ boxShadow: "4px 4px 0 black" }}>
                  Go back to homepage
                </Link>
              </motion.div>

            </div>
          </div>
        </section>
      </GridBackground>
    </>
  )
}

"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import GridBackground from "@/components/grid-background"
import LogoLoop from "@/components/logo-loop"

const float = (duration: number, amplitude: number, delay = 0) => ({
  animate: { y: [0, -amplitude, 0] },
  transition: {
    y: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
  },
})

export default function Page() {
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
    <GridBackground className="min-h-svh w-full">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center px-4 py-8"
      >
        {/* StarTL — scroll wrapper (position + scroll transforms) > float wrapper (idle bob) */}
        <motion.div
          className="pointer-events-none absolute top-2 left-4 xl:top-[17%] xl:left-[12%] 2xl:top-[15%] 2xl:left-[10%]"
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
          className="pointer-events-none absolute -top-12 -right-10 xl:right-1/6 xl:-top-1/6 2xl:right-2/7"
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
          className="pointer-events-none absolute bottom-0 -left-10 lg:left-10 lg:bottom-20 xl:bottom-[-12%] xl:left-[3%]"
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
          className="pointer-events-none absolute bottom-10 right-0 md:bottom-30 xl:bottom-[25%] xl:right-[5%]"
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
          className="pointer-events-none absolute bottom-25 -right-25 md:bottom-70 md:-right-20 xl:bottom-[29%] xl:right-[12%]"
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
        <div className="relative flex w-full items-center justify-center">
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
          >
            <motion.img
              src="/assets/Logo and Title.png"
              alt="Panimola CICSCovery 2026"
              style={{ width: "100%" }}
              // {...float(4.8, 10, 0.6)}
            />
          </motion.div>

          {/* TV — floats, unaffected by scroll */}
          <motion.img
            src="/assets/TV.png"
            alt="Retro TV"
            className="relative z-10 w-[min(92vw,820px)]"
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

          <motion.div className="absolute bottom-[30%] z-30 flex -translate-x-2 gap-6" style={{ y: btnScrollY, scale: btnScale, opacity: btnOpacity }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <button
              className="rotate-5 rounded-none border-2 border-black bg-[#fc7646] px-4 py-2 font-blackhansans text-2xl text-white transition-transform [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
              style={{ boxShadow: "6px 6px 0 black" }}
            >
              <div className="-rotate-2">Schedule</div>
            </button>
            <button
              className="translate-y-5 -rotate-5 rounded-none border-2 border-black bg-[#fef085] px-4 py-2 font-blackhansans text-2xl text-white transition-transform [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] hover:translate-y-4.5 active:translate-y-0.5 active:shadow-none"
              style={{ boxShadow: "6px 6px 0 black" }}
            >
              <div className="-rotate-2">Register</div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Logo / partner loop */}
      <div className="relative z-20 bg-white mt-20">
        <div className="absolute top-5 h-[90%] w-full bg-white" />
        <LogoLoop
          className="relative z-2 py-3 outline-4 outline-black"
          bgColor="#95cf56"
          textColor="#fef085"
          gap={64}
          speed={200}
          rotation={-2}
          pauseOnHover={false}
          logoHeight={48}
          items={[
            {
              type: "text",
              content: "ABOUT",
              className:
                "text-4xl font-extrabold font-kelsi  [-webkit-text-stroke:1px_black]",
            },
          ]}
        />
        <LogoLoop
          className="absolute -top-12 py-3 outline-4 outline-black z-10"
          bgColor="#fc7646"
          textColor="#fef085"
          gap={64}
          reverse
          speed={200}
          rotation={2}
          pauseOnHover={false}
          logoHeight={48}
          items={[
            {
              type: "text",
              content: "ABOUT",
              className:
                "text-4xl font-extrabold font-kelsi  [-webkit-text-stroke:1px_black]",
            },
          ]}
        />
      </div>
      {/* What is PANIMOLA section */}
      <section className="relative z-50 bg-white px-8 py-20 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-start">
          {/* Left — heading + body */}
          <div className="min-w-0 flex-1">
            <div
              className="mb-6 inline-block border-4 border-black bg-[#fde047] px-4 py-2"
              style={{ boxShadow: "4px 4px 0 black" }}
            >
              <h2 className="font-blackhansans text-2xl font-extrabold uppercase">
                What is PANIMOLA
              </h2>
            </div>
            <p className="text-base leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Arcu id hac sagittis diam
              in. Pretium pharetra non velit vitae eget phasellus viverra. Augue
              amet habitant a commodo odio. Quam curabitur nec augue lectus
              tellus. Tellus condimentum senectus mattis netus eget vel tellus
              nibh. Amet semper eros urna lorem erat tempor amet natoque netus.
            </p>
          </div>

          {/* Right — retro window image placeholder */}
          <div
            className="w-full max-w-lg min-w-0 flex-1"
            style={{ transform: "rotate(2deg)" }}
          >
            {/* Window title bar */}
            <div className="flex items-center justify-between border-4 border-black bg-[#95cf56] px-3 py-2">
              <span className="font-blackhansans text-sm font-bold">
                &lt;image&gt;
              </span>
              <span className="select-none border-2 border-black bg-white px-2 py-0.5 text-xs leading-none font-bold">
                ✕
              </span>
            </div>
            {/* Image area */}
            <div className="flex aspect-4/3 items-center justify-center border-4 border-t-0 border-black bg-gray-200">
              <span className="text-lg font-bold text-gray-400">
                [image placeholder]
              </span>
            </div>
            {/* Shadow tab at bottom */}
            <div className="ml-2 h-3 border-4 border-t-0 border-black bg-white" />
          </div>
        </div>
      </section>

      {/* What is CICS section */}
      <section className="relative z-50 bg-white px-8 py-20 md:px-16 lg:px-24">
        <div className="mx-auto flex md:flex-row-reverse max-w-6xl flex-col items-center gap-12 md:items-start">
          {/* Left — heading + body */}
          <div className="min-w-0 flex-1">
            <div
              className="mb-6 inline-block border-4 border-black bg-[#fde047] px-4 py-2"
              style={{ boxShadow: "4px 4px 0 black" }}
            >
              <h2 className="font-blackhansans text-2xl font-extrabold uppercase">
                What is CICS
              </h2>
            </div>
            <p className="text-base leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet consectetur. Arcu id hac sagittis diam
              in. Pretium pharetra non velit vitae eget phasellus viverra. Augue
              amet habitant a commodo odio. Quam curabitur nec augue lectus
              tellus. Tellus condimentum senectus mattis netus eget vel tellus
              nibh. Amet semper eros urna lorem erat tempor amet natoque netus.
            </p>
          </div>

          {/* Right — retro window image placeholder */}
          <div
            className="w-full max-w-lg min-w-0 flex-1"
            style={{ transform: "rotate(-2deg)" }}
          >
            {/* Window title bar */}
            <div className="flex items-center justify-between border-4 border-black bg-[#95cf56] px-3 py-2">
              <span className="font-blackhansans text-sm font-bold">
                &lt;image&gt;
              </span>
              <span className="select-none border-2 border-black bg-white px-2 py-0.5 text-xs leading-none font-bold">
                ✕
              </span>
            </div>
            {/* Image area */}
            <div className="flex aspect-4/3 items-center justify-center border-4 border-t-0 border-black bg-gray-200">
              <span className="text-lg font-bold text-gray-400">
                [image placeholder]
              </span>
            </div>
            {/* Shadow tab at bottom */}
            <div className="ml-2 h-3 border-4 border-t-0 border-black bg-white" />
          </div>
        </div>
      </section>

    </GridBackground>
  )
}

"use client"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import GridBackground from "@/components/grid-background"
import LogoLoop from "@/components/logo-loop"
import { X } from "lucide-react"
import ImageContainer from "@/components/image-container"
import Image from "next/image"
import { useMediaQuery } from "@reactuses/core"
import { div } from "framer-motion/client"

const float = (duration: number, amplitude: number, delay = 0) => ({
  animate: { y: [0, -amplitude, 0] },
  transition: {
    y: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
  },
})

type Activity = {
  title: string
  times: string[]
  sticker?: string
  stickerStyle?: string
}

const COA: { date: string; activities: Activity[] }[] = [
  {
    date: "July 27, 2026",
    activities: [
      {
        title: "Animo Walk",
        times: [
          "6:30 AM - 7:00 AM - Assembly Period",
          "7:00 AM - 8:30 AM - Walk Proper",
        ],
        sticker: "/stickers/cics froshies.png",
        stickerStyle: "-translate-y-18 mx-auto size-60",
      },
      {
        title: "Eucharistic Celebration",
        times: ["9:00 AM - 10:00 AM - Ugnayang La Salle"],
        sticker: "/stickers/goodluck.png",
        stickerStyle: "rotate-25 size-40",
      },
      {
        title: "AnimoVenture",
        times: ["10:00 AM - 12:00 NN - Ugnayang La Salle"],
        sticker: "/stickers/CICS PIONNI.png",
        stickerStyle: "size-50",
      },
      {
        title: "Recruitment Booths",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
      },
      {
        title: "Bazaar",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/ctrl z.png",
        stickerStyle: "size-50",
      },
      {
        title: "College Orientation for CEAT",
        times: ["1:00 PM - 5:00 PM - Ugnayang La Salle"],
        sticker: "/stickers/pionni error.png",
        stickerStyle: "size-60",
      },
      {
        title: "Campus Tour of CCJE and COED",
        times: ["1:00 PM - 4:00 PM - DLSU-D Grounds (Specific)"],
      },
    ],
  },
  {
    date: "July 28, 2026",
    activities: [
      {
        title: "Meet the Founder",
        times: ["8:00 AM - 11:30 AM - Assigned Classrooms"],
        sticker: "/stickers/cics froshies.png",
        stickerStyle: "-translate-y-18 mx-auto size-60",
      },
      {
        title: "Recruitment Booths",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/goodluck.png",
        stickerStyle: "rotate-25 size-40",
      },
      {
        title: "Bazaar",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/CICS PIONNI.png",
        stickerStyle: "size-50",
      },
      {
        title: "Holy Mass",
        times: ["12:00 NN - 1:00 PM - University Chapel"],
      },
      {
        title: "SPADE",
        times: ["1:00 PM - 4:30 PM - Assigned Classrooms"],
        sticker: "/stickers/ctrl z.png",
        stickerStyle: "size-50",
      },
      {
        title: "PAGbahagi",
        times: ["1:30 PM - 4:30 PM - (Tentative)"],
        sticker: "/stickers/pionni error.png",
        stickerStyle: "size-60",
      },
    ],
  },
  {
    date: "July 29, 2026",
    activities: [
      {
        title: "Recruitment Booths",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/cics froshies.png",
        stickerStyle: "-translate-y-18 mx-auto size-60",
      },
      {
        title: "Bazaar",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/goodluck.png",
        stickerStyle: "rotate-25 size-40",
      },
      {
        title: "College Orientation for CCJE",
        times: ["8:00 AM - 12:00 NN - Exhibit Hall at CEAT Bldg"],
        sticker: "/stickers/CICS PIONNI.png",
        stickerStyle: "size-50",
      },
      {
        title: "Campus Tour of CTHM",
        times: ["8:00 AM - 11:00 AM - DLSU-D Grounds (Specific)"],
      },
      {
        title: "Holy Mass",
        times: ["12:00 NN - 1:00 PM - University Chapel"],
        sticker: "/stickers/ctrl z.png",
        stickerStyle: "size-50",
      },
      {
        title: "College Orientation for CTHM",
        times: ["1:00 PM - 5:00 PM - Salrial Hall at CTHM"],
        sticker: "/stickers/CICS PIONNI.png",
        stickerStyle: "size-50",
      },
      {
        title: "Campus Tour of CEAT",
        times: ["1:00 PM - 4:00 PM - DLSU-D Grounds (Specific)"],
      },
      {
        title: "College Orientation for COED",
        times: ["1:00 PM - 5:00 PM - Exhibit Hall at CEAT Bldg"],
        sticker: "/stickers/pionni yapping.png",
        stickerStyle: "size-60",
      },
      {
        title: "PAGbahagi",
        times: ["1:30 PM - 4:30 PM - (Tentative)"],
      }
    ],
  },
  {
    date: "July 30, 2026",
    activities: [
      {
        title: "Recruitment Booths",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/cics froshies.png",
        stickerStyle: "-translate-y-18 mx-auto size-60",
      },
      {
        title: "Bazaar",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/goodluck.png",
        stickerStyle: "rotate-25 size-40",
      },
      {
        title: "College Orientation for CICS",
        times: ["8:00 AM - 12:00 NN - Salrial Hall at CTHM Bldg"],
        sticker: "/stickers/CICS PIONNI.png",
        stickerStyle: "size-50",
      },
      {
        title: "College Orientation for CBAA",
        times: ["8:00 AM - 12:00 NN - Exhibit Hall at CEAT Bldg"],
        sticker: "/stickers/pionni thumbs up.png",
        stickerStyle: "size-40",
      },
      {
        title: "Campus Tour of CLAC and COS",
        times: ["8:00 AM - 11:00 PM - DLSU-D Grounds (Specific)"],
        sticker: "/stickers/ctrl z.png",
        stickerStyle: "size-50",
      },
      {
        title: "Holy Mass",
        times: ["12:00 NN - 1:00 PM - University Chapel"],
        sticker: "/stickers/pionni animo head.png",
        stickerStyle: "rotate-12 size-50",
      },
      {
        title: "College Orientation for COS",
        times: ["1:00 PM - 5:00 PM - Salrial Hall at CTHM Bldg"],
        sticker: "/stickers/pionni animo.png",
        stickerStyle: "size-30",
      },
      {
        title: "College Orientation for CLAC",
        times: ["1:00 PM - 5:00 PM - DLSU-D Grandstand"],
      },
      {
        title: "Campus Tour of CBAA and CICS",
        times: ["1:00 PM - 4:00 PM - DLSU-D Grounds (Specific)"],
        sticker: "/stickers/pionni yapping.png",
        stickerStyle: "size-60",
      },
      {
        title: "PAGbahagi",
        times: ["1:30 PM - 4:30 PM - (Tentative)"],
      },
    ],
  },
  {
    date: "July 31, 2026",
    activities: [
      {
        title: "Recruitment Booths",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/cics froshies.png",
        stickerStyle: "-translate-y-18 mx-auto size-60",
      },
      {
        title: "Bazaar",
        times: ["8:00 AM - 5:00 PM - DLSU-D Grounds"],
        sticker: "/stickers/goodluck.png",
        stickerStyle: "rotate-25 size-40",
      },
      {
        title: "Reflection Session",
        times: ["8:00 AM - 10:00 AM - Ugnayang La Salle"],
        sticker: "/stickers/CICS PIONNI.png",
        stickerStyle: "size-50",
      },
      {
        title: "Eucharistic Celebration",
        times: ["10:00 AM - 11:00 AM - Ugnayang La Salle"],
        sticker: "/stickers/pionni yapping.png",
        stickerStyle: "size-60",
      },
      {
        title: "Student L.I.F.E.",
        times: ["2:00 PM - 5:00 PM - Ugnayang La Salle"],
        sticker: "/stickers/pionni error.png",
        stickerStyle: "size-60",
      }
    ],
  },
]

export default function Page() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const [activeDay, setActiveDay] = useState(0)
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

          <motion.div
            className="absolute bottom-[30%] z-30 flex -translate-x-2 gap-6"
            style={{ y: btnScrollY, scale: btnScale, opacity: btnOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
      <div className="relative z-20 mt-20 bg-white">
        <div className="absolute top-5 h-[90%] w-full bg-white" />
        <LogoLoop
          className="relative z-2 py-1 outline-4 outline-black lg:py-3"
          bgColor="#95cf56"
          textColor="#fef085"
          gap={64}
          speed={200}
          rotation={isMobile ? -3 : -2}
          pauseOnHover={false}
          logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
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
          className="absolute -top-8 z-1 py-1 outline-4 outline-black lg:-top-17 lg:py-3"
          bgColor="#fc7646"
          textColor="#fef085"
          gap={64}
          reverse
          speed={200}
          rotation={isMobile ? 4 : 2}
          pauseOnHover={false}
          logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
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
      <section className="relative z-50 bg-white px-8 py-20 pb-0 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:items-start">
          {/* Left — heading + body */}
          <div className="min-w-0 flex-1">
            <div
              className="mb-6 inline-block border-4 border-black bg-[#fef085] px-4 py-2"
              style={{ boxShadow: "4px 4px 0 black" }}
            >
              <h2 className="font-blackhansans text-2xl font-extrabold text-white uppercase [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
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
          <ImageContainer rotate={isMobile ? -2 : 2}>
            <Image
              src={"/MainImage.png"}
              alt="Main Image"
              width={600}
              height={700}
              className="h-full w-full object-cover"
            />
          </ImageContainer>
        </div>
      </section>

      {/* What is CICS section */}
      <section className="relative z-50 bg-white px-8 py-20 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 md:flex-row-reverse md:items-start">
          {/* Left — heading + body */}
          <div className="min-w-0 flex-1">
            <div
              className="mb-6 inline-block border-4 border-black bg-[#fef085] px-4 py-2"
              style={{ boxShadow: "4px 4px 0 black" }}
            >
              <h2 className="font-blackhansans text-2xl font-extrabold text-white uppercase [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
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
          <ImageContainer rotate={-2}>
            <Image
              src={"/MainImage.png"}
              alt="Main Image"
              width={600}
              height={700}
              className="h-full w-full object-cover"
            />
          </ImageContainer>
        </div>
      </section>

      {/* Logo / partner loop */}
      <div className="relative z-20 pt-10">
        <div className="absolute top-0 h-[60%] w-full bg-white" />
        <LogoLoop
          className="relative z-2 py-1 outline-4 outline-black lg:py-3"
          bgColor="#95cf56"
          textColor="#fef085"
          gap={64}
          speed={200}
          rotation={isMobile ? -3 : -2}
          pauseOnHover={false}
          logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
          items={[
            {
              type: "text",
              content: "CALENDAR OF ACTIVITIES",
              className:
                "text-4xl font-extrabold font-kelsi  [-webkit-text-stroke:1px_black]",
            },
          ]}
        />
        <LogoLoop
          className="absolute -top-8 z-1 py-1 outline-4 outline-black lg:-top-12 lg:py-3"
          bgColor="#fc7646"
          textColor="#fef085"
          gap={64}
          reverse
          speed={200}
          rotation={isMobile ? 4 : 2}
          pauseOnHover={false}
          logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
          items={[
            {
              type: "text",
              content: "CALENDAR OF ACTIVITIES",
              className:
                "text-4xl font-extrabold font-kelsi  [-webkit-text-stroke:1px_black]",
            },
          ]}
        />
      </div>

      {/* Calendar of Activities section */}
      <section className="relative z-50 mb-16 px-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
          {/* Day Picker */}
          <div className="flex w-full flex-row flex-nowrap justify-center gap-8 overflow-x-auto pb-2">
            {COA.map((day, index) => (
              <button
                key={index}
                className={`border border-black px-4 py-2 font-blackhansans text-nowrap text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill] ${
                  activeDay === index ? "bg-[#95cf56]" : "bg-[#fef085]"
                }`}
                onClick={() => setActiveDay(index)}
                style={{ boxShadow: "3px 3px 0 black" }}
              >
                Day {index + 1}
              </button>
            ))}
          </div>

          {/* Date */}
          <div className="mb-6 inline-block -skew-2 border-2 border-black bg-[#95cf56] px-6 py-2 md:mr-85">
            <h2 className="font-blackhansans text-2xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              {COA[activeDay].date}
            </h2>
          </div>

          {/* Content */}
          <div className="relative w-full">
            <div className="absolute left-3 h-full w-1 border-l-2 border-dashed border-black md:left-1/2" />

            {COA[activeDay].activities.map((activity, index) => (
              <motion.div
                className="relative z-2 grid max-w-4xl grid-cols-[50px_1fr] items-center justify-between gap-4 md:mx-auto md:grid-cols-[1fr_50px_1fr] lg:grid-cols-[1fr_100px_1fr]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{once: true}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Activity */}
                <div
                  key={index}
                  className={`mb-6 flex w-full flex-col gap-2 md:text-center ${isMobile ? "order-2" : index % 2 === 0 ? "order-1 ml-auto" : "order-3"}`}
                >
                  <h3
                    className={`mb-4 w-fit border border-black bg-accent px-6 py-1 font-blackhansans text-lg font-bold text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] md:w-full ${isMobile ? "-rotate-2" : index % 2 === 0 ? "-rotate-3" : "rotate-3"}`}
                    style={{ boxShadow: "3px 3px 0 black" }}
                  >
                    {activity.title}
                  </h3>
                  <ul className="font-bold">
                    {activity.times.map((time, timeIndex) => (
                      <li key={timeIndex}>{time}</li>
                    ))}
                  </ul>
                </div>

                {/* Dot */}
                <div
                  className="order-1 mt-2 mb-auto size-6 border border-black bg-[#7ea1d0] md:order-2 md:mx-auto"
                  style={{ boxShadow: "3px 3px 0 black" }}
                />

                {/* Stikorl */}
                <div
                  className={`hidden md:block ${index % 2 === 0 ? "order-3" : "order-1"}`}
                >
                  {activity.sticker && (
                    <Image
                      src={activity.sticker}
                      alt="Sticker"
                      width={180}
                      height={180}
                      className={`mx-auto mb-4 h-fit object-contain ${activity.stickerStyle || "size-40"}`}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <Image
            src="/stickers/pionni stamp.png"
            alt="Sticker"
            width={280}
            height={180}
            className="hidden md:block"
          />
        </div>
      </section>
    </GridBackground>
  )
}

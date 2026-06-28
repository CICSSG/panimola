"use client"
import { motion } from "framer-motion"

const blobs = [
  { points: "20,10 180,0 200,80 190,190 10,200 0,100", fill: "#fde047", className: "absolute -top-8 -left-8 w-64", rotate: -6,  delay: 0    },
  { points: "10,40 100,0 190,30 200,160 110,200 0,170", fill: "#f9a8d4", className: "absolute top-24 -right-10 w-48", rotate: 12, delay: 0.1  },
  { points: "0,60 80,0 200,20 200,140 120,200 0,180",  fill: "#7dd3fc", className: "absolute bottom-16 -left-6 w-40", rotate: -6, delay: 0.2  },
  { points: "40,0 160,10 200,100 150,200 50,195 0,110", fill: "#86efac", className: "absolute bottom-10 right-10 w-32", rotate: 3, delay: 0.15 },
]


export default function Page() {
  return (
    <div
      className="relative min-h-svh w-full overflow-hidden bg-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Animated decorative blobs — hidden on very small screens to avoid covering content */}
      {blobs.map(({ points, fill, className, rotate, delay }, i) => (
        <motion.svg
          key={i}
          aria-hidden
          viewBox="0 0 200 200"
          className={`pointer-events-none hidden opacity-80 sm:block ${className}`}
          initial={{ opacity: 0, scale: 0.6, rotate: rotate - 10 }}
          animate={{ opacity: 0.8, scale: 1, rotate, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.5, delay },
            scale:   { duration: 0.6, delay, type: "spring", stiffness: 200, damping: 18 },
            rotate:  { duration: 0.6, delay },
            y: { duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay },
          }}
        >
          <polygon points={points} fill={fill} stroke="black" strokeWidth="5" />
        </motion.svg>
      ))}

      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <motion.div
          className="mb-6 inline-block -rotate-2 border-4 border-black bg-[#fde047] px-4 py-1 text-sm font-extrabold uppercase tracking-widest"
          style={{ boxShadow: "4px 4px 0 black" }}
          initial={{ opacity: 0, y: -16, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          DLSUD · CICS Student Government
        </motion.div>

        <motion.h1
          className="mb-4 text-5xl font-black uppercase leading-none tracking-tight text-black sm:text-6xl"
          style={{ WebkitTextStroke: "2px black", paintOrder: "stroke fill" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          CICS
          <br />
          <span className="text-[#f9a8d4]" style={{ WebkitTextStroke: "2px black" }}>
            Panimola
          </span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-sm text-base font-bold text-black"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          Your student government hub for events, announcements, and everything CICS.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <a
            href="/events"
            className="border-4 border-black bg-[#7dd3fc] px-8 py-3 text-base font-extrabold uppercase transition-transform hover:-translate-y-1 active:translate-y-0"
            style={{ boxShadow: "4px 4px 0 black" }}
          >
            See Events
          </a>
          <a
            href="/about"
            className="border-4 border-black bg-white px-8 py-3 text-base font-extrabold uppercase transition-transform hover:-translate-y-1 active:translate-y-0"
            style={{ boxShadow: "4px 4px 0 black" }}
          >
            About Us
          </a>
        </motion.div>
      </div>

      <div className="border-t-4 border-black" />

      {/* Feature cards */}
      <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-3">
        {[
          { label: "Events",        desc: "Check out upcoming CICS activities and orientations.", color: "#fde047", rotate: "-rotate-1", delay: 0.6  },
          { label: "Announcements", desc: "Stay in the loop with the latest from your SG.",       color: "#f9a8d4", rotate: "rotate-0",  delay: 0.7  },
          { label: "About CICS SG", desc: "Meet the people behind your student government.",      color: "#7dd3fc", rotate: "rotate-1",  delay: 0.8  },
        ].map(({ label, desc, color, rotate, delay }) => (
          <motion.div
            key={label}
            className="group relative flex flex-col gap-3 border-b-4 border-black p-8 last:border-b-0 sm:border-b-0 sm:border-r-4 sm:last:border-r-0 hover:z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay }}
          >
            <div
              className={`${rotate} w-fit border-4 border-black px-3 py-1 text-xl font-black uppercase transition-transform group-hover:-translate-y-1`}
              style={{ background: color, boxShadow: "3px 3px 0 black" }}
            >
              {label}
            </div>
            <p className="text-sm font-semibold text-black">{desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-t-4 border-black" />
    </div>
  )
}

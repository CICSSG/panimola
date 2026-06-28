"use client"
import { motion } from "framer-motion"

const OFFICERS = [
  { role: "President",          name: "——",  color: "#fde047" },
  { role: "Vice President",     name: "——",  color: "#f9a8d4" },
  { role: "Secretary",          name: "——",  color: "#7dd3fc" },
  { role: "Treasurer",          name: "——",  color: "#86efac" },
  { role: "Auditor",            name: "——",  color: "#fde047" },
  { role: "P.R.O.",             name: "——",  color: "#f9a8d4" },
]

export default function AboutPage() {
  return (
    <div
      className="relative min-h-svh w-full bg-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Header */}
      <div className="border-b-4 border-black bg-[#f9a8d4] px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="rotate-1 mb-3 inline-block border-4 border-black bg-white px-3 py-0.5 text-xs font-extrabold uppercase tracking-widest"
            style={{ boxShadow: "3px 3px 0 black" }}
          >
            DLSUD · CICS
          </div>
          <h1 className="text-5xl font-black uppercase leading-none tracking-tight">About Us</h1>
          <p className="mt-2 text-sm font-bold">The CICS Student Government — who we are and what we stand for.</p>
        </motion.div>
      </div>

      {/* Mission block */}
      <motion.div
        className="border-b-4 border-black px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div
          className="-rotate-1 mb-4 inline-block border-4 border-black bg-[#fde047] px-3 py-1 text-xl font-black uppercase"
          style={{ boxShadow: "3px 3px 0 black" }}
        >
          Mission
        </div>
        <p className="max-w-2xl text-base font-semibold leading-relaxed text-black/80">
          The CICS Student Government exists to represent, empower, and serve the students of the College of Information and Computer Studies at De La Salle University Dasmariñas — fostering a community of excellence, integrity, and service.
        </p>
      </motion.div>

      {/* Officers grid */}
      <div className="border-b-4 border-black px-4 pt-10 pb-2 sm:px-8">
        <div
          className="rotate-1 mb-6 inline-block border-4 border-black bg-[#7dd3fc] px-3 py-1 text-xl font-black uppercase"
          style={{ boxShadow: "3px 3px 0 black" }}
        >
          Officers
        </div>
        <div className="grid grid-cols-2 gap-0 sm:grid-cols-3 border-t-4 border-l-4 border-black">
          {OFFICERS.map(({ role, name, color }, i) => (
            <motion.div
              key={role}
              className="flex flex-col gap-2 border-b-4 border-r-4 border-black p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
            >
              <div
                className="w-fit -rotate-1 border-2 border-black px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide"
                style={{ background: color }}
              >
                {role}
              </div>
              <span className="text-lg font-black text-black/30">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center px-8 py-12 text-center">
        <p className="max-w-sm text-sm font-bold text-black/40 uppercase tracking-wide">
          Officer profiles will be updated soon.
        </p>
      </div>
    </div>
  )
}

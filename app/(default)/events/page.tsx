"use client"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

const PLACEHOLDER_EVENTS = [
  { title: "CICS College Orientation", date: "July 30, 2026", time: "8:00 AM – 12:00 PM", location: "Salrial Hall (PBH)", color: "#fde047" },
  { title: "Tech Talk: AI in Education", date: "August 5, 2026", time: "2:00 PM – 4:00 PM",  location: "AVR 3",             color: "#f9a8d4" },
  { title: "Hackathon 2026",             date: "August 20, 2026", time: "All Day",             location: "IT Building",       color: "#7dd3fc" },
  { title: "SG General Assembly",        date: "September 3, 2026", time: "10:00 AM – 12:00 PM", location: "Auditorium",     color: "#86efac" },
]

export default function EventsPage() {
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
      <div className="border-b-4 border-black bg-[#7dd3fc] px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="-rotate-1 mb-3 inline-block border-4 border-black bg-white px-3 py-0.5 text-xs font-extrabold uppercase tracking-widest"
            style={{ boxShadow: "3px 3px 0 black" }}
          >
            CICS SG
          </div>
          <h1 className="text-5xl font-black uppercase leading-none tracking-tight">Events</h1>
          <p className="mt-2 text-sm font-bold">Upcoming activities, orientations, and more.</p>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-0 border-b-4 border-black sm:grid-cols-2">
        {PLACEHOLDER_EVENTS.map(({ title, date, time, location, color }, i) => (
          <motion.div
            key={title}
            className="group flex flex-col gap-3 border-b-4 border-black p-6 hover:z-10 sm:border-r-4 sm:p-8 sm:even:border-r-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div
              className="w-fit -rotate-1 border-4 border-black px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition-transform group-hover:-translate-y-0.5"
              style={{ background: color, boxShadow: "3px 3px 0 black" }}
            >
              Upcoming
            </div>
            <h2 className="text-xl font-black uppercase leading-tight">{title}</h2>
            <div className="flex flex-col gap-1 text-sm font-semibold text-black/70">
              <span className="flex items-center gap-2"><Calendar className="size-4" />{date} · {time}</span>
              <span className="pl-6">{location}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder note */}
      <div className="flex items-center justify-center px-8 py-12 text-center">
        <p className="max-w-sm text-sm font-bold text-black/40 uppercase tracking-wide">
          More events coming soon — check back regularly.
        </p>
      </div>
    </div>
  )
}

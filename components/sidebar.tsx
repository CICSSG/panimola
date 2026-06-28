"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useSidebar } from "./sidebar-context"

const SHAPES = {
  splat: "10,4 90,0 198,8 200,40 195,54 100,56 8,52 0,30 4,12",
  ribbon: "0,10 60,2 200,6 196,46 140,54 0,48",
  chevron: "0,4 180,0 200,28 178,56 0,52 18,28",
}

// Reusable dot-pattern def — each sticker SVG references this by id
function DotPattern({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6">
        <circle cx="3" cy="3" r="1.2" fill={color} />
      </pattern>
    </defs>
  )
}

function NavItem({
  href,
  label,
  fill,
  shape = "splat",
}: {
  href: string
  label: string
  fill: string
  shape?: keyof typeof SHAPES
}) {
  const patternId = `dots-${label.toLowerCase()}`
  // Darken the fill slightly for the dot overlay so dots are visible but subtle
  return (
    <motion.a
      href={href}
      className="relative flex items-center px-4 py-3 text-lg font-extrabold"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.svg
        aria-hidden
        viewBox="0 0 200 56"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        variants={{
          rest:  { scale: 0, rotate: -4, opacity: 0 },
          hover: { scale: 1, rotate: -2, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <DotPattern id={patternId} color="rgba(0,0,0,0.18)" />
        {/* base fill */}
        <polygon points={SHAPES[shape]} fill={fill} stroke="black" strokeWidth="3" />
        {/* dot texture overlay clipped to same shape */}
        <polygon points={SHAPES[shape]} fill={`url(#${patternId})`} />
      </motion.svg>
      <span className="relative text-center w-full">{label}</span>
    </motion.a>
  )
}

export default function Sidebar() {
  const { isOpen, close } = useSidebar()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] bg-black"
            onClick={close}
          />
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-[1001] flex h-full w-80 flex-col border-l-4 border-black bg-white"
          >
            <div className="flex items-center justify-between border-b-4 border-black p-7">
              <span className="text-xl font-extrabold">Menu</span>
              <motion.button
                onClick={close}
                className="relative flex items-center justify-center p-2"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.svg
                  aria-hidden
                  viewBox="0 0 56 56"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  variants={{
                    rest:  { scale: 0, rotate: 10, opacity: 0 },
                    hover: { scale: 1, rotate: 6,  opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <DotPattern id="dots-close" color="rgba(0,0,0,0.18)" />
                  <polygon points="4,10 28,2 52,10 54,28 50,48 28,54 6,50 2,28" fill="#fca5a5" stroke="black" strokeWidth="3" />
                  <polygon points="4,10 28,2 52,10 54,28 50,48 28,54 6,50 2,28" fill="url(#dots-close)" />
                </motion.svg>
                <X className="relative size-5" />
              </motion.button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <NavItem href="/" label="Home" fill="#fde047" shape="splat" />
              <NavItem
                href="/events"
                label="Events"
                fill="#f9a8d4"
                shape="ribbon"
              />
              <NavItem
                href="/about"
                label="About"
                fill="#7dd3fc"
                shape="chevron"
              />
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

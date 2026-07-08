"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import StickerButton from "./sticker-button"

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
              <StickerButton
                onClick={close}
                className="text-sm"
                fill="#fca5a5"
                shape="splat"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </StickerButton>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <StickerButton
                as="a"
                href="/"
                className="w-full px-8 py-4 text-lg"
              >
                Home
              </StickerButton>
              <StickerButton
                as="a"
                href="/events"
                className="w-full px-8 py-4 text-lg"
              >
                Events
              </StickerButton>
              <StickerButton
                as="a"
                href="/about"
                className="w-full px-8 py-4 text-lg"
              >
                About
              </StickerButton>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

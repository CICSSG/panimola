"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import StickerButton from "./sticker-button"
import Image from "next/image";

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
            className="fixed inset-0 z-1000 bg-black"
            onClick={close}
          />
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-1001 flex h-full w-80 flex-col border-l-4 border-black bg-[#95cf56]"
          >
            <div className="flex items-center justify-between p-7">
              <span className="font-kelsi text-5xl text-[#fef085] [-webkit-text-stroke:6px_black] [paint-order:stroke_fill]">Menu</span>
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
            <nav className="flex flex-col gap-2 p-4 text-white font-blackhansans [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              <StickerButton
                as="a"
                href="/"
                className="w-fit px-6 py-2 text-lg"
              >
                Home
              </StickerButton>
              <StickerButton
                as="a"
                href="/programs"
                className="w-fit px-6 py-2 text-lg"
              >
                Programs
              </StickerButton>
              <StickerButton
                as="a"
                href="/departments"
                className="w-fit px-6 py-2 text-lg"
              >
                Departments
              </StickerButton>
              <StickerButton
                as="a"
                href="/organizations"
                className="w-fit px-6 py-2 text-lg"
              >
                Organizations
              </StickerButton>
              <StickerButton
                as="a"
                href="/staff"
                className="w-fit px-6 py-2 text-lg"
              >
                Admin & Staff
              </StickerButton>
            </nav>
            <Image 
              src="/Star 01.png"
              alt="Star"
              width={200}
              height={200}
              className="absolute bottom-0 right-0 w-40 h-40"
            />
            <Image 
              src="/Star 02.png"
              alt="Star"
              width={200}
              height={200}
              className="absolute bottom-40 left-0 w-fit h-70"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

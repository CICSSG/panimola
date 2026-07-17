"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import StickerButton from "./sticker-button"
import Image from "next/image"
import { Button } from "./ui/button"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Sidebar() {
  const { user, isSignedIn } = useUser()
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
            <div className="relative z-2 flex items-center justify-between p-7">
              <span className="font-kelsi text-5xl text-[#fef085] [-webkit-text-stroke:6px_black] [paint-order:stroke_fill]">
                Menu
              </span>
              <Button
                onClick={close}
                className="size-10 border-2 border-black bg-[#fef085] hover:bg-[#fef085]/85"
              >
                <X className="size-6" strokeWidth={6} color="#fc7646" />
              </Button>
            </div>
            <nav className="relative z-2 flex flex-col gap-2 p-4 font-blackhansans text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              <StickerButton className="w-fit px-6 py-2 text-lg">
                <Link href="/" className="h-full w-full" onClick={close}>
                  Home
                </Link>
              </StickerButton>
              <StickerButton className="w-fit px-6 py-2 text-lg">
                <Link
                  href="/programs"
                  className="h-full w-full"
                  onClick={close}
                >
                  Programs
                </Link>
              </StickerButton>
              <StickerButton className="w-fit px-6 py-2 text-lg">
                <Link
                  href="/departments"
                  className="h-full w-full"
                  onClick={close}
                >
                  Departments
                </Link>
              </StickerButton>
              <StickerButton className="w-fit px-6 py-2 text-lg">
                <Link
                  href="/organizations"
                  className="h-full w-full"
                  onClick={close}
                >
                  Organizations
                </Link>
              </StickerButton>
              <StickerButton className="w-fit px-6 py-2 text-lg">
                <Link href="/staff" className="h-full w-full" onClick={close}>
                  Admin & Staff
                </Link>
              </StickerButton>
              {isSignedIn && (
                <StickerButton className="w-fit px-6 py-2 text-lg">
                  <Link
                    href={`/profile/${user?.id}`}
                    className="h-full w-full"
                    onClick={close}
                  >
                    Profile
                  </Link>
                </StickerButton>
              )}
            </nav>
            <Image
              src="/Star 01.png"
              alt="Star"
              width={200}
              height={200}
              className="absolute right-0 bottom-0 h-40 w-40"
            />
            <Image
              src="/Star 02.png"
              alt="Star"
              width={200}
              height={200}
              className="absolute bottom-40 left-0 h-70 w-fit"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

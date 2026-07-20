"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import Image from "next/image"

export default function Header() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { open } = useSidebar()

  return (
    <div className="fixed top-0 left-0 z-999 flex h-24 w-full items-center justify-between border-b-4 border-black bg-white px-4">
      {/* Logo */}
      <Link
        href="/"
        className="flex min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6"
      >
        <Image
          src="/assets/LOGO.png"
          alt="Logo"
          width={180}
          height={80}
          className="object-cover"
        />
      </Link>

      {/* Right side */}
      <div className="flex h-full items-center">
        {/* Auth */}
        <div className="flex items-center px-6">
          {!isLoaded ? (
            <></>
          ) : (
            !isSignedIn && (
              <Link
                href="/sign-in"
                className="rotate-4 border border-black bg-accent px-4 py-1.5 text-sm font-extrabold uppercase transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "3px 3px 0 black" }}
              >
                <div className="-rotate-4 text-lg font-semibold text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                  Login
                </div>
              </Link>
            )
          )}
        </div>

        {/* Menu button */}
        <motion.button
          onClick={open}
          className="border border-black bg-accent px-1.5 py-1.5 text-sm font-extrabold uppercase transition-transform hover:-translate-y-0.5"
          style={{ boxShadow: "3px 3px 0 black" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <span className="">
            <Menu className="size-7" strokeWidth={2.5} color="#fff" />
          </span>
        </motion.button>
      </div>
    </div>
  )
}

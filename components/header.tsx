"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { useSidebar } from "./sidebar-context"

export default function Header() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { open } = useSidebar()

  return (
    <div className="fixed top-0 left-0 z-999 flex h-24 w-full items-center justify-between border-b-4 border-black bg-white">
      {/* Logo */}
      <Link href="/" className="flex min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <span
          className="-rotate-1 shrink-0 border-4 border-black bg-[#fde047] px-2 py-1 text-base font-black uppercase tracking-tight sm:px-3 sm:text-xl"
          style={{ boxShadow: "3px 3px 0 black" }}
        >
          CICS
        </span>
        <span className="truncate text-base font-black uppercase tracking-tight sm:text-xl">Panimola</span>
      </Link>

      {/* Right side */}
      <div className="flex h-full items-center">
        {/* Auth */}
        <div className="flex items-center px-6">
          {!isLoaded ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-black/10" />
          ) : isSignedIn ? (
            <div className="flex items-center gap-3">
              <UserButton />
              <span className="hidden text-sm font-bold sm:block">
                Welcome, {user?.firstName}!
              </span>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="border-4 border-black bg-white px-4 py-1.5 text-sm font-extrabold uppercase transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 black" }}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Menu button */}
        <motion.button
          onClick={open}
          className="flex h-full items-center justify-center border-l-4 border-black px-7"
          whileHover={{ backgroundColor: "#fde047" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <Menu className="size-7" strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  )
}

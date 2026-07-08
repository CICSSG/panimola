"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { UserButton, useUser } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { useSidebar } from "./sidebar-context"
import Image from "next/image";

export default function Header() {
  const { isSignedIn, isLoaded, user } = useUser()
  const { open } = useSidebar()

  return (
    <div className="fixed top-0 left-0 z-999 flex h-24 w-full items-center justify-between border-b-4 border-black bg-white">
      {/* Logo */}
      <Link href="/" className="flex min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6">
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
              className="border-4 border-black bg-accent px-4 py-1.5 text-sm font-extrabold uppercase transition-transform hover:-translate-y-0.5 rotate-4"
              style={{ boxShadow: "3px 3px 0 black" }}
            >
              <div className="-rotate-4 text-white [-webkit-text-stroke:0.5px_black]">Login</div>
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

"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-context"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import {
  ArrowUpIcon,
  ArrowUpToLine,
  LayoutDashboard,
  PanelRight,
  QrCode,
  User,
} from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { is } from "zod/v4/locales/index.js"

const LOGGED_NAV = [
  { label: "Home", href: "/", Icon: LayoutDashboard },
  { label: "QR", href: "/qr", Icon: QrCode },
  { label: "Profile", href: "/profile", Icon: User },
]

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isSignedIn } = useUser()
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    // 1. Define the event handler
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    // 2. Attach listener safely on client mount
    window.addEventListener("scroll", handleScroll)

    // 3. Clean up the event listener to avoid memory leaks
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <ThemeProvider forcedTheme="light" defaultTheme="light">
      <SidebarProvider>
        <Header />
        <Sidebar />
        <div className="relative mt-24 flex min-h-[calc(100svh-6rem)] flex-col">
          <main className="flex-1">{children}</main>
          <div>
            <Footer />
          </div>
        </div>
        {isSignedIn && window.location.pathname != "/onboarding" && (
          <div className="fixed right-2 bottom-2 z-50 flex flex-col items-center gap-2">
            {hasScrolled && (
              <motion.div
                className="flex size-12 flex-row items-center justify-center gap-2 rounded-full border border-black bg-[#fef085] text-sm font-medium text-black hover:bg-[#fef085]/90 hover:cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUpToLine />
              </motion.div>
            )}
            <Link
              href={"/qr"}
              className="flex size-16 flex-row items-center justify-center gap-2 rounded-full border border-black bg-accent text-sm font-medium text-black hover:bg-accent/90"
              style={{ boxShadow: "2px 2px 0px #000000" }}
            >
              <div
                className={`flex flex-col items-center rounded-t-2xl font-blackhansans font-thin transition-all duration-500`}
              >
                <QrCode className="size-8" />
              </div>
            </Link>
          </div>
        )}
      </SidebarProvider>
    </ThemeProvider>
  )
}

"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-context"
import Sidebar from "@/components/sidebar"
import { LayoutDashboard, PanelRight, QrCode, User } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
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
  const [activeHref, setActiveHref] = useState<string | null>("/")

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
          <div className="fixed right-2 bottom-2 z-50 flex flex-row">
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

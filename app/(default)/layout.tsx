'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-context"
import Sidebar from "@/components/sidebar"
import { LayoutDashboard, PanelRight, QrCode, User } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { is } from "zod/v4/locales/index.js";

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
  const {user, isSignedIn} = useUser()
  const [activeHref, setActiveHref] = useState<string | null>("/")

  return (
    <ThemeProvider forcedTheme="light" defaultTheme="light">
      <SidebarProvider>
        <Header />
        <Sidebar />
        <div className="relative mt-24 flex min-h-[calc(100svh-6rem)] flex-col">
          <main className="flex-1">{children}</main>
          <div className={isSignedIn ? "mb-10" : ""}>
            <Footer />
          </div>
        </div>
        {isSignedIn && window.location.pathname != "/onboarding" && (
          <div className="fixed -bottom-1 left-0 z-50 flex flex-row *:basis-0 *:grow w-full overflow-hidden rounded-t-2xl border-t-2">
            {LOGGED_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-row items-center justify-center gap-2 bg-white text-sm font-medium text-black"
                onClick={() => setActiveHref(item.href)}
              >
                <div className={`flex flex-col items-center px-4 w-full font-blackhansans font-thin transition-all duration-500 rounded-t-2xl ${activeHref === item.href ? "bg-accent text-white/90 pb-3 pt-2" : "pb-2 pt-3 hover:bg-gray-100"}`}>
                  <item.Icon className="h-6 w-6" />
                  {item.label}
                </div>
              </Link>
            ))}            
          </div>
        )}
      </SidebarProvider>
    </ThemeProvider>
  )
}

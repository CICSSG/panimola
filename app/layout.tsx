import "./globals.css"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CICScovery",
  description:
    "A web application for onboarding the CICS Freshmen to the College at DLSUD.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-londonbetween")}
    >
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

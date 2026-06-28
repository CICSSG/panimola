import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button";
import { SignIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider forcedTheme="light" defaultTheme="light">
      <Header />
      {children}
    </ThemeProvider>
  )
}

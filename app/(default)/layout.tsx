import { ThemeProvider } from "@/components/theme-provider"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeProvider forcedTheme="light">{children}</ThemeProvider>
}

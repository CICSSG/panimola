import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-context";
import Sidebar from "@/components/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider forcedTheme="light" defaultTheme="light">
      <SidebarProvider>
        <Header />
        <Sidebar />
        <div className="mt-24 relative flex min-h-[calc(100svh-6rem)] flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

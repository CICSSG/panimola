import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { canAccessManagementPath, getDefaultManagementRoute, type PageAccess } from "@/lib/management-permissions"

const isManagementRoutes = createRouteMatcher(["/admin(.*)", "/data(.*)", "/company(.*)"])
const isLoggedInRoute = createRouteMatcher(["/connect(.*)", "/profile(.*)", "/missions(.*)"])
const isOnboardingRoute = createRouteMatcher(["/onboarding"])

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId, isAuthenticated } = await auth()
  const metadata = sessionClaims?.publicMetadata as
    | {
        isAdmin?: boolean
        adminRole?: string
        role: "user" | "admin"
        pageAccess?: PageAccess | null
        assignedCompany?: string | null
      }
    | undefined

  const normalizedAdminRole = metadata?.adminRole === "superadmin" || metadata?.adminRole === "admin"
    ? metadata.adminRole
    : null
  const pageAccess = metadata?.pageAccess ?? undefined

  const isAdminUser = metadata?.isAdmin || metadata?.role === "admin"
  const defaultManagementRoute = getDefaultManagementRoute(pageAccess, normalizedAdminRole, metadata?.assignedCompany)

  console.log("RUN")
  // Redirect logged-in users with neither publicMetadata nor a MongoDB record to onboarding
  if (
    userId &&
    isAuthenticated &&
    !metadata?.role &&
    !isOnboardingRoute(req) &&
    !req.nextUrl.pathname.startsWith("/api")
  ) {
    const checkUrl = new URL("/api/checkUser", req.url)
    const res = await fetch(checkUrl, {
      headers: { cookie: req.headers.get("cookie") ?? "" },
    })
    const { exists } = await res.json()
    if (!exists) {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }
  }

  if (!req.nextUrl.pathname.startsWith("/api") && !isManagementRoutes(req) && isAdminUser) {
    if (defaultManagementRoute !== req.nextUrl.pathname) {
      return NextResponse.redirect(new URL(defaultManagementRoute, req.url))
    }

    return NextResponse.next()
  }

  if (isManagementRoutes(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if(metadata?.role === "user") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    const canAccessCurrentPage = canAccessManagementPath(
      req.nextUrl.pathname,
      pageAccess,
      normalizedAdminRole,
      metadata?.assignedCompany,
    )

    if (!canAccessCurrentPage) {
      if (defaultManagementRoute !== req.nextUrl.pathname) {
        return NextResponse.redirect(new URL(defaultManagementRoute, req.url))
      }

      return NextResponse.next()
    }
  }

  if (isLoggedInRoute(req)) {
    if (!isAuthenticated) {
      const redirectUrl = `${req.nextUrl.pathname}${req.nextUrl.search}`
      return NextResponse.redirect(
        new URL(`/signin?redirect_url=${encodeURIComponent(redirectUrl)}`, req.url)
      )
    }
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}

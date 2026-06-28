import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { sessionId } = await auth()

  if (sessionId) {
    const client = await clerkClient()
    await client.sessions.revokeSession(sessionId).catch(() => {})
  }

  const res = NextResponse.redirect(new URL("/sign-in?error=domain", req.url))
  res.cookies.delete("__session")
  res.cookies.delete("__client_uat")
  return res
}

import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { sessionId } = await auth()
  const redirect = new URL("/sign-in?error=domain", req.url)

  if (sessionId) {
    const client = await clerkClient()
    const { userId } = await auth()
    await client.sessions.revokeSession(sessionId).catch(() => {})
    if (userId) {
      await client.users.deleteUser(userId).catch(() => {})
    }
  }

  const res = NextResponse.redirect(redirect)
  return res
}

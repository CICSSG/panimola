import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ exists: false }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DATABASE)
  const user = await db.collection("users").findOne({ clerkId: userId }, { projection: { _id: 1 } })
  // const user = await db.collection("users").find({}).toArray()
    
  // console.log("User exists:", user)

  return NextResponse.json({ exists: !!user })
}

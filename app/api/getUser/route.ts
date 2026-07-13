import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DATABASE)
  const collection = db.collection("users")
  const url = new URL(req.url)
  const userId = url.searchParams.get("userId")

  try {
    const users = await collection.find({ clerkId: userId }).toArray()
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}

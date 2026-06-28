import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
const ALLOWED_DOMAIN = "@dlsud.edu.ph"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { firstName, lastName, email, cys, studentNumber, facebookLink } = await req.json()

  if (IS_PRODUCTION && !email?.endsWith(ALLOWED_DOMAIN)) {
    return NextResponse.json({ message: "Only @dlsud.edu.ph accounts are allowed." }, { status: 403 })
  }

  if (!firstName || !lastName || !email || !cys || !studentNumber) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
  }

  if (!/^[A-Z]{3}\d{2}$/.test(cys)) {
    return NextResponse.json({ message: "CYS must be 3 letters followed by 2 numbers (e.g. BIT11)" }, { status: 400 })
  }

  if (!/^\d{9}$/.test(studentNumber)) {
    return NextResponse.json({ message: "Student number must be exactly 9 digits" }, { status: 400 })
  }

  const mongoClient = await clientPromise
  const db = mongoClient.db(process.env.MONGODB_DATABASE)
  const usersCollection = db.collection("users")

  const existing = await usersCollection.findOne({ clerkId: userId })
  if (existing) {
    return NextResponse.json({ message: "Already onboarded" }, { status: 409 })
  }

  const now = new Date().toISOString()
  await usersCollection.insertOne({
    clerkId: userId,
    firstName,
    lastName,
    email,
    cys,
    studentNumber,
    facebookLink: facebookLink || null,
    role: "user",
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json({ message: "Onboarded" })
}

import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()
  const { userId } = data

  const mongoClient = await clientPromise
  const db = mongoClient.db(process.env.MONGODB_DATABASE)
  const attendanceCollection = db.collection("attendance")

  const existing = await attendanceCollection.findOne({
    userId: userId,
  })

  
  if (existing) {
    console.log("Existing attendance record:", existing)
    return NextResponse.json(
      { success: false, message: `User ${userId} already logged attendance` },
      { status: 409 }
    )
  }

  await attendanceCollection.insertOne({
    userId: userId,
    attendance: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return NextResponse.json({ success: true, message: "Attendance logged" }, { status: 200 })
}

import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

function daysAgo(n: number) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - n)
  return d
}

function extractCourse(cys: string | undefined | null) {
  if (!cys) return "Unknown"
  const match = cys.match(/^[A-Za-z]+/)
  return match ? match[0].toUpperCase() : cys
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DATABASE)
    const usersCol = db.collection("users")
    const attendanceCol = db.collection("attendance")

    const since30 = daysAgo(29)

    const [
      totalUsers,
      totalAdmins,
      totalAttendance,
      usersRaw,
      signupsRaw,
      attendanceRaw,
    ] = await Promise.all([
      usersCol.countDocuments({}),
      usersCol.countDocuments({ isAdmin: true }),
      attendanceCol.countDocuments({}),
      usersCol
        .find({}, { projection: { cys: 1, email: 1, createdAt: 1, resumeLink: 1, role: 1, adminRole: 1 } })
        .toArray(),
      usersCol
        .aggregate([
          { $match: { createdAt: { $exists: true, $ne: null } } },
          {
            $project: {
              day: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: { $toDate: "$createdAt" },
                },
              },
            },
          },
          { $match: { day: { $gte: since30.toISOString().slice(0, 10) } } },
          { $group: { _id: "$day", count: { $sum: 1 } } },
          { $sort: { _id: 1 } },
        ])
        .toArray(),
      attendanceCol
        .aggregate([
          { $match: { attendance: { $exists: true, $ne: null } } },
          {
            $project: {
              day: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: { $toDate: "$attendance" },
                },
              },
            },
          },
          { $match: { day: { $gte: since30.toISOString().slice(0, 10) } } },
          { $group: { _id: "$day", count: { $sum: 1 } } },
          { $sort: { _id: 1 } },
        ])
        .toArray(),
    ])

    // Course/section distribution (derived from `cys`, e.g. "BIT11" -> "BIT")
    const courseCounts = new Map<string, number>()
    const domainCounts = new Map<string, number>()
    let usersWithResume = 0
    let adminCount = 0
    let regularCount = 0

    for (const u of usersRaw) {
      const course = extractCourse(u.cys as string | undefined)
      courseCounts.set(course, (courseCounts.get(course) || 0) + 1)

      const email = (u.email as string | undefined) || ""
      const domain = email.includes("@") ? email.split("@")[1].toLowerCase() : "Unknown"
      domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1)

      if (u.resumeLink) usersWithResume += 1
      if (u.isAdmin || u.adminRole) adminCount += 1
      else regularCount += 1
    }

    const courseDistribution = Array.from(courseCounts.entries())
      .map(([course, count]) => ({ name: course, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)

    const domainDistribution = Array.from(domainCounts.entries())
      .map(([domain, count]) => ({ name: domain, value: count }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    // Fill in missing days over the 30-day window with 0 so charts don't have gaps
    const fillDays = (rows: { _id: string; count: number }[]) => {
      const map = new Map(rows.map((r) => [r._id, r.count]))
      const out: { date: string; count: number }[] = []
      for (let i = 29; i >= 0; i--) {
        const d = daysAgo(i)
        const key = d.toISOString().slice(0, 10)
        out.push({ date: key, count: map.get(key) || 0 })
      }
      return out
    }

    const signupsByDay = fillDays(signupsRaw as { _id: string; count: number }[])
    const attendanceByDay = fillDays(attendanceRaw as { _id: string; count: number }[])

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          totalUsers,
          totalAdmins,
          totalAttendance,
          attendanceRate: totalUsers > 0 ? totalAttendance / totalUsers : 0,
          usersWithResume,
          resumeRate: totalUsers > 0 ? usersWithResume / totalUsers : 0,
        },
        roleDistribution: [
          { name: "Regular", value: regularCount },
          { name: "Admin", value: adminCount },
        ],
        courseDistribution,
        domainDistribution,
        signupsByDay,
        attendanceByDay,
      },
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}

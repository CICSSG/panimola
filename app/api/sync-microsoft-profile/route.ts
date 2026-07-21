import { auth, clerkClient } from "@clerk/nextjs/server"
import clientPromise from "@/lib/mongodb"

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clerkClient()

  // Get Microsoft OAuth token
  const oauthToken = await client.users.getUserOauthAccessToken(
    userId,
    "oauth_microsoft"
  )

  const accessToken = oauthToken.data[0]?.token

  if (!accessToken) {
    return Response.json({ error: "No Microsoft token found" }, { status: 400 })
  }

  // Get correct Microsoft profile
  const microsoftProfile = await fetch(
    "https://graph.microsoft.com/v1.0/me?$select=givenName,surname",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json())

  if (!microsoftProfile.givenName || !microsoftProfile.surname) {
    return Response.json(
      { error: "Microsoft profile incomplete" },
      { status: 400 }
    )
  }

  // Update Clerk user
  await client.users.updateUser(userId, {
    firstName: microsoftProfile.givenName,
    lastName: microsoftProfile.surname,
  })

  const mongoClient = await clientPromise
  const db = mongoClient.db(process.env.MONGODB_DATABASE)
  const usersCollection = db.collection("users")

  // Update MongoDB user
  await usersCollection.updateOne(
    { clerkId: userId },
    {
      $set: {
        firstName: microsoftProfile.givenName,
        lastName: microsoftProfile.surname,
      },
    }
  )

  return Response.json({
    success: true,
    profile: microsoftProfile,
  })
}

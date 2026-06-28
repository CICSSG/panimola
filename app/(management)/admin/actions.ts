"use server"

export async function inspectOrCreateMongoUserByEmail({
  email,
  createIfMissing,
}: {
  email: string
  createIfMissing: boolean
}): Promise<{
  success: boolean
  clerkFound?: boolean
  mongoExists?: boolean
  created?: boolean
  clerkId?: string
  email?: string
  firstName?: string
  lastName?: string
  error?: string
}> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/inspectOrCreateUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, createIfMissing }),
    })
    if (!response.ok) throw new Error("Request failed")
    return response.json()
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getCompaniesForAssignment(): Promise<{
  success: boolean
  data?: Array<{ id: string; name: string }>
  error?: string
}> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCollectionData?collection=companies`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to fetch companies")
    const json = await response.json()
    return {
      success: true,
      data: (json.data || []).map((c: { _id: string; name?: string }) => ({ id: c._id, name: c.name || "" })),
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getCollectionData(collection: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCollectionData?collection=${collection}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch collection data")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching collection data:", error)
    throw error
  }
}
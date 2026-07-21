import type { PageAccess } from "./permissions"

export type User = {
  id: string
  clerkId: string
  firstName: string
  lastName: string
  email: string
  cys: string
  studentNumber?: string | null
  facebookLink?: string | null
  shortBio?: string | null
  resumeLink?: string | null
  createdAt: string
  updatedAt: string
  role?: "admin" | "user" | null
  adminRole?: "superadmin" | "admin" | null
  isAdmin?: boolean
  pageAccess?: PageAccess | null
  userId?: number
}

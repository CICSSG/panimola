"use client"
import {
  getManagementPageAccessState,
  ManagementAccessMetadata,
  PageAccessSection,
} from "@/lib/management-permissions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Scanner } from "@yudiel/react-qr-scanner"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Camera,
  RefreshCw,
  PencilLine,
  Trash2,
  Shield,
  Users2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PaginationComponent } from "@/components/pagination"
import { User } from "../users/types"
import { getCollectionData } from "../actions"

const Attendance = () => {
  const { user } = useUser()

  const router = useRouter()
  const metadata = user?.publicMetadata as ManagementAccessMetadata | undefined

  const userRole = metadata?.role ?? null
  const adminRole = metadata?.adminRole ?? null
  const pageAccess = metadata?.pageAccess?.manage as
    | PageAccessSection
    | undefined
  const { canView: canViewUsersPage, canEdit: canEditUsersPage } =
    getManagementPageAccessState(metadata, "user-management", [
      "/admin/attendance",
    ])

  useEffect(() => {
    if (user && !canViewUsersPage) {
      toast.error("You don't have permission to access this page")
      router.push("/")
      return
    }
  }, [user, canViewUsersPage, router])

  if (!user || !canViewUsersPage) {
    return null
  }

  const emptyList: User[] = []
  const [users, setUsers] = useState<User[]>(emptyList)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [deleteUser, setDeleteUser] = useState<User | null>(null)
  const [search, setSearch] = useState("")

  type UserCollectionItem = {
    _id: string
    clerkId?: string
    firstName?: string
    lastName?: string
    email?: string
    cys?: string
    studentNumber?: string | null
    facebookLink?: string | null
    shortBio?: string | null
    resumeLink?: string | null
    createdAt?: string
    updatedAt?: string
    role?: "admin" | "user" | null
    adminRole?: "superadmin" | "admin" | null
    isAdmin?: boolean
    pageAccess?: {
      manage?: PageAccessSection
      data?: PageAccessSection
      "user-management"?: PageAccessSection
    } | null
    userId?: number
    attendance?: Date
  }

  const getData = useCallback(async () => {
    const [attendanceData, usersData] = await Promise.all([
      getCollectionData("attendance"),
      getCollectionData("users"),
    ])

    usersData.data.map((userItem: UserCollectionItem) => {
      const attendanceItem = attendanceData.data.find(
        (attendance: any) => attendance.userId == userItem.userId?.toString()
      )
      userItem.attendance = attendanceItem
        ? new Date(attendanceItem.attendance)
        : undefined
    })

    usersData.data.sort((a: UserCollectionItem, b: UserCollectionItem) => {
      if (a.attendance && b.attendance) {
        return b.attendance.getTime() - a.attendance.getTime()
      } else if (a.attendance) {
        return -1
      } else if (b.attendance) {
        return -1
      } else {
        return 1
      }
    })
    // console.log("Users with attendance data:", usersData)

    const mappedUsers = usersData.data.map((item: UserCollectionItem) => ({
      clerkId: item.clerkId || "",
      firstName: item.firstName || "",
      lastName: item.lastName || "",
      email: item.email || "",
      cys: item.cys || "",
      studentNumber: item.studentNumber || null,
      createdAt: item.createdAt || "",
      updatedAt: item.updatedAt || "",
      userId: item.userId || undefined,
      attendance: item.attendance ? new Date(item.attendance) : undefined,
    }))

    setUsers(mappedUsers)

    return { success: true, message: "Data fetched successfully" }
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getData()
        console.log("Data fetch response:", response)
        if (!response.success) {
          toast.error(response.message)
        } else {
          toast.success(response.message)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchUserData()
  }, [getData])

  async function logAttendance(userId: number) {
    const response = await fetch("/api/logAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })

    const res = await response.json()

    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }

    getData()
  }

  const handleScan = async (detectedCodes: any) => {
    detectedCodes.forEach(async (code: any) => {
      const userId = parseInt(code.rawValue, 10)
      if (!isNaN(userId)) {
        await logAttendance(userId)
      } else {
        toast.error(`Invalid user ID: ${code.rawValue}`)
      }
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Manila",
    })
  }
  const normalizedSearch = search.trim().toLowerCase()
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      normalizedSearch === "" ||
      user.firstName.toLowerCase().includes(normalizedSearch) ||
      user.lastName.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch) ||
      user.userId?.toString().includes(normalizedSearch)

    return matchesSearch
  })

  const handleItemsPerPageChange: React.Dispatch<
    React.SetStateAction<number>
  > = (value) => {
    const nextValue = typeof value === "function" ? value(itemsPerPage) : value
    setItemsPerPage(nextValue)
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage))
  const currentPage = Math.min(page, totalPages)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Attendance Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage attendance records and check-ins.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const fetchUserData = async () => {
                try {
                  const response = await getData()
                  console.log("Data fetch response:", response)
                  if (!response.success) {
                    toast.error(response.message)
                  } else {
                    toast.success(response.message)
                  }
                } catch (error) {
                  console.error("Error fetching data:", error)
                }
              }

              fetchUserData()
            }}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            type="button"
            onClick={() => setIsScannerOpen(true)}
            disabled={!canEditUsersPage}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            title="Check a Clerk account and generate missing Mongo data"
          >
            <Camera size={16} /> Scanner
          </button>
        </div>
      </div>

      <section className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="mb-4 space-y-3">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search by name, email, or userid"
              className="w-full rounded-lg border bg-foreground/10 px-3 py-2 text-sm text-muted-foreground transition-all focus:text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            />

            <div className="rounded-lg border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
              {filteredUsers.length} result
              {filteredUsers.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>CYS</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ID: {user.userId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="line-clamp-2 max-w-60 text-sm text-muted-foreground">
                      {user.cys}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {user.attendance
                        ? formatDate(user.attendance?.toISOString())
                        : "Not logged"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="ml-auto flex justify-end gap-2">
                      {!user.attendance ? (
                        <button
                          type="button"
                          onClick={() => logAttendance(user.userId!)}
                          disabled={!canEditUsersPage}
                          className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                          title="Edit user permissions"
                        >
                          Log Attendance
                        </button>
                      ) : (
                        "None"
                      )}
                      {/* <button
                        type="button"
                        onClick={() => setEditUser(user)}
                        disabled={!canEditUsersPage}
                        className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        title="Edit user permissions"
                      >
                        <PencilLine size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteUser(user)}
                        disabled={!canEditUsersPage}
                        className="inline-flex items-center rounded-lg border border-destructive/40 px-3 py-2 text-sm text-destructive hover:bg-destructive hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <PaginationComponent
                  setItemsPerPage={handleItemsPerPageChange}
                  setPage={setPage}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>

      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent>
          <Scanner onScan={handleScan} allowMultiple scanDelay={2000} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Attendance

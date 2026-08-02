"use client"

import {
  getManagementPageAccessState,
  ManagementAccessMetadata,
  PageAccessSection,
} from "@/lib/management-permissions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { RefreshCw, Users2, ShieldCheck, CalendarCheck2, FileText } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { DashboardStats, getDashboardStats } from "../actions"

const CATEGORICAL = [
  "var(--viz-series-1)",
  "var(--viz-series-2)",
  "var(--viz-series-3)",
  "var(--viz-series-4)",
  "var(--viz-series-5)",
  "var(--viz-series-6)",
  "var(--viz-series-7)",
  "var(--viz-series-8)",
]

function formatCompact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)
}

function formatDay(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function StatTile({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="viz-root flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--viz-series-1)/10 text-(--viz-series-1)">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="viz-root rounded-2xl border bg-card p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-medium text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      {label && <div className="mb-1 font-medium text-foreground">{label}</div>}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: entry.color || entry.fill }}
          />
          <span>{entry.name}:</span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const Dashboard = () => {
  const { user } = useUser()
  const router = useRouter()

  const metadata = user?.publicMetadata as ManagementAccessMetadata | undefined
  const { canView: canViewDashboard } = getManagementPageAccessState(metadata, "manage", [
    "/dashboard",
  ])

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    const response = await getDashboardStats()
    if (response.success && response.data) {
      setStats(response.data)
    } else {
      toast.error(response.error || "Failed to load dashboard stats")
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user && !canViewDashboard) {
      toast.error("You don't have permission to access this page")
      router.push("/")
      return
    }
  }, [user, canViewDashboard, router])

  useEffect(() => {
    if (user && canViewDashboard) {
      fetchStats()
    }
  }, [user, canViewDashboard, fetchStats])

  if (!user || !canViewDashboard) {
    return null
  }

  return (
    <div className="viz-root flex flex-col gap-4 p-4">
      <style>{`
        .viz-root {
          --viz-series-1: #2a78d6;
          --viz-series-2: #eb6834;
          --viz-series-3: #1baf7a;
          --viz-series-4: #eda100;
          --viz-series-5: #e87ba4;
          --viz-series-6: #008300;
          --viz-series-7: #4a3aa7;
          --viz-series-8: #e34948;
          --viz-grid: #e1e0d9;
          --viz-axis: #898781;
        }
        :root[data-theme="dark"] .viz-root,
        .dark .viz-root {
          --viz-series-1: #3987e5;
          --viz-series-2: #d95926;
          --viz-series-3: #199e70;
          --viz-series-4: #c98500;
          --viz-series-5: #d55181;
          --viz-series-6: #008300;
          --viz-series-7: #9085e9;
          --viz-series-8: #e66767;
          --viz-grid: #2c2c2a;
          --viz-axis: #898781;
        }
      `}</style>

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of users, attendance, and engagement.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {!stats ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground shadow-sm">
          {loading ? "Loading stats..." : "No data available."}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatTile
              label="Total users"
              value={formatCompact(stats.totals.totalUsers)}
              icon={<Users2 size={20} />}
            />
            <StatTile
              label="Admins"
              value={formatCompact(stats.totals.totalAdmins)}
              icon={<ShieldCheck size={20} />}
            />
            <StatTile
              label="Attendance rate"
              value={`${(stats.totals.attendanceRate * 100).toFixed(1)}%`}
              icon={<CalendarCheck2 size={20} />}
            />
            {/* <StatTile
              label="Users with resume"
              value={`${(stats.totals.resumeRate * 100).toFixed(1)}%`}
              icon={<FileText size={20} />}
            /> */}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <ChartCard title="New signups (last 30 days)">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={stats.signupsByDay} margin={{ left: -20, right: 10, top: 10 }}>
                  <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDay}
                    tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                    axisLine={{ stroke: "var(--viz-grid)" }}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} labelFormatter={(v) => formatDay(String(v))} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Signups"
                    stroke="var(--viz-series-1)"
                    strokeWidth={2}
                    fill="var(--viz-series-1)"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Attendance check-ins (last 30 days)">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={stats.attendanceByDay} margin={{ left: -20, right: 10, top: 10 }}>
                  <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDay}
                    tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                    axisLine={{ stroke: "var(--viz-grid)" }}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} labelFormatter={(v) => formatDay(String(v))} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Check-ins"
                    stroke="var(--viz-series-3)"
                    strokeWidth={2}
                    fill="var(--viz-series-3)"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top courses/sections">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={stats.courseDistribution} margin={{ left: -20, right: 10, top: 10 }}>
                  <CartesianGrid vertical={false} stroke="var(--viz-grid)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                    axisLine={{ stroke: "var(--viz-grid)" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--viz-grid)", opacity: 0.4 }} />
                  <Bar dataKey="value" name="Users" fill="var(--viz-series-2)" radius={[4, 4, 0, 0]} maxBarSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Role distribution">
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="60%" height={220}>
                  <PieChart>
                    <Pie
                      data={stats.roleDistribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      stroke="var(--card)"
                      strokeWidth={2}
                    >
                      {stats.roleDistribution.map((_, i) => (
                        <Cell key={i} fill={CATEGORICAL[i % CATEGORICAL.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 text-sm">
                  {stats.roleDistribution.map((entry, i) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: CATEGORICAL[i % CATEGORICAL.length] }}
                      />
                      <span className="text-muted-foreground">{entry.name}</span>
                      <span className="font-medium">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>
          </div>

          <ChartCard title="Email domains">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={stats.domainDistribution}
                layout="vertical"
                margin={{ left: 10, right: 20, top: 10 }}
              >
                <CartesianGrid horizontal={false} stroke="var(--viz-grid)" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={160}
                  tick={{ fontSize: 11, fill: "var(--viz-axis)" }}
                  axisLine={{ stroke: "var(--viz-grid)" }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--viz-grid)", opacity: 0.4 }} />
                <Bar dataKey="value" name="Users" fill="var(--viz-series-4)" radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      )}
    </div>
  )
}

export default Dashboard

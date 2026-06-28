"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>
}

export function PaginationComponent({ page, totalPages, setPage, setItemsPerPage }: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span>Rows per page:</span>
        <select
          className="rounded border bg-background px-2 py-1 text-sm"
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          defaultValue={10}
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="inline-flex items-center rounded border p-1 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="inline-flex items-center rounded border p-1 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

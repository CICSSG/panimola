"use client"

import { useEffect, useRef } from "react"

type GridBackgroundProps = {
  size?: number
  opacity?: number
  color?: string
  background?: string
  speed?: number
  rotate?: number
  className?: string
  children?: React.ReactNode
}

export default function GridBackground({
  size = 40,
  opacity = 0.08,
  color = "0,0,0",
  background = "#ffffff",
  speed = -0.3,
  rotate = 5,
  className = "",
  children,
}: GridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let current = window.scrollY * speed
    let target = current
    let rafId: number

    const ease = 0.02

    const tick = () => {
      target = window.scrollY * speed
      current += (target - current) * ease
      el.style.backgroundPositionY = `${current}px`
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [speed])

  // Always fixed — sits behind everything, parallax works by offsetting
  // backgroundPositionY at `speed` rate while page content scrolls at 1×.
  const fixedGrid = (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: background,
        backgroundImage: `
          linear-gradient(rgba(${color},${opacity}) 1.5px, transparent 1px),
          linear-gradient(90deg, rgba(${color},${opacity}) 1.5px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        transform: rotate !== 0 ? `rotate(${rotate}deg) scale(1.5)` : undefined,
      }}
    />
  )

  if (children) {
    return (
      <div className={`relative ${className} overflow-x-hidden`}>
        {fixedGrid}
        {children}
      </div>
    )
  }

  return fixedGrid
}

"use client"

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type LogoLoopItem =
  | { type: "image"; src: string; alt?: string; href?: string; title?: string; srcSet?: string; sizes?: string; width?: number; height?: number }
  | { type: "node"; content: React.ReactNode; href?: string; title?: string; ariaLabel?: string }
  | { type: "text"; content: string; href?: string; className?: string }

export interface LogoLoopProps {
  items: LogoLoopItem[]
  bgColor?: string
  textColor?: string
  gap?: number
  speed?: number
  reverse?: boolean
  direction?: "left" | "right" | "up" | "down"
  logoHeight?: number
  pauseOnHover?: boolean
  hoverSpeed?: number
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  rotation?: number
  ariaLabel?: string
  className?: string
  style?: React.CSSProperties
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SMOOTH_TAU = 0.25
const MIN_COPIES = 2
const COPY_HEADROOM = 2

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toCssLength = (v?: number | string) =>
  typeof v === "number" ? `${v}px` : (v ?? undefined)

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ")

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useResizeObserver(
  callback: () => void,
  refs: React.RefObject<Element | null>[],
  deps: React.DependencyList
) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener("resize", callback)
      callback()
      return () => window.removeEventListener("resize", callback)
    }
    const observers = refs.map((ref) => {
      if (!ref.current) return null
      const o = new ResizeObserver(callback)
      o.observe(ref.current)
      return o
    })
    callback()
    return () => observers.forEach((o) => o?.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function useImageLoader(
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  deps: React.DependencyList
) {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? []
    if (images.length === 0) { onLoad(); return }
    let remaining = images.length
    const done = () => { if (--remaining === 0) onLoad() }
    images.forEach((img) => {
      if ((img as HTMLImageElement).complete) done()
      else {
        img.addEventListener("load", done, { once: true })
        img.addEventListener("error", done, { once: true })
      }
    })
    return () => images.forEach((img) => {
      img.removeEventListener("load", done)
      img.removeEventListener("error", done)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function useAnimationLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) {
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const seqSize = isVertical ? seqHeight : seqWidth

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    if (prefersReduced) {
      track.style.transform = "translate3d(0, 0, 0)"
      return () => { lastTsRef.current = null }
    }

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts
      const dt = Math.max(0, ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity
      const ease = 1 - Math.exp(-dt / SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * ease

      if (seqSize > 0) {
        let next = ((offsetRef.current + velocityRef.current * dt) % seqSize + seqSize) % seqSize
        offsetRef.current = next
        track.style.transform = isVertical
          ? `translate3d(0, ${-next}px, 0)`
          : `translate3d(${-next}px, 0, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTsRef.current = null
    }
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef])
}

// ─── Component ────────────────────────────────────────────────────────────────

export const LogoLoop = memo<LogoLoopProps>(function LogoLoop({
  items,
  bgColor,
  textColor = "currentColor",
  gap = 32,
  speed = 120,
  reverse,
  direction,
  logoHeight,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  rotation = 0,
  ariaLabel = "Logo loop",
  className,
  style,
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLUListElement>(null)

  const [seqWidth, setSeqWidth] = useState(0)
  const [seqHeight, setSeqHeight] = useState(0)
  const [copyCount, setCopyCount] = useState(MIN_COPIES)
  const [isHovered, setIsHovered] = useState(false)

  // `reverse` is a shorthand alias for direction="right"
  const resolvedDirection = direction ?? (reverse ? "right" : "left")
  const isVertical = resolvedDirection === "up" || resolvedDirection === "down"

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed
    if (pauseOnHover === true) return 0
    if (pauseOnHover === false) return undefined
    return 0
  }, [hoverSpeed, pauseOnHover])

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed)
    const dir = isVertical
      ? resolvedDirection === "up" ? 1 : -1
      : resolvedDirection === "left" ? 1 : -1
    return mag * dir * (speed < 0 ? -1 : 1)
  }, [speed, resolvedDirection, isVertical])

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0
    const rect = seqRef.current?.getBoundingClientRect()
    const sw = rect?.width ?? 0
    const sh = rect?.height ?? 0

    if (isVertical) {
      const parentH = containerRef.current?.parentElement?.clientHeight ?? 0
      if (containerRef.current && parentH > 0) {
        const h = Math.ceil(parentH)
        if (containerRef.current.style.height !== `${h}px`)
          containerRef.current.style.height = `${h}px`
      }
      if (sh > 0) {
        setSeqHeight(Math.ceil(sh))
        const viewport = containerRef.current?.clientHeight ?? parentH ?? sh
        setCopyCount(Math.max(MIN_COPIES, Math.ceil(viewport / sh) + COPY_HEADROOM))
      }
    } else if (sw > 0) {
      setSeqWidth(Math.ceil(sw))
      setCopyCount(Math.max(MIN_COPIES, Math.ceil(containerWidth / sw) + COPY_HEADROOM))
    }
  }, [isVertical])

  useResizeObserver(updateDimensions, [containerRef, seqRef], [items, gap, logoHeight, isVertical])
  useImageLoader(seqRef, updateDimensions, [items, gap, logoHeight, isVertical])
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical)

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true)
  }, [effectiveHoverSpeed])
  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false)
  }, [effectiveHoverSpeed])

  const renderLogoItem = useCallback(
    (item: LogoLoopItem, key: React.Key) => {
      const liClass = cx(
        "flex-none leading-[1]",
        isVertical ? "mb-[var(--ll-gap)]" : "mr-[var(--ll-gap)]",
        scaleOnHover && "overflow-visible group/item"
      )

      let content: React.ReactNode

      if (item.type === "image") {
        content = (
          <img
            className={cx(
              "h-[var(--ll-height)] w-auto block object-contain pointer-events-none [-webkit-user-drag:none]",
              scaleOnHover && "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110"
            )}
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ""}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )
      } else if (item.type === "text") {
        content = (
          <span
            className={cx(
              "whitespace-nowrap font-semibold",
              scaleOnHover && "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110 inline-block",
              item.className
            )}
            style={{ color: textColor, fontSize: logoHeight }}
          >
            {item.content}
          </span>
        )
      } else {
        content = (
          <span
            className={cx(
              "inline-flex items-center",
              scaleOnHover && "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110"
            )}
            aria-hidden={!!(item.href) && !item.ariaLabel}
          >
            {item.content}
          </span>
        )
      }

      const itemAriaLabel =
        item.type === "node"
          ? (item.ariaLabel ?? item.title)
          : item.type === "image"
          ? (item.alt ?? item.title)
          : undefined

      const inner = item.href ? (
        <a
          className="inline-flex items-center no-underline rounded transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
          href={item.href}
          aria-label={itemAriaLabel || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : content

      return (
        <li className={liClass} key={key} role="listitem">
          {inner}
        </li>
      )
    },
    [isVertical, scaleOnHover, textColor, logoHeight]
  )

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, ci) => (
        <ul
          key={`copy-${ci}`}
          ref={ci === 0 ? seqRef : undefined}
          role="list"
          aria-hidden={ci > 0}
          className={cx("flex items-center", isVertical && "flex-col")}
        >
          {items.map((item, ii) => renderLogoItem(item, `${ci}-${ii}`))}
        </ul>
      )),
    [copyCount, items, renderLogoItem, isVertical]
  )

  const rootClass = cx(
    "relative group",
    isVertical ? "overflow-hidden h-full inline-block" : "overflow-x-hidden",
    scaleOnHover && "py-[calc(var(--ll-height)*0.1)]",
    className
  )

  const containerStyle: React.CSSProperties = {
    "--ll-gap": `${gap}px`,
    "--ll-height": `${logoHeight}px`,
    ...(fadeOutColor && { "--ll-fade": fadeOutColor }),
    ...(bgColor && { backgroundColor: bgColor }),
    ...(rotation !== 0 && { transform: `rotate(${rotation}deg)` }),
    width: isVertical
      ? toCssLength(undefined)
      : "100%",
    ...style,
  } as React.CSSProperties

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      {fadeOut && (
        isVertical ? (
          <>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(24px,8%,120px)] bg-[linear-gradient(to_bottom,var(--ll-fade,#fff)_0%,rgba(0,0,0,0)_100%)] dark:bg-[linear-gradient(to_bottom,var(--ll-fade,#0b0b0b)_0%,rgba(0,0,0,0)_100%)]" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(24px,8%,120px)] bg-[linear-gradient(to_top,var(--ll-fade,#fff)_0%,rgba(0,0,0,0)_100%)] dark:bg-[linear-gradient(to_top,var(--ll-fade,#0b0b0b)_0%,rgba(0,0,0,0)_100%)]" />
          </>
        ) : (
          <>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--ll-fade,#fff)_0%,rgba(0,0,0,0)_100%)] dark:bg-[linear-gradient(to_right,var(--ll-fade,#0b0b0b)_0%,rgba(0,0,0,0)_100%)]" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--ll-fade,#fff)_0%,rgba(0,0,0,0)_100%)] dark:bg-[linear-gradient(to_left,var(--ll-fade,#0b0b0b)_0%,rgba(0,0,0,0)_100%)]" />
          </>
        )
      )}

      <div
        ref={trackRef}
        className={cx(
          "flex will-change-transform select-none relative z-0 motion-reduce:transform-none",
          isVertical ? "flex-col h-max w-full" : "flex-row w-max"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  )
})

LogoLoop.displayName = "LogoLoop"
export default LogoLoop

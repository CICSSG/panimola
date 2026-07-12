"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const SHAPES = {
  splat: "10,4 90,0 198,8 200,40 195,54 100,56 8,52 0,30 4,12",
  chevron: "0,4 180,0 200,28 178,56 0,52 18,28",
  wave: "0,14 40,2 100,10 160,0 200,12 198,44 160,54 100,46 40,54 2,44",
  blob: "20,2 80,0 160,6 198,20 200,36 180,54 100,56 20,50 2,36 0,18",
  ticket: "0,6 30,0 170,0 200,6 200,50 170,56 30,56 0,50",
  jagged:
    "0,8 25,0 50,10 75,0 100,8 125,0 150,10 175,0 200,8 198,48 175,56 150,46 125,56 100,48 75,56 50,46 25,56 0,48",
  spike:
    "15,0 30,18 55,2 70,22 100,0 130,20 155,4 172,24 200,10 196,38 180,56 155,40 130,58 100,44 70,60 45,42 20,56 4,40 0,20",
  amoeba:
    "30,0 70,8 110,0 150,10 190,2 200,22 188,44 160,56 120,48 80,58 40,50 10,56 0,36 8,14",
  puddle:
    "5,20 18,6 40,0 70,10 100,2 130,12 160,0 182,8 200,20 196,38 180,50 150,58 110,52 70,56 35,50 10,42",
  crown:
    "0,28 10,8 30,20 50,0 80,16 100,4 120,18 150,2 170,22 190,10 200,30 195,50 100,56 5,52",
  torn: "0,16 22,0 44,14 60,2 82,18 100,6 118,20 140,4 162,16 184,0 200,18 198,42 176,56 140,46 100,54 60,48 24,56 2,40",
  cloud:
    "20,14 0,28 10,44 30,52 60,56 100,54 140,58 170,50 190,38 200,22 182,8 155,2 120,10 80,6 50,0",
  zigzag:
    "0,12 20,0 40,14 60,2 80,16 100,4 120,18 140,6 160,20 180,8 200,16 200,42 180,50 160,38 140,52 120,40 100,54 80,42 60,56 40,44 20,54 0,46",
}

const SHAPE_KEYS = Object.keys(SHAPES) as (keyof typeof SHAPES)[]
const FILLS = [
  "#fde047",
  "#f9a8d4",
  "#7dd3fc",
  "#86efac",
  "#fca5a5",
  "#c4b5fd",
  "#fdba74",
  "#a5f3fc",
]

function randomShape(): keyof typeof SHAPES {
  return SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]
}
function randomFill(): string {
  return FILLS[Math.floor(Math.random() * FILLS.length)]
}

type StickerButtonProps = {
  children: React.ReactNode
  shape?: keyof typeof SHAPES
  fill?: string
  className?: string
} & (
  | ({ as?: "button" } & React.ComponentProps<"button">)
  | ({ as: "a" } & React.ComponentProps<"a">)
)

export { SHAPES, FILLS, randomShape, randomFill }
export type { StickerButtonProps }

export default function StickerButton({
  children,
  shape: shapeProp,
  fill: fillProp,
  className = "",
  as,
  ...props
}: StickerButtonProps) {
  const [shape, setShape] = useState<keyof typeof SHAPES>(
    shapeProp ?? randomShape
  )
  const [fill, setFill] = useState<string>(fillProp ?? randomFill)
  const [hovered, setHovered] = useState(false)

  const patternId = `sticker-dots-${Math.random().toString(36).slice(2, 7)}`

  const handleHoverStart = () => {
    setHovered(true)
    if (!shapeProp) setShape(randomShape())
    if (!fillProp) setFill(randomFill())
  }

  const Comp = as === "a" ? motion.a : motion.button

  return (
    <Comp
      className={`relative isolate inline-flex items-center justify-center overflow-visible px-3 py-2 font-extrabold uppercase ${className}`}
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setHovered(false)}
      animate={
        hovered ? { scale: 1.06, rotate: -1.5 } : { scale: 1, rotate: 0 }
      }
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      {...(props as any)}
    >
      <motion.svg
        aria-hidden
        viewBox="-8 -8 216 72"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        style={{ overflow: "visible" }}
        animate={
          hovered
            ? { opacity: 1, scale: 1, rotate: -2 }
            : { opacity: 0, scale: 0.85, rotate: -4 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {/* <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
          >
            <circle cx="3" cy="3" r="1.2" fill="rgba(0,0,0,0.18)" />
          </pattern>
        </defs> */}
        {/* <polygon
          points={SHAPES[shape]}
          fill={fill}
          stroke="black"
          strokeWidth="3"
        /> */}
        {/* <polygon points={SHAPES[shape]} fill={`url(#${patternId})`} /> */}
        <polygon
          points="5,5 205,5 205,55 5,55"
          fill="black"
          stroke="black"
          strokeWidth="3"
        />
        <polygon
          points="0,0 200,0 200,50 0,50"
          fill={fill}
          stroke="black"
          strokeWidth="3"
        />
        {/* <rect width="100%" height="100%" fill={`url(#${patternId})`} /> */}
      </motion.svg>
      <span className="relative z-10">{children}</span>
    </Comp>
  )
}

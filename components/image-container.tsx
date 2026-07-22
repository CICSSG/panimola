import { X } from "lucide-react"
import React from "react"

const ImageContainer = ({
  children,
  rotate,
  aspect,
  headerColor,
  title
}: {
  children?: React.ReactNode
  rotate?: number
  aspect?: "aspect-4/3" | "aspect-16/9"
  headerColor?: string
  title?: string
}) => {
  return (
    <div
      className="relative w-full max-w-lg min-w-0 flex-1 mb-5"
      style={{ transform: `rotate(${rotate || 0}deg)` }}
    >
      {/* Window title bar */}
      <div className="relative z-2 bg-white">
        <div
          className={`flex items-center justify-between border-4 border-black ${headerColor || "bg-[#95cf56]"}`}
        >
          <span className="px-3 font-blackhansans font-bold text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] text-nowrap truncate max-w-xs">
            {title || "<image>"}
          </span>
          <span className="flex flex-col items-center justify-center border-l-2 border-black px-4 py-2 text-xs leading-none font-bold select-none">
            <X strokeWidth={4} />
          </span>
        </div>
        {/* Image area */}
        <div
          className={`flex ${aspect || "aspect-4/3"} items-center justify-center border-x-4 border-b-4 border-black`}
        >
          {children}
        </div>
      </div>
      {/* Shadow tab at bottom */}
      <div className="absolute top-3 left-3 z-1 flex h-full w-full items-center justify-center border-x-4 border-black bg-black" />
    </div>
  )
}

export default ImageContainer

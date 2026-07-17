import GridBackground from "@/components/grid-background";
import StickerButton from "@/components/sticker-button"
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react"

const NotFound = () => {
  return (
    <GridBackground className="flex min-h-screen items-center justify-center">
      <div
        className="w-full max-w-[90%] md:max-w-lg min-w-0 flex-1 relative"
        style={{ transform: "rotate(-2deg)" }}
      >
        <div className="relative z-2">
          {/* Window title bar */}
        <div className="flex items-center justify-between border-4 border-black bg-destructive px-3 py-2">
          <span className="font-blackhansans text-sm font-bold text-white [-webkit-text-stroke:1.5px_black] [paint-order:stroke_fill]">
            404 Not Found
          </span>
          <span className="border-2 border-black bg-white px-2 py-0.5 text-xs leading-none font-bold select-none">
            ✕
          </span>
        </div>
        {/* Image area */}
        <div className="flex aspect-4/3 items-center justify-center border-4 border-t-0 border-black bg-gray-200">
          <div className="max-w-[80%] flex flex-col gap-4 items-center py-4">
            <ShieldAlert size={64} color="red" className="animate-pulse"/>
            <span className="text-lg font-bold text-gray-700 text-center">
              This page could not be found. Please check the URL or return to
              the homepage.
            </span>
            <StickerButton
              className="mt-4 px-4 py-2 font-bold font-blackhansans text-[#95cf56] [-webkit-text-stroke:1.5px_black] [paint-order:stroke_fill] text-2xl"
            >
              <Link href="/" className="h-full w-full">
                Return to Home
              </Link>
            </StickerButton>
          </div>
        </div>
        </div>
        {/* Shadow tab at bottom */}
        <div className="absolute top-2 left-2 w-full h-full border-black bg-black" />
      </div>
    </GridBackground>
  )
}

export default NotFound

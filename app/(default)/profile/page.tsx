import GridBackground from '@/components/grid-background';
import StickerButton from '@/components/sticker-button';
import { Construction, ShieldAlert } from 'lucide-react';
import React from 'react'

const Profile = () => {
  return (
    <GridBackground className="flex min-h-screen items-center justify-center">
      <div
        className="w-full max-w-lg min-w-0 flex-1"
        style={{ transform: "rotate(-2deg)" }}
      >
        {/* Window title bar */}
        <div className="flex items-center justify-between border-4 border-black bg-accent px-3 py-2">
          <span className="font-blackhansans text-sm font-bold text-white [-webkit-text-stroke:1.5px_black] [paint-order:stroke_fill]">
            Under Construction
          </span>
          <span className="border-2 border-black bg-white px-2 py-0.5 text-xs leading-none font-bold select-none">
            ✕
          </span>
        </div>
        {/* Image area */}
        <div className="flex aspect-4/3 items-center justify-center border-4 border-t-0 border-black bg-gray-200">
          <div className="max-w-[70%] flex flex-col gap-4 items-center">
            <Construction size={64} color="orange" className="animate-pulse"/>
            <span className="text-lg font-bold text-gray-700 text-center">
              This page is under construction. Please check back later for updates!
            </span>
            <StickerButton
              as="a"
              href="/"
              className="mt-4 rotate-4 px-4 py-2 font-bold font-blackhansans text-[#95cf56] [-webkit-text-stroke:1.5px_black] [paint-order:stroke_fill] text-xl"
            >
              Return to Homepage
            </StickerButton>
          </div>
        </div>
        {/* Shadow tab at bottom */}
        <div className="ml-2 h-3 border-4 border-t-0 border-black bg-white" />
      </div>
    </GridBackground>
  )
}

export default Profile
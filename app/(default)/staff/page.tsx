"use client"
import GridBackground from "@/components/grid-background"
import { LogoLoop } from "@/components/logo-loop"
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import Image from "next/image"
import React, { useState } from "react"

const ProgramsPage = () => {
  const [program, setProgram] = useState<"cs" | "it">("cs")

  return (
    <GridBackground className="flex flex-col gap-6 py-4">
      <div className="mx-4 mt-15 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-[#95cf56] px-8 py-4 lg:flex-row xl:mx-auto">
        <div className="flex w-fit flex-col justify-around gap-4">
          <h1 className="text-center uppercase font-kelsi text-5xl text-white [-webkit-text-stroke:4px_black] [paint-order:stroke_fill] lg:text-left lg:text-7xl">
            Admin and Staff
          </h1>
          <p className="text-justify">
            The College of Information and Computer Studies is guided by a team of administrators and staff committed to ensuring efficient operations and quality support for students, faculty, and programs.
          </p>
        </div>

      </div>

      
    </GridBackground>
  )
}

export default ProgramsPage

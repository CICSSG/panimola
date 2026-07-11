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
      <div className="mx-4 mt-15 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-[#fef085] px-8 py-4 lg:flex-row xl:mx-auto">
        <div className="flex w-fit flex-col justify-around gap-4">
          <h1 className="text-center uppercase font-kelsi text-5xl text-white [-webkit-text-stroke:4px_black] [paint-order:stroke_fill] lg:text-left lg:text-7xl">
            Organizations
          </h1>
          <p className="text-justify">
            The College of Information and Computer Studies is home to four student organizations that support the academic and professional development of its students: CICSSG, CSPC, ITPC, and EVRLAST. These organizations provide opportunities for leadership, collaboration, and community engagement within the college.
          </p>
        </div>

      </div>

      
    </GridBackground>
  )
}

export default ProgramsPage

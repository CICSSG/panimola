"use client"
import GridBackground from "@/components/grid-background"
import { LogoLoop } from "@/components/logo-loop"
import StaffContainer from "@/components/staff-container";
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import { useMediaQuery } from "@reactuses/core"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const ProgramsPage = () => {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const [isLoaded, setIsLoaded] = useState(false)
  const [program, setProgram] = useState<"cs" | "it">("cs")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <GridBackground className="flex flex-col gap-6 py-4 pb-20">
      <div className="mx-4 mt-15 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-[#95cf56] px-8 py-4 lg:flex-row xl:mx-auto mb-6">
        <div className="flex w-fit flex-col justify-around gap-4">
          <h1 className="text-center font-kelsi text-5xl text-white uppercase [-webkit-text-stroke:4px_black] [paint-order:stroke_fill] lg:text-left lg:text-7xl">
            Admin and Staff
          </h1>
          <p className="text-justify">
            The College of Information and Computer Studies is guided by a team
            of administrators and staff committed to ensuring efficient
            operations and quality support for students, faculty, and programs.
          </p>
        </div>
      </div>

      {isLoaded && (
        <>
          <LogoLoop
            className="relative z-2 py-1 outline-4 outline-black lg:py-3"
            bgColor="#95cf56"
            textColor="#fef085"
            gap={64}
            speed={200}
            rotation={isMobile ? -3 : -2}
            pauseOnHover={false}
            logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
            items={[
              {
                type: "text",
                content: "Admin",
                className: "font-kelsi  [-webkit-text-stroke:1px_black]",
              },
            ]}
          />
          <LogoLoop
            className="absolute -top-14 z-1 py-1 outline-4 outline-black lg:-top-24 lg:py-3"
            bgColor="#fc7646"
            textColor="#fef085"
            gap={64}
            reverse
            speed={200}
            rotation={isMobile ? 4 : 2}
            pauseOnHover={false}
            logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
            items={[
              {
                type: "text",
                content: "Admin",
                className:
                  "text-4xl font-extrabold font-kelsi  [-webkit-text-stroke:1px_black]",
              },
            ]}
          />
        </>
      )}

      {/* Admin Container */}
      <div className="flex flex-row md:grid md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:pt-8 max-w-7xl lg:mx-auto w-full gap-2 overflow-x-scroll pt-5 mb-10">
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
      </div>

      {isLoaded && (
        <>
          <LogoLoop
            className="relative z-2 py-1 outline-4 outline-black lg:py-3"
            bgColor="#95cf56"
            textColor="#fef085"
            gap={64}
            speed={200}
            rotation={isMobile ? -3 : -2}
            pauseOnHover={false}
            logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
            items={[
              {
                type: "text",
                content: "Staff",
                className: "font-kelsi  [-webkit-text-stroke:1px_black]",
              },
            ]}
          />
          <LogoLoop
            className="absolute -top-14 z-1 py-1 outline-4 outline-black lg:-top-24 lg:py-3"
            bgColor="#fc7646"
            textColor="#fef085"
            gap={64}
            reverse
            speed={200}
            rotation={isMobile ? 4 : 2}
            pauseOnHover={false}
            logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
            items={[
              {
                type: "text",
                content: "Staff",
                className:
                  "text-4xl font-extrabold font-kelsi  [-webkit-text-stroke:1px_black]",
              },
            ]}
          />
        </>
      )}

      {/* Staff Container */}
      <div className="flex flex-row md:grid md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:pt-8 max-w-7xl lg:mx-auto w-full gap-2 overflow-x-scroll pt-5 mb-10">
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
        <StaffContainer name="John Doe" role="Administrator" image="/PionniThumbsUp.png" />
      </div>

    </GridBackground>
  )
}

export default ProgramsPage

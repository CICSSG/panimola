"use client"
import GridBackground from "@/components/grid-background"
import { LogoLoop } from "@/components/logo-loop"
import StaffContainer from "@/components/staff-container"
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import { useMediaQuery } from "@reactuses/core"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const admins = [
  {
    name: "Mitschek, Marivic R.",
    image: "/adminstaff/mitschek.png",
    role: "Dean, CICS",
  },
  {
    name: "Barrameda, Rolando B.",
    image: "/adminstaff/barrameda.png",
    role: "Associate Dean, CICS",
  },
  {
    name: "Eduardo, Josephine T.",
    image: "/adminstaff/eduardo.png",
    role: "CSD Chair",
  },

  {
    name: "Naz, Sherry B.",
    image: "/adminstaff/naz.png",
    role: "ITD Chair",
  },
]

const staff = [
  {
    name: "Rodriguez, Rina G.",
    image: "/adminstaff/rodriguez.png",
    role: "Secretary to the Dean",
  },
  {
    name: "Manzano, Cherry P.",
    image: "/adminstaff/manzano.png",
    role: "Secretary to the Chair, CSD",
  },
  {
    name: "Joya, Joyra Jesusa L.",
    image: "/adminstaff/joya.png",
    role: "Secretary to the Chair, ITD",
  },
  {
    name: "Mayuga, Emelyn D.",
    image: "/adminstaff/mayuga.png",
    role: "Supervisor, Computer Laboratory ",
  },
  {
    name: "Morallo, Homer P.",
    image: "/adminstaff/morallo.png",
    role: "Technician, Computer Laboratory",
  },
  {
    name: "Manaois, Jennylinde R.",
    role: "Supervisor, Center for Artificial Intelligence",
    image: "/adminstaff/manaois.png",
  },
  {
    name: "Del Rosario, Maria Gloria A.",
    role: "Supervisor, Training and Support (CDLM)",
    image: "/adminstaff/del rosario.png",
  },
  {
    name: "Sanares, Roda N., DIT",
    role: "Director, Center for Digital Learning Management",
    image: "/adminstaff/sanares.png",
  },
]
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
      <div className="mx-4 mt-15 mb-6 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-[#95cf56] px-8 py-4 lg:flex-row xl:mx-auto">
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
      <div className="mb-10 flex w-full max-w-7xl flex-row gap-2 overflow-x-auto pt-5 md:grid md:grid-cols-3 md:gap-y-10 lg:mx-auto lg:grid-cols-4 lg:pt-8">
        {admins.map((admin, index) => (
          <StaffContainer
            key={index}
            name={admin.name}
            role={admin.role}
            image={admin.image}
          />
        ))}
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
      <div className="mb-10 flex w-full max-w-7xl flex-row gap-2 overflow-x-auto pt-5 md:grid md:grid-cols-3 md:gap-y-10 lg:mx-auto lg:grid-cols-4 lg:pt-8">
        {staff.map((staff, index) => (
          <StaffContainer
            key={index}
            name={staff.name}
            role={staff.role}
            image={staff.image}
          />
        ))}
      </div>
    </GridBackground>
  )
}

export default ProgramsPage

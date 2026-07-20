"use client"
import GridBackground from "@/components/grid-background"
import { LogoLoop } from "@/components/logo-loop"
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const Organizations = [
  {
    title: "CICSSG",
    description:
      "The College of Information and Computer Studies Student Government (CICSSG) is the official student government within the College of Information and Computer Studies (CICS) at DLSU-D, focused on representing and serving the CICS student body. CICSSG works to ensure that students' voices are heard, supports academic and extracurricular activities, and helps create a positive and inclusive environment for all CICS students.",
    link: "https://www.facebook.com/dlsud.cicssg",
    image: "/cicssg.jpeg",
  },
  {
    title: "CSPC",
    description:
      "The Computer Studies Program Council (CSPC) is the official program council focused on addressing the educational and developmental needs of the Computer Science department. As the voice of Computer Science students, CSPC works to represent their interests, providing opportunities for growth through various programs, events, and initiatives.",
    link: "https://www.facebook.com/dlsud.cspc",
    image: "/cspc.png",
  },
  {
    title: "ITPC",
    description:
      "The Information Technology Program Council (ITPC) is the official program council representing the Information Technology department. As the leading voice for IT students, ITPC empowers individuals to achieve excellence by advocating for their needs, fostering collaboration, and promoting professional growth.",
    link: "https://www.facebook.com/dlsud.itpc",
    image: "/itpc.jpg",
  },
  {
    title: "EVRLAST",
    description:
      "EVRLAST is a dance organization formed by a collective of students from the Computer Science and Information Technology departments. It brings students together to express their creativity and showcase their dance talents.",
    link: "https://www.facebook.com/profile.php?id=61574615985260",
    image: "/evrlast.jpg",
  },
]
const ProgramsPage = () => {
  const [program, setProgram] = useState<"cs" | "it">("cs")

  return (
    <GridBackground className="mb-32 flex flex-col gap-6 py-4">
      <div className="mx-4 mt-15 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-[#fef085] px-8 py-4 lg:flex-row xl:mx-auto">
        <div className="flex w-fit flex-col justify-around gap-4">
          <h1 className="text-center font-kelsi text-4xl text-white uppercase [-webkit-text-stroke:4px_black] [paint-order:stroke_fill] lg:text-left lg:text-7xl">
            Organizations
          </h1>
          <p className="text-justify">
            The College of Information and Computer Studies is home to four
            student organizations that support the academic and professional
            development of its students: CICSSG, CSPC, ITPC, and EVRLAST. These
            organizations provide opportunities for leadership, collaboration,
            and community engagement within the college.
          </p>
        </div>
      </div>

      <div className="mx-4 grid max-w-7xl gap-8 md:grid-cols-2 xl:mx-auto xl:gap-16">
        {Organizations.map((org, index) => (
          <div className="relative w-full max-w-lg min-w-0 flex-1 h-full">
            {/* Window title bar */}
            <div className="relative z-2 flex flex-col h-full">
              <div
                className={`flex items-center justify-between border-2 border-black bg-[#95cf56]`}
              >
                <span className="px-3 font-blackhansans text-xl text-white [-webkit-text-stroke:1px_black]">
                  {org.title}
                </span>
                <span className="flex flex-col items-center justify-center border-l-2 border-black px-4 py-2 text-xs leading-none font-bold select-none">
                  <X strokeWidth={4} />
                </span>
              </div>
              {/* Image area */}
              <div
                className={`flex aspect-7/3 items-center justify-center border-x-2 border-black`}
              >
                <Image
                  src={org.image}
                  alt={org.title}
                  width={400}
                  height={200}
                  className="h-full w-full object-cover aspect-7/3"
                />
              </div>

              <div className="h-full border-2 border-black bg-white p-4 grow flex flex-col justify-between items-start gap-4">
                <p className="text-justify">{org.description}</p>
                <Link
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-black bg-[#fef085] px-4 py-3 text-center text-black transition-all duration-300 hover:translate-y-0.5 hover:scale-102 hover:bg-[#fef085]/80 mt-auto"
                  style={{ boxShadow: "6px 6px 0 black" }}
                >
                  <div className="-rotate-2 font-blackhansans">
                    View Organization
                  </div>
                </Link>
              </div>
            </div>
            {/* Shadow tab at bottom */}
            <div className="absolute top-3 left-3 z-1 flex h-full w-full items-center justify-center border-x-4 border-black bg-black" />
          </div>
        ))}
      </div>
    </GridBackground>
  )
}

export default ProgramsPage

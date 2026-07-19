"use client"
import GridBackground from "@/components/grid-background"
import { LogoLoop } from "@/components/logo-loop"
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import { useMediaQuery } from "@reactuses/core"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const CSSubjects = [
  "Introduction to Computing",
  "Fundamentals of Programming",
  "Intermediate Programming",
  "Data Structures and Algorithms",
  "Information Management",
  "Applications Development and Emerging Technologies",
  "Object-oriented Programming",
  "Human Computer Interaction",
  "Information Assurance and Security",
  "Social Issues and Professional Practice",
  "Discrete Structures",
  "Programming Languages",
  "Algorithms and Complexity",
  "Architecture and Organization",
  "Automata Theory and Formal Languages",
  "Networks and Communications",
  "Operating Systems",
  "Practicum",
  "Software Engineering",
  "Thesis",
  "Computational Science",
  "Graphics and Visual Computing",
  "Parallel and Distributed Computing",
  "Intelligent Systems",
  "System Fundamentals",
]

const ITSubjects = [
  "Introduction to Computing",
  "Fundamentals of Programming",
  "Intermediate Programming",
  "Data Structures and Algorithms",
  "Applications Development and Emerging Technologies",
  "Human Computer Interaction",
  "Discrete Math",
  "Fundamentals of Database Systems",
  "Quantitative Methods",
  "Information Assurance and Security",
  "Networking",
  "Integrative Programming and Technologies",
  "Social and Professional Issues",
  "Capstone Project",
  "System Integration and Architecture",
  "System Administration and Maintenance",
  "Practicum",
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
    <GridBackground className="flex flex-col gap-6 py-4">
      <div className="mx-4 mt-15 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-accent px-8 py-4 lg:flex-row xl:mx-auto">
        <div className="flex w-fit max-w-3xl flex-col justify-around gap-4">
          <h1 className="text-center font-kelsi text-5xl text-white [-webkit-text-stroke:4px_black] [paint-order:stroke_fill] lg:text-left lg:text-7xl">
            PROGRAMS
          </h1>
          <p className="text-justify">
            The College of Information and Computer Studies (CICS) at De La
            Salle University-Dasmarinas (DLSU-D) currently offers the Bachelor
            of Science in Computer Science and Bachelor of Science in
            Information Technology programs. Furthermore, CICS is planning to
            introduce additional programs to its academic offerings.
          </p>
        </div>
        <div className="relative pt-5">
          <div className="absolute -top-5 -left-18 -rotate-18">
            <div className="relative">
              <Image
                src={"/assets/SVG/Asset 1.svg"}
                alt="Asset"
                width={20}
                height={20}
                unoptimized
                className="absolute -top-4 right-12 z-4 rotate-10"
              />
              <div className="relative">
                <Image
                  src={"/assets/SVG/Asset 2.svg"}
                  alt="Asset"
                  width={150}
                  height={50}
                  unoptimized
                />
                <div className="absolute top-1/2 left-1/2 -translate-1/2 text-xl font-bold">
                  OFFERING
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-50 flex-col border border-black">
            <h1 className="flex grow flex-col items-center justify-center bg-white font-blackhansans text-[5rem] leading-tight text-[#95cf56] [-webkit-text-stroke:4px_black] [paint-order:stroke_fill]">
              02
            </h1>
            <div className="border-t border-black bg-[#95cf56] py-4 text-center font-blackhansans text-xl font-bold text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              <div className="-rotate-3">Degree Programs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl items-center justify-between gap-4 px-4 py-4 md:mx-6 md:grid-cols-2 md:gap-10 lg:flex-row xl:mx-auto">
        <Button
          onClick={() => setProgram("cs")}
          className={`border border-black px-3 py-2 font-blackhansans text-lg font-bold tracking-wider text-white transition-transform duration-500 [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] hover:-translate-y-1 hover:scale-105 sm:text-xl ${program == "it" ? "bg-accent" : "-translate-y-1 scale-105 bg-[#95cf56]"}`}
          style={{ boxShadow: "3px 3px 0 black" }}
        >
          Computer Science
        </Button>
        <Button
          onClick={() => setProgram("it")}
          className={`border border-black px-3 py-2 font-blackhansans text-lg font-bold tracking-wider text-white transition-transform duration-500 [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] hover:-translate-y-1 hover:scale-105 sm:text-xl ${program == "cs" ? "bg-accent" : "-translate-y-1 scale-105 bg-[#95cf56]"}`}
          style={{ boxShadow: "3px 3px 0 black" }}
        >
          Information Technology
        </Button>
      </div>

      {program === "cs" ? (
        <div className="mb-10 flex flex-col gap-6">
          {isLoaded && (
            <LogoLoop
              className="relative z-2 py-1 outline-4 outline-black lg:py-3"
              bgColor="#95cf56"
              textColor="#fef085"
              gap={64}
              speed={200}
              rotation={2}
              pauseOnHover={false}
              logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
              items={[
                {
                  type: "text",
                  content: "Computer Science",
                  className: "font-kelsi  [-webkit-text-stroke:1px_black]",
                },
              ]}
            />
          )}

          <div className="relative -mt-8 mb-6 flex w-full max-w-6xl flex-col items-center gap-4 md:mx-4 lg:items-stretch xl:mx-auto">
            <div className="flex flex-col gap-4 border-2 border-black bg-white px-6 py-10 md:max-w-[80%]">
              <div className="mb-2 flex flex-col gap-4 text-center font-blackhansans text-3xl text-[#fef085] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] lg:flex-row lg:gap-8">
                Bachelor of Science in{" "}
                <div className="border border-black bg-[#95cf56] px-3 py-2 text-white lg:rotate-2">
                  Computer Science
                </div>
              </div>
              <div className="max-w-lg text-justify xl:max-w-2xl">
                The Bachelor of Science in Computer Science program prepares
                students to be highly competent and certified in the areas of
                computing theory and applications; trains them in the areas of
                abstract reasoning, analytical thinking and research; with track
                in: Robotics or Mobile and Game Development. Graduates of this
                program may pursue a meaningful career as an applications
                developer, CS instructor, researcher, trainer, database
                programmer/design, mobile applications, games developer or
                system analyst.
              </div>
              <div className="flex flex-col gap-2 text-center font-blackhansans text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] *:border *:border-black *:bg-[#7ea1d0] *:px-3 *:py-1.5 lg:flex-row lg:text-left">
                <div style={{ boxShadow: "3px 3px 0 black" }}>
                  Intelligent Systems
                </div>
                <div style={{ boxShadow: "3px 3px 0 black" }}>
                  Game Development
                </div>
              </div>
            </div>
            <div className="right-0 -bottom-2 lg:absolute">
              <div className="relative w-fit">
                <Image
                  src={"/assets/SVG/Asset 1.svg"}
                  alt="Asset"
                  width={60}
                  height={20}
                  unoptimized
                  className="absolute right-0 -bottom-5 z-4 rotate-45"
                />
                <div className="relative">
                  <Image
                    src={"/assets/SVG/Asset 2.svg"}
                    alt="Asset"
                    width={350}
                    height={50}
                    unoptimized
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center font-blackhansans text-xl font-bold">
                    <h1 className="text-4xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                      Level 1
                    </h1>
                    <p className="bg-accent px-3 py-1.5 text-nowrap text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                      PAASCU Accredited
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative mx-4 max-w-6xl border-2 border-black bg-white p-8 font-blackhansans xl:mx-auto xl:w-full"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 w-fit rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Career Path
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 11 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 border border-black bg-accent px-4 py-2 text-center font-semibold text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]"
                  style={{ boxShadow: "3px 3px 0 black" }}
                >
                  Career {index + 1}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative mx-4 max-w-6xl border-2 border-black bg-white p-8 font-blackhansans xl:mx-auto xl:w-full"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 ml-auto w-fit -rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Course Subjects
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {CSSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 border border-black bg-accent px-4 py-2 text-center font-semibold text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]"
                  style={{ boxShadow: "3px 3px 0 black" }}
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-10 flex flex-col gap-6">
          {isLoaded && (
            <LogoLoop
              className="relative z-2 py-1 outline-4 outline-black lg:py-3"
              bgColor="#fc7646"
              textColor="#fef085"
              gap={64}
              speed={200}
              rotation={-2}
              pauseOnHover={false}
              logoHeight={isMobile ? 28 : isTablet ? 36 : 48}
              items={[
                {
                  type: "text",
                  content: "Information Technology",
                  className: "font-kelsi  [-webkit-text-stroke:1px_black]",
                },
              ]}
            />
          )}

          <div className="relative -mt-8 mb-6 flex w-full max-w-6xl flex-col items-center gap-4 md:mx-4 lg:items-stretch xl:mx-auto">
            <div className="flex flex-col gap-4 border-2 border-black bg-white px-6 py-10 md:max-w-[80%] lg:mx-auto lg:items-end xl:ml-auto">
              <div className="mb-2 flex flex-col gap-4 text-center font-blackhansans text-3xl text-[#fef085] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] lg:flex-row lg:gap-8">
                Bachelor of Science in{" "}
                <div className="border border-black bg-[#95cf56] px-3 py-2 text-2xl text-white lg:-rotate-2">
                  Information Technology
                </div>
              </div>
              <div className="max-w-lg text-justify xl:max-w-xl">
                The Bachelor of Science in Information Technology program
                focuses on the rigorous training of students with the latest IT
                concepts and applications. It provides a practical approach in
                studying the various facets and latest applications of the IT
                industry; with track in: Network Technology or Software
                Technology.
              </div>
              <div className="flex flex-col gap-2 text-center font-blackhansans text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] *:border *:border-black *:bg-[#7ea1d0] *:px-3 *:py-1.5 lg:flex-row lg:text-left">
                <div style={{ boxShadow: "3px 3px 0 black" }}>Networking</div>
                <div style={{ boxShadow: "3px 3px 0 black" }}>
                  Web Development
                </div>
              </div>
            </div>
            <div className="-bottom-2 left-0 lg:absolute">
              <div className="relative w-fit">
                <Image
                  src={"/assets/SVG/Asset 1.svg"}
                  alt="Asset"
                  width={60}
                  height={20}
                  unoptimized
                  className="absolute right-0 -bottom-5 z-4 rotate-45"
                />
                <div className="relative">
                  <Image
                    src={"/assets/SVG/Asset 2.svg"}
                    alt="Asset"
                    width={350}
                    height={50}
                    unoptimized
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center font-blackhansans text-xl font-bold">
                    <h1 className="text-4xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                      Level 2
                    </h1>
                    <p className="bg-accent px-3 py-1.5 text-nowrap text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
                      PAASCU Accredited
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative mx-4 max-w-6xl border-2 border-black bg-white p-8 font-blackhansans xl:mx-auto xl:w-full"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 w-fit rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Career Path
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 11 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 border border-black bg-accent px-4 py-2 text-center font-semibold text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]"
                  style={{ boxShadow: "3px 3px 0 black" }}
                >
                  Career {index + 1}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative mx-4 max-w-6xl border-2 border-black bg-white p-8 font-blackhansans xl:mx-auto xl:w-full"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 ml-auto w-fit -rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Course Subjects
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {ITSubjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 border border-black bg-accent px-4 py-2 text-center font-semibold text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]"
                  style={{ boxShadow: "3px 3px 0 black" }}
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </GridBackground>
  )
}

export default ProgramsPage

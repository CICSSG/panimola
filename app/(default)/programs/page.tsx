"use client"
import GridBackground from "@/components/grid-background"
import { LogoLoop } from "@/components/logo-loop"
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import { useMediaQuery } from "@reactuses/core";
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

      <div className="grid max-w-6xl mx-auto md:grid-cols-2 items-center justify-between gap-4 px-4 py-4 md:mx-6 md:gap-10 lg:flex-row xl:mx-auto">
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
        <div className="flex flex-col gap-6 mb-10">
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
                className:
                  "font-kelsi  [-webkit-text-stroke:1px_black]",
              },
            ]}
          />

          <div className="relative flex flex-col items-center lg:items-stretch gap-4 xl:mx-auto -mt-8 mb-6 w-full max-w-6xl md:mx-4">
            <div className="flex md:max-w-[80%] flex-col gap-4 border-2 border-black bg-white px-6 py-10">
              <div className="mb-2 flex flex-col lg:flex-row gap-4 lg:gap-8 font-blackhansans text-3xl text-[#fef085] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] text-center">
                Bachelor of Science in{" "}
                <div className="lg:rotate-2 border border-black bg-[#95cf56] px-3 py-2 text-white">
                  Computer Science
                </div>
              </div>
              <div className="max-w-lg xl:max-w-2xl text-justify">
                Lorem ipsum dolor sit amet consectetur. Arcu id hac sagittis
                diam in. Pretium pharetra non velit vitae eget phasellus
                viverra. Augue amet habitant a commodo odio. Quam curabitur nec
                augue lectus tellus. Tellus condimentum senectus mattis netus
                eget vel tellus nibh. Amet semper eros urna lorem erat tempor
                amet natoque netus.
              </div>
              <div className="flex flex-col lg:flex-row gap-2 font-blackhansans text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] *:border *:border-black *:bg-[#7ea1d0] *:px-3 *:py-1.5 text-center lg:text-left">
                <div style={{ boxShadow: "3px 3px 0 black" }}>
                  Intelligent Systems
                </div>
                <div style={{ boxShadow: "3px 3px 0 black" }}>
                  Game Development
                </div>
              </div>
            </div>
            <div className="lg:absolute right-0 -bottom-2">
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
            className="relative xl:mx-auto mx-4 xl:w-full max-w-6xl border-2 border-black bg-white p-8 font-blackhansans"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 w-fit rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Career Path
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            className="relative xl:mx-auto mx-4 xl:w-full max-w-6xl border-2 border-black bg-white p-8 font-blackhansans"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 ml-auto w-fit -rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Course Subjects
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 11 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 border border-black bg-accent px-4 py-2 text-center font-semibold text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]"
                  style={{ boxShadow: "3px 3px 0 black" }}
                >
                  Subject {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-10">
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
                className:
                  "font-kelsi  [-webkit-text-stroke:1px_black]",
              },
            ]}
          />

          <div className="relative flex flex-col items-center lg:items-stretch gap-4 xl:mx-auto -mt-8 mb-6 w-full max-w-6xl md:mx-4">
            <div className="xl:ml-auto lg:mx-auto flex md:max-w-[80%] flex-col lg:items-end gap-4 border-2 border-black bg-white px-6 py-10">
              <div className="mb-2 flex flex-col lg:flex-row gap-4 lg:gap-8 font-blackhansans text-3xl text-[#fef085] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] text-center">
                Bachelor of Science in{" "}
                <div className="lg:-rotate-2 border border-black bg-[#95cf56] px-3 py-2 text-2xl text-white">
                  Information Technology
                </div>
              </div>
              <div className="max-w-lg xl:max-w-2xl text-justify">
                Lorem ipsum dolor sit amet consectetur. Arcu id hac sagittis
                diam in. Pretium pharetra non velit vitae eget phasellus
                viverra. Augue amet habitant a commodo odio. Quam curabitur nec
                augue lectus tellus. Tellus condimentum senectus mattis netus
                eget vel tellus nibh. Amet semper eros urna lorem erat tempor
                amet natoque netus.
              </div>
              <div className="flex flex-col lg:flex-row gap-2 font-blackhansans text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] *:border *:border-black *:bg-[#7ea1d0] *:px-3 *:py-1.5 text-center lg:text-left">
                <div style={{ boxShadow: "3px 3px 0 black" }}>Networking</div>
                <div style={{ boxShadow: "3px 3px 0 black" }}>
                  Web Development
                </div>
              </div>
            </div>
            <div className="lg:absolute -bottom-2 left-0">
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
            className="relative xl:mx-auto mx-4 xl:w-full max-w-6xl border-2 border-black bg-white p-8 font-blackhansans"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 w-fit rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Career Path
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            className="relative xl:mx-auto mx-4 xl:w-full max-w-6xl border-2 border-black bg-white p-8 font-blackhansans"
            style={{ boxShadow: "8px 8px 0 black" }}
          >
            <div className="mb-6 ml-auto w-fit -rotate-3 border border-black bg-[#95cf56] px-6 py-3 text-3xl text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Course Subjects
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 11 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 border border-black bg-accent px-4 py-2 text-center font-semibold text-white [-webkit-text-stroke:1px_black] [paint-order:stroke_fill]"
                  style={{ boxShadow: "3px 3px 0 black" }}
                >
                  Subject {index + 1}
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

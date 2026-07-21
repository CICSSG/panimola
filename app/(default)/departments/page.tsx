"use client"
import GridBackground from "@/components/grid-background"
import ImageContainer from "@/components/image-container"
import { LogoLoop } from "@/components/logo-loop"
import StickerButton from "@/components/sticker-button"
import { Button } from "@base-ui/react"
import Image from "next/image"
import React, { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ProgramsPage = () => {
  const [program, setProgram] = useState<"cs" | "it">("cs")

  return (
    <GridBackground className="mb-40 flex flex-col gap-16 py-4">
      <div className="mx-4 mt-15 flex max-w-6xl flex-col items-center justify-between gap-20 border-2 border-black bg-[#95cf56] px-8 py-4 lg:flex-row xl:mx-auto">
        <div className="flex w-fit flex-col justify-around gap-4">
          <h1 className="text-center font-kelsi text-4xl text-white uppercase [-webkit-text-stroke:4px_black] [paint-order:stroke_fill] lg:text-left lg:text-7xl">
            Departments
          </h1>
          <p className="text-justify">
            The College of Information and Computer Studies is composed of two
            departments dedicated to academic excellence: the Department of
            Computer Science and the Department of Information Technology. Each
            department offers a curriculum designed to equip students with the
            technical knowledge and practical skills required in the field.
          </p>
        </div>
      </div>

      <section className="mx-4 mb-12 flex max-w-7xl flex-col xl:mx-auto xl:gap-12">
        <div className="grid items-center gap-12 xl:grid-cols-2">
          <div className="mx-auto">
            <ImageContainer
              rotate={-4}
              aspect="aspect-16/9"
              headerColor="bg-[#fef085]"
            >
              <Image
                src={"/MainImage.png"}
                alt="Main Image"
                width={600}
                height={700}
                className="h-full w-full object-cover"
              />
            </ImageContainer>
          </div>

          <div className="border border-black bg-white">
            <h1 className="border-b border-black bg-accent py-4 text-center font-blackhansans text-3xl text-white [-webkit-text-stroke:1px_black]">
              Computer Science Department
            </h1>
            <p className="p-4 text-justify">
              The Computer Science Department (CSD) promotes courses in Computer
              Science with specialization in Game Development and Intelligent
              Systems. It molds students into becoming computer scientists by
              providing them with core computer science courses as well as a
              variety of application and interdisciplinary areas in
              computational thinking. The department educates students for
              computing professions as well as graduate studies. Course
              requirements guarantee that students obtain teaching in both
              practical and theoretical parts of computer science.
            </p>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-4 w-full border-2 border-black"
        >
          <AccordionItem key="objectives" value="objectives">
            <AccordionTrigger className="rounded-none bg-[#95cf56] px-4 font-blackhansans text-2xl text-white [-webkit-text-stroke:1px_black]">
              Objectives
            </AccordionTrigger>
            <AccordionContent className="h-fit p-0">
              <ul className="h-full list-disc! bg-white px-12 py-6 text-justify text-lg [&>li]:mt-2">
                <li>
                  Prepare students to be highly competent in aspects of
                  computing concepts and theories, algorithmic foundations, and
                  new developments in computer science.
                </li>
                <li>
                  Train students in the discipline of software engineering,
                  focusing on the effective design and implementation of quality
                  software products by integrating the knowledge in artificial
                  intelligence and game development.
                </li>
                <li>
                  Imbibe to students a sense of excellence and Christian values
                  that are the center of Lasallian culture in educating
                  students.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mx-4 mb-12 flex max-w-7xl flex-col xl:mx-auto xl:gap-12">
        <div className="grid items-center gap-12 xl:grid-cols-2">
          <div className="border border-black bg-white order-2 xl:order-1">
            <h1 className="border-b border-black bg-accent py-4 text-center font-blackhansans text-3xl text-white [-webkit-text-stroke:1px_black]">
              Information Technology Department
            </h1>
            <p className="p-4 text-justify">
              The Information Technology Department (ITD) is part of the College
              of Science and is in charge of overseeing the BS Information
              Technology program with specialization in Web Development and
              Network Track. Its faculty is specialized and has certifications
              in Networking, Mobile and Web Programming, Business and Data
              Analytics.
            </p>
          </div>
          <div className="mx-auto xl:ml-auto order-1 xl:order-2">
            <ImageContainer
              rotate={4}
              aspect="aspect-16/9"
              headerColor="bg-[#fef085]"
            >
              <Image
                src={"/MainImage.png"}
                alt="Main Image"
                width={600}
                height={700}
                className="h-full w-full object-cover"
              />
            </ImageContainer>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-4 w-full border-2 border-black"
        >
          <AccordionItem key="objectives" value="objectives">
            <AccordionTrigger className="rounded-none bg-[#95cf56] px-4 font-blackhansans text-2xl text-white [-webkit-text-stroke:1px_black]">
              Objectives
            </AccordionTrigger>
            <AccordionContent className="h-fit p-0">
              <ul className="h-full list-disc! bg-white px-12 py-6 text-justify text-lg [&>li]:mt-2">
                <li>
                  Prepare students to be proficient in many computing
                  theoretical and application areas.
                </li>
                <li>
                  Offer students current Information Technology courses to aid
                  in acquiring the skills required for rewarding careers in the
                  sector.
                </li>
                <li>
                  Train students how to conduct research, critical thinking, and
                  abstract reasoning.
                </li>
                <li>
                  Imbibe to students a sense of excellence and Christian values
                  that are at the center of Lasallian culture in educating
                  students.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </GridBackground>
  )
}

export default ProgramsPage

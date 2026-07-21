import Image from "next/image"
import React from "react"

const ErrorModal = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div
      className="w-full border-4 border-black bg-white"
      style={{ boxShadow: "6px 6px 0 black" }}
    >
      <div className="relative flex flex-row items-center gap-2 border-b-4 border-black bg-[#95cf56] px-6 py-3">
        <Image
          src="/PionniThumbsUp.png"
          alt="Pionni Thumbs Up"
          width={50}
          height={50}
          className="size-16"
        />
        <h1 className="font-blackhansans text-3xl leading-none text-white [-webkit-text-stroke:1px_black]">
          {title}
        </h1>
        <Image
          src="/stickers/cics froshies.png"
          alt="CICS Froshies Sticker"
          width={180}
          height={180}
          className="absolute -top-2 -right-8 size-24 -rotate-4 lg:-top-10 lg:-right-12 lg:size-36"
        />
      </div>

      <div className="flex flex-col gap-5 px-6 py-7">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default ErrorModal

import Image from "next/image"
import React from "react"

const StaffContainer = ({
  name,
  role,
  image,
}: {
  name: string
  role: string
  image: string
}) => {
  return (
    <div className="relative m-4 overflow-visible min-w-50">
      <div className="absolute top-2 left-2 h-full w-full bg-black" />
      <div className="relative z-2 border border-black">
        <div className="relative aspect-square overflow-visible bg-white bg-[linear-gradient(to_right,#ccc_1px,transparent_1px),linear-gradient(to_bottom,#ccc_1px,transparent_1px)] bg-size-[32px_32px] px-2">
          <Image
            src={image}
            alt={name}
            height={400}
            width={300}
            className="absolute bottom-0 h-[115%] w-fit object-fill"
          />
        </div>
        <div className="bg-[#fef085] p-4">
          <h3 className="font-blackhansans text-lg text-white [-webkit-text-stroke:1px_black]">
            {name}
          </h3>
          <p className="text-black">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default StaffContainer

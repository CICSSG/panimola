"use client"
import React, { useEffect, useRef, useState } from "react"
import { ReactQRCode, type ReactQRCodeRef } from "@lglab/react-qr-code"
import GridBackground from "@/components/grid-background"
import { Menu, X } from "lucide-react"
import { useUser } from "@clerk/nextjs"

const QR = () => {
  const { user } = useUser()
  const QRref = useRef<ReactQRCodeRef>(null)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUser?userId=${user?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        console.log("Fetched user data:", data)
        setUserData(data[0])
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    fetchUserData()
  }, [user])

  function handleDownload(userData: any) {
    console.log("Downloading QR Code for user:", userData)
    var fileName = `${userData?.firstName}_${userData?.lastName}_QR_Code`
    QRref.current?.download({
      name: 'qr-code',
      format: 'png',
      size: 1000,
    })
  }

  return (
    <GridBackground className="flex min-h-screen flex-col items-center justify-center gap-6 pb-40">
      <div className="relative mx-2 h-fit max-w-lg min-w-0">
        <div className="relative z-2">
          <div
            className={`flex items-center justify-between border-4 border-black bg-accent`}
          >
            <span className="px-3 font-blackhansans font-bold text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              Your QR Code
            </span>
            <span className="flex flex-col items-center justify-center border-l-2 border-black px-4 py-2 text-xs leading-none font-bold select-none">
              <X strokeWidth={4} />
            </span>
          </div>
          {/* Image area */}
          <div className="flex aspect-4/3 items-center justify-center border-4 border-t-0 border-black bg-white">
            <div className="flex max-w-[70%] flex-col items-center gap-4 p-4">
              {userData ? (
                <ReactQRCode
                  marginSize={1}
                  size={340}
                  value={JSON.stringify(userData.userId)}
                  background="white"
                  finderPatternOuterSettings={{ color: "#" }}
                  finderPatternInnerSettings={{ style: "microchip" }}
                  dataModulesSettings={{
                    style: "circuit-board",
                    lineWidth: 0.35,
                    color: "#",
                  }}
                  imageSettings={{
                    src: "/PionniThumbsUp.png",
                    height: 60,
                    width: 55,
                    excavate: true,
                  }}
                  ref={QRref}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="font-bold text-gray-700">
                    Loading QR Code...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Shadow tab at bottom */}
        <div className="absolute top-2 left-2 h-full w-full border-4 border-t-0 border-black bg-black" />
      </div>
      {userData && (
        <button
          className="border border-black bg-accent px-1.5 py-1.5 text-sm font-extrabold uppercase transition-transform hover:-translate-y-0.5"
          style={{ boxShadow: "3px 3px 0 black" }}
          onClick={() => handleDownload(userData)}
        >
          <span className="font-blackhansans text-lg font-bold text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
            Download QR Code
          </span>
        </button>
      )}
    </GridBackground>
  )
}

export default QR

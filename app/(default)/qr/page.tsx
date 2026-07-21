"use client"
import React, { useEffect, useRef, useState } from "react"
import { ReactQRCode, type ReactQRCodeRef } from "@lglab/react-qr-code"
import GridBackground from "@/components/grid-background"
import { Menu, X } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

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
        setUserData(data[0])
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    fetchUserData()
  }, [user])

  async function handleDownload(userData: any) {
    const fileName = `${userData?.firstName}_${userData?.lastName}_QR_Code.png`

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    const svg = QRref.current?.svg

    if (!svg) {
      console.error("QR SVG not found")
      return
    }

    const clonedSvg = svg.cloneNode(true) as SVGSVGElement

    // Embed images inside SVG (PionniThumbsUp.png)
    const images = clonedSvg.querySelectorAll("image")

    for (const image of images) {
      const href =
        image.getAttribute("href") || image.getAttribute("xlink:href")

      if (href) {
        try {
          const imageUrl = href.startsWith("/")
            ? `${window.location.origin}${href}`
            : href

          const response = await fetch(imageUrl)
          const blob = await response.blob()

          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader()

            reader.onloadend = () => {
              resolve(reader.result as string)
            }

            reader.readAsDataURL(blob)
          })

          image.setAttribute("href", base64)
          image.removeAttribute("xlink:href")
        } catch (error) {
          console.error("Failed embedding QR image:", error)
        }
      }
    }

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(clonedSvg)

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    })

    const svgUrl = URL.createObjectURL(svgBlob)

    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement("canvas")

      canvas.width = 1000
      canvas.height = 1100

      const ctx = canvas.getContext("2d")

      if (!ctx) {
        console.error("Canvas context unavailable")
        return
      }

      // White background
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(img, 0, 0, canvas.width, 1000)

      ctx.font = "bold 40px Arial"
      ctx.textAlign = "center"
      ctx.fillStyle = "black"
      ctx.fillText("Your ID: " + userData?.userId, canvas.width / 2, 1050)

      URL.revokeObjectURL(svgUrl)

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          console.error("Failed creating PNG blob")
          return
        }

        const pngUrl = URL.createObjectURL(pngBlob)

        const link = document.createElement("a")

        link.href = pngUrl

        if (isIOS) {
          // iOS Safari ignores download attribute
          link.target = "_blank"
        } else {
          link.download = fileName
        }

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Give Safari time before revoking
        setTimeout(() => {
          URL.revokeObjectURL(pngUrl)
        }, 5000)
      }, "image/png")
    }

    img.onerror = () => {
      console.error("Failed loading SVG into image")
      URL.revokeObjectURL(svgUrl)
    }

    img.src = svgUrl
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
            <Link
              href="/"
              className="flex flex-col items-center justify-center border-l-2 border-black px-4 py-2 text-xs leading-none font-bold select-none hover:bg-red-600"
            >
              <X strokeWidth={4} />
            </Link>
          </div>
          {/* Image area */}
          <div className="flex aspect-4/3 items-center justify-center border-4 border-t-0 border-black bg-white">
            <div className="flex max-w-[70%] flex-col items-center gap-4 p-4">
              {userData ? (
                <>
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
                  <div className="w-full border border-black bg-accent py-2 text-center font-blackhansans text-xl text-white [-webkit-text-stroke:1px_black]">
                    Your ID: {userData.userId}
                  </div>
                </>
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

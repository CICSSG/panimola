import Link from "next/link"
import { Mail } from "lucide-react"
import StickerButton from "./sticker-button"
import Image from "next/image"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const NAV = [
  { label: "Programs", href: "/programs" },
  { label: "Departments", href: "/departments" },
  { label: "Organizations", href: "/organizations" },
  { label: "Admin & Staff", href: "/staff" },
  { label: "Pioneers Blueprint", href: "/pioneers-blueprint" },
]

const WEBSITES = [
  { label: "CICSSG Website", href: "https://www.cicssg.com/" },
  { label: "DLSU-D Website", href: "https://www.dlsud.edu.ph/" },
  {
    label: "DLSU-D Portal",
    href: "https://portal.dlsud.edu.ph/mydlsud/login.aspx",
  },
  { label: "DLSU-D Schoolbook", href: "https://dlsud.edu20.org" },
]

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/dlsud.cicssg",
    Icon: "/Facebook.png",
    fill: "#1877F2",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/dlsud.cicssg",
    Icon: "/Instagram.png",
    fill: "#f1ac46",
  },
  {
    label: "Tiktok",
    href: "https://tiktok.com/@dlsudcicssg",
    Icon: "/TikTok.png",
    fill: "#000000",
  },
  {
    label: "Email",
    href: "mailto:cicssg@dlsud.edu.ph",
    Icon: "/Gmail.png",
    fill: "#fca5a5",
  },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-8 lg:flex-row lg:items-stretch lg:px-16">
        <div className="flex h-full flex-col lg:items-start gap-8">
          <div className="flex flex-row gap-4">
            <Image
              src="/assets/LOGO.png"
              alt="CICSSG Logo"
              className="h-fit"
              width={150}
              height={100}
            />
            <Image
              src="/CICSSG Logo.png"
              alt="CICSSG Logo"
              className="h-fit"
              width={150}
              height={100}
            />
          </div>

          <p className="max-w-lg text-justify">
           
          </p>

          <div>
            {SOCIALS.map(({ label, href, Icon, fill }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-2 inline-block transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <Image
                  src={Icon}
                  alt={label}
                  width={36}
                  height={36}
                  style={{ fill }}
                />
              </Link>
            ))}
          </div>

          <p className="hidden lg:block text-nowrap">
            &copy; {new Date().getFullYear()} CICSSG. All rights reserved.
          </p>
        </div>
        
        <div className="h-2 w-full lg:hidden bg-[linear-gradient(to_right,#000_50%,transparent_50%)] bg-size-[30px_2px] bg-repeat-x bg-top"/>
        <div className="flex flex-col md:flex-row w-full gap-6 justify-around">
          <div className="flex flex-col gap-6">
            <p className="font-kelsi text-4xl text-[#95cf56] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              CICSCOVERY
            </p>
            <div className="flex flex-col items-start gap-2">
              {NAV.map(({ label, href }) => (
                <StickerButton
                  className="rotate-3 px-3 py-1.5 font-blackhansans text-white [-webkit-text-stroke:1.5px_black] [paint-order:stroke_fill]"
                >
                  <Link href={href} className="h-full w-full">
                    {label}
                  </Link>
                </StickerButton>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-kelsi text-4xl text-[#95cf56] [-webkit-text-stroke:2px_black] [paint-order:stroke_fill]">
              WEBSITES
            </p>
            <div className="flex flex-col items-start gap-2">
              {WEBSITES.map(({ label, href }) => (
                <StickerButton
                  as="a"
                  target="_blank"
                  href={href}
                  className="rotate-3 px-3 py-1.5 font-blackhansans text-white [-webkit-text-stroke:1.5px_black] [paint-order:stroke_fill]"
                >
                  {label}
                </StickerButton>
              ))}
            </div>
          </div>
        </div>

        <div className="h-2 w-full lg:hidden bg-[linear-gradient(to_right,#000_50%,transparent_50%)] bg-size-[30px_2px] bg-repeat-x bg-top"/>
        <p className="lg:hidden">
            &copy; {new Date().getFullYear()} CICSSG. All rights reserved.
          </p>
      </div>
    </footer>
  )
}

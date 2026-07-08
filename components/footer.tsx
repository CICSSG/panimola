import Link from "next/link"
import { Mail } from "lucide-react"
import StickerButton from "./sticker-button"

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
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
]

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/dlsud.cicssg",
    Icon: FacebookIcon,
    fill: "#1877F2",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/dlsud.cicssg",
    Icon: InstagramIcon,
    fill: "#f1ac46",
  },
  {
    label: "Email",
    href: "mailto:cicssg@dlsud.edu.ph",
    Icon: Mail,
    fill: "#fca5a5",
  },
]

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-white">
      {/* Main row */}
      <div className="grid grid-cols-1 gap-0 border-b-4 border-black sm:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col justify-between gap-6 border-b-4 border-black p-8 sm:border-r-4 sm:border-b-0">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="-rotate-1 border-4 border-black bg-[#fde047] px-2 py-1 text-base font-black uppercase"
                style={{ boxShadow: "3px 3px 0 black" }}
              >
                CICS
              </span>
              <span className="text-base font-black uppercase">Panimola</span>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed font-semibold text-black/50">
              The official student government portal of the College of
              Information and Computer Studies, DLSUD.
            </p>
          </div>
          <p className="text-xs font-bold tracking-widest text-black/30 uppercase">
            © {new Date().getFullYear()} CICSSG
          </p>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3 border-b-4 border-black p-8 sm:border-r-4 sm:border-b-0">
          <span className="mb-1 text-xs font-extrabold tracking-widest text-black/40 uppercase">
            Navigation
          </span>
          {NAV.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="group w-fit overflow-visible text-sm font-extrabold uppercase"
            >
              <StickerButton>{label}</StickerButton>
            </Link>
          ))}
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-3 p-8">
          <span className="mb-1 text-xs font-extrabold tracking-widest text-black/40 uppercase">
            Connect
          </span>
          {SOCIALS.map(({ label, href, Icon, fill }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 text-sm font-extrabold uppercase"
            >
              <StickerButton fill={fill}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0" strokeWidth={2.5} />
                  {label}
                </div>
              </StickerButton>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-8 py-4">
        <p className="text-xs font-bold tracking-widest text-black/30 uppercase">
          De La Salle University Dasmariñas
        </p>
        <div className="rotate-1 border-2 border-black bg-[#f9a8d4] px-2 py-0.5 text-xs font-extrabold tracking-wide uppercase">
          Made with ♥ by CICS SG
        </div>
      </div>
    </footer>
  )
}

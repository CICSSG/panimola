"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { UserAvatar, UserButton, UserProfile, useUser } from "@clerk/nextjs"

export default function Header() {
  const { isSignedIn, isLoaded } = useUser()
  return (
    <>
      {!isLoaded ? (
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
      ) : isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      )}
    </>
  )
}

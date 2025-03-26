"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ListOrdered } from "lucide-react"
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs"

export default function CartHeader() {
  const { isSignedIn, isLoaded } = useAuth()
  // Add a state to track if we're on the client
  const [isClient, setIsClient] = useState(false)

  // Use an effect to update the client state after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show a consistent loading state on server and during hydration
  if (!isLoaded || !isClient) {
    return <div className="flex items-center gap-4">Loading...</div>
  }

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        // User is signed in - show orders link and user button
        <>
          <div className="relative">
            <Link href="/orders" className="group relative">
              <ListOrdered size={20} />
              <Badge className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center p-0 bg-teal-500 text-white text-xs">
                0
              </Badge>
            </Link>
          </div>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </>
      ) : (
        // User is not signed in - show sign in button
        <SignInButton mode="modal">
          <button className="cart">Sign In</button>
        </SignInButton>
      )}
    </div>
  )
}


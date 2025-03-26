"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { useCart } from "@/app/context/CartContext"

// Function to format order ID as XXXX-XXXX-XXXX
const formatOrderId = (id: string): string => {
  // If the ID is already in the correct format, return it
  if (/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(id)) {
    return id
  }

  // Generate a new ID in the correct format
  const cleanId = id.replace(/[^A-Z0-9]/g, "").toUpperCase()
  const segments = []

  // Create 3 segments of 4 characters
  for (let i = 0; i < 3; i++) {
    // If we have enough characters in the original ID, use them
    if (cleanId.length >= (i + 1) * 4) {
      segments.push(cleanId.substring(i * 4, (i + 1) * 4))
    } else {
      // Otherwise generate random characters
      const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
      segments.push(randomChars)
    }
  }

  return segments.join("-")
}

// Function to generate a new order ID
const generateOrderId = (): string => {
  const segments = []
  for (let i = 0; i < 3; i++) {
    // Generate 4 characters for each segment
    const chars = Math.random().toString(36).substring(2, 6).toUpperCase()
    segments.push(chars)
  }
  return segments.join("-")
}

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  // Get or generate order ID in the correct format
  const rawOrderId = searchParams.get("order_id")
  const [orderId, setOrderId] = useState<string>(rawOrderId ? formatOrderId(rawOrderId) : generateOrderId())

  const { clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      clearCart()
      setIsLoading(false)

      // If order_id is not in the URL or is different from our formatted version, update it
      if (!searchParams.has("order_id") || searchParams.get("order_id") !== orderId) {
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set("order_id", orderId)
        // Update URL without refreshing the page
        window.history.pushState({}, "", newUrl.toString())
      }
    } else {
      // Redirect to home if no session ID is present
      router.push("/")
    }
  }, [sessionId, clearCart, router, orderId, searchParams])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#029FAE] border-r-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your purchase. Your order has been processed successfully.
        </p>
        <p className="mt-2 text-sm text-gray-500">Order ID: {orderId}</p>
        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-teal-500 text-white rounded-[30px] hover:bg-teal-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}


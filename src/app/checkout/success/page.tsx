"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { useCart } from "@/app/context/CartContext"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      clearCart()
      setIsLoading(false)
    } else {
      // Redirect to home if no session ID is present
      router.push("/")
    }
  }, [sessionId, clearCart, router])

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
        <p className="mt-2 text-sm text-gray-500">Order ID: {sessionId?.substring(0, 8)}...</p>
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


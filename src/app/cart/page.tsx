"use client"

import { useCart } from "@/app/context/CartContext"
import { IoTrashOutline } from "react-icons/io5"
import { HiMinus, HiPlus } from "react-icons/hi2"
import WishlistIcon from "@/components/WishlistIcon"
import { createCheckoutSession } from "@/lib/stripe"
import { getStripe } from "@/lib/getStripe"
import { useState } from "react"

const Page = () => {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Create a checkout session via server action
      const { sessionId, error } = await createCheckoutSession(cart)

      if (error) {
        console.error("Error creating checkout session:", error)
        alert("Something went wrong. Please try again.")
        setIsLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      const { error: redirectError } = await stripe!.redirectToCheckout({
        sessionId: sessionId!,
      })

      if (redirectError) {
        console.error("Redirect to checkout failed:", redirectError)
        alert("Payment initialization failed. Please try again.")
      }
    } catch (err) {
      console.error("Checkout error:", err)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="lg:mx-20 sm:mx-10 mx-7 mb-10">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Bag */}
        <div className="bag mt-7 xl:w-[840px]">
          <h4 className="md:text-2xl text-xl text-teal-500 font-bold mb-4 ">Items</h4>
          <div className="flex flex-col ">
            {cart.map((item) => (
              <div key={item.id} className="flex sm:flex-row gap-3 items-center flex-col py-5 border-b ">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="sm:w-[150px] sm:h-[150px] max-w-[300px] max-h-[300px] "
                />
                <div className="flex md:gap-10 lg:gap-32 xl:justify-between">
                  <div className="title lg:mx-10">
                    <h6 className="text-[#272343] text-base">{item.title}</h6>
                    <p className="text-[#757575] lg:mt-6  text-[14px] tracking-wide">Ashen Slate/Cobalt Bliss</p>
                    <div className="text-[#757575] lg:mb-6 lg:mt-2 text-[14px] tracking-wider flex items-center  gap-8">
                      <p>MRP: ${item.price}</p>
                      {/* Cart Button */}
                      <div className="flex w-[100px] justify-between border border-[#7d8184] text-black rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1} // Disable the - button if quantity is 1
                          className="px-2 py-2 border-r border-[#7d8184] text-[#272343] hover:text-white hover:bg-[#029FAE] hover:border-none cursor-pointer rounded-l mx-0"
                        >
                          <HiMinus className="size-3" />
                        </button>
                        <span className="text-[14px] text-[#272343] text-center my-auto ">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-2 border-l border-[#7d8184] hover:text-white hover:bg-[#029FAE] hover:border-none cursor-pointer text-[#272343]"
                        >
                          <HiPlus className="size-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex lg:justify-start justify-center mt-2 gap-4">
                      <WishlistIcon product={{ ...item, slug: item.slug || "default-slug" }} />
                      {/* <CiHeart className="size-8"/> */}
                      <button onClick={() => removeFromCart(item.id)}>
                        <IoTrashOutline className="size-7 text-xl hover:scale-110 transition-transform text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="price"> Total MRP : ${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:mt-20 w-[300px] text-[#111111]">
          <h4 className="text-2xl  font-medium mb-4 ">Summary</h4>
          <div className="mt-3 text-[15px]">
            <div className="flex justify-between">
              Subtotal <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between my-3">
              Estimated Delivery & Handling <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between my-2 py-3 border-y border-[#E5E5E5]">
              <span>Total</span> <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isLoading || cart.length === 0}
            className="w-full rounded-[30px] mt-5 px-4 py-3 text-white bg-[#029FAE] hover:bg-[#027e8a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page


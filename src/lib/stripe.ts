"use server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
})

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl: string
  slug?: string
}

export async function createCheckoutSession(cartItems: CartItem[]) {
  // Validate cart
  if (!cartItems || cartItems.length === 0) {
    return { error: "Cart is empty" }
  }

  try {
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(item.price * 100), // Stripe requires amount in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    })

    // Return the session ID
    return { sessionId: session.id }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return { error: "Failed to create checkout session" }
  }
}


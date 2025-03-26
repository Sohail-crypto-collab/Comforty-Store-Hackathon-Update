"use client"
import Cookies from "js-cookie"
import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { toast } from "react-toastify"

interface CartItem {
  color: string
  slug?: string
  id: string
  title: string
  price: number
  quantity: number
  imageUrl: string
}

interface CartContextProps {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Initialize cart from cookies after component is hydrated
  useEffect(() => {
    const storedCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : []
    setCart(storedCart)
  }, [])

  // Add to Cart - wrapped in useCallback
  const addToCart = useCallback((product: CartItem) => {
    console.log("Adding to cart:", product.id)

    let toastMessage = "" // Initialize toast message
    let toastType = "" // Initialize toast type (success or info)

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      const updatedCart = existing
        ? prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...prev, { ...product, quantity: 1 }]

      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 })

      // Determine the toast message and type
      if (existing) {
        toastMessage = `Quantity updated for ${product.title}`
        toastType = "info"
      } else {
        toastMessage = `${product.title} has been added to the cart!`
        toastType = "success"
      }

      return updatedCart
    })

    // Call toast once outside setCart
    if (toastType === "success") {
      toast.success(toastMessage, {
        position: "bottom-right",
        autoClose: 3000,
      })
    } else if (toastType === "info") {
      toast.info(toastMessage, {
        position: "bottom-right",
        autoClose: 3000,
      })
    }

    console.log("Item processed")
  }, [])

  // Update cart quantity - wrapped in useCallback
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item))
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 })
      return updatedCart
    })
  }, [])

  // Remove from cart - wrapped in useCallback
  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const itemToRemove = prev.find((item) => item.id === id)
      if (itemToRemove) {
        toast.error(`${itemToRemove.title} removed from cart!`, {
          position: "bottom-right",
          autoClose: 3000,
        })
      }

      const updatedCart = prev.filter((item) => item.id !== id)
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 })
      console.log("Removing from cart:", itemToRemove?.title)
      return updatedCart
    })
  }, [])

  // Clear cart - wrapped in useCallback
  const clearCart = useCallback(() => {
    setCart([]) // Clear the state
    Cookies.remove("cart") // Remove cart from cookies
  }, [])

  // Calculate total items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}


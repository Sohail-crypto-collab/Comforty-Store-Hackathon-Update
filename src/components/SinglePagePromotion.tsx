"use client"

import type React from "react"

import { useCart } from "@/app/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BsCartDash } from "react-icons/bs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import WishlistIcon from "./WishlistIcon"

interface Product {
  slug: string
  title: string
  price: number
  imageUrl: string
  color: string
  badge?: string
  priceWithoutDiscount?: number
}

interface FeaturedProductProps {
  Featuredproducts: Product[]
}

const ProductCarousel = ({ Featuredproducts }: FeaturedProductProps) => {
  const { addToCart } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animatedProjects, setAnimatedProjects] = useState<string[]>([])
  const productRefs = useRef<(HTMLDivElement | null)[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

  // Number of items to show based on screen size
  const [itemsToShow, setItemsToShow] = useState(4)

  // Track if we can navigate further
  const canGoNext = currentIndex + itemsToShow < Featuredproducts.length
  const canGoPrev = currentIndex > 0

  // Handle responsive display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1)
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2)
      } else {
        setItemsToShow(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation for products entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug")
            if (slug) {
              setAnimatedProjects((prev) => [...prev, slug])
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    productRefs.current.forEach((product) => {
      if (product) observer.observe(product)
    })

    return () => {
      observer.disconnect()
    }
  }, [currentIndex])

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    console.log("Product data:", product)
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      color: "",
    })
  }

  const nextSlide = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <section className="py-12 w-full">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-2xl lg:text-3xl tracking-normal">Featured Products</h2>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={!canGoPrev}
                className={`rounded-full p-2 border border-gray-200 hover:bg-gray-100 transition-colors ${!canGoPrev ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={!canGoNext}
                className={`rounded-full p-2 border border-gray-200 hover:bg-gray-100 transition-colors ${!canGoNext ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {Featuredproducts.map((product, index) => {
                const slug = product.slug || `product-${index}`

                return (
                  <div key={slug} className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-3`}>
                    <Link href={`/products/${slug}`}>
                      <div
                        ref={(el) => {
                          if (el) productRefs.current[index] = el
                        }}
                        data-slug={slug}
                        className={`product mb-4 mt-5 hover:scale-105 transition-all duration-300 ${
                          animatedProjects.includes(slug) ? "visible" : ""
                        }`}
                      >
                        <div className="relative img aspect-square">
                          <Image
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="hover:brightness-90 rounded-md object-cover"
                            priority={index < 4}
                          />

                          {product.color && (
                            <span
                              className="top-2 left-4 absolute px-3 py-1 rounded-lg text-sm"
                              style={{
                                backgroundColor: product.color,
                                color: "white",
                              }}
                            >
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between mt-3">
                          <div>
                            <h4 className="text-[#272343] font-bold">{product.title}</h4>
                            <div>
                              <span className="text-[#272343] text-[18px] font-bold">${product.price}</span>
                              {product.priceWithoutDiscount && (
                                <del className="ml-1 text-[#9A9CAA] font-bold">${product.priceWithoutDiscount}</del>
                              )}
                            </div>
                          </div>
                          <button
                            className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-teal-500 text-[#272343] hover:text-white rounded-lg transition-colors duration-300"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <BsCartDash className="size-6" />
                          </button>
                        </div>

                        <div className="top-2 right-7 absolute rounded-lg size-4">
                          <WishlistIcon
                            product={{
                              ...product,
                              id: slug,
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(Featuredproducts.length / itemsToShow) }).map((_, index) => {
              const currentGroup = Math.floor(currentIndex / itemsToShow)
              const totalGroups = Math.ceil(Featuredproducts.length / itemsToShow)

              // On mobile and tablet, only show 3 dots
              if (itemsToShow < 4) {
                // mobile or tablet view
                // Always show first dot, current dot, and last dot
                // Hide others unless they're adjacent to current
                if (totalGroups <= 3) {
                  // If we have 3 or fewer groups, show all dots
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index * itemsToShow)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        currentGroup === index ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                } else {
                  // Show only three dots with the middle one being active
                  if (currentGroup === 0 && index <= 2) {
                    // First three dots
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index * itemsToShow)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          currentGroup === index ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  } else if (currentGroup === totalGroups - 1 && index >= totalGroups - 3) {
                    // Last three dots
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index * itemsToShow)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          currentGroup === index ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  } else if (index >= currentGroup - 1 && index <= currentGroup + 1) {
                    // Middle cases - show current dot and one on each side
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index * itemsToShow)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          currentGroup === index ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  }
                  return null // Hide other dots
                }
              } else {
                // On desktop, show all dots
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * itemsToShow)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      currentGroup === index ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel


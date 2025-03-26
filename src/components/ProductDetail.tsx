"use client"

import { useCart } from "@/app/context/CartContext"
import type { FC } from "react"
import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import { CloudLightningIcon as LightningBolt, Clock, ShieldCheck, Package, BarChart2 } from "lucide-react"
import WishlistIcon from "./WishlistIcon"

interface Product {
  slug: string
  title: string
  price: number
  imageUrl: string
  color: string
  description: string
  category?: {
    title: string
  }
  priceWithoutDiscount?: number
}

const ProductDetail: FC<{ product: Product; products: Product[] }> = ({ product, products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      color: "",
    })
  }

  // Calculate discount percentage
  const discountPercentage = product.priceWithoutDiscount
    ? Math.round(((product.priceWithoutDiscount - product.price) / product.priceWithoutDiscount) * 100)
    : 0

  // Calculate savings amount
  const savingsAmount = product.priceWithoutDiscount ? (product.priceWithoutDiscount - product.price).toFixed(2) : 0

  const openModal = () => {
    const filteredCategoryProducts = products.filter(
      (item) => item.category?.title === product.category?.title && item.slug !== product.slug,
    )
    setCategoryProducts(filteredCategoryProducts)
    setIsModalOpen(true)
    setCurrentIndex(0) // Reset index when modal opens
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < categoryProducts.length - 1 ? prevIndex + 1 : 0))
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : categoryProducts.length - 1))
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left side - Product Image */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square">
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>

          <div className="text-sm text-gray-600 mb-4">{product.description}</div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-green-500">${product.price.toFixed(2)}</span>
            {product.priceWithoutDiscount && (
              <span className="text-lg text-gray-500 line-through">${product.priceWithoutDiscount.toFixed(2)}</span>
            )}
            {discountPercentage > 0 && (
              <span className="text-sm font-medium text-[#FF4E3E] bg-[#FF4E3E]/10 px-2 py-1 rounded">MEGA SAVINGS</span>
            )}
          </div>

          {Number(savingsAmount) > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
              <LightningBolt className="h-4 w-4 text-[#FF4E3E]" />
              You save ${savingsAmount}!
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Clock className="h-4 w-4" />
            32 people bought in last hour
          </div>

          {/* Limited Time Offer Banner */}
          <div className="bg-[#FFF8E7] border border-[#FFE4B0] rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-[#B25E09]">
              <LightningBolt className="h-5 w-5" />
              <span className="font-medium">Limited Time Offer!</span>
            </div>
            <p className="text-sm text-[#B25E09] mt-1">Order now before price increases!</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-teal-500 hover:bg-teal-400 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <FaShoppingCart className="h-5 w-5" />
              Add to Cart - ${product.price.toFixed(2)}
            </button>

            <div className="flex gap-3">
              <button
                onClick={openModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <BarChart2 className="h-5 w-5" />
                Compare Products
              </button>

              {/* Replace button with div for wishlist */}
              <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded-lg">
                <WishlistIcon
                  product={{
                    ...product,
                    id: product.slug || "default-id",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Package className="h-5 w-5 text-blue-500" />
              In stock - Ships within 24 hours
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Clock className="h-5 w-5 text-blue-600" />
              30-day money-back guarantee
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              Secure payment processing
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Compare Products</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Product */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 line-clamp-2">Current Product</h4>
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md">
                  Price: ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Comparable Product */}
              {categoryProducts.length > 0 && (
                <div className="space-y-4 relative">
                  <h4 className="text-lg font-medium text-gray-900 line-clamp-2">
                    {categoryProducts[currentIndex]?.title}
                  </h4>
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={categoryProducts[currentIndex]?.imageUrl || "/placeholder.svg"}
                      alt={categoryProducts[currentIndex]?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{categoryProducts[currentIndex]?.description}</p>
                  <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md">
                    Price: ${categoryProducts[currentIndex]?.price.toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            {categoryProducts.length > 1 && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="p-3 bg-[#029fae] hover:bg-[#027d8f] text-white rounded-full"
                  onClick={handlePrevious}
                >
                  <GoArrowLeft className="h-5 w-5" />
                </button>
                <button className="p-3 bg-[#029fae] hover:bg-[#027d8f] text-white rounded-full" onClick={handleNext}>
                  <GoArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default ProductDetail


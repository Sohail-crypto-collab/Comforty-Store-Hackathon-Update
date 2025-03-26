"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  images: {
    id: number
    src: string
    alt: string
    isFeatured?: boolean
  }[]
  slideInterval?: number
  className?: string
}

export default function ExplorePageCarousel({ images, slideInterval = 2000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToNext = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)

    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500)
  }, [images.length, isTransitioning])

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500)
  }, [images.length, isTransitioning])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(goToNext, slideInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [goToNext, isAutoPlaying, slideInterval])

  // Pause auto-play when user interacts with carousel
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl bg-background">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image) => (
            <div key={image.id} className="relative h-full w-full flex-shrink-0">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={image.isFeatured}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-md text-white">
                <h3 className="mb-2 text-2xl font-bold">{image.alt}</h3>
                <p className="text-sm opacity-90">Discover our exclusive collection of modern designs</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-8 rounded-full transition-all",
                currentIndex === index ? "bg-primary" : "bg-white/50 hover:bg-white/75",
              )}
              onClick={() => {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => setIsTransitioning(false), 500)
              }}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


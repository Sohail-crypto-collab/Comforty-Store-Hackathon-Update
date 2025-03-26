"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { cn } from "@/lib/utils"

const carouselItems = [
  {
    id: 1,
    image: "/living-room-1853203_1920.jpg",
    alt: "Furniture Collection 1",
  },
  {
    id: 2,
    image: "/living-room-1853203_1920.jpg",
    alt: "Furniture Collection 2",
  },
  {
    id: 3,
    image: "/living-room-1853203_1920.jpg",
    alt: "Furniture Collection 3",
  },
]

export default function Hero() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)

    // Auto-slide functionality
    const autoSlideInterval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => {
      api.off("select", handleSelect)
      clearInterval(autoSlideInterval)
    }
  }, [api])

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      <div className="relative mx-auto max-w-[1100px]">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:h-[600px]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="title text-center text-white md:text-left md:max-w-[400px] lg:max-w-[557px]">
                      <p className="text-sm uppercase tracking-wide md:text-base lg:leading-[14px]">
                        Welcome to Chairy
                      </p>
                      <h1 className="mt-3 text-4xl font-bold md:text-5xl lg:text-[4rem] lg:mt-7 max-[600px]:mx-8">
                        Best Furniture Collection For Your Interior.
                      </h1>
                      <Link href="/products">
                        <Button className="group mt-5 w-fit bg-teal-500 hover:bg-teal-600">
                          Shop Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        <div className="mt-4 flex justify-center gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                current === index ? "bg-teal-500 w-6" : "bg-gray-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


"use client"
import ExplorePageCarousel from "./ExplorePageCarousel";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "/living_room_furniture_paneling_8.jpg",
    alt: "Orange modern chair",
    isFeatured: true,
  },
  {
    id: 2,
    src: "/[freepicdownloader.com]-realistic-living-room-interior-large.jpg",
    alt: "White cushioned chair",
  },
  {
    id: 3,
    src: "/interior_design_style_design_805.jpg",
    alt: "Classic white chair",
  },
  {
    id: 4,
    src: "/pexels-eric-mufasa-578798-1350789.jpg",
    alt: "Grey upholstered chair",
  },
  {
    id: 5,
    src: "/pexels-pixabay-279652.jpg",
    alt: "White wooden chair",
  },
]

export default function ExplorePage() {
  return (
    <section className="w-full py-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Heading */}
            <div className="space-y-1">
              <p className="xl:text-base lg:text-sm text-sm font-bold text-teal-500 uppercase tracking-wider text-muted-foreground">Explore</p>
              <h2 className="text-3xl text-gray-700 font-bold tracking-tight">New and Popular Styles</h2>
            </div>

            {/* Carousel */}
            <ExplorePageCarousel images={galleryImages} slideInterval={3000} className="aspect-[16/9] sm:aspect-[2/1]" />

            {/* Featured Collection */}
            
          </div>
        </div>
      </div>
    </section>
  )
}

// Don't forget to import Image from 'next/image' at the top of your file



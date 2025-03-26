"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"

const Categories = () => {
  const [categoriesProduct, setCategoriesProduct] = useState<any[]>([])
  const [animatedCategories, setAnimatedCategories] = useState<string[]>([])
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "categories"] {
            title,
            "imageUrl": image.asset->url, 
            products
          }
        `)
        setCategoriesProduct(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.getAttribute("data-title")
            if (title) {
              setAnimatedCategories((prev) => (prev.includes(title) ? prev : [...prev, title]))
            }
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is visible
    )

    categoryRefs.current.forEach((category) => {
      if (category) observer.observe(category)
    })

    return () => {
      observer.disconnect()
    }
  }, [categoriesProduct])

  return (
    <section className="w-full py-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-1">
          <h2 className="text-teal-500 lg:text-3xl lg:-mt-10 lg:mb-16 sm:my-10 text-4xl font-bold">
            Top
            <span className="xl:text-3xl text-gray-700 lg:-mt-10 lg:mb-16 sm:my-10 text-4xl font-bold ml-2">
              Categories
            </span>
          </h2>

          {categoriesProduct.length === 0 ? (
            <div className="text-center py-10">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-5">
              {categoriesProduct.map((cat: any, index: number) => (
                <Link href={`/categories/${cat.title}`} key={index}>
                  <div
                    ref={(el) => {
                      categoryRefs.current[index] = el
                    }}
                    className={`relative cursor-pointer hover:scale-105 transition-all duration-300 ${
                      animatedCategories.includes(cat.title) ? "opacity-100" : "opacity-0"
                    } transform transition-opacity duration-500`}
                    data-title={cat.title}
                  >
                    <div className="relative w-full h-[200px]">
                      {cat.imageUrl && (
                        <img
                          src={cat.imageUrl || "/placeholder.svg"}
                          alt={cat.title}
                          className="rounded-lg hover:contrast-125 object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="absolute bottom-0 w-full rounded-b-lg py-2 bg-black/70 text-white text-center">
                      <h5 className="text-xl">{cat.title}</h5>
                      <p className="text-white/70 text-sm">{cat.products} Products</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Categories


import { client } from "@/sanity/lib/client"
import CategoryProducts from "@/components/CategoryProducts"
import type { Metadata, ResolvingMetadata } from "next"

interface Product {
  title: string
  price: number
  imageUrl: string
  slug: string
}

const getCategoryProducts = async (category: string): Promise<Product[]> => {
  const decodedCategory = decodeURIComponent(category)
  return await client.fetch(
    `*[_type == "products" && category->title == $category] {
      title,
      price,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`,
    { category: decodedCategory },
  )
}

// Use the correct Next.js 15 types
type PageProps = {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  // Await the params object before accessing its properties
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  return {
    title: `${decodedCategory} Products`,
    description: `Browse our collection of ${decodedCategory} products`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  // Await the params object before accessing its properties
  const { category } = await params
  const products = await getCategoryProducts(category)

  return <CategoryProducts products={products} category={decodeURIComponent(category)} />
}


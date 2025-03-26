import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import ProductDetail from "@/components/ProductDetail";
import SinglePagePromotion from "@/components/SinglePagePromotion";
import { notFound } from "next/navigation";

interface Product {
  slug: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  color: string;
  imageUrl: string;
  description: string;
  inventory: number;
  category: { title: string };
}

const getProduct = async (slug: string): Promise<Product | null> => {
  try {
    const products = await client.fetch(`*[_type == "products"] {
      title,
      "slug" : slug.current,
      price,
      priceWithoutDiscount,
      badge,
      color,
      "imageUrl": image.asset->url,
      category->{
        title
      },
      description,
      inventory,
      tags,
    }`);

    const foundProduct = products.find((prod: any) => prod.slug === slug);
    return foundProduct || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Define the correct type for Next.js 15 page props
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params }: PageProps) {
  // Await the params object before accessing its properties
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Fetch all products for category filter
  const allProducts = await client.fetch(`*[_type == "products"] {
    title,
    "slug" : slug.current,
    price,
    "imageUrl": image.asset->url,
    category->{
      title
    },
    description,
    inventory
  }`);

  return (
    <div>
      <Suspense fallback={<div className="text-center xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl font-bold text-teal-500 xl:mt-20 lg:mt-20 md:mt-20 sm:mt-10">Loading product details...</div>}>
        <ProductDetail product={product} products={allProducts} />
      </Suspense>
      <Suspense fallback={<div className="text-center xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl font-bold text-teal-500 xl:mt-10 lg:mt-10 md:mt-10 sm:mt-5">Loading featured products...</div>}>
        <SinglePagePromotion Featuredproducts={allProducts} />
      </Suspense>
    </div>
  );
}

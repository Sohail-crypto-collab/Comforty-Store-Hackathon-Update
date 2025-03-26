"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsCartDash } from "react-icons/bs";
import WishlistIcon from "./WishlistIcon";

interface Product {
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  color: string;
  badge?: string;
  priceWithoutDiscount?: number;
}

interface featuredProduct {
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  color: string;
  badge?: string;
  priceWithoutDiscount?: number;
}

const FeaturedProduct = ({
  Featuredproducts,
}: {
  Featuredproducts: featuredProduct[];
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    console.log("Product data:", product);
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      color: "",
    });
  };

  const [animatedProjects, setAnimatedProjects] = useState<string[]>([]);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug");
            if (slug) {
              setAnimatedProjects((prev) => [...prev, slug]);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    productRefs.current.forEach((product) => {
      if (product) observer.observe(product);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-12 w-full">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-8 font-bold text-teal-500 text-2xl lg:text-3xl  tracking-normal">
            Featured
            <span className="mb-8 font-bold text-gray-700 text-2xl lg:text-3xl  tracking-normal ml-2">
              Product
            </span>
          </h2>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {Featuredproducts.map((Product, index) => {
              if (!Product.slug) {
                Product.slug = "no-slug";
              }

              return (
                <Link
                  href={`/products/${Product.slug}`}
                  key={Product.slug || `product-${index}`}
                >
                  <div
                    ref={(el) => {
                      if (el) productRefs.current[index] = el;
                    }}
                    data-slug={Product.slug}
                    className={`product mb-4 mt-5 hover:scale-105 transition-all duration-300 ${
                      animatedProjects.includes(Product.slug) ? "visible" : ""
                    }`}
                  >
                    <div className="relative img aspect-square">
                      <Image
                        src={Product.imageUrl || "/placeholder.svg"}
                        alt={Product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="hover:brightness-90 rounded-md object-cover"
                        priority={index < 4}
                      />

                      {Product.color && (
                        <span
                          className="top-2 left-4 absolute px-3 py-1 rounded-lg text-sm"
                          style={{
                            backgroundColor: Product.color,
                            color: "white",
                          }}
                        >
                          {Product.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between mt-3">
                      <div>
                        <h4 className="text-[#272343] font-semibold">
                          {Product.title}
                        </h4>
                        <div>
                          <span className="text-teal-500 text-[18px] font-bold">
                            ${Product.price}
                          </span>
                          <del className="ml-1 text-[#9A9CAA] font-bold">
                            {Product.priceWithoutDiscount}
                          </del>
                        </div>
                      </div>
                      <button
                        className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-teal-500 text-[#272343] hover:text-white rounded-lg transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(Product);
                        }}
                      >
                        <BsCartDash className="size-6" />
                      </button>
                    </div>

                    <div className="top-2 right-7 absolute rounded-lg size-4">
                      <WishlistIcon
                        product={{
                          ...Product,
                          id: Product.slug || "default-id",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;

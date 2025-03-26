"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WishlistIcon from "./WishlistIcon";
import { BsCartDash } from "react-icons/bs";
import Image from "next/image";

const CategoryProducts = ({
  products,
  category,
}: {
  products: any[];
  category: string;
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
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
    // Set all products as animated initially to make them visible
    if (products && products.length > 0) {
      const slugs = products.map((prod) => prod.slug);
      setAnimatedProjects(slugs);
    }

    // Optional: You can still use the observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug");
            if (slug) {
              setAnimatedProjects((prev) =>
                prev.includes(slug) ? prev : [...prev, slug]
              );
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
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="text-center my-20">
        <h2>No products found for {category}!</h2>
      </div>
    );
  }

  return (
    <section className="py-12 w-full">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          <h2 className="text-[#272343] lg:text-[32px] text-2xl text-center  font-bold">
            {category} Products
          </h2>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-6 md:mt-16">
            {products.map((prod: any, index: number) => (
              <div
                key={prod.slug}
                ref={(el) => {
                  if (el) productRefs.current[index] = el;
                }}
                data-slug={prod.slug}
                className={`w-auto product mb-4 mt-5 hover:scale-105 transition-all duration-300 ${
                  animatedProjects.includes(prod.slug) ? "visible" : ""
                }`}
              >
                <div className="relative img aspect-square">
                  <Link href={`/products/${prod.slug}`}>
                    <Image
                      src={prod.imageUrl || "/placeholder.svg?"}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="hover:brightness-90 rounded-md object-cover "
                      priority={index < 4}
                    />
                  </Link>
                  {prod.color && (
                    <span
                      className="absolute top-2 left-4 rounded-lg text-sm px-3 py-1"
                      style={{ backgroundColor: prod.color, color: "white" }}
                    >
                      {prod.badge}
                    </span>
                  )}
                  <div className="absolute top-2 right-6 rounded-lg size-4">
                    <WishlistIcon
                      product={{ ...prod, id: prod.slug || "default-id" }}
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-3">
                  <div>
                    <h4 className="text-[#272343] font-bold">{prod.title}</h4>
                    <div>
                      <span className="text-teal-500 text-[18px] font-bold">
                        ${prod.price}
                      </span>
                      <del className="ml-1 text-[#9A9CAA] font-bold">
                        {prod.priceWithoutDiscount}
                      </del>
                    </div>
                  </div>
                  <button
                    className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-[#029FAE] text-[#272343] hover:text-white rounded-lg transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(prod);
                    }}
                  >
                    <BsCartDash className="size-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;

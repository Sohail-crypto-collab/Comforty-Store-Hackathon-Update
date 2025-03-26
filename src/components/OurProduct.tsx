"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { BsCartDash } from "react-icons/bs";
import WishlistIcon from "./WishlistIcon";
import Image from "next/image";

const OurProduct = ({ Products }: { Products: any }) => {
  console.log("products data", Products);
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (product: any) => {
      console.log("Product data:", product);
      addToCart({
        id: product.slug,
        title: product.title,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        color: "",
      });
      console.log("item added to cart with id:", product.slug);
    },
    [addToCart]
  );

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
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-8 font-bold text-teal-500 text-2xl lg:text-3xl  tracking-normal text-center ">
            Our
            <span className="mb-8 font-bold  text-2xl text-gray-700 lg:text-3xl  tracking-normal text-center ml-2 ">
              Product
            </span>
          </h2>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {Products.map((prod: any, index: number) => (
              <div key={prod.slug || `product-${index}`}>
                <Link href={`/products/${prod.slug}`}>
                  <div
                    ref={(el) => {
                      if (el) productRefs.current[index] = el;
                    }}
                    data-slug={prod.slug}
                    className={`product mb-16 mt-5 hover:scale-105 transition-all duration-300 ${
                      animatedProjects.includes(prod.slug) ? "visible" : ""
                    }`}
                  >
                    <div className="relative img aspect-square">
                      <Image
                        src={prod.imageUrl || "/placeholder.svg"}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="hover:brightness-90 rounded-md object-cover"
                        priority={index < 4}
                      />
                      {prod.color && (
                        <span
                          className="top-2 left-4 absolute px-3 py-1 rounded-lg text-sm"
                          style={{
                            backgroundColor: prod.color,
                            color: "white",
                          }}
                        >
                          {prod.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between mt-3">
                      <div>
                        <h4 className="text-[#272343] font-bold">
                          {prod.title}
                        </h4>
                        <div>
                          <span className="ml-1 text-teal-500  font-bold">
                            ${prod.priceWithoutDiscount}
                          </span>
                          <del className="ml-1 text-[#9A9CAA]">
                            ${prod.price}
                          </del>
                        </div>
                      </div>
                      <button
                        className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-teal-500 text-[#272343] hover:text-white rounded-lg transition-colors duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(prod);
                        }}
                      >
                        <BsCartDash className="size-6" />
                      </button>
                    </div>

                    <div className="top-2 right-7 absolute rounded-lg size-4">
                      <WishlistIcon
                        product={{
                          ...prod,
                          id: prod.slug || "default-id",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProduct;

"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsCartDash } from "react-icons/bs";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { useCart } from "@/app/context/CartContext";

type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  imageUrl: string;
  category?: { title: string };
  badge?: string;
  color?: string;
};

const AllProduct = ({ products }: { products: Product[] }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, Number.POSITIVE_INFINITY]);
  const [selectedBadge, setSelectedBadge] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [animatedProducts, setAnimatedProducts] = useState<string[]>([]);

  const { addToCart } = useCart();

  const productsPerPage = 6;

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((p) => p.category?.title || "Unknown")
    );
    return Array.from(uniqueCategories);
  }, [products]);

  const handleFilter = useCallback(
    (
      category: string,
      priceRange: [number, number],
      badge: string,
      search: string
    ) => {
      const filtered = products.filter((p) => {
        const matchesCategory =
          category === "All" ||
          p.category?.title?.toLowerCase() === category.toLowerCase();
        const matchesPrice =
          p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesBadge = !badge || p.badge === badge;
        const matchesSearch =
          !search || p.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesPrice && matchesBadge && matchesSearch;
      });

      setFilteredProducts(filtered);
      setCurrentPage(1);
    },
    [products]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      handleFilter(category, selectedPriceRange, selectedBadge, searchQuery);
    },
    [selectedPriceRange, selectedBadge, searchQuery, handleFilter]
  );

  const handlePriceFilter = useCallback(
    (priceRange: [number, number]) => {
      setSelectedPriceRange(priceRange);
      handleFilter(selectedCategory, priceRange, selectedBadge, searchQuery);
    },
    [selectedCategory, selectedBadge, searchQuery, handleFilter]
  );

  const handleBadgeChange = useCallback(
    (badge: string) => {
      setSelectedBadge(badge);
      handleFilter(selectedCategory, selectedPriceRange, badge, searchQuery);
    },
    [selectedCategory, selectedPriceRange, searchQuery, handleFilter]
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      setSearchQuery(search);
      handleFilter(selectedCategory, selectedPriceRange, selectedBadge, search);
    },
    [selectedCategory, selectedPriceRange, selectedBadge, handleFilter]
  );

  useEffect(() => {
    handleFilter(
      selectedCategory,
      selectedPriceRange,
      selectedBadge,
      searchQuery
    );
  }, [
    selectedCategory,
    selectedPriceRange,
    selectedBadge,
    searchQuery,
    handleFilter,
  ]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    setAnimatedProducts([]);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProducts(currentProducts.map((prod) => prod.id));
    }, 20);

    return () => clearTimeout(timer);
  }, [currentProducts]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        color: product.color || "",
      });
    },
    [addToCart]
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-[#272343] text-2xl lg:text-[32px] mt-6 md:mb-10 mb-5 tracking-normal font-semibold text-center">
          All Products
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-1/4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="px-3 py-2 border text-[#272343] border-gray-300 outline-none rounded-md w-full"
              />
            </div>
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              selectedBadge={selectedBadge}
              onCategoryChange={handleCategoryChange}
              onPriceFilter={handlePriceFilter}
              onBadgeChange={handleBadgeChange}
            />
          </div>

          {/* Products */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((prod, index) => (
                <div
                  className={`product mb-8 hover:scale-105 transition-all duration-300 ${
                    animatedProducts.includes(prod.id) ? "visible" : ""
                  }`}
                  key={prod.slug || `product-${index}`}
                >
                  <div className="img relative aspect-square">
                    <Link href={`/products/${prod.slug}`}>
                      <Image
                        src={prod.imageUrl || "/placeholder.svg"}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="hover:brightness-90 rounded-md object-cover cursor-pointer"
                        priority={index < 4}
                      />
                    </Link>
                    {prod.color && (
                      <span
                        className="absolute top-4 left-4 rounded-lg text-sm px-3 py-1"
                        style={{ backgroundColor: prod.color, color: "white" }}
                      >
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text gap-[10px]">
                      <h4 className="text-[#272343]">{prod.title}</h4>
                      <div>
                        <span className="text-[#272343] text-[18px] font-medium">
                          ${prod.price}
                        </span>
                        {prod.priceWithoutDiscount && (
                          <del className="ml-1 text-[#9A9CAA]">
                            ${prod.priceWithoutDiscount}
                          </del>
                        )}
                      </div>
                    </div>
                    <button
                      className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-[#029FAE] text-[#272343] hover:text-white rounded-lg"
                      onClick={() => handleAddToCart(prod)}
                    >
                      <BsCartDash className="size-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;

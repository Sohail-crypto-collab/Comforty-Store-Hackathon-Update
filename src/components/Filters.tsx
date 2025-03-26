import { useState } from "react"

type FiltersProps = {
  categories: string[]
  selectedCategory: string
  selectedBadge: string
  onCategoryChange: (category: string) => void
  onPriceFilter: (priceRange: [number, number]) => void
  onBadgeChange: (badge: string) => void
}

const Filters = ({
  categories,
  selectedCategory,
  selectedBadge,
  onCategoryChange,
  onPriceFilter,
  onBadgeChange,
}: FiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Number.POSITIVE_INFINITY])

  const handlePriceChange = (min: number, max: number) => {
    const newRange: [number, number] = [min, max]
    setPriceRange(newRange)
    onPriceFilter(newRange)
  }

  return (
    <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
      <div className="categories min-w-[150px] md:min-w-0">
        <h3 className="text-lg font-medium mb-2 text-[#272343]">Categories</h3>
        <div className="flex flex-col gap-2">
          <button
            key="all-categories"
            onClick={() => onCategoryChange("All")}
            className={`text-left ${selectedCategory === "All" ? "text-[#029FAE]" : "text-[#272343]"}`}
          >
            All Categories
          </button>
          {categories.map((category, index) => (
            <button
              key={`category-${index}-${category}`}
              onClick={() => onCategoryChange(category)}
              className={`text-left ${selectedCategory === category ? "text-[#029FAE]" : "text-[#272343]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="price-range min-w-[150px] md:min-w-0">
        <h3 className="text-lg font-medium mb-2 text-[#272343]">Price Range</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "All", range: [0, Number.POSITIVE_INFINITY] },
            { label: "Under $50", range: [0, 50] },
            { label: "$50 - $100", range: [50, 100] },
            { label: "$100 - $200", range: [100, 200] },
            { label: "Over $200", range: [200, Number.POSITIVE_INFINITY] },
          ].map((option, index) => (
            <button
              key={`price-${index}`}
              onClick={() => handlePriceChange(option.range[0], option.range[1])}
              className={`text-left ${
                priceRange[0] === option.range[0] && priceRange[1] === option.range[1]
                  ? "text-[#029FAE]"
                  : "text-[#272343]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="badges min-w-[150px] md:min-w-0">
        <h3 className="text-lg font-medium mb-2 text-[#272343]">Product Status</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "All", value: "" },
            { label: "New Arrival", value: "new" },
            { label: "Best Seller", value: "best" },
            { label: "Sale", value: "sale" },
          ].map((badge, index) => (
            <button
              key={`badge-${index}`}
              onClick={() => onBadgeChange(badge.value)}
              className={`text-left ${selectedBadge === badge.value ? "text-[#029FAE]" : "text-[#272343]"}`}
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Filters


import Link from "next/link";
import { client } from "@/sanity/lib/client";

const Categories = async () => {
  const categoriesProduct = await client.fetch(`
    *[_type == "categories"] {
      title,
      "imageUrl": image.asset->url, 
      products // Number of products
    }
  `);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto scrollbar-hide gap-8 mt-10 pl-5 pr-5 snap-x">
            {categoriesProduct.map((cat: any, index: number) => (
              <Link href={`/categories/${cat.title}`} key={index}>
                <div
                  className={`relative flex-shrink-0 cursor-pointer snap-start hover:scale-105 transition-all duration-300 "visible" : ""
                }`}
                  data-title={cat.title}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="rounded-lg hover:contrast-125 object-cover"
                  />
                  <div className="absolute bottom-0 w-full rounded-b-lg py-2 bg-black/70 text-white text-center">
                    <h5 className="text-xl">{cat.title}</h5>
                    <p className="text-white/70 text-sm">
                      {cat.products} Products
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;

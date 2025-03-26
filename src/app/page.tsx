import Categories from "@/app/categories/page";
import Companies from "@/components/Companies";
import ExplorePage from "@/components/ExplorePage";
import FeaturedProduct from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
import OurProduct from "@/components/OurProduct";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const query = `*[_type == "products" ][0..20] {
    "slug": slug.current,
    title,
    price,
    priceWithoutDiscount,
    badge,
    color,
    "imageUrl": image.asset->url,
  }`;

  // const Featuredproducts = await client.fetch(query);
  const result = await client.fetch(query);
  const Featuredproducts = [result[2], result[4], result[5], result[6]].filter(
    Boolean
  );

  const query1 = `*[_type == "products"][0..20]{
    "slug":slug.current,
    title,
    price,
    priceWithoutDiscount,
    badge,
    color,
    "imageUrl": image.asset->url,
    } `;

  const result1 = await client.fetch(query1);
  const Products = [
    result1[2],
    result1[4],
    result1[5],
    result1[6],
    result1[7],
    result1[12],
    result1[13],
    result1[14],
  ].filter(Boolean);

  return (
    <main>
      <div>
        <Hero />
      </div>
      <div>
        <Companies />
      </div>
      <div>
        <FeaturedProduct Featuredproducts={Featuredproducts} />
      </div>
      <div>
        <Categories />
      </div>
      <div>
        <ExplorePage />
      </div>
      <div>
        <OurProduct Products={Products} />
      </div>
    </main>
  );
}

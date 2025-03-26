import AllProduct from '@/components/Products'
import Subscribe from '@/components/Subscribe'
import { client } from '@/sanity/lib/client';
import { Suspense } from 'react';

const Page = async () => {

  const products = await client.fetch(`*[_type == "products"] {
  title,
  "slug" : slug.current,
  price,
  color,
  priceWithoutDiscount,
  badge,
  "imageUrl": image.asset->url,
  category->{
    title
  },
  description,
  inventory,
  tags,
}`)
   
  return (
    <div>
       <Suspense>
       <AllProduct products={products}/>
       </Suspense>
       <Suspense>
       <Subscribe />
       </Suspense>
    </div>
  )
}

export default Page


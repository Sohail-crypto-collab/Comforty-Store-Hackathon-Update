import About from '@/components/About'
import Brand from '@/components/Brand'
import PopularProducts from '@/components/PopularProducts'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <div>
        <Suspense>
        <About />
        </Suspense>
        <Suspense>
        <Brand />
        </Suspense>
        <Suspense>
        <PopularProducts />
        </Suspense>
    </div>
  )
}

export default Page
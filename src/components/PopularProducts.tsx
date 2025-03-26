import React from 'react'

const PopularProducts = () => {
  return (
    <div className='lg:mx-20 sm:mx-10 mx-3 mt-3 lg:mt-10'>
    <h2 className='text-[#272343] text-2xl lg:text-[32px] font-semibold my-10'>Our Popular Products</h2>

    <div className="images flex sm:flex-row flex-col justify-center gap-6 mb-20">
    {/* Left */}
    <div className="left sm:w-[40%]">
    <img src="/sofa2.png" alt="sofa" className='xl:h-[380px]' />
    <div className='md:space-y-1  text-[#2A254B]  text-base lg:text-[20px]'>
        <p>The Poplar suede sofa</p>
        <p>$99.00</p>
    </div>
    </div>
    {/* Right */}
    <div className='ri8 sm:w-1/2 flex gap-5'>
    {/* 1st Pic */}
    <div className="sm:w-[50%]">
     <img src="/dandy.png" alt="chair" className='w-[300px]'/>
    <div className='space-y-1  text-[#2A254B] text-sm sm:text-base lg:text-[20px] mt-2 sm:mt-5'>
        <p>The Dandy chair</p>
        <p>$99.00</p>
    </div>
    </div>
      {/* 2nd pic */}
      <div className="sm:w-1/2">
      <img src="/dandy2.png" alt="chair" />
      <div className='space-y-1  text-[#2A254B] text-sm sm:text-base lg:text-[20px] mt-2 sm:mt-5'>
        <p>The Dandy chair</p>
        <p>$99.00</p>
      </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default PopularProducts
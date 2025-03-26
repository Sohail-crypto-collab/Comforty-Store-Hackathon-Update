import React from 'react'

const About = () => {
  return (
    <div className='lg:mx-20 sm:mx-10 mx-3  lg:my-20 flex md:flex-row justify-center items-center flex-col-reverse  gap-5 '>
        <div className='bg-[#007580] lg:px-16 px-6 text-white md:w-1/2 py-8 xl:py-[3.75rem]'>
           <h2 className='font-bold text-2xl  lg:text-[32px]'>About Us - Comforty</h2>
           <p className='md:text-[18px] text-sm font-light lg:leading-[21.78px] mt-3 lg:mt-4'>At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality. </p>
           <button className='xl:mt-28 md:mt-5 mt-10 lg:px-10 px-5 text-sm lg:text-[16px] md:py-5 py-3 bg-white/15'>View Collection</button>
        </div>
        <div className='md:w-1/2 mt-6 md:mt-0'>
            <img src="/about-img.png" alt="product" className='md:w-[620px] w-[400px] mx-auto' />
        </div>
    </div>
  )
}

export default About
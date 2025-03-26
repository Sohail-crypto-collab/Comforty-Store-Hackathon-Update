import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const cards = [
    {
        img : '/Delivery.png',
        title : 'Next day as standard',
        desc : 'Order before 3pm and get your order the next day as standard'
    },{
        img : '/Checkmark--outline.png',
        title : 'Made by true artisans',
        desc : 'Handmade crafted goods made with real passion and craftmanship'
    },{
        img : '/purcahse.png',
        title : 'Unbeatable prices',
        desc : 'For our materials and quality you won’t find better prices anywhere'
    },{
        img : '/plant.png',
        title : 'Recycled packaging',
        desc : 'We use 100% recycled to ensure our footprint is more manageable'
    }
]

const Brand = () => {
  return (
    <div className='lg:mx-20 sm:mx-10 mx-3 mb-8 lg:mb-16'>
        <h2 className='text-[#272343] text-[32px] font-semibold text-center my-10'>What Makes Our Brand Different</h2>
        <div className='flex flex-wrap lg:flex-nowrap justify-center gap-3 md:gap-5 xl:gap-8'>
            {cards.map((card)=>{
                return(
                <div key={card.title} className='xl:w-[450px] lg:w-[350px] w-[150px] sm:w-[300px] lg:py-10 py-5 lg:px-8 sm:px-5 px-2 bg-[#F9F9F9] text-[#007580]'>
                 <img src={card.img} alt={card.title} />
                 <div className="title">
                    <h6 className='lg:my-4 my-2 text-[#007580] text-base lg:text-[20px]'>{card.title}</h6>
                    <p className='lg:text-base text-sm'>{card.desc}</p>
                 </div>
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default Brand
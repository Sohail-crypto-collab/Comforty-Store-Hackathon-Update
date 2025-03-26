import { IoLocationSharp } from "react-icons/io5";
import { HiPhone } from "react-icons/hi2";
import { FaClock } from "react-icons/fa6";


const Promotion = [{
  img : '/trophy 1.png',
  title : 'High Quality',
  desc : 'crafted from top material'
},{
  img : '/guarantee.png',
  title : 'Warranty Protection',
  desc : 'Over 2 Years'
},{
  img : '/customer-support.png',
  title : '24 / 7 Support',
  desc : 'Dedicated Support'
}
]


const Page = () => {
  return (
    <div >
        <div className="lg:mx-20 sm:mx-10 mx-3 mb-14 mt-10">
        <div className="title mx-auto max-w-[620px] ">
          <h2 className="lg:text-[36px] text-2xl mb-2 text-black text-center font-semibold">Get in Touch With Us</h2>
          <p className="tracking-wide text-[#9F9F9F] md:text-base text-sm text-center">For more information about our product & services. Please Feel Free to drop us an email. Our staff always be there to help you out. Do not hesitate.!</p>
        </div>
        <div className="flex md:flex-row  flex-col xl:px-20 ">
          {/* Contact Div */}
         <div className="contact space-y-5 lg:mt-24 md:mt-14  mt-5 md:px-12 px-8 md:w-1/2">
          {/* Address */}
           <div className="address flex gap-3">
            <IoLocationSharp className="md:size-10 size-8 "/>
            <div className="md:w-[240px] text-sm md:text-base w-[300px]">
              <h4 className="font-medium text-lg lg:text-[24px]">Address</h4>
              <p>236 5th SE Avenue, New York NY10000, United Stated</p>
            </div>
            </div>
            {/* Phone */}
            <div className="number flex gap-3">
              <HiPhone className="md:size-10 size-8"/>
              <div className="md:w-[240px] text-sm md:text-base w-[300px]">
                <h4 className="font-medium text-lg lg:text-[24px]">Phone</h4>
                <p>Mobile : +(84) 546-6789</p>
                <p>Hotline : +(84) 456-6789</p>
              </div>
            </div>
            {/* Working Time */}
            <div className="time flex gap-3">
              <FaClock className="md:size-10 size-8"/>
              <div className="md:w-[240px] text-sm md:text-base w-[300px]">
                <h4 className="font-medium text-lg lg:text-[24px]">Working Time</h4>
                <p>Monday - Friday : 9:00 - 22:00</p>
                <p>Saturday - Sunday : 9:00 - 21:00</p>
              </div>
            </div>
         </div>
         {/* Form Div */}
         <form action="" className="md:w-1/2 md:space-y-3 space-y-1  mt-14 lg:px-12 flex flex-col gap-3">

          <label htmlFor="name" className="flex flex-col gap-2 md:gap-3">
            <p className="text-[16px] font-medium">Your Name</p>
            <input type="text" name="name" id="name" placeholder="Fiza" className="md:px-4 px-2 py-2 md:py-5 rounded-xl border outline-none border-[#9F9F9F] " />
          </label>
         
          <label htmlFor="email" className="flex flex-col gap-2 md:gap-3">
            <p className="text-[16px] font-medium">Email Address</p>
            <input type="text" name="email" id="email" placeholder="fiza@gmail.com" className="md:px-4 px-2 py-2 md:py-5 rounded-xl border outline-none border-[#9F9F9F] " />
          </label>
         
         <label htmlFor="Subject" className="flex flex-col gap-2 md:gap-3">
          <p className="text-[16px] font-medium">Subject</p>
            <input type="text" name="Subject" id="Subject" placeholder="This is an optional" className="md:px-4 px-2 py-2 md:py-5 rounded-xl border outline-none border-[#9F9F9F] " />
          </label>
        
          <label htmlFor="msg" className="flex flex-col ggap-2 md:gap-3">
            <p className="text-[16px] font-medium">Message</p>
            <textarea  name="msg" rows={5} cols={10} id="msg" placeholder="Hi! I'd like to ask about" className="md:px-4 px-2 py-2 md:py-5 rounded-xl border outline-none border-[#9F9F9F] " />
          </label>
        <button className="mt-3 w-fit lg:px-20 lg:py-3 px-8 py-2 mx-auto  bg-[#029FAE] text-white rounded-lg">
          Submit
        </button>
         </form>
        </div>
        </div>

        <div className="lg:mx-20 sm:mx-10 mx-3  mb-14 mt-10 bg-[#F4F4F4] flex sm:flex-row flex-col items-center px-5 sm:gap-0 gap-5 text-[#242424] py-10 lg:py-20 sm:justify-around">
          {Promotion.map((card)=>{
            return(
              <div key={card.title} className="flex  gap-2 items-center">
                <div className="img">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="head flex flex-col justify-center">
                  <h6 className="font-semibold text-lg lg:text-[25px]">{card.title}</h6>
                  <p className="font-medium lg:text-base text-sm text-[#898989]">{card.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

    </div>
  )
}

export default Page
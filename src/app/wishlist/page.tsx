"use client";

import { useWishlist } from "@/app/context/WhishlistContext"; // Update the path as needed
import { IoTrashOutline } from "react-icons/io5";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist(); // Access wishlist state and actions
  console.log("Wishlist Items:", wishlist); // Debugging


  return (
    <div className="lg:mx-20 sm:mx-10 mx-7 mb-10">
      <div className="flex flex-col">
        {/* Wishlist Heading */}
        <div className="mt-7">
          <h4 className="md:text-2xl text-xl text-[#111111] font-medium mb-4">Wishlist</h4>
        </div>

        {/* Wishlist Items */}
        <div className="flex flex-col">
        {wishlist.length > 0 ? (
  wishlist.map((item) => (
    <div key={item.id} className="flex sm:flex-row gap-3 items-center flex-col py-5 border-b">
      <img src={item.imageUrl} alt={item.title} className="sm:w-[150px] sm:h-[150px] max-w-[300px] max-h-[300px]" />
      <div className="flex flex-col sm:flex-row justify-between w-full items-center">
        <div>
          <h6 className="text-[#272343] text-base">{item.title}</h6>
          <p className="text-[#757575] text-[14px] tracking-wide mt-2">MRP: ${item.price}</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <button onClick={() => removeFromWishlist(item.id)}  className="flex items-center gap-2 text-[#272343] hover:text-red-600 ">
            <IoTrashOutline className="size-7 text-xl hover:scale-110 transition-transform" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="text-center text-[#757575] mt-5">Your wishlist is empty. Add items to see them here.</p>
)}

        </div>
      </div>
    </div>
  );
};

export default WishlistPage;

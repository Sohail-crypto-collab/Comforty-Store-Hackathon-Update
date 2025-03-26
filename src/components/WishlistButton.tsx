"use client"
import Link from "next/link"
import { BsHeart } from "react-icons/bs"
import { useWishlist } from "@/app/context/WhishlistContext";
import React from "react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WishlistButton = () => {
  const { wishlist } = useWishlist() // Access wishlist state

  return (

    <div className="relative">
      <Link
      href="/wishlist"
      className="wishlist"
    >
      <button className="p-2 rounded-full hover:bg-gray-100">
        <Heart size={20}className={` ${wishlist.length > 0 ? 'text-gray-900' : 'text-gray-900'}`} />
        {wishlist.length > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-teal-500 text-white text-xs">
            {wishlist.length}
          </Badge>
        )}
      </button>
      </Link>
    </div>






    
  )
}

export default WishlistButton;
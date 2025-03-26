"use client"
import React, { useEffect, useState } from "react";
import { useWishlist } from "@/app/context/WhishlistContext"; // Replace with your actual context
import { CiHeart } from "react-icons/ci";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
}

const WishlistIcon = ({ product }: { product: Product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id); // Use `id` directly from `product`

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product); // Pass the entire product object
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      className="text-xl hover:scale-110 transition-transform"
    >
      {isWishlisted ? (
        <AiFillHeart
          className="heart-animation size-8"
          style={{ fill: "#029FAE" }}
        />
      ) : (
        <AiOutlineHeart className="text-gray-500 transition-all duration-300 size-8" />
      )}
    </button>
  );
};


export default WishlistIcon;
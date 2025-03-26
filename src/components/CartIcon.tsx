"use client";
import { BsCartDash } from "react-icons/bs";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <div className="relative">
      <Link href="/cart" className="cart">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-teal-500 text-white text-xs">
              {totalItems}{" "}
            </Badge>
          )}
        </button>
      </Link>
    </div>
  );
};

export default CartIcon;

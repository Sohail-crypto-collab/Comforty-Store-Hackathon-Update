import React from "react";
import Link from "next/link";
import { Armchair } from 'lucide-react';;

const CartLogo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <div>
      <Armchair size={30} className="bg-teal-500 text-white rounded-md p-1"/>
      </div>
      <span className="font-bold text-xl text-gray-600 tracking-wide">
        COMFORTY
      </span>
    </Link>
  );
};

export default CartLogo;

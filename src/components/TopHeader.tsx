import React from "react";
import Link from "next/link";

const TopHeader = () => {
  return (
    <section className="w-full bg-teal-500 text-white py-6 sm:py-3">
      <div className="max-w-[1100px] mx-auto px-2 flex flex-col items-center">
        <div className="">
          <p className=" text-white font-semibold text-base">
            Summer Sale Free Express Delivery
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;

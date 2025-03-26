import React from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartLogo from "./CartLogo";
import MagneticNavbar from "./MagneticNavbar";
import CartIcon from "./CartIcon";
import WishlistButton from "./WishlistButton";
import CartDesktopClerk from "./CartDesktopClerk";
import CartMobile from "./CartMobile";

const CartHeader = () => {
  return (
    <section className="bg-[#F0F2F3] py-2 sm:py-3 px-3 sm:px-8 xl:px-20">
      <main className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <CartMobile />
          </div>
          <CartLogo />
        </div>
        
        <div className="hidden lg:block">
          <MagneticNavbar />
        </div>

        <div className="flex items-center gap-2">
          <CartIcon />
          <WishlistButton />
          <div className="hidden md:block lg:block ">
            <CartDesktopClerk />
          </div>
        </div>
      </main>
    </section>
  );
};

export default CartHeader;
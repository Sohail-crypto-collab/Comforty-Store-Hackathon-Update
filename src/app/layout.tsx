import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import CartHeader from "@/components/CartHeader";

import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "@/app/context/CartContext";
import { WishlistProvider } from "./context/WhishlistContext";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const poppins = Poppins({
  weight: ["100", "300", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comforty Marketplace",
  description: "Created By Sohail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} mx-auto max-w-[1440px]`}>
          <CartProvider>
            <WishlistProvider>
              <TopHeader />
              <CartHeader />
              <div className="">{children}</div>
              <br />
              <Footer />
            </WishlistProvider>
          </CartProvider>

          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}

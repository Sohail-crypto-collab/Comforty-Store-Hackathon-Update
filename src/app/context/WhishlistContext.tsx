"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

interface WishlistItem {
  slug :string;
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface WishlistContextProps {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Initialize wishlist from cookies after component is hydrated
  useEffect(() => {
    const storedWishlist = Cookies.get("wishlist")
      ? JSON.parse(Cookies.get("wishlist")!)
      : [];
    setWishlist(storedWishlist);
  }, []);
  
  

  // Add to wishlist
  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      const isAlreadyInWishlist = prev.some((item) => item.id === product.id); // Compare consistently
      if (isAlreadyInWishlist) {
        console.log("Item already in wishlist:", product.id); // Debugging log
        return prev; // No duplicate addition
      }
      const updatedWishlist = [...prev, product];
      Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
      return updatedWishlist;
    });
    console.log("Adding to wishlist:", product.id); 
   
     toast.success(`${product.title} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 3000,
      }); 
  };  
 
  
  
// Remove from wishlist
const removeFromWishlist = (id: string) => {
  const itemToRemove = wishlist.find((item) => item.id === id); // Assuming `wishlist` is available in scope
  if (itemToRemove) {
    // toast.dismiss(); // Clear any existing toasts to prevent duplicates
    toast.error(`${itemToRemove.title} removed from wishlist!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  }

  const updatedWishlist = wishlist.filter((item) => item.id !== id);
  setWishlist(updatedWishlist);
  Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
  console.log("Removing from wishlist:", itemToRemove?.title);
};


const isInWishlist = (slug: string): boolean => {
  return wishlist.some(item => item.id === slug); // Check if product with slug exists
};


// Clear wishlist
const clearWishlist = () => {
  toast.dismiss(); // Clear any existing toasts to prevent duplicates
  if (wishlist.length > 0) {
    toast.error("All items have been removed from your wishlist!", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
    });
    setWishlist([]); // Clear the state
    Cookies.remove("wishlist"); // Remove wishlist from cookies
  } else {
    toast.info("Your wishlist is already empty.", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
};


  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist , isInWishlist}}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};

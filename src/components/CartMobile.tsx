"use client";

import { useState } from "react";
import { Menu, Plus, Phone, Mail, ListOrdered } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  UserButton,
  ClerkLoaded,
  useUser,
} from "@clerk/nextjs";

const MobileMenu = () => {
  const { user } = useUser();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    if (expandedItems.includes(name)) {
      setExpandedItems(expandedItems.filter((item) => item !== name));
    } else {
      setExpandedItems([...expandedItems, name]);
    }
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/",
      expandable: true,
      subItems: [
        { name: "Wing Chair", path: "/categories/Wing%20Chair" },
        { name: "Wooden Chair", path: "/categories/Wooden%20Chair" },
        { name: "Desk Chair", path: "/categories/Desk%20Chair" },
      ],
    },
    {
      name: "Product",
      path: "/products",
      sale: true,
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded-full">
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left font-bold">MENU</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto text-white">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <div key={item.name} className="border-b">
                  <div className="flex items-center justify-between py-3 px-4">
                    <Link href={item.path} className="flex-grow">
                      {item.name}
                      {item.sale && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                          Sale
                        </span>
                      )}
                    </Link>
                    {item.expandable && (
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className="p-1"
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                  {item.expandable && expandedItems.includes(item.name) && (
                    <div className="pl-8 pb-2">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className="block py-2"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="p-4 flex flex-col gap-3">
              <ClerkLoaded>
                <SignedIn>
                  {/* User account section with profile and name */}
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-sm font-medium">
                        {user?.fullName || user?.username || "My Account"}
                      </span>
                    </div>
                    <Link href={"/orders"} className="group relative">
                      <ListOrdered className="w-6 h-6 group-hover:text-teal-500 transition-colors" />
                      <span className="rounded-full absolute -top-2 -right-2 bg-teal-500 p-[1px] px-[6px] font-sans text-white text-xs align-middle">
                        0
                      </span>
                    </Link>
                  </div>
                </SignedIn>

                {!user && (
                  <div className="py-1">
                    <SignInButton mode="modal">
                      <button className="flex items-center gap-1 text-sm hover:text-teal-500 transition duration-300">
                        Login / Register
                      </button>
                    </SignInButton>
                  </div>
                )}
              </ClerkLoaded>

              <p className="text-sm py-1">Need help?</p>
              <Link
                href="tel:03312661672"
                className="flex items-center gap-2 text-sm py-1"
              >
                <Phone size={16} />
                <span>0331-2661672</span>
              </Link>
              <Link
                href="mailto:info@studentstore.pk"
                className="flex items-center gap-2 text-sm py-1"
              >
                <Mail size={16} />
                <span>info@comfortystore.pk</span>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

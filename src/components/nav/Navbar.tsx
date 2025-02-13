"use client";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Menu, User, Search } from "lucide-react";
// import { useCartStore } from "@/store/useCartStore"; // Assuming Zustand is used

const Navbar: NextPage = () => {
  const pathname = usePathname();
  const cartItems = ["item 1", "item 2"];

  return (
    <header className="w-full bg-white shadow-sm sticky">
      <div className="flex flex-row items-center gap-[20px] w-full justify-between py-4 px-4 sm:px-24">
        {/* Mobile Menu */}

        <div className="flex items-center gap-[10px]">
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/products" className="text-lg font-medium">
                  Shop
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/">
            <Image
              src="/sheerpeace.svg"
              height={50}
              width={150}
              alt="Sheer Peace Logo"
              className="w-[100px]"
            />
          </Link>
        </div>

        <div className="relative hidden md:flex flex-grow items-center justify-end">
          <div className="flex flex-row items-center gap-[5px] w-[80%] rounded-full border pl-4 border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <Search />
            <Input
              type="text"
              placeholder="Search products..."
              className="text-sm outline-none border-none ring-transparent focus-visible:ring-transparent shadow-none"
            />
          </div>
        </div>
        {/* Right Section: Search, Cart, User */}
        <div className="flex flex-row items-center gap-[20px]">
          {/* Search Bar */}
          <Link href="/cart" className="relative sm:hidden block">
            <div className="flex flex-row gap-[10px] items-center text-gray-800 hover:text-blue-600">
              <Search className="h-6 w-6" />
            </div>
          </Link>
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <div className="flex flex-row gap-[10px] items-center text-gray-800 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {/* {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems}
              </span>
            )} */}
              <p className="text-sm hidden sm:block">Cart</p>
            </div>
          </Link>

          {/* User Profile */}
          <Sheet>
            <SheetTrigger className="flex flex-row gap-[10px] items-center text-gray-800 hover:text-blue-600">
              <User className="h-6 w-6" />
              <p className="text-sm hidden sm:block">Account</p>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="p-4">
                <Link
                  href="/account"
                  className="block text-lg font-medium hover:text-blue-600"
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  className="block mt-3 text-lg font-medium hover:text-blue-600"
                >
                  Orders
                </Link>
                <Button className="w-full mt-5">Log out</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

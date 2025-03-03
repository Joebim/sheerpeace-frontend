"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import useUserStore from "@/store/user.store";
import { UserDropdownMenu } from "../home/UserdropdownMenu";
import {
  Bell,
  ChevronDown,
  DollarSign,
  Languages,
  Search,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NotificationDropdown } from "../home/NotificationDropdown";
import useNotificationStore from "@/store/notification.store";
import Image from "next/image";

// interface Notification {
//   id: string;
//   heading: string;
//   message: string;
//   type: "warning" | "info" | "success" | "error";
//   isRead: boolean;
// }

const ALLOWED_SEARCH_ROUTES = ["/shoppers/:id"];

const ShoppersNav: React.FC = () => {
  const { cart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const { notifications } = useNotificationStore();

  const showSearch = ALLOWED_SEARCH_ROUTES.includes(pathname);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <nav className="bg-sheerpeace-purple-secondary text-[13px] py-[10px] gap-[15px] w-full text-white px-6 sm:px-12 flex flex-col items-center z-[1000] shadow-md">
      <div className="w-full">
        <div className="flex w-full items-center justify-between relative">
          <div>
            <Link href="/">
              <Image
                src="/sheerpeace-white.svg"
                height={50}
                width={150}
                alt="Sheer Peace Logo"
                className="w-[100px]"
              />
            </Link>
          </div>
          {/* Search Bar (Desktop) */}
          <div className="md-[200px] lg:w-[600px] relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
            <Search className="cursor-pointer text-sheerpeace-purple" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sheerpeace-black"
            />
          </div>
          {/* Right Section - Actions */}
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <NotificationDropdown>
                <div>
                  <Bell className="cursor-pointer text-white hover:text-gray-200" />
                  {notifications.some((notif) => !notif.is_read) && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}
                </div>
              </NotificationDropdown>
            </div>

            {/* Shopping Cart */}
            <div className="relative">
              <Link href="/shoppers/cart">
                <ShoppingBag className="cursor-pointer text-white hover:text-gray-200" />
                {(cart?.items?.length ?? 0) > 0 && (
                  <span className="absolute top-0 right-0 bg-purple-600 rounded-full h-[10px] w-[10px]"></span>
                )}
              </Link>
            </div>

            {/* User Account */}
            <UserDropdownMenu>
              <div className="group cursor-pointer flex items-center gap-2">
                <Image
                  src="/images/user.svg"
                  height={50}
                  width={150}
                  alt="Sheer Peace Logo"
                  className="w-[30px] text-white group-hover:text-gray-200"
                />
                <p className="hidden md:block text-white font-medium group-hover:text-gray-200">
                  {isAuthenticated ? `Hi, ${user?.first_name}` : "Account"}
                </p>
                <ChevronDown className="hidden md:block text-white" />
              </div>
            </UserDropdownMenu>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex w-full items-center justify-between relative">
          {/* Left Section - Logo */}

          <div className="py-[5px] px-[20px] rounded-[5px] bg-sheerpeace-yellow text-sheerpeace-black">
            ALL CATEGORIES
          </div>

          {/* Center Section - Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li>
              <Link href="/shop" className="hover:text-gray">
                Home
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-gray-200">
                Features
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-200">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-200">
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-200">
                Blog
              </Link>
            </li>
          </ul>

          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li>
              <Link
                href="/about"
                className="hover:text-gray-200 flex flex-row items-center gap-[8px]"
              >
                <Image
                  src="/images/delivery.svg"
                  height={50}
                  width={150}
                  alt="delivery"
                  className="w-[25px]"
                />
                <span>Track Your Order</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-200 flex flex-row items-center gap-[8px]"
              >
                <Image
                  src="/images/support.svg"
                  height={50}
                  width={150}
                  alt="delivery"
                  className="w-[20px]"
                />
                <span>Support (+123) 345 7477</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-200 flex flex-row items-center gap-[8px]"
              >
                <Languages className="text-white w-[19px]" />
                <span>English</span>
                <ChevronDown />
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-200 flex flex-row items-center gap-[8px]"
              >
                <DollarSign className="text-white w-[19px]" />
                <span>US Dollar</span>
                <ChevronDown />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar (Mobile) */}
      {showSearch && (
        <div className="w-full flex sm:hidden items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <Search className="text-white" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white"
          />
        </div>
      )}
    </nav>
  );
};

export default ShoppersNav;

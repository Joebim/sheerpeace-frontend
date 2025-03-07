"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import useUserStore from "@/store/user.store";
import { UserDropdownMenu } from "../home/UserdropdownMenu";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  DollarSign,
  Languages,
  Menu,
  Search,
  ShoppingBag,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NotificationDropdown } from "../home/NotificationDropdown";
import useNotificationStore from "@/store/notification.store";
import SheerpeaceWordmark from "../../../public/sheerpeace-word-mark.svg";
import SheerpeaceLogo from "../../../public/sheerpeace-logo.svg";
import Delivery from "../../../public/images/delivery.svg";
import Support from "../../../public/images/support.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { NavigationMenu as NavigationMenuCopy } from "../ui/navigation-menu copy";

import { cn } from "@/lib/utils";
import CategorySelection from "./CategorySelection";
import useFetch from "@/hooks/useFetch";
import { Category } from "@/types";
import UserSideBar from "./UserSideBar";

const ALLOWED_SEARCH_ROUTES = ["/"];

const UserNav: React.FC = () => {
  const { cart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const { notifications } = useNotificationStore();

  const showSearch = ALLOWED_SEARCH_ROUTES.includes(pathname);

  const { data: categories, loading } = useFetch<Category[]>("/categories");

  return (
    <>
      <nav className="bg-sheerpeace-purple text-[13px] py-[10px] gap-[15px] w-full text-sheerpeace-purple-secondary px-6 sm:px-12 flex flex-col items-center z-[1000] duration-300">
        <div className="w-full">
          <div className="flex w-full items-center justify-between relative">
            <div>
              <Link href="/">
                <div className="flex flex-row items-center">
                  <SheerpeaceLogo className="w-[25px]" />
                  <SheerpeaceWordmark className="fill-sheerpeace-purple-secondary scale-75" />
                </div>
              </Link>
            </div>
            {/* Search Bar (Desktop) */}
            <div className="md-[300px] lg:w-[600px] relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white">
              <Search className="cursor-pointer text-[#e5b4ff]" />
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
                    <Bell className="cursor-pointer text-sheerpeace-green hover:text-black" />
                    {notifications.some((notif) => !notif.is_read) && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                </NotificationDropdown>
              </div>

              {/* Shopping Cart */}
              <div className="relative">
                <Link href="/shoppers/cart">
                  <ShoppingBag className="cursor-pointer text-sheerpeace-green hover:text-black" />
                  {(cart?.items?.length ?? 0) > 0 && (
                    <span className="absolute top-0 right-0 bg-purple-600 rounded-full h-[10px] w-[10px]"></span>
                  )}
                </Link>
              </div>

              {/* User Account */}
              <UserDropdownMenu>
                <div className="group cursor-pointer flex items-center gap-2">
                  <CircleUserRound className=" stroke-sheerpeace-green w-[25px]" />
                  <p className="hidden md:block text-sheerpeace-purple-secondary font-medium group-hover:text-black">
                    {isAuthenticated ? `Hi, ${user?.first_name}` : "Account"}
                  </p>
                  <ChevronDown className="hidden md:block text-sheerpeace-purple-secondary" />
                </div>
              </UserDropdownMenu>
            </div>
          </div>
        </div>

        <div className="w-full hidden sm:block">
          <div className="flex w-full items-center justify-between relative">
            {/* Center Section - Navigation Links */}
            <NavigationMenuCopy>
              <NavigationMenuList className="flex flex-row justify-between items-center gap-6 rounded-[15px]">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full bg-sheerpeace-green text-white">
                    ALL CATEGORIES
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="h-full">
                    <CategorySelection
                      categories={categories ?? []}
                      loading={loading}
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenuCopy>

            <div className="md:hidden xl:block hidden">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center">
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/docs"
                        className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent hover:text-black px-[10px]`}
                      >
                        Home
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/about"
                        className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent hover:text-black px-[10px]`}
                      >
                        Collections
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/about"
                        className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent hover:text-black px-[10px]`}
                      >
                        Accessories
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/about"
                        className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-transparent hover:text-black px-[10px]`}
                      >
                        Blog
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </div>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <NavigationMenu>
              <NavigationMenuList className="flex flex-row items-center">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className={`${navigationMenuTriggerStyle()} gap-[2px] bg-transparent hover:bg-transparent hover:text-black px-[10px]`}
                  >
                    <Delivery className="w-[25px] fill-sheerpeace-green" />

                    <span>Track Your Order</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/about"
                    className={`${navigationMenuTriggerStyle()} gap-[8px] bg-transparent hover:bg-transparent hover:text-black px-[10px]`}
                  >
                    <Support className="w-[20px] fill-sheerpeace-green" />

                    <span>Support (+123) 345 7477</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList className="flex flex-row items-center">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-[8px] bg-transparent hover:bg-transparent hover:text-black px-[7px]">
                    <Languages className="text-sheerpeace-green w-[19px]" />

                    <span>English</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[200px] lg:w-[300px]">
                      <ListItem href="#" title="English">
                        Select English as your language.
                      </ListItem>
                      <ListItem href="#" title="Spanish">
                        Selecciona Español como tu idioma.
                      </ListItem>
                      <ListItem href="#" title="French">
                        Sélectionnez le français comme langue.
                      </ListItem>
                      <ListItem href="#" title="German">
                        Wählen Sie Deutsch als Ihre Sprache.
                      </ListItem>
                      <ListItem href="#" title="Chinese">
                        选择中文作为您的语言。
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-[8px] bg-transparent hover:bg-transparent hover:text-black px-[7px]">
                    <DollarSign className="text-sheerpeace-green w-[19px]" />
                    <span className="hidden lg:block">US Dollars</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[200px] lg:w-[300px]">
                      <ListItem href="#" title="US Dollars">
                        Select US Dollars as your currency.
                      </ListItem>
                      <ListItem href="#" title="Euro">
                        Select Euro as your currency.
                      </ListItem>
                      <ListItem href="#" title="British Pound">
                        Select British Pound as your currency.
                      </ListItem>
                      <ListItem href="#" title="Japanese Yen">
                        Select Japanese Yen as your currency.
                      </ListItem>
                      <ListItem href="#" title="Australian Dollar">
                        Select Australian Dollar as your currency.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="sm:hidden flex items-center justify-between w-full gap-[20px]">
          <UserSideBar categories={categories ?? []}>
            <Menu />
          </UserSideBar>{" "}
          {/* Search Bar (Mobile) */}
          {showSearch && (
            <div className="w-full flex sm:hidden items-center gap-2 px-4 py-2 bg-white rounded-full">
              <Search className="cursor-pointer text-[#e5b4ff]" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sheerpeace-black"
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default UserNav;

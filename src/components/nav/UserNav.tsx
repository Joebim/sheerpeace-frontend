"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import useUserStore from "@/store/user.store";
import { UserDropdownMenu } from "../home/UserdropdownMenu";
import {
  ArrowUpLeft,
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
import useHandleSearch from "@/hooks/useHandleSearch";

import { NavigationMenu as NavigationMenuCopy } from "../ui/navigation-menu copy";

import { cn } from "@/lib/utils";
import CategorySelection from "./CategorySelection";
import UserSideBar from "./UserSideBar";
import { useUser } from "@/hooks/useJwt";

import { match } from "path-to-regexp"; // Install with: npm install path-to-regexp
import { useCategoryStore } from "@/store/category.store";
import { useSubCategoryStore } from "@/store/subCategory.store";
import useClickOutside from "@/hooks/useClickOutside";
import { useSearchStore } from "@/store/search.store";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { SearchSuggestion } from "@/types";

const ALLOWED_SEARCH_ROUTES = ["/", "/products/:id", "/search"];

const UserNav: React.FC = () => {
  const { cart } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const { notifications } = useNotificationStore();

  const userDetails = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { handleSearch, handleSearchSubmit } = useHandleSearch();

  const searchRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const suggestionRef = useRef<HTMLUListElement>(
    null as unknown as HTMLUListElement
  );
  const { term, suggestions, setTerm, fetchSuggestions } = useSearchStore();

  useClickOutside({
    refs: [searchRef, suggestionRef],
    callback: () => setShowSuggestions(false),
  });

  const isAllowedRoute = (pathname: string) => {
    return ALLOWED_SEARCH_ROUTES.some((route) => {
      const matchRoute = match(route, { decode: decodeURIComponent });
      return matchRoute(pathname);
    });
  };

  const showSearch = isAllowedRoute(pathname);

  const { categories, loading, fetchCategories } = useCategoryStore();
  const {
    subcategories,
    loading: subcategoryLoading,
    fetchSubCategories,
  } = useSubCategoryStore();

  useEffect(() => {
    if (!categories.length) {
      fetchCategories();
    }
    if (!subcategories.length) {
      fetchSubCategories();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!suggestions.length) {
      fetchSuggestions();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch search suggestions when user types
  const { data: dynamicSuggestions, isLoading } = useSearchSuggestions(
    term ?? searchTerm
  );

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setTerm(value);
    setShowSuggestions(value.trim().length > 0);
  };

  return (
    <>
      <nav className="sticky top-0 bg-sheerpeace-purple text-[13px] py-[10px] gap-[15px] w-full text-sheerpeace-purple-secondary px-6 sm:px-12 flex flex-col items-center z-[40] duration-300">
        <div className="w-full">
          <div className="flex w-full items-center justify-between relative gap-[20px]">
            <div>
              <Link href="/">
                <div className="flex flex-row items-center">
                  <SheerpeaceLogo className="w-[25px]" />
                  <SheerpeaceWordmark className="fill-sheerpeace-purple-secondary scale-75" />
                </div>
              </Link>
            </div>
            {/* Search Bar (Desktop) */}
            <div className="relative w-[60%] hidden sm:flex items-center">
              <div className="w-full relative flex items-center gap-2 pl-5 pr-[0.3rem] py-[0.3rem] rounded-full bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-sheerpeace-black w-full"
                  value={term}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleSearchSubmit(e, searchTerm)}
                />
                <div
                  className="cursor-pointer px-[15px] py-[1.5px] bg-sheerpeace-purple-secondary rounded-full"
                  onClick={() => handleSearch(term, "name")}
                >
                  <Search className="text-sheerpeace-purple w-[15px]" />
                </div>
              </div>

              {showSuggestions && (
                <div
                  ref={searchRef}
                  className="absolute top-[100%] left-0 w-full bg-white rounded-xl shadow-md mt-2 z-50  overflow-hidden"
                >
                  {isLoading && (
                    <p className="px-4 py-2 text-gray-500">Loading...</p>
                  )}
                  {showSuggestions && (dynamicSuggestions?.length ?? 0) > 0 ? (
                    <ul ref={suggestionRef} className="w-full">
                      {dynamicSuggestions?.map(
                        (suggestion: SearchSuggestion, index: number) => (
                          <li
                            key={index}
                            className="p-2 px-[15px] flex flex-row justify-between hover:bg-gray-100 cursor-pointer items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSearch(suggestion.query, "name");
                            }}
                          >
                            <span className="flex flex-row gap-[5px] items-center">
                              <Search className="w-[13px]" />
                              <span>{suggestion.query}</span>
                            </span>
                            <ArrowUpLeft className="w-[15px]" />
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <div
                      className="flex flex-col gap-[10px] p-[20px] "
                      ref={searchRef}
                    >
                      <span className="text-[14px] font-bold">
                        Trending Searches
                      </span>
                      <div className="flex-wrap flex gap-2">
                        {suggestions?.map((item, index) => (
                          <div
                            key={index}
                            className="py-[4px] px-[10px] flex flex-row gap-[5px] border border-solid border-sheerpeace-black rounded-full text-sheerpeace-black items-center text-[13px] hover:bg-sheerpeace-purple duration-150 cursor-pointer  "
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSearch(item.query, "name");
                            }}
                          >
                            <Search className="w-[13px]" />
                            <span>{item.query}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-6 justify-end md:w-[60%] lg:w-[40%] xl:w-[30%]">
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
                  <Link href="/cart">
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
                      {isAuthenticated
                        ? `Hi, ${userDetails?.user.first_name}`
                        : "Account"}
                    </p>
                    <ChevronDown className="hidden md:block text-sheerpeace-purple-secondary" />
                  </div>
                </UserDropdownMenu>
              </div>
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
                      subcategories={subcategories ?? []}
                      subcategoryLoading={subcategoryLoading}
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
            <div className="relative w-full flex sm:hidden items-center gap-2 pl-5 pr-[0.3rem] py-[0.3rem] bg-white rounded-full">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sheerpeace-black w-full"
                value={term}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(e) => handleSearchSubmit(e, searchTerm)}
              />
              <div
                className="cursor-pointer px-[15px] py-[1.5px] bg-sheerpeace-purple-secondary rounded-full"
                onClick={() => handleSearch(term, "name")}
              >
                <Search className="text-sheerpeace-purple w-[15px]" />
              </div>
            </div>
          )}
          {showSuggestions && (
            <div
              ref={searchRef}
              className="absolute top-[100%] left-0 w-full bg-white rounded-xl shadow-md mt-2 z-50  overflow-hidden"
            >
              {isLoading && (
                <p className="px-4 py-2 text-gray-500">Loading...</p>
              )}
              {showSuggestions && (dynamicSuggestions?.length ?? 0) > 0 ? (
                <ul className="w-full" ref={suggestionRef}>
                  {dynamicSuggestions?.map(
                    (suggestion: SearchSuggestion, index: number) => (
                      <li
                        key={index}
                        className="p-2 px-[15px] flex flex-row justify-between hover:bg-gray-100 cursor-pointer items-center"
                        onClick={() => handleSearch(suggestion.query, "name")}
                      >
                        <span className="flex flex-row gap-[5px] items-center">
                          <Search className="w-[13px]" />
                          <span>{suggestion.query}</span>
                        </span>
                        <ArrowUpLeft className="w-[15px]" />
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <div
                  className="flex flex-col gap-[10px] p-[20px]"
                  ref={searchRef}
                >
                  <span className="text-[14px] font-bold">
                    Trending Searches
                  </span>
                  <div className="flex-wrap flex gap-2">
                    {suggestions?.map((item, index) => (
                      <div
                        key={index}
                        className="py-[4px] px-[10px] flex flex-row gap-[5px] border border-solid border-sheerpeace-black rounded-full text-sheerpeace-black items-center text-[13px] hover:bg-sheerpeace-purple duration-150 cursor-pointer  "
                        onClick={() => handleSearch(item.query, "name")}
                      >
                        <Search className="w-[13px]" />
                        <span>{item.query}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

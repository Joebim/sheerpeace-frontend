"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SheerpeaceWordmark from "../../../public/sheerpeace-word-mark.svg";
import SheerpeaceLogo from "../../../public/sheerpeace-logo.svg";
import { Category } from "@/types";
import { ChevronRight } from "lucide-react";

interface UserSideBarProps {
  children: React.ReactNode;
  categories: Category[];
}

const UserSideBar: React.FC<UserSideBarProps> = ({ children, categories }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent side="left" className="overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>
              <div className="flex flex-row items-center">
                <SheerpeaceWordmark className="fill-sheerpeace-purple-secondary scale-75" />
                <SheerpeaceLogo className="w-[25px]" />
              </div>
            </SheetTitle>
          </SheetHeader>
          <hr className="border-gray-300" />
          <div className="p-4 flex flex-col gap-[15px] text-[13px]">
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold">NEED HELP</span>
              <ChevronRight />
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold">MY SHEERPEACE ACCOUNT</span>
              <ChevronRight />
            </div>
            <hr className="border-gray-300" />
            <ul className="flex flex-col gap-[10px]">
              <li>Orders</li>
              <li>Inbox</li>
              <li>Pending Reviews</li>
              <li>Voucher</li>
              <li>Wishlist</li>
            </ul>
            <hr className="border-gray-300" />
            <div className="flex flex-row items-center justify-between">
              <h3 className="font-bold">OUR CATEGORIES</h3>
              <span className="text-sheerpeace-purple-secondary">See All</span>
            </div>
            <ul className="flex flex-col gap-[10px]">
              {categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
            <hr className="border-gray-300" />
            <div className="flex flex-row items-center justify-between w-full">
              <h3 className="font-bold">OUR SERVICES</h3>
              <span className="text-sheerpeace-purple-secondary">See All</span>
            </div>
            <ul className="flex flex-col gap-[10px]">
              <li>Sell on Jumia</li>
              <li>Service Center</li>
              <li>Contact us</li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserSideBar;

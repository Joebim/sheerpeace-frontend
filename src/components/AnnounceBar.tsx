"use client"

import { ArrowRight, TicketPercent, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function AnnounceBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-sheerpeace-black w-full py-[5px] text-[12px] text-white h-[35px] flex justify-center items-center">
      <div className="absolute right-[20px] text-white cursor-pointer" onClick={() => setIsVisible(false)}>
        <X className="w-[15px]"/>
      </div>
      <div className="flex flex-row items-center gap-[10px] sm:gap-[20px]">
        <TicketPercent />
        <span className="text-[10px] sm:text-[12px]">Get 10% off on your first purchase</span>
        <Link href="">
          <div className="flex border-b border-white flex-row gap-[5px] items-center">
            <span className="text-[10px] sm:text-[12px]">Shop Now</span>
            <ArrowRight className="w-[12px]" />
          </div>
        </Link>
      </div>
    </div>
  );
}

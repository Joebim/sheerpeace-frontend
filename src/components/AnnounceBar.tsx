import { ArrowRight, TicketPercent } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AnnounceBar() {
  return (
    <div className="bg-sheerpeace-black w-full py-[5px] text-[12px] text-white h-[35px] flex justify-center items-center">
      <div className="flex flex-row items-center gap-[20px]">
        <TicketPercent />
        <span className="">Get 10% off on your first purchase</span>
        <Link href="">
          <div className="flex border-b border-white flex-row gap-[5px] items-center">
            <span>Shop Now</span>
            <ArrowRight className="w-[12px]"/>
          </div>
        </Link>
      </div>
    </div>
  );
}

import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OffersProps {
  category_name: string;
  category_image: string;
  link: string;
}

interface OffersCardProps {
  offer: OffersProps;
}

export default function OffersCard({ offer }: OffersCardProps) {
  return (
    <div className="flex-1 relative bg-sheerpeace-grey w-[240px] rounded-[15px] overflow-hidden">
      <Image
        height={200}
        width={200}
        src={renderImageUrl(offer.category_image)}
        alt={offer.category_name}
        className="absolute object-cover w-full h-full"
        priority
      />
      <div className="relative z-1 h-full w-full p-[25px] flex items-center justify-start">
        <div className=" flex flex-col items-start gap-[10px]">
          <span className="text-[22px] font-bold">{offer.category_name}</span>
          <Link href={offer.link}>
            <div className="flex flex-row gap-[5px] items-center px-[10px] py-[4px] rounded-[5px] bg-white hover:bg-sheerpeace-purple duration-200">
              <span className="text-[13px]">Shop Now</span>
              <ArrowRight className="w-[12px]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

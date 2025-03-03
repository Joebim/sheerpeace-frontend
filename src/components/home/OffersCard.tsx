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
    <div className="flex-1 relative bg-sheerpeace-grey w-full rounded-[10px] overflow-hidden">
      <Image
        height={200}
        width={200}
        src={offer.category_image}
        alt={offer.category_name}
        className="absolute object-cover w-full h-full"
      />
      <div className="h-full w-full p-[40px] flex flex-col items-start justify-around">
        <span>{offer.category_name}</span>
        <Link href={offer.link}>
          <div className="flex border-b border-black flex-row gap-[5px] items-center">
            <span>Shop Now</span>
            <ArrowRight className="w-[12px]" />
          </div>
        </Link>
      </div>
    </div>
  );
}

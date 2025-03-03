import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { usePrice } from "@/utils/usePrice";
import { shortenText } from "@/utils/useShortenText";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";

interface SideProductCardProps {
  product: Product;
}

export default function SideProductCard({ product }: SideProductCardProps) {
  const { formatPrice } = usePrice();

  return (
    <div className="h-[100px] flex flex-row gap-[10px] items-center">
      <div className="w-[100px] h-full">
        <Image
          height={100}
          width={100}
          src={renderImageUrl(product.images[0])}
          className="object-cover h-full w-full"
          alt="Rectangle"
        />
      </div>
      <div className="flex flex-col gap-[3px]">
          <Rating rating={product.average_rating} />
        <div className="flex flex-row gap-[10px] items-center">
          <p className="text-[12px] line-through text-gray-400">
            {formatPrice(product?.price)}
          </p>
          <p className="text-[12px] text-sheerpeace-black">
            {formatPrice(product?.discounted_price)}
          </p>
        </div>
        <p className="text-[11px]">{shortenText(product.description, 30)}</p>
      </div>
    </div>
  );
}

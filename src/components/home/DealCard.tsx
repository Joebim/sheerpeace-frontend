import Image from "next/image";
import React from "react";
import { Product } from "@/types";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import { usePrice } from "@/utils/usePrice";
import DealTimer from "./DealTimer";

interface DealCardProps {
  product: Product;
}

export default function DealCard({ product }: DealCardProps) {
  const { formatPrice } = usePrice();

  return (
    <div className="flex flex-row h-[300px]">
      <div className="flex-1 rounded-[10px] overflow-hidden">
        <Image
          height={300}
          width={300}
          src={renderImageUrl(product.images[0])}
          className="object-cover h-full w-full"
          alt="Rectangle"
        />
      </div>

      <div className="flex-1 p-[26px] flex flex-col gap-[12px]">
        <p className="text-[14px] font-bold">{product.name}</p>
        <div className="flex flex-row gap-[10px] items-center">
          <p className="text-[12px] line-through text-gray-400">
            {formatPrice(product?.price)}
          </p>
          <p className="text-[12px] text-sheerpeace-black">
            {formatPrice(product?.discounted_price)}
          </p>
        </div>

        <p className="text-[11px]">{product.description}</p>

        <div className="flex flex-col gap-1">
          <div className="w-full text-[10px] flex flex-row justify-between items-center">
            <p>
              Avaliable <span className="font-bold">10</span>
            </p>
            <p>
              Sold <span className="font-bold">10</span>
            </p>
          </div>

          <div className="w-full h-[10px] rounded-full bg-sheerpeace-grey">
            <div
              className="h-full bg-sheerpeace-purple-secondary rounded-full"
              style={{ width: `${30}%` }}
            ></div>
          </div>
        </div>

        <DealTimer
          timerPrompt="Hurry Up!"
          discountEndDate={product.discount_end_date ?? ""}
        />
      </div>
    </div>
  );
}

import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SalesBannerProps {
  offerText: string;
  percentageOff: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  imageUrl: string;
}

const SalesBanner: React.FC<SalesBannerProps> = ({
  offerText,
  percentageOff,
  title,
  description,
  cta,
  link,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full bg-sheerpeace-grey rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <Image
          height={1000}
          width={1000}
          src={renderImageUrl(imageUrl)}
          alt="Sale Offer"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-11 text-center md:text-left">
        <p className="text-sheerpeace-purple-secondary  font-bold uppercase">
          {offerText} <span className="">{percentageOff}</span>
        </p>
        <h3 className="text-2xl font-semibold mt-2">{title}</h3>
        <p className="text-gray-600 mt-3">{description}</p>
        <Link
          href={link}
          className="mt-4 bg-sheerpeace-purple-secondary text-white px-6 py-3 rounded-md font-semibold hover:bg-sheerpeace-black transition self-start"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
};

export default SalesBanner;

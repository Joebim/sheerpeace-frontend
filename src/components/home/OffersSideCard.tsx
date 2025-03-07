import React from "react";
import OffersCard from "./OffersCard";

interface OffersSideCardProps {
  loading: boolean;
}

export default function OffersSideCard({ loading }: OffersSideCardProps) {
  const offers = [
    {
      category_name: "Electronics",
      category_image: "/uploads/images/1741011429616-401145659.jpg",
      link: "/electronics",
    },
    {
      category_name: "Fashion",
      category_image: "/uploads/images/1741011481697-272343731.jpg",
      link: "/fashion",
    },
  ];
  return (
    <>
      {loading ? (
        <div className="flex-1 flex flex-row gap-[20px] w-full">
          <div className="flex-1 animate-pulse bg-gray-300 rounded-[15px]"></div>
          <div className="flex-1 animate-pulse bg-gray-300 rounded-[15px]"></div>
        </div>
      ) : (
        <div className="flex-1 flex flex-row gap-[20px] w-full">
          {offers.map((offer) => (
            <OffersCard key={offer.category_name} offer={offer} />
          ))}
        </div>
      )}
    </>
  );
}

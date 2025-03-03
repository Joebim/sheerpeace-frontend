import React from "react";
import OffersCard from "./OffersCard";

export default function OffersSideCard() {
  const offers = [
    {
      category_name: "Electronics",
      category_image: "/images/electronics.jpg",
      link: "/electronics",
    },
    {
      category_name: "Fashion",
      category_image: "/images/fashion.jpg",
      link: "/fashion",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-[20px] w-full h-full">
        {offers.map((offer) => (
          <OffersCard key={offer.category_name} offer={offer} />
        ))}
      </div>
    </>
  );
}

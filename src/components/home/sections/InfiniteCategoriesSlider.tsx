"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteCategoriesSlider() {
  return (
    <div className="rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={featuredOffers}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const featuredOffers = [
  {
    title: "New Collection 2025",
    image: "https://i.imgur.com/bPQqoSy.jpeg",
    link: "/collections/new-2025",
  },
  {
    title: "Summer Sale - Up to 50% Off!",
    image: "https://i.imgur.com/yMgVxn2.jpeg",
    link: "/sale/summer",
  },
  {
    title: "Best Buys for 2025",
    image: "https://i.imgur.com/mmyrtyX.jpeg",
    link: "/best-buys",
  },
  {
    title: "Timeless Elegance - Shop Classics",
    image: "https://i.imgur.com/4csL1aQ.jpeg",
    link: "/collections/classics",
  },
  {
    title: "Sheer Comfort - Loungewear Picks",
    image: "https://i.imgur.com/cv3aJQM.jpeg",
    link: "/collections/loungewear",
  },
  {
    title: "Exclusive Deals - Limited Time Only",
    image: "https://i.imgur.com/yMgVxn2.jpeg",
    link: "/deals",
  },
  {
    title: "Minimalist Wardrobe - Shop Essentials",
    image: "https://i.imgur.com/mmyrtyX.jpeg",
    link: "/collections/essentials",
  },
  {
    title: "Work & Play - Versatile Outfits",
    image: "https://i.imgur.com/4csL1aQ.jpeg",
    link: "/collections/versatile",
  },
  {
    title: "Winter Warmth - Stay Cozy in Style",
    image: "https://i.imgur.com/cv3aJQM.jpeg",
    link: "/collections/winter",
  },
  {
    title: "Luxury Picks - Indulge Yourself",
    image: "https://i.imgur.com/bPQqoSy.jpeg",
    link: "/collections/luxury",
  },
];


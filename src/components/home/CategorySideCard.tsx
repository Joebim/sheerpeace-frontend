"use client";

import { useState } from "react";

const categories = [
  "All Rooms",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Garage",
  "Dining",
  "School",
  "Bathroom",
];

export function CategorySideCard() {
  const [activeCategory, setActiveCategory] = useState("All Rooms");

  return (
    <aside className="w-60 h-[22rem] p-4 bg-sheerpeace-grey shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
      <ul className="space-y-1 text-[13px]">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer p-1 rounded-md ${
              activeCategory === category
                ? "bg-gray-200 font-bold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
        <li className="text-sheerpeace-purple-secondary">More Categories</li>
      </ul>
    </aside>
  );
}

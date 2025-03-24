"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/category.store";
import { useBrandStore } from "@/store/brand.store";
import { useSizeStore } from "@/store/size.store";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { useState } from "react";

const genders = ["male", "female", "unisex"];

const FilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { categories } = useCategoryStore();
  const { brands } = useBrandStore();
  const { sizes } = useSizeStore();

  const selectedGender =
    (searchParams.get("gender") as "male" | "female" | "unisex") || "unisex"; // Default to unisex

  // Get initial values from search params
  const initialMinPrice = Number(searchParams.get("min_price")) || 0;
  const initialMaxPrice = Number(searchParams.get("max_price")) || 100;

  const [priceRange, setPriceRange] = useState([
    initialMinPrice,
    initialMaxPrice,
  ]);

  // Function to update filters in the URL
  const updateFilters = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(key, value.toLowerCase());
    } else {
      params.delete(key);
    }

    // Reset size filter when gender changes
    if (key === "gender") {
      params.delete("size");
    }

    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);

    const params = new URLSearchParams(window.location.search);
    params.set("min_price", values[0].toString());
    params.set("max_price", values[1].toString());

    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  // Handle manual price input change
  const handleInputChange = (index: number, value: string) => {
    const newValues = [...priceRange];
    newValues[index] = Number(value) || 0;
    setPriceRange(newValues);
  };

  // Update filters when user presses "Enter" or inputs blur
  const applyPriceFilter = () => {
    updateFilters("min_price", priceRange[0].toString());
    updateFilters("max_price", priceRange[1].toString());
  };

  const filteredSizes = sizes.filter((size) => size.gender === selectedGender);

  return (
    <div className="flex flex-col gap-[20px] w-full text-[12px]">
      {/* Category Filter */}
      <div className="flex flex-col gap-[10px]">
        <span className="text-[15px] font-bold">Filter by Category</span>
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          {categories.map((category) => {
            const isActive =
              searchParams.get("category") === category.name.toLowerCase();
            return (
              <div
                key={category.name}
                className="flex items-center space-x-2"
                onClick={() =>
                  updateFilters(
                    "category",
                    isActive ? undefined : category.name
                  )
                }
              >
                <Checkbox id={category.name} checked={isActive} />
                <label htmlFor={category.name} className="text-sm font-medium">
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[50px]">
          <span className="text-[15px] font-bold">Filter by Price</span>
          <DualRangeSlider
            label={(value) => `$${value}`}
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="flex flex-row items-center gap-[10px] justify-between">
          <Input
            type="number"
            value={priceRange[0]}
            min={0}
            max={100}
            onChange={(e) => handleInputChange(0, e.target.value)}
            onBlur={applyPriceFilter}
            onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
          />
          <span>—</span>
          <Input
            type="number"
            value={priceRange[1]}
            min={0}
            max={100}
            onChange={(e) => handleInputChange(1, e.target.value)}
            onBlur={applyPriceFilter}
            onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
          />
        </div>
      </div>

      {/* Brand Filter */}
      <div className="flex flex-col gap-[15px]">
        <span className="text-[15px] font-bold">Filter by Brands</span>
        <div className="flex flex-wrap">
          {brands.map((brand) => {
            const isActive =
              searchParams.get("brand") === brand.name.toLowerCase();
            return (
              <button
                key={brand.name}
                className={`border px-2 py-1 rounded-[3px] mr-2 mb-2 ${
                  isActive ? "bg-sheerpeace-purple-secondary text-white" : ""
                }`}
                onClick={() =>
                  updateFilters("brand", isActive ? undefined : brand.name)
                }
              >
                {brand.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="flex flex-col gap-[15px]">
        <span className="text-[15px] font-bold">Filter by Gender</span>
        <div className="flex flex-row gap-[5px]">
          {genders.map((gender) => {
            const isActive = selectedGender === gender;
            return (
              <button
                key={gender}
                className={`px-[0.65rem] py-1 rounded-full border text-[12px] ${
                  isActive
                    ? "bg-sheerpeace-purple-secondary text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => updateFilters("gender", gender)}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="flex flex-col gap-[15px]">
        <span className="text-[15px] font-bold">Filter by Sizes</span>
        <div className="flex flex-wrap">
          {filteredSizes.length > 0 ? (
            filteredSizes.map((size) => {
              const isActive =
                searchParams.get("size") === size.label.toLowerCase();
              return (
                <button
                  key={size.label}
                  className={`bg-gray-200 px-2 py-1 rounded-full mr-2 mb-2 ${
                    isActive ? "bg-gray-400" : ""
                  }`}
                  onClick={() =>
                    updateFilters("size", isActive ? undefined : size.label)
                  }
                >
                  {size.label}
                </button>
              );
            })
          ) : (
            <p className="text-gray-500">No sizes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

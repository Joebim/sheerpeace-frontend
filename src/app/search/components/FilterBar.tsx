"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCategoryStore } from "@/store/category.store";

const brands = ["Nike", "Adidas", "Puma", "Gucci"];
const colors = ["Red", "Blue", "Black", "White"];

const FilterBar = () => {
  const { categories } = useCategoryStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || undefined,  // ⬅️ Make default value undefined
    minPrice: searchParams.get("min_price") || "",
    maxPrice: searchParams.get("max_price") || "",
    brand: searchParams.get("brand") || undefined,  // ⬅️ Make default value undefined
    color: searchParams.get("color") || undefined,  // ⬅️ Make default value undefined
  });

  const updateFilters = (key: string, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-lg shadow-md">
      <Input
        placeholder="Search..."
        value={filters.keyword}
        onChange={(e) => updateFilters("keyword", e.target.value)}
      />

      {/* Category Select */}
      <Select
        value={filters.category}
        onValueChange={(value) => updateFilters("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Brand Select */}
      <Select
        value={filters.brand}
        onValueChange={(value) => updateFilters("brand", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Brand" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Color Select */}
      <Select
        value={filters.color}
        onValueChange={(value) => updateFilters("color", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Color" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color} value={color}>
              {color}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => updateFilters("minPrice", e.target.value)}
      />
      <Input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => updateFilters("maxPrice", e.target.value)}
      />
      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
};

export default FilterBar;

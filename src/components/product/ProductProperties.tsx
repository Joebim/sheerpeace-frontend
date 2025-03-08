"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface ProductPropertiesProps {
  product: Product;
}

export default function ProductProperties({ product }: ProductPropertiesProps) {
  const [activeTab, setActiveTab] = useState("reviews");

  // Section refs for observing
  const sectionRefs: {
    [key in SectionKeys]: React.RefObject<HTMLDivElement | null>;
  } = {
    reviews: useRef<HTMLDivElement>(null),
    specifications: useRef<HTMLDivElement>(null),
    description: useRef<HTMLDivElement>(null),
    store: useRef<HTMLDivElement>(null),
    qa: useRef<HTMLDivElement>(null),
  };

  // Observe sections and update active tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveTab(visibleSection.target.id);
        }
      },
      { rootMargin: "-50px 0px -70% 0px", threshold: 0.2 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  type SectionKeys =
    | "reviews"
    | "specifications"
    | "description"
    | "store"
    | "qa";

  // Smooth scroll to section when clicking a tab
  const scrollToSection = (section: SectionKeys) => {
    sectionRefs[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative mt-12">
      {/* Sticky Tabs Header */}
      <div className="hidden sm:block sticky top-[113px] z-50 bg-white shadow-md border-b border-gray-200 py-2">
        <Tabs>
          <TabsList className="flex justify-start space-x-4 px-4">
            {Object.keys(sectionRefs).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                onClick={() => scrollToSection(key as SectionKeys)}
                className={
                  activeTab === key ? "font-bold text-black" : "text-gray-500"
                }
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Customer Reviews */}
        <section id="reviews" ref={sectionRefs.reviews}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Customer Reviews ({product.total_reviews || 279})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <p className="text-xl font-bold">4.6</p>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-500 ${
                        i < 4 ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-500">
                  {product.total_reviews || 278} ratings
                </p>
              </div>
              <p className="text-gray-500">All from verified purchases</p>
            </CardContent>
          </Card>
        </section>

        {/* Specifications */}
        <section id="specifications" ref={sectionRefs.specifications}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>High Concerned Chemical:</strong> None
                </li>
                <li>
                  <strong>Diaphragm:</strong> S-Mall
                </li>
                <li>
                  <strong>Polar Patterns:</strong> Omnidirectional
                </li>
                <li>
                  <strong>Package:</strong> Yes
                </li>
                <li>
                  <strong>Communication:</strong> Wireless
                </li>
                <li>
                  <strong>Set Type:</strong> Transmitter Sets
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Description */}
        <section id="description" ref={sectionRefs.description}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {product.description ||
                  "Wireless Lavalier Microphone for iPhone, Android, Laptop, etc."}
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4 text-gray-700">
                <li>9 ms ultra-low latency, 20m barrier-free reception.</li>
                <li>No app needed, plug-and-play connection.</li>
                <li>360° full-pointing pickup for clear audio.</li>
                <li>
                  Compatible with mobile phones, tablets, cameras, and laptops.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Store Details */}
        <section id="store" ref={sectionRefs.store}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Store Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                <strong>Store Name:</strong> {product.brand?.name}
              </p>
              <p className="text-gray-700">
                <strong>Average Rating:</strong> ⭐{" "}
                {product.brand?.averageRating}
              </p>
              <p className="text-gray-700">
                {product.brand?.description ||
                  "This brand offers high-quality tech accessories and gadgets."}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Buyer Q&A */}
        <section id="qa" ref={sectionRefs.qa}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Buyer Questions & Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Replace with actual Q&A list */}
                <div className="border-t pt-3">
                  <p className="text-gray-800 font-semibold">
                    Does this work with iPhone 16?
                  </p>
                  <p className="text-gray-600">
                    Yes, it supports iPhone 16 and newer models.
                  </p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-800 font-semibold">
                    Can I use this for live streaming?
                  </p>
                  <p className="text-gray-600">
                    Yes, it has ultra-low latency for real-time audio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

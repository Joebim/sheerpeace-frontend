"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";

interface ProductPropertiesProps {
  product: Product;
}

export default function ProductProperties({ product }: ProductPropertiesProps) {
  const [activeTab, setActiveTab] = useState("reviews");

  // Section refs for observing
  const reviewsRef = useRef<HTMLDivElement>(null);
  const specificationsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => ({
    reviews: reviewsRef,
    specifications: specificationsRef,
    description: descriptionRef,
    store: storeRef,
    qa: qaRef,
  }), []);

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
  }, [sectionRefs]);

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative mt-12 flex flex-col gap-[20px] ">
      {/* Sticky Tabs Header */}
      <div className="hidden sm:block sticky top-[113px] z-10 ">
        <Tabs>
          <TabsList className="flex justify-start space-x-4 px-4 bg-sheerpeace-purple-secondary rounded-full shadow-md">
            {Object.keys(sectionRefs).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                onClick={() => scrollToSection(key as keyof typeof sectionRefs)}
                className={
                  activeTab === key ? "font-bold text-white" : "text-white"
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
                Customer Reviews ({product.total_reviews})
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[14px]">
              <div className="flex items-center space-x-4">
                <p className="text-xl font-bold">{product.average_rating}</p>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-500 text-[20px] ${
                        i < Math.round(product.average_rating)
                          ? "opacity-100"
                          : "opacity-50"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-500">{product.total_reviews} ratings</p>
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
            <CardContent className="text-[14px]">
              {product.productSpecifications.length > 0 ? (
                <ul className="space-y-2 text-gray-700">
                  {Object.entries(product.productSpecifications[0].specifications).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {String(value)}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">No specifications available.</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Description */}
        <section id="description" ref={sectionRefs.description}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent className="text-[14px]">
              {product.productDescriptions.length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.productDescriptions[0].description_html,
                  }}
                  className="text-gray-700"
                />
              ) : (
                <p className="text-gray-500">No description available.</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Store Details */}
        <section id="store" ref={sectionRefs.store}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Store Details</CardTitle>
            </CardHeader>
            <CardContent className="text-[14px]">
              {product.brand ? (
                <>
                  <p className="text-gray-700">
                    <strong>Store Name:</strong> {product.brand.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Average Rating:</strong> ⭐ {product.brand.averageRating}
                  </p>
                  <p className="text-gray-700">
                    {product.brand.description || "This brand offers high-quality fashion items."}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No brand details available.</p>
              )}
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
            <CardContent className="text-[14px]">
              {product.questions.length > 0 ? (
                <div className="space-y-4">
                  {product.questions.map((q) => (
                    <div key={q.id} className="border-t pt-3">
                      <p className="text-gray-800 font-semibold">
                        {q.question}
                      </p>
                      {q.answers.length > 0 ? (
                        q.answers.map((a) => (
                          <p key={a.id} className="text-gray-600">
                            {a.answer}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-500">No answers yet.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No questions available.</p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

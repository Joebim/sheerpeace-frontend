"use client";

import { Suspense } from "react";
import SearchPage from "./components/SearchPage";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchPage query={query}/>
    </Suspense>
  );
};

export default Page;

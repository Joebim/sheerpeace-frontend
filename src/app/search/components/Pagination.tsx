"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-6 gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

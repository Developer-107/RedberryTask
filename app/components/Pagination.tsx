"use client";

import { Flex } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  
  function getPages() {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }

  const pages = getPages();

  return (
    <Flex justify="center" mt="6">
      <Flex gap="2" align="center" className="text-sm font-medium">

        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center justify-center gap-1 border p-1 rounded-lg cursor-pointer text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white disabled:text-gray-200 disabled:hover:bg-white disabled:cursor-not-allowed bg-white h-10 w-10"
        >
          <ArrowLeftIcon size={14} />
        </button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(Number(p))}
              className={`px-4 py-2 rounded-lg border cursor-pointer h-10 w-10
              ${
                page === p
                  ? "bg-[#4F46E5] text-white"
                  : "text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center justify-center gap-1 border p-1 rounded-lg cursor-pointer text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white disabled:text-gray-200 disabled:hover:bg-white disabled:cursor-not-allowed bg-white h-10 w-10"
        >
          <ArrowRightIcon size={14} />
        </button>

      </Flex>
    </Flex>
  );
}
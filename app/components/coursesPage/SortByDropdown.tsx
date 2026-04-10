"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const options: Option[] = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Title: A-Z", value: "title_asc" },
];

export default function SortByDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-65 h-12">
      {/* Trigger */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 h-10 rounded-lg px-4 cursor-pointer bg-gray-50 hover:opacity-90"
      >
        <span>Sort by:</span>
        <span className="text-[#4F46E5]">{selected?.label}</span>
        <ChevronDownIcon strokeWidth={1.5} className={`ml-auto transition duration-500 ${open ? "rotate-180" : ""}`}/>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-12 left-0 w-full bg-gray-50 rounded-xl shadow-md z-50">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-5 py-2 cursor-pointer hover:bg-[#DDDBFA] hover:text-[#4F46E5] ${option.value === "newest" ? "rounded-t-xl" : option.value === "title_asc" ? "rounded-b-xl" : ""}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
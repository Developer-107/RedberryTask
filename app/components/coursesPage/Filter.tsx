"use client";

import { api } from "@/lib/api";
import { Category, Filters, Instructor, Topic } from "@/types/globalTypes";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilteringItemsSkeleton from "./FilteringItemsSkeleton";

export default function Filter({
  onChange,
}: {
  onChange: (filters: Filters) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<number[]>([]);

  useEffect(() => {
    onChange({
      categories: selectedCategories,
      topics: selectedTopics,
      instructors: selectedInstructors,
    });
  }, [selectedCategories, selectedTopics, selectedInstructors]);

  const selectingToggle = (id: number, state: number[], setState: any) => {
    if (state.includes(id)) {
      setState(state.filter((item) => item !== id));
    } else {
      setState([...state, id]);
    }
  };

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        setLoading(true);

        const resCategories = await api.get("/categories");
        const resInstructors = await api.get("/instructors");

        setCategories(resCategories.data.data ?? []);
        setInstructors(resInstructors.data.data ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilter();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoadingTopics(true);

        // Avoids topic keeping selected when we unselect category
        setSelectedTopics([]);

        const resTopics = await api.get("/topics", {
          params: {
            "categories[]": selectedCategories,
          },
        });

        setTopics(resTopics.data.data ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, [selectedCategories]);

  return (
    <div className="flex flex-col pr-22.5 gap-8">
      <div className="flex items-center justify-between">
        <p className="text-[40px] text-gray-950 font-semibold">Filters</p>
        <div
          onClick={() => {
            setSelectedCategories([]);
            setSelectedTopics([]);
            setSelectedInstructors([]);
          }}
          className="flex items-center cursor-pointer font-medium text-gray-400 hover:text-[#4F46E5] gap-1"
        >
          <p>Clear all filters</p>
          <XIcon size={19} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-14 text-gray-500">
        <div className="flex flex-col gap-6">
          <p>Categories</p>
          <div className="flex gap-1 flex-wrap">
            {loading
              ? [...Array(5)].map((_, idx) => (
                  <FilteringItemsSkeleton key={idx} />
                ))
              : categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() =>
                      selectingToggle(
                        category.id,
                        selectedCategories,
                        setSelectedCategories,
                      )
                    }
                    className={`flex gap-1 h-10 rounded-lg p-1 px-2 cursor-pointer border border-gray-50 hover:border-[#DDDBFA]! hover:bg-[#DDDBFA] hover:text-[#281ED2]
      ${
        selectedCategories.includes(category.id)
          ? "bg-[#EEEDFC] border-[#281ED2]! text-[#281ED2]"
          : "bg-gray-50 "
      }`}
                  >
                    <div className="flex items-center justify-center">
                      <p>{category.name}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p>Topics</p>
          <div className="flex gap-1 flex-wrap">
            {loadingTopics
              ? [...Array(17)].map((_, idx) => (
                  <FilteringItemsSkeleton key={idx} />
                ))
              : topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() =>
                      selectingToggle(
                        topic.id,
                        selectedTopics,
                        setSelectedTopics,
                      )
                    }
                    className={`flex gap-1 h-10 rounded-lg p-1 px-2 cursor-pointer border border-gray-50 hover:border-[#DDDBFA]! hover:bg-[#DDDBFA] hover:text-[#281ED2]
                ${
                  selectedTopics.includes(topic.id)
                    ? "bg-[#EEEDFC] border-[#281ED2]! text-[#281ED2]"
                    : "bg-gray-50 "
                }`}
                  >
                    <div className="flex items-center justify-center">
                      <p>{topic.name}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p>Instructors</p>
          <div className="flex gap-2 flex-col items-start">
            {loading
              ? [...Array(7)].map((_, idx) => (
                  <FilteringItemsSkeleton key={idx} />
                ))
              : instructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    onClick={() =>
                      selectingToggle(
                        instructor.id,
                        selectedInstructors,
                        setSelectedInstructors,
                      )
                    }
                    className={`flex gap-1 h-10 rounded-lg p-1 px-2 cursor-pointer border border-gray-50 hover:border-[#DDDBFA]! hover:bg-[#DDDBFA] hover:text-[#281ED2]
      ${
        selectedInstructors.includes(instructor.id)
          ? "bg-[#EEEDFC] border-[#281ED2]! text-[#281ED2]"
          : "bg-gray-50 "
      }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="relative h-7.5 w-7.5">
                        <Image
                          src={instructor.avatar}
                          alt={instructor.name}
                          fill
                          className="object-cover rounded-lg auto"
                        />
                      </div>
                      <p className="text-nowrap">{instructor.name}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Filter from "../components/coursesPage/Filter";
import { useEffect, useState } from "react";
import { Course, Filters, MetaData } from "@/types/globalTypes";
import { api } from "@/lib/api";
import SortByDropdown from "../components/coursesPage/SortByDropdown";
import Pagination from "../components/Pagination";
import BrowsedCourses from "../components/coursesPage/BrowsedCourses";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>();
  const [metaData, setMetaData] = useState<MetaData>({
    currentPage: 1,
    lastPage: 1,
    perPage: 1,
    total: 1,
  });
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    topics: [],
    instructors: [],
  });

  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await api.get("/courses", {
          params: {
            "categories[]": filters.categories,
            "topics[]": filters.topics,
            "instructors[]": filters.instructors,
            sort: sortBy,
            page,
          },
        });

        setCourses(res.data.data);
        setMetaData(res.data.meta);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters, page, sortBy]);

  // Scrolls up on page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, [page]);

  const totalPages = Math.ceil(metaData.total / metaData.perPage) || 1;

  return (
    <div className="flex flex-col mt-[69.5px] gap-8.5">
      {/* Home > Browse */}
      <div className="flex items-center gap-2 text-[18px] text-gray-500">
        <Link href="/">Home</Link>
        <ChevronRight size={17} />
        <p className="text-[#736BEA]">Browse</p>
      </div>

      {/* Main */}
      <div className="grid grid-cols-4">
        {/* Filter */}
        <div className="flex flex-col gap-6">
          <Filter onChange={setFilters} />
          <div className="flex flex-col text-gray-500 gap-4  pr-22.5">
            <hr />
            <p>
              {filters.categories.length +
                filters.instructors.length +
                filters.topics.length}{" "}
              Filters Active
            </p>
          </div>
        </div>

        {/* Browsed Courses */}
        <div className="col-span-3 flex flex-col gap-8">
          {/* Out of Sort By */}
          <div className="flex items-center h-15">
            <div className="w-full flex justify-between items-center text-gray-500 font-medium">
              <p>
                {metaData.total > 0
                  ? `Showing ${courses?.length || 0} out of ${metaData.total}`
                  : "No courses found"}{" "}
              </p>
              <SortByDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <BrowsedCourses courses={courses} loadingState={loading} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

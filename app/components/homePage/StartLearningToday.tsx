"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import CourseCardSkeleton from "../CourseCardSkeleton";
import { Course } from "@/types/globalTypes";
import CourseCard from "../CourseCard";

export default function StartLearningToday() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/courses/featured");
        setCourses(res.data.data);
      } catch (err) {
        console.error("Course can't be fetched " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col mb-16">
      <h2 className="font-semibold text-[40px]">Start Learning Today</h2>
      <p className="text-[18px] mb-8">
        Choose from our most popular courses and begin your journey
      </p>
     

      <div className="flex flex-row justify-between gap-5">
        {loading
          ? [...Array(3)].map((_, idx) => <CourseCardSkeleton key={idx} />)
          : courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
      </div>
    </div>
  );
}

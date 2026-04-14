"use client";

import CourseEnrollmentWindowSkeleton from "@/app/components/specificCoursePage/CourseEnrollmentWindowSkeleton";
import CourseInfo from "@/app/components/specificCoursePage/CourseInfo";
import CourseInfoSkeleton from "@/app/components/specificCoursePage/CourseInfoSkeleton";
import EnrollmentWindow from "@/app/components/specificCoursePage/EnrollmentWindow";
import { api } from "@/lib/api";
import { CourseById } from "@/types/globalTypes";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [initialLoading, setInitialLoading] = useState(true);
  const [course, setCourse] = useState<CourseById>();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setInitialLoading(true);

        const res = await api.get(
          `/courses/${id}`,
          session
            ? {
                headers: {
                  Authorization: `Bearer ${(session as any).accessToken}`,
                },
              }
            : {},
        );

        setCourse(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCourse();
  }, [id, session, refreshKey]);

  return (
    <div className="flex flex-col mt-[69.5px] gap-8.5">
      {/* Home > Browse */}
      <div className="flex items-center gap-2 text-[18px] text-gray-500">
        <Link href="/">Home</Link>
        <ChevronRight size={17} />
        <Link href="/Courses">Browse</Link>
        <ChevronRight size={17} />
        <p className="text-[#736BEA]">Development</p>
      </div>

      <div className="grid grid-cols-5">
        {/* Course Info */}
        {initialLoading ? (
          <CourseInfoSkeleton />
        ) : (
          <CourseInfo course={course} />
        )}

        {/* Enrollment Window */}
        {initialLoading ? (
          <CourseEnrollmentWindowSkeleton />
        ) :
        <EnrollmentWindow
          course={course}
          session={session ? session : undefined}
        />}
      </div>
    </div>
  );
}

"use client";

import { useEnrolledCourses } from "@/context/EnrolledCoursesContext";
import { api } from "@/lib/api";
import { CourseInProgress, User } from "@/types/globalTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ContinueLearningCardSkeleton from "../homePage/ContinueLearningCardSkeleton";
import CardInEnrolledCourses from "./CardInEnrolledCourses";
import Link from "next/link";
import EnrolledCoursesIfNotDiv from "./EnrolledCoursesIfNotDiv";

interface Props {
  user: User | undefined;
}

export default function EnrolledCoursesWindow({ user }: Props) {
  const { isEnrolledCoursesOpen, setEnrolledCoursesOpen } =
    useEnrolledCourses();

  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState<
    CourseInProgress[]
  >([]);

  useEffect(() => {
    if (!session) return;

    const fetchCoursesInProgress = async () => {
      try {
        setLoading(true);
        const res = await api.get("/enrollments", {
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        });
        setCoursesInProgress(res.data.data);
      } catch (err) {
        console.error("CourseInProgress can't be fetched " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesInProgress();
  }, [session]);

  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center z-70 bg-[#000000]/25">
      <div
        onClick={() => setEnrolledCoursesOpen(false)}
        className="w-full h-full"
      />

      <div className=" px-14.25 pt-10.5 bg-[#F5F5F5] ml-auto h-screen min-w-198.5 ">
        <div className="flex items-center justify-between text-gray-950">
          <h1 className=" font-medium text-[40px]"> Enrolled Courses </h1>
          <p>Total Enrollments {coursesInProgress?.length || 0}</p>
        </div>

        <div className="flex flex-col h-full mt-9.25 pb-30 px-[18.5px] gap-3 overflow-y-scroll overflow-x-hidden">
          {loading ? (
            [...Array(4)].map((_, idx) => (
              <ContinueLearningCardSkeleton key={idx} />
            ))
          ) : coursesInProgress.length <= 0 ? (
            <EnrolledCoursesIfNotDiv />
          ) : (
            <div className="pr-[23.5px] self-start flex flex-col gap-3">
              {coursesInProgress?.map((courseInProgress) => (
                <CardInEnrolledCourses
                  key={courseInProgress.id}
                  courseInProgress={courseInProgress}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

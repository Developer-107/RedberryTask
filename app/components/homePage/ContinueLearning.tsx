"use client";

import { api } from "@/lib/api";
import { CourseInProgress } from "@/types/globalTypes";
import { useEffect, useState } from "react";
import CardInContinueLearning from "./CardInContinueLearning";
import { useSession } from "next-auth/react";
import MockContinueLearning from "./MockContinueLearning";
import ContinueLearningCardSkeleton from "./ContinueLearningCardSkeleton";
import { useEnrolledCourses } from "@/context/EnrolledCoursesContext";
import { useLogin } from "@/context/LoginModalContext";

export default function ContinueLearning() {
  const { data: session, status } = useSession();

  const { setEnrolledCoursesOpen } = useEnrolledCourses();
  const { setLoginOpen } = useLogin();

  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState<
    CourseInProgress[]
  >([]);

  useEffect(() => {
    if (!session) return;

    const fetchCoursesInProgress = async () => {
      try {
        setLoading(true);
        const res = await api.get("/courses/in-progress", {
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
    <div
      className={`flex flex-col mb-16  ${coursesInProgress?.length <= 0 && session && "hidden"}`}
    >
      <h2 className="font-semibold text-[40px]">Continue Learning</h2>
      <div className="flex items-center justify-between">
        <p className="text-[18px]">Pick up where u left</p>
        <div
          onClick={() =>
            session ? setEnrolledCoursesOpen(true) : setLoginOpen(true)
          }
          className="cursor-pointer hover:opacity-80 underline text-[#4F46E5]"
        >
          See all
        </div>
      </div>
      <br />

      <div className="flex flex-row gap-5">
        {loading && status === "loading" ? (
          [...Array(3)].map((_, idx) => (
            <ContinueLearningCardSkeleton key={idx} />
          ))
        ) : !session ? (
          <MockContinueLearning />
        ) : (
          coursesInProgress
            ?.slice(0, 3)
            .map((courseInProgress) => (
              <CardInContinueLearning
                key={courseInProgress.id}
                courseInProgress={courseInProgress}
              />
            ))
        )}
      </div>
    </div>
  );
}

"use client";

import { api } from '@/lib/api';
import { CourseInProgress } from '@/types/globalTypes';
import { useEffect, useState } from 'react'
import CardInContinueLearning from './CardInContinueLearning';
import CourseCardSkeleton from '../CourseCardSkeleton';
import Link from 'next/link';

export default function ContinueLearning() {
  const [loading, setLoading] = useState(true);
  const [coursesInProgress, setCoursesInProgress] = useState<CourseInProgress[]>([]);

  useEffect(() => {
    const fetchCoursesInProgress = async () => {
      try {
        setLoading(true);
        const res = await api.get("/courses/in-progress");
        setCoursesInProgress(res.data.data);

      } catch (err) {
        console.error("CourseInProgress can't be fetched " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesInProgress();
  }, []);

  return (
    <div className="flex flex-col">
        <h2 className="font-semibold text-[40px]">Continue Learning</h2>
        <div className="flex items-center justify-between">
        <p className="text-[18px]">
            Pick up where u left
        </p>
        <Link href={""} className="underline text-[#4F46E5]">See all</Link>
        </div>
        <br />

      <div className="flex flex-row justify-between gap-5">
              {loading
                ? [...Array(3)].map((_, idx) => <CourseCardSkeleton key={idx} />)
                : coursesInProgress?.map((courseInProgress) => (
                    <CardInContinueLearning key={courseInProgress.id} courseInProgress={courseInProgress} />
                  ))}
            </div>
      </div>
  )
}

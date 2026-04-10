import { Course } from "@/types/globalTypes";
import CourseCardInCourses from "./CourseCardInCourses";
import CourseCardSkeleton from "../CourseCardSkeleton";
import CourseCardSkeletonInCourses from "./CourseCardSkeletonInCourses";

interface Props {
  courses?: Course[];
  loadingState: Boolean;
}

export default function BrowsedCourses({ courses, loadingState }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {loadingState
        ? [...Array(12)].map((_, idx) => <CourseCardSkeletonInCourses key={idx} />)
        : 
        courses && courses?.length <= 0 ? 
        <div className="flex col-span-3 h-screen w-full items-center justify-center">
          <p className="font-medium">No courses found</p>
        </div>
        : courses?.map((course) => (
            <CourseCardInCourses key={course.id} course={course} />
          ))}
    </div>
  );
}

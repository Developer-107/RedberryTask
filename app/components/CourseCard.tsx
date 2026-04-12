import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types/globalTypes";

interface CourseProps {
  course: Course;
}

export default function CourseCard({ course }: CourseProps) {
  return (
    <div className="w-full min-w-45 border border-gray-100 bg-white rounded-lg">
      <div className="flex flex-col gap-3 p-5 h-full">
        <div className="flex min-h-65.5 w-full rounded-lg relative overflow-hidden">
          <Image
            src={course?.image || ""}
            alt={course?.title}
            fill
            className="object-cover auto"
          />
        </div>
        <div className="flex flex-col gap-1 h-full">
          <div className="flex gap-1 items-center justify-between text-sm font-medium">
            <p className=" text-gray-700 font-normal text-xs">
              <span className="text-gray-500">Lecturer</span>{" "}
              {course?.instructor?.name?.length < 50
                ? course?.instructor?.name
                : course?.instructor?.name.slice(0, 47) + "..."}
            </p>

            {course?.avgRating && (
              <p className="flex gap-1 items-center text-gray-600">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.2935 8.17598C17.4352 8.47789 17.7181 8.68928 18.0478 8.73964L23.8883 9.63179C24.693 9.75469 25.0215 10.7361 24.4531 11.3187L20.1647 15.7139C19.9431 15.941 19.8424 16.2599 19.8935 16.5732L20.8969 22.7263C21.0312 23.5502 20.1566 24.1663 19.4261 23.7624L14.296 20.9265C13.995 20.7601 13.6295 20.7601 13.3285 20.9265L8.19763 23.7624C7.46704 24.1663 6.59249 23.5501 6.72693 22.7262L7.73097 16.5732C7.78209 16.2599 7.68145 15.941 7.45977 15.7138L3.17143 11.3187C2.603 10.7361 2.93156 9.75469 3.73618 9.63179L9.57673 8.73964C9.90641 8.68928 10.1893 8.47789 10.331 8.17598L12.907 2.68743C13.2669 1.9206 14.3576 1.9206 14.7175 2.68743L17.2935 8.17598Z"
                    fill="#F4A316"
                  />
                </svg>
                {course.avgRating}
              </p>
            )}
          </div>

          <p className="mt-1 font-semibold text-gray-900 text-[24px]">
            {course?.title.length < 57
              ? course.title
              : course.title.slice(0, 54) + "..."}
          </p>
          <p className=" text-gray-500 mt-3 mb-4">
            {course?.description && course?.description.length > 200
              ? course.description.slice(0, 197) + "..."
              : course.description}
          </p>
          <div className="flex justify-between items-center text-gray-400 font-normal mt-auto">
            <div className="flex items-center gap-2 text-xs">
              Starting from
              <span className="font-semibold text-gray-900 text-[32px]">
                ${Math.floor(Number(course?.basePrice))}
              </span>
            </div>
            <Link
              href={`/courses/${course.id}`}
              className="px-4 py-3 hover:opacity-80 bg-[#4F46E5] text-white rounded-lg"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { CourseInProgress } from "@/types/globalTypes";

interface CourseInProgressProps {
  courseInProgress: CourseInProgress;
}

export default function CardInContinueLearning({ courseInProgress }: CourseInProgressProps) {
  return (
    <div
      className="w-131.75 p-5 border border-gray-100 bg-white rounded-lg"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 h-full">
                    <div className="flex min-w-35 min-h-30.5 rounded-lg relative overflow-hidden">
                      <Image
                        src={courseInProgress?.course?.image}
                        alt={courseInProgress?.course?.title}
                        fill
                        className="object-cover auto"
                      />
                    </div>
                    <div className="flex flex-col gap-1 h-full w-full">
                      <div className="flex gap-1 items-center justify-between text-sm font-medium">
                        <p className=" text-gray-700 font-normal text-xs">
                          <span className="text-gray-500">Lecturer</span> {courseInProgress?.course?.instructor?.name}
                        </p>
                       {courseInProgress?.course?.avgRating && <p className="flex gap-1 items-center text-gray-600">
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
                          {courseInProgress?.course?.avgRating}
                        </p>}
                      </div>
    
                      <p className="mt-1 font-semibold text-gray-900 text-[20px]">
                        {courseInProgress?.course?.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="flex flex-col w-full gap-1">
                      <div className="font-medium">{courseInProgress.progress} %</div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                          style={{ width: `${courseInProgress.progress}%` }}
                        />
                      </div>
                    </div>
                    <Link href={`/courses/${courseInProgress?.course?.id}`} className="px-5 py-3 hover:opacity-80 font-medium text-[#4F46E5] bg-white border-[1.5px] border-[#4F46E5] rounded-lg">
                      view
                    </Link>
                  </div>
                </div>
              </div>
  );
}

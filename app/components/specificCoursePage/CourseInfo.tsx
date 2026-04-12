import { CourseById } from '@/types/globalTypes'
import Image from "next/image";

interface Props {
    course?: CourseById
}

export default function courseInfo( { course } : Props ) {

    const avgRating = course?.reviews?.length
  ? Math.round(
      (course.reviews
        .map((r) => r.rating)
        .reduce((acc, curr) => acc + curr, 0) /
        course.reviews.length) * 10
    ) / 10
  : "";

  return (
    <div className="flex flex-col col-span-3 gap-6">
          <h1 className="text-[40px] text-gray-900 font-semibold">
            {course?.title}
          </h1>
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-4">
              <div className="flex min-h-118.5 min-w-225.75 rounded-lg relative overflow-hidden">
                <Image
                  src={course?.image || "/"}
                  alt={course?.title || ""}
                  fill
                  className="object-cover auto"
                />
              </div>
              <div className="flex text-gray-600 gap-3 items-center">
                <div className="flex gap-1">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2H14V0H12V2H6V0H4V2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM2 18V6H16V4V18H2Z"
                      fill="#525252"
                    />
                  </svg>
                  {course?.durationWeeks} Weeks
                </div>

                <div className="flex gap-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 12H12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                      stroke="#525252"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {course?.hours} Hours
                </div>

                <div className="ml-auto flex gap-3">
                  {course?.reviews && (
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
                      {avgRating}
                    </p>
                  )}

                  <div
                    className={`flex gap-1 h-full rounded-lg p-1 px-3 bg-gray-50`}
                  >
                    <div className=" flex items-center text-gray-600 justify-center">
                      <p>{course?.category.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4.5">
              <div className="self-start flex gap-1 h-10 rounded-lg p-1 px-2 cursor-pointer bg-gray-50">
                <div className="flex items-center justify-center gap-2">
                  <div className="relative h-7.5 w-7.5">
                    <Image
                      src={course?.instructor?.avatar || "/"}
                      alt={course?.instructor?.name || ""}
                      fill
                      className="object-cover rounded-lg auto"
                    />
                  </div>
                  <p className="text-nowrap">{course?.instructor?.name}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-[20px] text-gray-600 font-medium">
                Course Description
              </h2>
              <p className="text-gray-500">{course?.description}</p>
            </div>
          </div>
        </div>
  )
}

import { useLogin } from "@/context/LoginModalContext";
import Image from "next/image";

export default function MockContinueLearning() {
  const { openLogin } = useLogin();

  return (
    <div className="relative ">
      <div className="flex gap-4 blur-sm">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="w-full min-w-45 p-5 border border-gray-100 bg-white rounded-lg"
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 h-full">
                <div className="flex min-w-35 min-h-30.5 rounded-lg relative overflow-hidden">
                  <Image
                    src={"/mockContinuelearnignpic.png"}
                    alt={"mock course picture"}
                    fill
                    className="object-cover auto"
                  />
                </div>
                <div className="flex flex-col gap-1 h-full">
                  <div className="flex gap-1 items-center justify-between text-sm font-medium">
                    <p className=" text-gray-700 font-normal text-xs">
                      <span className="text-gray-500">Lecturer</span> Marilyn
                      Mango
                    </p>
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
                      5.0
                    </p>
                  </div>

                  <p className="mt-1 font-semibold text-gray-900 text-[20px]">
                    Advanced React & Typescript Development
                  </p>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col w-full gap-1">
                  <div className="font-medium">65% Complete</div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>
                <div className="px-5 py-3 hover:opacity-80 font-medium text-[#4F46E5] bg-white border-[1.5px] border-[#4F46E5] rounded-lg">
                  view
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex h-full items-center justify-center z-40">
        <div className="bg-white p-3 py-4 pb-9 rounded-xl border px-14 h-full border-gray-400">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="mt-3 flex items-center justify-center rounded-full h-18 w-18 bg-[#DDDBFA]">
              <svg
                width="34"
                height="37"
                viewBox="0 0 34 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.8889 17H6.11111C4.39289 17 3 18.4652 3 20.2727V31.7273C3 33.5347 4.39289 35 6.11111 35H27.8889C29.6071 35 31 33.5347 31 31.7273V20.2727C31 18.4652 29.6071 17 27.8889 17Z"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 17V10.3333C9 8.1232 9.84285 6.00358 11.3431 4.44078C12.8434 2.87797 14.8783 2 17 2C19.1217 2 21.1566 2.87797 22.6569 4.44078C24.1571 6.00358 25 8.1232 25 10.3333V17"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="17" cy="25" r="2" fill="#4F46E5" />
              </svg>
            </div>
            <p className="font-medium">
              Sign in to track your learning progress
            </p>
            <button
              onClick={openLogin}
              className="px-5 py-2.5 mt-3 bg-[#4F46E5] text-white rounded-lg hover:opacity-80 cursor-pointer"
            >
              {" "}
              Log in{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";

interface Props {
  courseTitle?: string;
  courseId?: number;
}

export default function EnrollmentConfirm({ courseTitle, courseId }: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center z-70 bg-[#000000]/25">
      <div className="flex flex-col justify-center p-15 items-center gap-10 bg-white rounded-lg mb-[10vh]">
        <div className="flex flex-col gap-6 justify-center items-center text-gray-700">
          <svg
            width="94"
            height="94"
            viewBox="0 0 94 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.4166 40.5282L49.8106 50.5757C50.6404 51.1981 51.6748 51.4837 52.7064 51.3755C53.7379 51.2672 54.6904 50.773 55.373 49.992L81.6388 19.9727"
              stroke="#4F46E5"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M85.75 48.7493C85.7501 56.4804 83.3286 64.0173 78.8255 70.3015C74.3224 76.5857 67.9639 81.3014 60.6431 83.7865C53.3223 86.2715 45.407 86.4009 38.0089 84.1566C30.6108 81.9123 24.1015 77.407 19.3953 71.2734C14.6891 65.1398 12.0224 57.6861 11.7698 49.9592C11.5171 42.2323 13.6912 34.6203 17.9867 28.1924C22.2821 21.7645 28.4832 16.8435 35.7189 14.1207C42.9546 11.3979 50.8614 11.01 58.3289 13.0114"
              stroke="#4F46E5"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          <h1 className="font-medium text-[32px]">Enrollment Confirmed! </h1>
          <p>
            You've successfully enrolled to the{" "}
            <span className="font-medium">"{courseTitle}"</span> Course!
          </p>
        </div>

        <button
          onClick={() => router.push(`/courses`)}
          className="flex items-center justify-around p-4.25 rounded-lg bg-[#4F46E5] text-white hover:opacity-80 w-full cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}

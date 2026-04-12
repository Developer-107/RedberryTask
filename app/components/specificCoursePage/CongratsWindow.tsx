import { useRouter } from "next/navigation";
import RatingStars from "./RatingStars";

interface Props {
  courseTitle?: string;
  courseId?: number;
}

export default function CongratsWindow({ courseTitle, courseId }: Props) {
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
              d="M21.886 42.2248L7.83301 81.795L47.4032 67.779M15.2293 11.5302H15.2663M81.796 30.0209H81.833M55.909 7.83203H55.946M81.796 74.3987H81.833M81.796 7.83203L73.5122 10.6056C71.1542 11.3911 69.1422 12.9711 67.8201 15.0757C66.498 17.1802 65.9479 19.6787 66.2638 22.1439C66.6336 25.3243 64.1558 28.1719 60.9015 28.1719H59.4962C56.3158 28.1719 53.5791 30.3907 52.9874 33.4972L52.2108 37.4172M81.796 48.5117L78.7635 47.2913C75.5831 46.0339 72.0329 48.0309 71.4412 51.3962C71.0344 53.9849 68.7785 55.908 66.1528 55.908H63.3053M41.1164 7.83203L42.3368 10.8645C43.5941 14.0449 41.5971 17.5951 38.2318 18.1869C35.6431 18.5567 33.7201 20.8495 33.7201 23.4752V26.3228"
              stroke="#1DC31D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41.1164 48.5121C48.2538 55.6495 51.5822 63.9334 48.5127 67.0028C45.4432 70.0723 37.1594 66.744 30.0219 59.6065C22.8845 52.4691 19.5562 44.1852 22.6256 41.1158C25.6951 38.0463 33.979 41.3746 41.1164 48.5121Z"
              stroke="#1DC31D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="font-medium text-[32px]">Congratulations!</h1>
          <p>
            You've completed{" "}
            <span className="font-medium">"{courseTitle}"</span> Course!
          </p>
        </div>

        <div className="flex flex-col gap-4.5 justify-center items-center mt-3 mb-10">
          <p className="text-[#736BEA]">Rate your Experience</p>

          <RatingStars courseId={courseId} />
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

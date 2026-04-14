import { useLogin } from "@/context/LoginModalContext";

interface Props {
  setCompleteProfileWindowOpen?: (type: boolean) => void;
}

export default function CompleteProfileWindow({ setCompleteProfileWindowOpen }: Props) {
  const { setProfileOpen } = useLogin();



  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center z-70 bg-[#000000]/25">
      <div className="flex flex-col min-w-114  justify-center p-15 items-center gap-10 bg-white rounded-lg mb-[10vh]">
        <div className="flex flex-col gap-6 justify-center items-center text-gray-700">
          <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M74.4167 82.25V74.4167C74.4167 70.2616 72.7661 66.2767 69.828 63.3387C66.89 60.4006 62.9051 58.75 58.75 58.75H35.25C31.095 58.75 27.1101 60.4006 24.172 63.3387C21.234 66.2767 19.5834 70.2616 19.5834 74.4167V82.25" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M47 43.0833C55.6525 43.0833 62.6667 36.0691 62.6667 27.4167C62.6667 18.7642 55.6525 11.75 47 11.75C38.3476 11.75 31.3334 18.7642 31.3334 27.4167C31.3334 36.0691 38.3476 43.0833 47 43.0833Z" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>


          <h1 className="flex items-center justify-center font-medium text-[32px] text-center">Complete your profile <br/> to continue</h1>
          <p className="flex flex-col items-center justify-center text-center">
           You need to complete your profile <br/> before enrolling in this course.
          </p>
        </div>

        <div className="w-full flex gap-2">
        <button
          onClick={() => {
            setCompleteProfileWindowOpen && setCompleteProfileWindowOpen(false);
            setProfileOpen(true)
          }}
          className="flex items-center justify-around p-4.25 rounded-lg bg-white border border-[#4F46E5] text-[#4F46E5] hover:opacity-80 w-full cursor-pointer text-nowrap"
        >
          Complete Profile
        </button>

        <button
          onClick={() => setCompleteProfileWindowOpen && setCompleteProfileWindowOpen(false)}
          className="flex items-center justify-around p-4.25 rounded-lg bg-[#4F46E5] border border-[#4F46E5] text-white hover:opacity-80 w-full cursor-pointer text-nowrap"
        >
          Cancel
        </button>
        </div>


      </div>
    </div>
  );
}

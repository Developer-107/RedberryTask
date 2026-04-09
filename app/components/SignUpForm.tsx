import { Eye, EyeOff, XIcon } from "lucide-react";
import { useState } from "react";
import { AvatarDropZone } from "./AvatarDropZone";
import { api } from "@/lib/api";
import { signIn } from "next-auth/react";
import ThreeMovingDots from "./ThreeMovingDots";

interface Props {
  setLoginOpen: (value: boolean) => void;
  setSignUpOpen: (value: boolean) => void;
}

export default function SignUpForm({ setLoginOpen, setSignUpOpen }: Props) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [username, setUsername] = useState("");

  const [avatarImgFiles, setAvatarImgFiles] = useState<
    (File | { url: string })[]
  >([]);

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email.trim()) {
      return "Email is required";
    }

    if (!password.trim()) {
      return "Password is required";
    }

    if (!repeatedPassword.trim()) {
      return "You should confirm password";
    }

    if (!username.trim()) {
      return "Username is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (email.trim().length < 3) {
      return "Email should be at least 3 characters";
    }

    if (password.trim().length < 3) {
      return "Password should be at least 3 characters";
    }

    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("email", email.toLowerCase());
      formData.append("password", password);
      formData.append("password_confirmation", repeatedPassword);

      if (avatarImgFiles?.[0] instanceof File) {
        formData.append("avatar", avatarImgFiles[0]);
      }

      const res = await api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { user, token } = res.data.data;

      console.log("Registered:", user);

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setSignUpOpen(false);
      setLoginOpen(false);
    } catch (err: any) {
      if (err.response) {
        const message =
          err.response.data?.message ||
          Object.values(err.response.data?.errors || {})
            .flat()
            .join(", ");

        setError(message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center z-70 bg-[#000000]/25">
      <div className="bg-white p-3 py-4 pb-9 rounded-lg mb-[10vh]">
        <XIcon
          size={20}
          color="#8A8A8A"
          className="ml-auto opacity-80 hover:opacity-100 cursor-pointer"
          onClick={() => setSignUpOpen(false)}
        />
        <div className="flex flex-col justify-center items-center px-10 mt-4">
          <h2 className="font-semibold text-[32px] text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">join and start learning today</p>

          {/* Dots */}
          <div className="flex gap-2 mt-5 w-full">
            {[...Array(3)].map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i + 1)}
                className={`w-full h-1.75 rounded-full cursor-pointer ${
                  step > i + 1
                    ? "bg-[#4F46E5]"
                    : step === i + 1
                      ? "bg-[#B7B3F4] transition duration-300"
                      : "bg-[#EEEDFC]"
                }`}
              />
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-5 gap-1 w-90"
          >
            {step === 1 && (
              <>
                <p className="self-start text-sm text-gray-800">Email*</p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="  w-full px-4 py-3 h-10 border-[1.5px] rounded-lg border-gray-200! text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <p className="self-start text-sm text-gray-800">Password*</p>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="px-4 py-3 w-full h-10 rounded-lg border-[1.5px] border-gray-200! text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(() => !showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm pr-1 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff strokeWidth={1.25} color="#ADADAD" />
                    ) : (
                      <Eye strokeWidth={1.25} color="#ADADAD" />
                    )}
                  </button>
                </div>

                <p className="mt-4 self-start text-sm text-gray-800">
                  Confirm Password*
                </p>
                <div className="relative w-full">
                  <input
                    type={"password"}
                    placeholder="••••••••"
                    className="px-4 py-3 w-full h-10 rounded-lg border-[1.5px] border-gray-200! text-sm"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    required
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm pr-1">
                    <svg
                      width="20"
                      height="8"
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.650391 0.650391C1.50946 1.61129 2.52088 2.44688 3.65039 3.12885M3.65039 3.12885C4.86689 3.86152 6.22501 4.37081 7.65039 4.62885C8.97164 4.86318 10.3291 4.86318 11.6504 4.62885C13.0758 4.37081 14.4339 3.86152 15.6504 3.12885M3.65039 3.12885L2.15039 4.80424M18.6504 0.650391C17.7913 1.61129 16.7799 2.44688 15.6504 3.12885M15.6504 3.12885L17.1504 4.80424M7.65039 4.62793L7.15039 6.65039M11.6504 4.62793L12.1504 6.65039"
                        stroke="#ADADAD"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="self-start text-sm text-gray-800">Username*</p>
                <input
                  type={"text"}
                  placeholder="Username"
                  className="px-4 py-3 w-full h-10 rounded-lg border-[1.5px] border-gray-200! text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <p className="mt-4 self-start text-sm text-gray-800">
                  Upload Avatar
                </p>
                <AvatarDropZone
                  files={avatarImgFiles}
                  onChange={(files) => setAvatarImgFiles(files.slice(0, 1))}
                />
              </>
            )}

            {error && (
              <p className="text-xs self-start" style={{ color: "#db2e3a" }}>
                {error}
              </p>
            )}

            {step <= 2 && (
              <button
                onClick={() => setStep(step + 1)}
                className="flex mt-3 w-full h-10 text-[16px] rounded-lg bg-[#4F46E5] text-white py-6 justify-center items-center hover:opacity-80 transition cursor-pointer"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="flex mt-3 w-full h-10 text-[16px] rounded-lg bg-[#4F46E5] text-white py-6 justify-center items-center hover:opacity-80 transition cursor-pointer"
                disabled={loading}
              >
                {loading ? <ThreeMovingDots /> : "Sign Up"}
              </button>
            )}
          </form>

          <div className="flex w-full items-center justify-center gap-2 my-4">
            <div className="bg-gray-200 h-px w-full" />
            <p className="text-gray-500">or</p>
            <div className="bg-gray-200 h-px w-full" />
          </div>
          <div className="flex gap-2 items-center text-xs text-gray-400">
            Already have an account?{" "}
            <span
              className="underline text-sm font-medium text-gray-900 hover:opacity-80 cursor-pointer"
              onClick={() => {
                (setSignUpOpen(false), setLoginOpen(true));
              }}
            >
              Log In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

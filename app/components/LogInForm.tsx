import { Eye, EyeOff, XIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

interface Props {
  setLoginOpen: (value: boolean) => void;
  setSignUpOpen: (value: boolean) => void;
}

export default function LogInForm({ setLoginOpen, setSignUpOpen }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Credentials sign in
    const result = await signIn("credentials", {
      redirect: false, // prevent automatic redirect
      email,
      password,
    });

    if (result?.error) {
      result?.status === 401
        ? setError("Credentials are not right. Please try again.")
        : setError("Something went wrong. Please try again.");
    } else {
      setError(null);
      setLoginOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center z-70 bg-[#000000]/25">
      <div className="bg-white p-3 py-4 pb-9 rounded-lg mb-[10vh]">
        <XIcon
          size={20}
          color="#8A8A8A"
          className="ml-auto opacity-80 hover:opacity-100 cursor-pointer"
          onClick={() => setLoginOpen(false)}
        />
        <div className="flex flex-col justify-center items-center px-10 mt-4">
          <h2 className="font-semibold text-[32px] text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">
            Log in to continue your learning
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center mt-5 gap-1 w-90"
          >
            <p className="self-start text-sm text-gray-800">Email</p>
            <input
              type="email"
              placeholder="you@example.com"
              className="  w-full px-4 py-3 h-10 border-[1.5px] rounded-lg border-gray-200! text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <p className=" mt-4 self-start text-sm text-gray-800">Password</p>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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
            {error && (
              <p className="text-xs self-start" style={{ color: "#db2e3a" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="flex mt-3 w-full h-10 text-[16px] rounded-lg bg-[#4F46E5] text-white py-6 justify-center items-center hover:opacity-80 transition cursor-pointer"
            >
              Log In
            </button>
          </form>
          <div className="flex w-full items-center justify-center gap-2 my-4">
            <div className="bg-gray-200 h-px w-full" />
            <p className="text-gray-500">or</p>
            <div className="bg-gray-200 h-px w-full" />
          </div>
          <div className="flex gap-2 items-center text-xs text-gray-400">
            Don't u have an account?{" "}
            <span
              className="underline text-sm font-medium text-gray-900 hover:opacity-80 cursor-pointer"
              onClick={() => {
                (setLoginOpen(false), setSignUpOpen(true));
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

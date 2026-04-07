"use client";

import Logo from "./components/Logo";
import { useSession } from "next-auth/react";
import BrowseCourse from "./components/navbar/BrowseCourse";
import NavbarSkeleton from "./components/navbar/NavbarSkeleton";
import EnrolledCourses from "./components/navbar/EnrolledCourses";
import AccountCircle from "./components/navbar/AccountCircle";
import { useState } from "react";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 bg-[#F5F5F5] flex w-full justify-between h-27 items-center py-6 px-44.25 border-b border-b-gray-200">
      <Logo contentSize={30} />

      <div className="flex items-center gap-5 ">
        <BrowseCourse />

        {status === "loading" ? (
          <NavbarSkeleton />
        ) : session ? (
          <div className="flex gap-7">
            <EnrolledCourses />
            <AccountCircle />
          </div>
        ) : (
          <div className="flex ml-2 gap-2">
            <button
              onClick={() => {
                (setLoginOpen(true), setSignUpOpen(false));
              }}
              className="px-4 py-2 border border-[#958FEF] text-[#4F46E5] rounded-lg hover:opacity-80 cursor-pointer"
            >
              {" "}
              Log in{" "}
            </button>
            <button
              onClick={() => {
                (setLoginOpen(false), setSignUpOpen(true));
              }}
              className="px-4 py-2 border border-[#4F46E5] bg-[#4F46E5] text-white rounded-lg hover:opacity-80 cursor-pointer"
            >
              {" "}
              Sign up{" "}
            </button>
          </div>
        )}
      </div>

      {/* Login */}
      {loginOpen && (
        <LogInForm setSignUpOpen={setSignUpOpen} setLoginOpen={setLoginOpen} />
      )}

      {/* Sign Up */}
      {signUpOpen && (
        <SignUpForm setSignUpOpen={setSignUpOpen} setLoginOpen={setLoginOpen} />
      )}
    </nav>
  );
}

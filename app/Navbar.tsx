"use client";

import Logo from "./components/Logo";
import { useSession } from "next-auth/react";
import BrowseCourse from "./components/navbar/BrowseCourse";
import NavbarSkeleton from "./components/navbar/NavbarSkeleton";
import EnrolledCourses from "./components/navbar/EnrolledCourses";
import AccountCircle from "./components/navbar/AccountCircle";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex w-full justify-between h-27 items-center py-6 px-44.25 border-b border-b-gray-200">
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
            <button className="px-4 py-2 border border-[#958FEF] text-[#4F46E5] rounded-lg hover:opacity-80 cursor-pointer">
              {" "}
              Log in{" "}
            </button>
            <button className="px-4 py-2 border border-[#4F46E5] bg-[#4F46E5] text-white rounded-lg hover:opacity-80 cursor-pointer">
              {" "}
              Sign up{" "}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

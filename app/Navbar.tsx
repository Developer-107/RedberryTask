"use client";

import Logo from "./components/Logo";
import { useSession } from "next-auth/react";
import BrowseCourse from "./components/navbar/BrowseCourse";
import NavbarSkeleton from "./components/navbar/NavbarSkeleton";
import EnrolledCourses from "./components/navbar/EnrolledCourses";
import { useEffect, useState } from "react";
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import ProfileWindow from "./components/ProfileWindow";
import Avatar from "./components/Avatar";
import { api } from "@/lib/api";
import { User } from "@/types/globalTypes";
import { useLogin } from "@/context/LoginModalContext";
import EnrolledCoursesWindow from "./components/navbar/EnrolledCoursesWindow";
import { useEnrolledCourses } from "@/context/EnrolledCoursesContext";

export default function Navbar() {
  const { data: session, status } = useSession();

  const { isLoginOpen, setLoginOpen, isProfileOpen, setProfileOpen } = useLogin();
  const { isEnrolledCoursesOpen, setEnrolledCoursesOpen } =
    useEnrolledCourses();

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!(session as any)?.accessToken) return;

      try {
        setLoading(true);

        const res = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        });

        setUser(res.data.data ?? {});
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session]);

  return (
    <nav className="fixed top-0 left-0 z-50 bg-[#F5F5F5] flex w-full justify-between h-27 items-center py-6 px-44.25 border-b border-b-gray-200">
      <Logo contentSize={30} />

      <div className="flex items-center gap-5 ">
        <BrowseCourse />

        {status === "loading" && loading ? (
          <NavbarSkeleton />
        ) : session ? (
          <div className="flex gap-7 items-center">
            <div
              className="h-full"
              onClick={() => setEnrolledCoursesOpen(true)}
            >
              <EnrolledCourses />
            </div>
            <div
              onClick={() => {
                setProfileOpen(true);
              }}
              className="rounded-full border border-gray-100 hover:border-[#B7B3F4] cursor-pointer"
            >
              <Avatar
                avatarImg={user?.avatar}
                isProfileComplete={user?.profileComplete}
              />
            </div>
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
      {isLoginOpen && (
        <LogInForm setSignUpOpen={setSignUpOpen} setLoginOpen={setLoginOpen} />
      )}

      {/* Sign Up */}
      {signUpOpen && (
        <SignUpForm setSignUpOpen={setSignUpOpen} setLoginOpen={setLoginOpen} />
      )}

      {/* Profile */}
      {isProfileOpen && (
        <ProfileWindow setProfileOpen={setProfileOpen} user={user} />
      )}

      {/* Enrolled Courses Window */}
      {isEnrolledCoursesOpen && <EnrolledCoursesWindow user={user} />}
    </nav>
  );
}

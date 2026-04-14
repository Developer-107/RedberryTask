import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AvatarDropZone } from "./AvatarDropZone";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { User } from "@/types/globalTypes";
import ThreeMovingDots from "./ThreeMovingDots";
import { useRouter } from "next/navigation";

interface Props {
  setProfileOpen: (value: boolean) => void;
  user: User | undefined;
}

export default function ProfileWindow({ setProfileOpen, user }: Props) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [isProfileComplete, setIsProfileComplete] = useState<
    Boolean | undefined
  >();

  const [avatarImg, setAvatarImg] = useState("");
  const [avatarImgFiles, setAvatarImgFiles] = useState<
    (File | { url: string })[]
  >([]);

  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    try {
      setUserName(user?.username ?? "");
      setFullName(user?.fullName ?? "");
      setEmail(user?.email ?? "");
      setAge(user?.age ?? "");
      setPhoneNumber(user?.mobileNumber ?? "");
      setAvatarImg(user?.avatar);
      if (user?.avatar) {
        setAvatarImgFiles([{ url: user.avatar }]);
      }
      setIsProfileComplete(user?.profileComplete);
    } catch (err) {
      console.log(err);
    } finally {
      setInitialLoading(false);
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!fullName) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (fullName.length < 3) {
      setError("Name must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (fullName.length > 50) {
      setError("Name must not exceed 50 characters");
      setLoading(false);
      return;
    }

    if (!phoneNumber) {
      setError("Mobile number is required");
      setLoading(false);
      return;
    }

    if (phoneNumber?.trim().length !== 9) {
      setError("Mobile number must be exactly 9 digits");
      setLoading(false);
      return;
    }

    if (!phoneNumber?.trim().startsWith("5")) {
      setError("Georgian mobile numbers must start with 5");
      setLoading(false);
      return;
    }

    if (phoneNumber?.trim().replace(/\s+/g, "").length !== 9) {
      setError("Mobile number must be exactly 9 digits");
      setLoading(false);
      return;
    }

    if (!age) {
      setError("Age is required");
      setLoading(false);
      return;
    }

    if (age < 16) {
      setError("You must be at least 16 years old to enroll");
      setLoading(false);
      return;
    }

    if (age > 120) {
      setError("Please enter a valid age");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("full_name", fullName?.trim());
      formData.append("mobile_number", phoneNumber?.trim().replace(/\s+/g, ""));
      formData.append("age", age.toString());

      if (avatarImgFiles?.[0] instanceof File) {
        formData.append("avatar", avatarImgFiles[0]);
      }

      const res = await api.put("/profile", formData, {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { user } = res.data.data;

      router.push("/");
      setProfileOpen(false);
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
          onClick={() => setProfileOpen(false)}
        />
        <div className="flex flex-col justify-center items-center px-10 mt-4">
          <h2 className="font-semibold text-[32px] text-gray-900">Profile</h2>

          <div className="self-start flex mt-4 items-center gap-3">
            <Avatar
              isProfileComplete={isProfileComplete}
              avatarImg={avatarImg}
            />

            <div className="flex flex-col gap-0.5">
              <p className="text-gray-900 font-medium semi-medium">
                {userName}
              </p>
              {isProfileComplete === undefined ? (
                <p className="text-xs text-[#F4161A]"> Profile is not found </p>
              ) : isProfileComplete === true ? (
                <p className="text-xs text-[#1DC31D]"> Profile is Complete </p>
              ) : (
                <p className="text-xs text-[#F4A316]">
                  {" "}
                  Profile is not Complete{" "}
                </p>
              )}
            </div>
          </div>

          <form
            onSubmit={handleUpdate}
            className="flex flex-col justify-center items-center mt-5 gap-1 w-90"
          >
            <p className="self-start text-sm text-gray-800">Full Name</p>
            <div className="relative w-full">
              <input
                type={"text"}
                placeholder="Full Name"
                className="px-4 py-3 w-full h-10 rounded-lg border-[1.5px] border-gray-200! text-gray-400 bg-gray-100 text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {fullName?.trim().length > 0 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-300">
                  <PencilIcon size={16} />
                </div>
              )}
            </div>

            <p className="mt-1 self-start text-sm text-gray-800">Email</p>
            <div className="relative w-full">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 h-10 border-[1.5px] text-gray-400 rounded-lg bg-gray-100 border-gray-200! text-sm"
                disabled
                value={email}
                required
              />
              {email?.trim().length > 0 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-300">
                  <CheckIcon size={16} />
                </div>
              )}
            </div>

            <div className="w-full flex mt-1 gap-2">
              <div className="w-full flex flex-col gap-1">
                <p className=" self-start text-sm text-gray-800">
                  Mobile Number
                </p>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="*********"
                    className="w-full px-4 pl-14 py-3 h-10 border-[1.5px] rounded-lg border-gray-200! text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-300">
                    +995
                  </div>

                  {phoneNumber?.trim().length > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-300">
                      <CheckIcon size={16} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className=" self-start text-sm text-gray-800">Age</p>
                <input
                  type="number"
                  placeholder="Age"
                  className="w-20 px-4 py-3 h-10 border-[1.5px] rounded-lg border-gray-200! text-sm"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <p className="mt-4 self-start text-sm text-gray-800">
              Upload Avatar
            </p>
            <AvatarDropZone
              files={avatarImgFiles}
              onChange={(files) => setAvatarImgFiles(files.slice(0, 1))}
            />

            {error && (
              <p
                className="mt-4 text-xs self-start"
                style={{ color: "#db2e3a" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex mt-3 w-full h-10 text-[16px] rounded-lg bg-[#4F46E5] text-white py-6 justify-center items-center hover:opacity-80 transition cursor-pointer"
              disabled={loading}
            >
              {loading ? <ThreeMovingDots /> : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

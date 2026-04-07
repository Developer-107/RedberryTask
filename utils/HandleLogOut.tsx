import { api } from "@/lib/api";
import { signOut, useSession } from "next-auth/react";

const { data: session } = useSession();

const handleLogout = async () => {
  try {
    if ((session as any).accessToken) {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
  }

  await signOut({ callbackUrl: "/" });
};
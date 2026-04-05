import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "AUTHOR" | "EDITOR" | "ADMIN";
      email?: string | null;
      name?: string | null;
      image?: string | null;
      surname?: string | null;
      phoneNumber?: string | null;
      address?: string | null;
    };
  }

  interface User {
    id: string;
    role: "USER" | "AUTHOR" | "EDITOR" | "ADMIN";
    surname?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
  }
}
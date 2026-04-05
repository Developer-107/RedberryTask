import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/lib/api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("INVALID_INPUT");
        }

        try {
          const res = await api.post(
            "/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          const { user, token } = res.data.data;

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            image: user.avatar,
            accessToken: token,
          } as any;
        } catch (err: any) {
          throw new Error(err.response?.data?.message || "INVALID_CREDENTIALS");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

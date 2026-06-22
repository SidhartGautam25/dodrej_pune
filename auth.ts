import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminUser = process.env.ADMIN_USER || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "godrej2026";

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "admin-id",
            name: "Godrej Admin",
            email: "admin@godrej.in",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

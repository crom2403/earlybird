// src/lib/auth.ts
import { SessionType } from "@/types"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      ;(session.user as SessionType).id = token.sub!
      return session
    },
  },
  // Customize login page
  pages: {
    signIn: "/login",
  },
}

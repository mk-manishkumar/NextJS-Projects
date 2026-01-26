import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User.model";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) throw new Error("Missing credentials");

        const identifier = credentials.identifier.toLowerCase();
        const isEmail = identifier.includes("@");

        await connectDB();

        const user = await User.findOne(isEmail ? { email: identifier } : { username: identifier }).select("+password");

        if (!user || !user.password) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isMatch) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
          image: user.image || null,
          createdAt: user.createdAt.toISOString(),
        };
      },
    }),
  ],

  callbacks: {
  async jwt({ token, user, trigger, session }) {
    // Initial sign-in
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.username = user.username;
      token.createdAt = user.createdAt;
    }

    // ✅ REQUIRED for client-side update()
    if (trigger === "update" && session) {
      token.name = session.name;
      token.email = session.email;
      token.username = session.username;
    }

    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id as string;
    session.user.name = token.name as string;
    session.user.email = token.email as string;
    session.user.username = token.username as string;
    session.user.createdAt = token.createdAt as string;

    return session;
  },
},


  pages: {
    signIn: "/login",
  },
};

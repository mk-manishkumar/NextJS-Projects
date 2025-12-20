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
          image: user.image || null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
};

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from './db';
import User from '@/model/User.model';
import bcrypt from 'bcryptjs';

const authOptions:NextAuthOptions={
  providers:[
    // how to login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) throw new Error("Email or Password is not found");

        await connectDb();

        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Credentials");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };      
      },


    })
  ],

  callbacks:{
    async jwt({token,user}){
      if (user) {
        token.id=user.id;
        token.name=user.name;
        token.email=user.email;
        token.image=user.image;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  },

  pages : {
    signIn: "/login",
    error: "/login",
  },

  secret : process.env.NEXT_AUTH_SECRET,
}

export default authOptions;
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import User from "@/models/User.model";

export const PUT = async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, username, email } = await req.json();

    if (!name || !username || !email) return NextResponse.json({ message: "All fields are required" }, { status: 400 });

    await connectDB();

    // Prevent duplicate username/email
    const existingUser = await User.findOne({
      _id: { $ne: token.id },
      $or: [{ email }, { username }],
    });

    if (existingUser) return NextResponse.json({ message: "Email or username already in use" }, { status: 409 });

    const user = await User.findByIdAndUpdate(token.id, { name, username, email }, { new: true }).select("name username email");

    return NextResponse.json({ success: true, user });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

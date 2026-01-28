import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User.model";
import UserLink from "@/models/UserLink.model";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { password } = await req.json();

    if (!password) return NextResponse.json({ message: "Password is required" }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).select("+password");

    if (!user || !user.password) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return NextResponse.json({ message: "Incorrect password" }, { status: 400 });

    // ✅ Cascade delete
    await UserLink.deleteMany({ userId: user._id });
    await User.deleteOne({ _id: user._id });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

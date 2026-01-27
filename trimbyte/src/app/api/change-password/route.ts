import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User.model";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) { return NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) { return NextResponse.json({ message: "Missing fields" }, { status: 400 }) }

    await connectDB();

    const user = await User.findOne({email: session.user.email}).select("+password");

    if (!user) { return NextResponse.json({ message: "User not found" }, { status: 404 }) }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) { return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 }) }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return NextResponse.json({ message: "Password updated" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

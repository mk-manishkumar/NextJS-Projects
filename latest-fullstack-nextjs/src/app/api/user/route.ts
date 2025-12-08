import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/model/User.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ message: "User does not have a Session" }, { status: 400 });
    }
    const user = await User.findById(session.user.id).select("-password");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `User get error ${error}` }, { status: 500 });
  }
};

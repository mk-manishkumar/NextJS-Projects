import { connectDB } from "@/lib/db";
import { loginSchema } from "@/lib/validations/login.schema";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0].message }, { status: 400 });

    const { identifier, password } = parsed.data;

    const normalizedIdentifier = identifier.toLowerCase();
    const isEmail = normalizedIdentifier.includes("@");

    await connectDB();

    const user = await User.findOne(isEmail ? { email: normalizedIdentifier } : { username: normalizedIdentifier }).select("+password");

    if (!user || !user.password) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error("LOGIN_ERROR:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
};

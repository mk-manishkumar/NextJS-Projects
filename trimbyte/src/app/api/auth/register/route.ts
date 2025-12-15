import { connectDB } from "@/lib/db";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { registerSchema } from "@/lib/validations/register.schema";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0].message }, { status: 400 });

    const { name, username, email, password } = parsed.data;

    const normalizedEmail = email.toLowerCase();
    const normalizedUsername = username.toLowerCase();

    const existUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existUser) return NextResponse.json({ message: "User already exist!" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
};

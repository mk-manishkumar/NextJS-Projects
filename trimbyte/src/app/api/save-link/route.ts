import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";

export const POST = async (req: NextRequest) => {
  try {
    // 🔐 Auth check
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { slug, title } = body;

    if (!slug || !title?.trim()) return NextResponse.json({ message: "Slug and title are required" }, { status: 400 });

    await connectDB();

    // 🔎 Ensure link belongs to this user
    const link = await UserLink.findOne({ slug, userId: token.id });

    if (!link) return NextResponse.json({ message: "Link not found" }, { status: 404 });

    // 🚫 Check if already saved (by original URL)
    const alreadySaved = await UserLink.findOne({
      userId: token.id,
      originalUrl: link.originalUrl,
      savedAt: { $ne: null },
    });

    if (alreadySaved) return NextResponse.json({ message: "This link is already saved" }, { status: 409 });

    // ✅ Save the link
    link.title = title.trim();
    link.savedAt = new Date();

    await link.save();

    return NextResponse.json({ success: true, message: "Link saved successfully" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

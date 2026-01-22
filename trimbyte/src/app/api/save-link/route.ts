import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";

export const POST = async (req: NextRequest) => {
  try {
    const token = await getToken({req,secret: process.env.NEXTAUTH_SECRET,});

    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const body = await req.json();
    const { linkId, title } = body;

    if (!linkId || !title?.trim()) return NextResponse.json({ message: "Link ID and title are required" }, { status: 400 });

    await connectDB();

    const link = await UserLink.findOne({_id: linkId,userId: token.id,});

    if (!link) return NextResponse.json({ message: "Link not found" }, { status: 404 });

    if (link.savedAt) return NextResponse.json({ message: "Link already saved" }, { status: 409 });

    const duplicate = await UserLink.findOne({userId: token.id,originalUrl: link.originalUrl,savedAt: { $ne: null }});

    if (duplicate) return NextResponse.json({ message: "This link is already saved" }, { status: 409 });

    link.title = title.trim();
    link.savedAt = new Date();
    await link.save();

    return NextResponse.json({success: true,savedAt: link.savedAt.toISOString(),});
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";

export const DELETE = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    const result = await UserLink.updateOne(
      { _id: id, userId: token.id },
      {
        $set: { savedAt: null },
        $unset: { title: "" },
      }
    );

    if (result.matchedCount === 0) return NextResponse.json({ message: "Link not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

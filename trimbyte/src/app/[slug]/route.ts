import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";
import AnonymousLink from "@/models/AnonymousLink.model";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) => {
  try {
    await connectDB();

    const { slug } = await context.params;

    const userLink = await UserLink.findOneAndUpdate(
      { slug },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (userLink) return NextResponse.redirect(userLink.originalUrl);
    
    const anonymousLink = await AnonymousLink.findOne({ slug });

    if (anonymousLink) return NextResponse.redirect(anonymousLink.originalUrl);
    

    return NextResponse.json(
      { message: "Link not found" },
      { status: 404 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ message: "Internal server error" },{ status: 500 });
  }
};

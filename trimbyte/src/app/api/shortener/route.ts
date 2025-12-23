import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/db";
import AnonymousLink from "@/models/AnonymousLink.model";
import UserLink from "@/models/UserLink.model";

const SLUG_LENGTH = 6;
const MAX_RETRIES = 5;

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    let url: string = body.url;

    if (!url) return NextResponse.json({ message: "URL is required" }, { status: 400 });

    if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ message: "Invalid URL format" }, { status: 400 });
    }

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    let slug = "";
    let shortUrl = "";
    let isUnique = false;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      slug = nanoid(SLUG_LENGTH);
      shortUrl = `${protocol}://${host}/${slug}`;

      const existsInUserLinks = await UserLink.exists({ slug });
      const existsInAnonymousLinks = await AnonymousLink.exists({ slug });

      if (!existsInUserLinks && !existsInAnonymousLinks) {
        isUnique = true;
        break;
      }
    }

    if (!isUnique) return NextResponse.json({ message: "Failed to generate unique URL. Try again." }, { status: 500 });

    if (token?.id) {
      await UserLink.create({
        originalUrl: url,
        shortUrl,
        slug,
        userId: token.id,
      });
    } else {
      await AnonymousLink.create({
        originalUrl: url,
        shortUrl,
        slug,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }

    return NextResponse.json({
      success: true,
      slug,
      originalUrl: url,
      shortUrl,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
};

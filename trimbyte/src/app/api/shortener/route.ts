import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    let url: string = body.url;

    if (!url) return NextResponse.json({ message: "URL is required" }, { status: 400 });

    if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ message: "Invalid URL format" }, { status: 400 });
    }

    const slug = nanoid(6);

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const shortUrl = `${protocol}://${host}/${slug}`;

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

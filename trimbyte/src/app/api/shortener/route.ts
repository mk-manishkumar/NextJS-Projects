import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  let url = body.url;

  if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;

  const slug = nanoid(6);

  const host = req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  const shortUrl = `${protocol}://${host}/${slug}`;

  return NextResponse.json({
    message: "Short URL Generated",
    slug,
    originalUrl: url,
    shortUrl,
  });
};

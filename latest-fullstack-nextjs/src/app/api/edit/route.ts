import authOptions from "@/lib/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import User from "@/model/User.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ message: "User does not have a Session" }, { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as Blob | null;

    let imageUrl;

    if (file) imageUrl = await uploadOnCloudinary(file);

    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name,
        image: imageUrl,
      },
      { new: true }
    );

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Edit Error ${error}` }, { status: 500 });
  }
};

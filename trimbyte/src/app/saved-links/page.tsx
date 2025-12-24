import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";
import { authOptions } from "@/lib/auth";
import SavedLinksClient from "./SavedLinksClient";

const SavedLinks = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  await connectDB();

  const savedLinks = await UserLink.find({
    userId: session.user.id,
    savedAt: { $ne: null },
  })
    .sort({ savedAt: -1 })
    .lean();

  const serializedLinks = savedLinks.map((link) => ({
    ...link,
    _id: link._id.toString(),
  }));

  return <SavedLinksClient links={serializedLinks} />;
};

export default SavedLinks;

import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";
import { authOptions } from "@/lib/auth";
import PreviousLinksList from "./PreviousLinksList";

const PreviousLinks = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  await connectDB();

  const links = await UserLink.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  // ✅ Serialize for Client Component
  const serializedLinks = links.map((link) => ({
    _id: link._id.toString(),
    originalUrl: link.originalUrl,
    shortUrl: link.shortUrl,
    clicks: link.clicks,
    savedAt: link.savedAt ? link.savedAt.toISOString() : null,
    createdAt: link.createdAt.toISOString(),
  }));

  return (
    <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="container max-w-[1200px] mx-auto">
        <h1 className="text-[32px] sm:text-[42px] font-extrabold text-white text-center mb-10 drop-shadow-lg">
          Previous Work
        </h1>

        <PreviousLinksList links={serializedLinks} />
      </div>
    </div>
  );
};

export default PreviousLinks;

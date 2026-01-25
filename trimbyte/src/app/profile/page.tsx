import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";
import { authOptions } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  await connectDB();

  const userId = session.user.id;

  const totalLinks = await UserLink.countDocuments({ userId });

  const savedLinks = await UserLink.countDocuments({ userId, savedAt: { $ne: null }, });

  const clicksAgg = await UserLink.aggregate([
    { $match: { userId } },
    { $group: { _id: null, totalClicks: { $sum: "$clicks" }, }, },]);

  const totalClicks = clicksAgg[0]?.totalClicks || 0;

  // ✅ Fetch last 3 saved links
  const recentSavedLinks = await UserLink.find({ userId, savedAt: { $ne: null } }).sort({ savedAt: -1 }).limit(3).select("title shortUrl").lean();

  const serializedRecentSavedLinks = recentSavedLinks.map((link) => ({
    _id: link._id.toString(),
    title: link.title!,
    shortUrl: link.shortUrl,
  }));

  return (
    <ProfileClient stats={{ totalLinks, totalClicks, savedLinks }} recentSavedLinks={serializedRecentSavedLinks} />
  );
};

export default ProfilePage;

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

  const savedLinks = await UserLink.countDocuments({
    userId,
    savedAt: { $ne: null },
  });

  const clicksAgg = await UserLink.aggregate([
    { $match: { userId: userId } },
    {
      $group: {
        _id: null,
        totalClicks: { $sum: "$clicks" },
      },
    },
  ]);

  const totalClicks = clicksAgg[0]?.totalClicks || 0;

  return (
    <ProfileClient
      stats={{
        totalLinks,
        totalClicks,
        savedLinks,
      }}
    />
  );
};

export default ProfilePage;

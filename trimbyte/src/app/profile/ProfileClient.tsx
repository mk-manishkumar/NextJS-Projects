"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface Props {
  stats: {
    totalLinks: number;
    totalClicks: number;
    savedLinks: number;
  };
}

const ProfileClient = ({ stats }: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const user = session?.user;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <button
        onClick={handleLogout}
        className="mb-8 ml-32 bg-white py-2 px-5 cursor-pointer rounded-md"
      >
        Log Out
      </button>

      <div className="container max-w-[1200px] mx-auto">
        <div className="bg-white rounded-[20px] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-[30px] mb-10">
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-linear-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-[40px] sm:text-[48px] text-white shrink-0">
              JD
            </div>

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-[28px] sm:text-[32px] mb-1.5 text-[#333] font-bold">
                {user?.name}
              </h2>
              <p className="text-[#666] text-sm sm:text-base mb-1">
                {user?.username}
              </p>
              <p className="text-[#666] text-sm sm:text-base mb-1">
                {user?.email}
              </p>
              <p className="text-xs sm:text-sm text-[#999]">
                Member since {memberSince}
              </p>
            </div>

            <Link
              href="/edit-profile"
              className="bg-linear-to-br from-[#667eea] to-[#764ba2] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_5px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span className="hidden sm:inline">✏️</span>
              <span className="sm:hidden">Edit Profile</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-6 rounded-xl text-center text-white">
              <div className="text-[36px] font-bold mb-1.5">
                {stats.totalLinks}
              </div>
              <div className="text-sm opacity-90">Total Links</div>
            </div>

            <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-6 rounded-xl text-center text-white">
              <div className="text-[36px] font-bold mb-1.5">
                {stats.totalClicks}
              </div>
              <div className="text-sm opacity-90">Total Clicks</div>
            </div>

            <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-6 rounded-xl text-center text-white">
              <div className="text-[36px] font-bold mb-1.5">
                {stats.savedLinks}
              </div>
              <div className="text-sm opacity-90">Saved Links</div>
            </div>
          </div>

          <Link
            href="/saved-links"
            className="w-full p-4 border-2 border-[#667eea] text-[#667eea] rounded-xl font-semibold cursor-pointer transition-all duration-300 mt-5 hover:bg-[#667eea] hover:text-white text-center block"
          >
            View All Saved Links →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;

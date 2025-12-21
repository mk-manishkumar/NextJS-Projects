"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="container max-w-[1200px] mx-auto">
        <div className="bg-white rounded-[20px] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-[30px] mb-10">
            {/* Profile Image */}
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-linear-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-[40px] sm:text-[48px] text-white shrink-0">JD</div>

            {/* Profile Details */}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-[28px] sm:text-[32px] mb-1.5 text-[#333] font-bold">{user?.name}</h2>
              <p className="text-[#666] text-sm sm:text-base mb-1">{user?.username}</p>
              <p className="text-[#666] text-sm sm:text-base mb-1">{user?.email}</p>
              <p className="text-xs sm:text-sm text-[#999]">Member since {memberSince}</p>
            </div>

            <Link href="/edit-profile" className="bg-linear-to-br from-[#667eea] to-[#764ba2] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-[0_5px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2">
              <span className="hidden sm:inline">✏️</span>
              <span className="sm:hidden">Edit Profile</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-6 rounded-xl text-center text-white">
              <div className="text-[36px] font-bold mb-1.5">47</div>
              <div className="text-sm opacity-90">Total Links</div>
            </div>

            <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-6 rounded-xl text-center text-white">
              <div className="text-[36px] font-bold mb-1.5">1.2K</div>
              <div className="text-sm opacity-90">Total Clicks</div>
            </div>

            <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-6 rounded-xl text-center text-white">
              <div className="text-[36px] font-bold mb-1.5">12</div>
              <div className="text-sm opacity-90">Saved Links</div>
            </div>
          </div>

          {/* Recent Saved Links */}
          <h3 className="text-[20px] sm:text-[24px] font-bold mb-5 text-[#333]">Recent Saved Links</h3>

          {[
            {
              title: "Product Launch Video",
              url: "https://short.link/prod-launch",
            },
            {
              title: "Marketing Campaign",
              url: "https://short.link/campaign-2024",
            },
            {
              title: "Documentation Guide",
              url: "https://short.link/docs",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#f8f9fa] p-5 rounded-xl mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:translate-x-1.5 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
              <div className="break-all sm:break-normal">
                <h3 className="text-[#333] mb-1.5 font-semibold">{item.title}</h3>
                <p className="text-[#667eea] text-sm">{item.url}</p>
              </div>

              <div className="flex gap-2.5">
                <button type="button" className="w-10 h-10 rounded-lg cursor-pointer transition-all duration-300 text-lg bg-[#667eea] text-white hover:scale-110">
                  📋
                </button>
              </div>
            </div>
          ))}

          <Link href="/saved" className="w-full p-4 border-2 border-[#667eea] text-[#667eea] rounded-xl font-semibold cursor-pointer transition-all duration-300 mt-5 hover:bg-[#667eea] hover:text-white text-center block">
            View All Saved Links →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

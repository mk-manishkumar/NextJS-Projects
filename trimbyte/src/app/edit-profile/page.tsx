"use client";

import { useState } from "react";

const EditProfile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="container max-w-[1200px] mx-auto">
        <h1 className="text-[32px] sm:text-[42px] font-extrabold text-white text-center mb-10 drop-shadow-lg">Edit Profile</h1>

        <div className="bg-white rounded-[20px] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-[800px] mx-auto">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[120px] h-[120px] rounded-full bg-linear-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-[48px] text-white mb-4">JD</div>
            <label htmlFor="profile-image" className="bg-linear-to-br from-[#667eea] to-[#764ba2] text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:shadow-[0_5px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 transition-all duration-300">
              Upload Image
            </label>
            <input type="file" id="profile-image" className="hidden" accept="image/*" />
          </div>

          {/* Profile Information */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 font-semibold text-[#333]">
              Full Name
            </label>
            <input type="text" id="name" defaultValue="John Doe" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300" placeholder="Enter full name" />
          </div>

          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 font-semibold text-[#333]">
              Username
            </label>
            <input type="text" id="username" defaultValue="johndoe" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300" placeholder="Enter username" />
          </div>

          <div className="mb-8">
            <label htmlFor="email" className="block mb-2 font-semibold text-[#333]">
              Email
            </label>
            <input type="email" id="email" defaultValue="john.doe@example.com" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300" placeholder="Enter email" />
          </div>

          <button className="w-full py-3 sm:py-4 px-2 sm:px-10 bg-linear-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold text-base hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-none cursor-pointer mb-6">Save Changes</button>

          {/* Divider */}
          <div className="border-t-2 border-[#e0e0e0] my-8"></div>

          {/* Change Password Section */}
          <div className="mb-6">
            <button onClick={() => setShowChangePassword(!showChangePassword)} className="w-full p-4 bg-[#f8f9fa] border-2 border-[#e0e0e0] text-[#333] rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:bg-[#e9ecef] flex justify-between items-center">
              <span>Change Password</span>
              <span className={`transition-transform duration-300 ${showChangePassword ? "rotate-180" : ""}`}>▼</span>
            </button>

            {showChangePassword && (
              <div className="mt-4 p-6 bg-[#f8f9fa] rounded-xl border-2 border-[#e0e0e0]">
                <div className="mb-4">
                  <label htmlFor="old-password" className="block mb-2 font-semibold text-[#333]">
                    Old Password
                  </label>
                  <input type="password" id="old-password" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300 bg-white" placeholder="Enter old password" />
                </div>

                <div className="mb-4">
                  <label htmlFor="new-password" className="block mb-2 font-semibold text-[#333]">
                    New Password
                  </label>
                  <input type="password" id="new-password" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300 bg-white" placeholder="Enter new password" />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirm-password" className="block mb-2 font-semibold text-[#333]">
                    Confirm New Password
                  </label>
                  <input type="password" id="confirm-password" className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] text-base focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] transition-all duration-300 bg-white" placeholder="Confirm new password" />
                </div>

                <button className="w-full py-3 px-10 bg-linear-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold text-base hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)] transition-all duration-300 border-none cursor-pointer">Update Password</button>
              </div>
            )}
          </div>

          {/* Delete Profile Section */}
          <div className="mb-6">
            <button onClick={() => setShowDeleteProfile(!showDeleteProfile)} className="w-full p-4 bg-[#fff5f5] border-2 border-[#ff6b6b] text-[#ff6b6b] rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:bg-[#ffe5e5] flex justify-between items-center">
              <span>Delete Profile</span>
              <span className={`transition-transform duration-300 ${showDeleteProfile ? "rotate-180" : ""}`}>▼</span>
            </button>

            {showDeleteProfile && (
              <div className="mt-4 p-6 bg-[#fff5f5] rounded-xl border-2 border-[#ff6b6b]">
                <p className="text-[#ff6b6b] font-semibold mb-4 text-sm">⚠️ Warning: This action cannot be undone. All your data will be permanently deleted.</p>

                <div className="mb-4">
                  <label htmlFor="delete-password" className="block mb-2 font-semibold text-[#333]">
                    Enter Password to Confirm
                  </label>
                  <input type="password" id="delete-password" className="w-full p-[15px] border-2 border-[#ff6b6b] rounded-[10px] text-base focus:outline-none focus:border-[#ff4757] focus:shadow-[0_0_0_3px_rgba(255,107,107,0.1)] transition-all duration-300 bg-white" placeholder="Enter your password" />
                </div>

                <button className="w-full py-3 px-10 bg-[#ff6b6b] text-white rounded-xl font-semibold text-base hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(255,107,107,0.4)] transition-all duration-300 border-none cursor-pointer">Delete My Account</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

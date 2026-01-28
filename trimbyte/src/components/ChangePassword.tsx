"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/change-password", {currentPassword, newPassword});

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-6 bg-[#f8f9fa] rounded-xl border-2 border-[#e0e0e0]">
      {/* Current Password */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-[#333]">Current Password</label>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full p-[14px] border-2 border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#667eea]" placeholder="Enter your current password"/>
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-[#333]">New Password</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-[14px] border-2 border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#667eea]" placeholder="Enter your new password" />
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-[#333]">Confirm New Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-[14px] border-2 border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#667eea]" placeholder="Confirm your new password" />
      </div>

      <button onClick={handleChangePassword} disabled={loading} className="w-full py-3 bg-linear-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold disabled:opacity-60 cursor-pointer">{loading ? "Updating..." : "Update Password"}</button>
    </div>
  );
};

export default ChangePassword;

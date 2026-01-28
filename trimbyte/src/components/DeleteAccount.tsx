"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/delete-account", { password });

      toast.success("Account deleted successfully");

      // Logout & redirect
      await signOut({ callbackUrl: "/" });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-6 bg-[#fff5f5] rounded-xl border-2 border-[#ff6b6b]">
      <p className="text-[#ff6b6b] font-semibold mb-4 text-sm">⚠️ This action is irreversible. All your data will be permanently deleted.</p>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-[#333]">Enter Password to Confirm</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-[14px] border-2 border-[#ff6b6b] rounded-lg focus:outline-none focus:border-[#ff4757]" placeholder="Enter your password" />
      </div>

      <button onClick={handleDelete} disabled={loading} className="w-full py-3 bg-[#ff6b6b] text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-60 cursor-pointer">
        {loading ? "Deleting..." : "Delete My Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;

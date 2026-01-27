"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ChangePassword from "@/components/ChangePassword";

const EditProfile = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setUsername(session.user.username || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  if (status === "loading") return null;

  const handleSave = async () => {
    if (!name.trim() || !username.trim() || !email.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put("/api/update-profile", {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
      });

      await update({
        name: res.data.user.name,
        username: res.data.user.username,
        email: res.data.user.email,
      });

      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="container max-w-[1200px] mx-auto">
        <h1 className="text-[32px] sm:text-[42px] font-extrabold text-white text-center mb-10 drop-shadow-lg">
          Edit Profile
        </h1>

        <div className="bg-white rounded-[20px] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-[800px] mx-auto">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[120px] h-[120px] rounded-full bg-linear-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-[48px] text-white mb-4">
              {name?.[0] || "U"}
            </div>
            <label className="bg-linear-to-br from-[#667eea] to-[#764ba2] text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed opacity-60">Upload Image</label>
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-[#333]">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#667eea]" />
          </div>

          {/* Username */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-[#333]">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#667eea]" />
          </div>

          {/* Email */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-[#333]">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-[15px] border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#667eea]" />
          </div>

          <button onClick={handleSave} disabled={loading} className="w-full py-3 bg-linear-to-br from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-60 cursor-pointer mb-6">{loading ? "Saving..." : "Save Changes"}</button>

          {/* Divider */}
          <div className="border-t-2 border-[#e0e0e0] my-8"></div>

          {/* Change Password */}
          <div className="mb-6">
            <button onClick={() => setShowChangePassword(!showChangePassword)} className="w-full p-4 bg-[#f8f9fa] border-2 border-[#e0e0e0] rounded-xl font-semibold flex justify-between items-center"><span>Change Password</span><span className={`transition-transform ${showChangePassword ? "rotate-180" : ""}`}>▼</span></button>
            {showChangePassword && <ChangePassword />}
          </div>

          {/* Delete Account */}
          <div>
            <button onClick={() => setShowDeleteProfile(!showDeleteProfile)} className="w-full p-4 bg-[#fff5f5] border-2 border-[#ff6b6b] text-[#ff6b6b] rounded-xl font-semibold flex justify-between items-center">
              <span>Delete Profile</span>
              <span className={`transition-transform ${showDeleteProfile ? "rotate-180" : ""}`}>▼</span>
            </button>

            {showDeleteProfile && (
              <div className="mt-4 p-6 bg-[#fff5f5] rounded-xl border-2 border-[#ff6b6b] opacity-60">
                <p className="text-sm font-semibold">
                  ⚠️ Account deletion will be available later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

"use client";

import { userDataContext } from "@/context/UserContext";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { HiPencil } from "react-icons/hi";

const Page = () => {
  const { user } = useContext(userDataContext)!;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {user && (
        <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center">
          <HiPencil size={22} color="white" className="absolute right-5 top-5 cursor-pointer" onClick={() => router.push("/edit")} />

          {user.image && (
            <div className="relative w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden">
              <Image src={user.image} fill alt="userImage" />
            </div>
          )}

          <h1 className="text-2xl font-semibold my-4">Welcome, {user.name}</h1>

          <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed" onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      )}

      {!user && <div className="text-white text-2xl">Loading...</div>}
    </div>
  );
};

export default Page;

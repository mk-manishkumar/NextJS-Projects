"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Router } from "next/router";
import { useState } from "react";
import { HiPencil } from "react-icons/hi";

const Page = () => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {data && (
        <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center">
          <HiPencil size={22} color="white" className="absolute right-5 top-5 cursor-pointer" onClick={() => Router.push("/edit")} />

          {data.user?.image && (
            <div className="relative w-[200px] h-[200px] rounded-full border-2 border-white overflow-hidden">
              <Image src={data.user.image} fill alt="userImage" />
            </div>
          )}

          <h1 className="text-2xl font-semibold my-4">Welcome, {data.user?.name}</h1>

          <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}

      {!data && <div className="text-white text-2xl">Loading...</div>}
    </div>
  );
};

export default Page;

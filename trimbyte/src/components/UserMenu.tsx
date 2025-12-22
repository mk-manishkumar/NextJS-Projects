"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const UserMenu = () => {
  const { status } = useSession();

  if (status === "loading") return null;

  return (
    <>
      {status === "authenticated" ? (
        <Link href="/profile" className="bg-white text-[#667eea] py-3 px-7 rounded-[25px] font-semibold cursor-pointer shadow-md transition-all duration-500 ease-in-out hover:bg-black hover:text-white hover:shadow-lg">
          Profile
        </Link>
      ) : (
        <Link href="/login" className="bg-white text-[#667eea] py-3 px-7 rounded-[25px] font-semibold cursor-pointer shadow-md transition-all duration-500 ease-in-out hover:bg-black hover:text-white hover:shadow-lg">
          Sign In
        </Link>
      )}
    </>
  );
};

export default UserMenu;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-5 py-5 px-10">
      {/* Logo */}
      <Link href="/" className="text-3xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        Trim<span className="text-[#ffd93d]">Byte</span>
      </Link>

      {/* Right side */}
      {!isAuthPage ? (
        // Default Navbar
        <Link href="/login" className="bg-white text-[#667eea] py-3 px-7 rounded-[25px] font-semibold cursor-pointer shadow-md transition-all duration-500 ease-in-out hover:bg-black hover:text-white hover:shadow-lg">
          Sign In
        </Link>
      ) : (
        // Auth Page Navbar
        <Link href="/" className="text-black bg-white font-medium hover:bg-black hover:text-white px-6 py-3 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-700 ease-in-out inline-flex items-center gap-2">
          ← Back to Home
        </Link>
      )}
    </header>
  );
};

export default Navbar;

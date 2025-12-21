"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

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
        <UserMenu />
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

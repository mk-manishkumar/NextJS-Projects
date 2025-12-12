import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-5 py-5 px-10">
      <div className="">
        <Link href={"/"} className="text-3xl font-extrabold text-white text-shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
          Trim<span className="text-[#ffd93d]">Byte</span>
        </Link>
      </div>
      <div>
        <Link href={"/login"}
          className="bg-white text-[#667eea] py-3 px-7 rounded-[25px] font-semibold 
         cursor-pointer shadow-md transition-transform duration-300
         hover:-translate-y-0.5 hover:shadow-xl"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Navbar
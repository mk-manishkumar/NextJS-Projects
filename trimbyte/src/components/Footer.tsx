import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <p className="text-white text-center py-5">
        © 2025 TrimByte. Made with ❤️ by{" "}
        <Link href={"https://manishmk.vercel.app/"} target="_blank" rel="noopener noreferrer">
          Manish Kumar
        </Link>{" "}
      </p>
    </div>
  );
};

export default Footer;

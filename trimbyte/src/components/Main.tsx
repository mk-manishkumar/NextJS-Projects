"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Main = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/api/shortener", {
        url: originalUrl,
      });
      const shortUrl = res.data.shortUrl;
      setShortenUrl(shortUrl);
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error(error);
    }
  };

  return (
    <>
      <div>
        {/* Main title */}
        <h2 className="text-3xl sm:text-[42px] font-extrabold text-white text-center mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">Shorten Your Links</h2>
      </div>

      {/* Card */}
      <div className="bg-white mx-auto p-10 mb-8 rounded-3xl w-full lg:w-1/2 h-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3.5 mb-8">
          {/* URL Input Field */}
          <input
            type="text"
            className="flex-1 px-[25px] py-[18px] border-2 border-[#e0e0e0] rounded-xl text-[16px] 
            transition-all duration-300 
            focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />

          {/* Shorten Button */}
          <button
            aria-label="Copy shortened URL"
            className="w-fit mx-auto px-10 py-[18px] text-white font-semibold text-[16px] rounded-xl 
            cursor-pointer transition-transform duration-300 
            bg-linear-to-br from-[#667eea] to-[#764ba2]
            hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)]"
          >
            Shorten
          </button>
        </form>

        {/* Result Box */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center rounded-xl mb-8 p-6 bg-linear-to-br from-[#f5f7fa] to-[#c3cfe2]" role="status" aria-live="polite">
          {/* Shortened URL Text */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <p className="text-gray-500">Your shortened URL:</p>
            <span className="text-[#667eea] font-bold ml-3">{shortenUrl}</span>
          </div>

          {/* Copy Button */}
          <div>
            <button
              className="px-6 py-2 bg-[#667eea] text-white font-semibold rounded-lg 
              transition-colors duration-300 hover:bg-[#5568d3] cursor-pointer"
            >
              📋 Copy
            </button>
          </div>
        </div>

        {/* Save Link Button */}
        <div className="mx-auto">
          <button
            className="w-full mx-auto px-10 py-[18px] text-white font-semibold text-[16px] rounded-xl 
            cursor-pointer transition-transform duration-300 
            bg-linear-to-br from-[#667eea] to-[#764ba2]
            hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)]"
          >
            Save Link
          </button>
        </div>
      </div>

      {/* Navigation Buttons Below the Card */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
        <Link href={"/previous-links"} className="w-40 text-center mx-auto sm:mx-0 px-6 py-3 bg-white text-[#667eea] font-semibold rounded-xl shadow-md hover:shadow-lg transition">
          Previous Links
        </Link>

        <Link href={"/saved-links"} className="w-40 text-center mx-auto sm:mx-0 px-6 py-3 bg-white text-[#667eea] font-semibold rounded-xl shadow-md hover:shadow-lg transition">
          Saved Links
        </Link>
      </div>
    </>
  );
};

export default Main;

"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface SavedLink {
  _id: string;
  title?: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
}

const SavedLinksClient = ({ links }: { links: SavedLink[] }) => {
  const [items, setItems] = useState<SavedLink[]>(links);

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleUnsave = async (id: string) => {
    try {
      await axios.delete(`/api/unsave-link/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Link Unsaved");
    } catch {
      toast.error("Failed to unsave link");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="container max-w-[1200px] mx-auto">
        <h1 className="text-[32px] sm:text-[42px] font-extrabold text-white text-center mb-10 drop-shadow-lg">Saved Links</h1>

        <div className="rounded-[20px] p-6 sm:p-10">
          {items.map((link) => (
            <div key={link._id} className="bg-[#f8f9fa] p-5 rounded-xl mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="break-all sm:break-normal flex-1">
                <h3 className="text-[#333] mb-1.5 font-semibold">{link.title || "Untitled Link"}</h3>
                <Link href={link.shortUrl} className="text-[#667eea] text-sm hover:underline">
                  {link.shortUrl}
                </Link>
                <p className="text-xs text-[#999] mt-2">
                  Created:{" "}
                  {new Date(link.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  • Clicks: <strong>{link.clicks}</strong>
                </p>
              </div>

              <div className="flex gap-2.5">
                <button onClick={() => handleCopy(link.shortUrl)} className="w-10 h-10 rounded-lg text-lg bg-[#667eea] text-white hover:scale-110 cursor-pointer" title="Copy">
                  📋
                </button>

                <button onClick={() => handleUnsave(link._id)} className="w-10 h-10 rounded-lg text-lg bg-[#ff6b6b] text-white hover:scale-110 cursor-pointer" title="Unsave">
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && <p className="text-center text-white">You haven’t saved any links yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default SavedLinksClient;

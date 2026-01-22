"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SaveLinkModal from "./SaveLinkModal";

interface LinkItem {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  savedAt: string | null;
}

const PreviousLinksList = ({ links }: { links: LinkItem[] }) => {
  const [items, setItems] = useState<LinkItem[]>(links);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedLink = items.find((l) => l._id === selectedId) || null;

  const handleSaveSuccess = (id: string, savedAt: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, savedAt } : item
      )
    );
  };

  return (
    <div className="rounded-[20px] p-6 sm:p-10 flex flex-col gap-4">
      {items.map((item) => (
        <div key={item._id} className="bg-[#f8f9fa] p-5 rounded-xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side content */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h3 className="text-[#333] font-semibold break-all">{item.originalUrl}</h3>

              <Link href={item.shortUrl} className="text-[#667eea] text-sm break-all hover:underline">{item.shortUrl}
              </Link>

              <div className="text-xs text-[#999]">
                Created:{" "}
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                • Clicks: <strong>{item.clicks}</strong>
              </div>
            </div>

            {/* Right side button */}
            <button disabled={!!item.savedAt} onClick={() => {
                if (item.savedAt) return;
                setSelectedId(item._id);
              }}
              className={`py-2 px-6 rounded-xl font-semibold shadow-md whitespace-nowrap self-start sm:self-center transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#667eea]/40 ${
                item.savedAt
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#667eea] text-white hover:bg-[#5568d3] hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
              }`}
            >
              {item.savedAt ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <p className="text-white text-center w-full">
          You have not created any links yet.
        </p>
      )}

      {selectedLink && (
        <SaveLinkModal
          linkId={selectedLink._id}
          onClose={() => setSelectedId(null)}
          onSuccess={(savedAt) => {
            handleSaveSuccess(selectedLink._id, savedAt);
            setSelectedId(null);
            toast.success("Link saved successfully");
          }}
        />
      )}
    </div>
  );
};

export default PreviousLinksList;

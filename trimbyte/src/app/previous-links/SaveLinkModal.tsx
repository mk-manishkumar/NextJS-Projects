"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  linkId: string;
  onClose: () => void;
  onSuccess: (savedAt: string) => void;
}

const SaveLinkModal = ({ linkId, onClose, onSuccess }: Props) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/save-link", {linkId,title: title.trim()});
      onSuccess(res.data.savedAt);
    } catch {
      alert("Something went wrong while saving the link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-[#333] mb-4">Save this link</h2>

        <input type="text" placeholder="Enter a name for this link" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#667eea]/40"/>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">Cancel</button>

          <button onClick={handleSave} disabled={loading || !title.trim()} className="px-5 py-2 rounded-lg font-semibold text-white bg-[#667eea] hover:bg-[#5568d3] disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
};

export default SaveLinkModal;

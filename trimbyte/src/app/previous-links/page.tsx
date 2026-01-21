import Link from "next/link";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import UserLink from "@/models/UserLink.model";
import { authOptions } from "@/lib/auth";

const PreviousLinks = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  await connectDB();

  const links = await UserLink.find({ userId: session.user.id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="container max-w-[1200px] mx-auto">
        <h1 className="text-[32px] sm:text-[42px] font-extrabold text-white text-center mb-10 drop-shadow-lg">Previous Work</h1>

        <div className="rounded-[20px] p-6 sm:p-10 flex flex-col gap-4">
          {links.map((item) => (
            <div key={item._id.toString()} className="bg-[#f8f9fa] p-5 rounded-xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left side content */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="text-[#333] font-semibold break-all">{item.originalUrl}</h3>
                  <Link href={item.shortUrl} className="text-[#667eea] text-sm break-all hover:underline">
                    {item.shortUrl}
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
                <button disabled={!!item.savedAt} className={`py-2 px-6 rounded-xl font-semibold shadow-md whitespace-nowrap self-start sm:self-center transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#667eea]/40 ${item.savedAt ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#667eea] text-white hover:bg-[#5568d3] hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"}`}>
                  {item.savedAt ? "Saved" : "Save"}
                </button>

              </div>
            </div>
          ))}

          {links.length === 0 && <p className="text-white text-center w-full">You have not created any links yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default PreviousLinks;

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) throw new Error("❌ MONGODB_URL is missing in environment variables");

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URL);
    isConnected = true;
    if (process.env.NODE_ENV === "development") console.log("✅ MongoDB Connected:", db.connection.host);
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

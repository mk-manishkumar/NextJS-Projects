import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TrimByte",
  description: "Trim links, Save bytes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-linear-to-br from-[#667eea] to-[#764ba2] min-h-screen flex flex-col"}>
        <Navbar />
        <main className="flex-1 flex flex-col px-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

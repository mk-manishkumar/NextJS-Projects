import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

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
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col px-5">{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#363636",
                color: "#fff",
                fontSize: "1.5rem",
              },
            }}
          />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

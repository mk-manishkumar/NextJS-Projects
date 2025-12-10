import type { Metadata } from "next";
import "./globals.css";

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
      <body className={"bg-linear-to-br min-h-screen from-[#667eea] to-[#764ba2]"}>
        {children}
      </body>
    </html>
  );
}

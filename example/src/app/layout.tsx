import type { Metadata } from "next";
import AppWalletProvider from "@/components/providers/AppWalletProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyBlink Domain",
  description: "Get yourself a domain on the Solana blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-black to-gray-800 text-white">
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}

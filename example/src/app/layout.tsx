import type { Metadata } from "next";
import AppWalletProvider from "@/components/providers/AppWalletProvider";
import "./globals.css";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Blinkd.in Domain",
  description: "Get yourself a domain on the Solana blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-500">
        <AppWalletProvider>{children}</AppWalletProvider>
        <footer className="text-xs p-5">
          <Link href={"/"}>
            🏠
          </Link>
          | Made by <Link className="text-red-500" target="_blank" href={"https://www.metasal.xyz"}>@metasal</Link></footer>

      </body>
    </html>
  );
}

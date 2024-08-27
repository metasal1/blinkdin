"use client";

import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectButton } from "@/components/buttons/ConnectButton";
import { StartButton } from "@/components/buttons/StartButton";
import { SubdomainSearch } from "@/components/SubdomainSearch";
import Link from "next/link";
export default function Home() {
  const { connected } = useWallet();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-end px-4 py-3">
        <ConnectButton />
      </div>
      <div className="m-auto flex max-w-[90vw] grow flex-col items-center justify-center pb-16">
        <Link href={'/'}>
          <Image
            className="relative mb-6 size-20"
            src="/images/sns.svg"
            alt="MyBlink Logo"
            width={33}
            height={38}
            priority
          />
        </Link>
        <h1 className="mb-4 text-center text-2xl">
          MyBlink.sol
        </h1>
        {connected ? <SubdomainSearch /> : <StartButton />}
      </div>
    </main>
  );
}

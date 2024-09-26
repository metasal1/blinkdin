"use client";

import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectButton } from "@/components/buttons/ConnectButton";
import { StartButton } from "@/components/buttons/StartButton";
import { SubdomainSearch } from "@/components/SubdomainSearch";
import Link from "next/link";

const DOMAIN_PRICE = 0.01;

export default function Home() {
  const { connected } = useWallet();
  const eyesRef = useRef<HTMLAnchorElement>(null);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-end px-4 py-3">
        <ConnectButton />
      </div>
      <div className="m-auto flex max-w-[90vw] grow flex-col items-center justify-center pb-16">
        <Link ref={eyesRef} className="blink-random text-9xl" href={'/'}>
          👀
        </Link>
        <h1 className="mb-4 text-center text-2xl">
          Blinkd.sol
        </h1>
        <p className="mb-4 text-center">
          Register your subdomain for only {DOMAIN_PRICE} SOL!
        </p>
        {connected ? <SubdomainSearch /> : <StartButton />}
      </div>
    </main>
  );
}
import { ChangeEventHandler, useState } from "react";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getDomainKeySync, NAME_PROGRAM_ID } from "@bonfida/spl-name-service";
import { ExternalLink } from "@/components/icons/ExternalLink";
import { isValidSubdomain } from "@/utils/string";
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

enum Step {
  Searching,
  Transfer,
  Processing,
  Success,
  Error,
}

export const SubdomainSearch = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [step, setStep] = useState(Step.Searching);
  const [subdomain, setSubdomain] = useState("");
  const [errorText, setErrorText] = useState("");

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    setSubdomain(value);
    if (isValidSubdomain(value)) {
      setErrorText("");
    } else {
      setErrorText("Invalid Subdomain");
    }
  };

  const onSearch = async () => {
    const { pubkey } = getDomainKeySync(
      `${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`
    );
    const info = await connection.getAccountInfo(pubkey);
    if (info?.owner?.equals(NAME_PROGRAM_ID)) {
      setErrorText("Subdomain Unavailable");
    } else {
      setStep(Step.Transfer);
    }
  };

  const onTransfer = async () => {
    if (!publicKey) {
      setErrorText("Wallet not connected");
      setStep(Step.Error);
      return;
    }

    try {
      const transferAmount = 0.01 * LAMPORTS_PER_SOL;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_RECEIVER_ADDRESS || ""),
          lamports: transferAmount,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      setStep(Step.Processing);
      await registerSubdomain();
    } catch (error) {
      console.error("Transfer error:", error);
      setErrorText(`Error: ${error instanceof Error ? error.message : "Unknown error during transfer"}`);
      setStep(Step.Error);
    }
  };

  const registerSubdomain = async () => {
    await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicKey,
        subdomain,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStep(Step.Success);
        } else {
          setErrorText(`Error: ${data.error}`);
          setStep(Step.Error);
        }
      })
      .catch(() => {
        setErrorText("Error: Request failure");
        setStep(Step.Error);
      });
  };

  const reset = () => {
    setStep(Step.Searching);
    setSubdomain("");
    setErrorText("");
  };

  if (step === Step.Searching) {
    return (
      <>
        <div className="flex w-full">
          <input
            className="w-screen text-ellipsis border-b-2 bg-transparent p-1 text-lg focus-within:outline-none"
            value={subdomain}
            placeholder={`Search for your .${process.env.NEXT_PUBLIC_DOMAIN_NAME} subdomain...`}
            onChange={onSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearch();
              }
            }}
          />
          <button
            className="px-3 text-2xl disabled:text-white/40"
            disabled={!!errorText}
            onClick={onSearch}
          >
            GO!
          </button>
        </div>
        {errorText && (
          <span className="w-full p-1 text-sm text-red-400">{errorText}</span>
        )}
      </>
    );
  }

  if (step === Step.Transfer) {
    return (
      <>
        <span className="mb-4 text-xl">
          To register {subdomain}.{process.env.NEXT_PUBLIC_DOMAIN_NAME}, you need to pay 0.01 SOL.
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onTransfer}
        >
          Pay and Register
        </button>
        <button className="animate-pulse text-xl text-white/75" onClick={reset}>
          Cancel
        </button>
      </>
    );
  }

  if (step === Step.Processing) {
    return <span className="animate-pulse text-xl">Processing...</span>;
  }

  if (step === Step.Success) {
    return (
      <>
        <span className="mb-4 text-xl text-green-400">
          Congratulations! You are now the proud owner of
        </span>
        <Link
          href={`https://sns.id/domain?domain=${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`}
          target="_blank"
          className="mb-8 text-3xl font-semibold text-white"
        >
          {`${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`}
          <ExternalLink className="ml-1 inline-block size-6" />
        </Link>
        <button className="animate-pulse text-xl text-white/75" onClick={reset}>
          Buy another
        </button>
      </>
    );
  }

  if (step === Step.Error) {
    return (
      <>
        <span className="mb-8 text-xl text-red-400">{errorText}</span>
        <button className="animate-pulse text-xl text-white/75" onClick={reset}>
          Try again
        </button>
      </>
    );
  }
};
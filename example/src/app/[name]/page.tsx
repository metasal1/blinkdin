import { Metadata } from "next";
import { toTitleCase } from "@/utils/string";

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
    const titleCaseName = toTitleCase(params.name);
    return {
        title: `${titleCaseName}'s BlinkdIn`,
        description: "Get yourself a profile on the Solana blockchain",
    };
}

export default function Page({ params }: { params: { name: string } }) {
    const titleCaseName = toTitleCase(params.name);
    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Hello {titleCaseName}!</h1>
            <p className="text-lg">Welcome to your BlinkdIn profile</p>
            <div>Twitter</div>
            <div>Github</div>
            <div>Website</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Telegram</div>
            <div>Discord</div>
            <div>Instagram</div>
            <div>Facebook</div>
            <div>TikTok</div>
            <div>Snapchat</div>
            <div>WhatsApp</div>
            <div>LinkedIn</div>
        </div>
    </>
}

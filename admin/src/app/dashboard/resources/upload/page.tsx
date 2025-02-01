"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import TypographyH3 from "@/components/typography/h3";
import FilesList from "./components/files-list";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Upload() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading.....</div>;
  }
  if (!session) {
    return (
      <Button
        onClick={() =>
          signIn("google", { callbackUrl: "/dashboard/resources/upload" })
        }
        className="font-bold"
      >
        Connect to Google Drive
      </Button>
    );
  }
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/dashboard/resources"}>
            <Button size={"icon"} variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>

          <TypographyH3>Welcome {session.user?.name}</TypographyH3>
        </div>
        <Button onClick={() => signOut()} className="font-semibold">
          Logout
        </Button>
      </div>
      <FilesList />
    </div>
  );
}

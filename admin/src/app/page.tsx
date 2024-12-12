import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/nav-bar";

export default function Home() {
  return (
    <div className="container mx-auto px-8">
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center">
        <Link href={"/auth/login"}>
          <Button size={"lg"} variant={"outline"} className="font-semibold">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

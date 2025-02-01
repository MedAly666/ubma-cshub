import TypographyH2 from "@/components/typography/h2";
import { LoginCard } from "./components/login-card";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" space-y-5">
        <TypographyH2>CS-HUB Admin</TypographyH2>
        <LoginCard />
      </div>
    </div>
  );
}

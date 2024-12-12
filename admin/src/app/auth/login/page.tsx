import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";
import TypographyH3 from "@/components/typography/h3";
import Navbar from "@/app/components/nav-bar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-8 flex items-center justify-center min-h-[80vh]">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>
              <TypographyH3>Access Dashboard</TypographyH3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

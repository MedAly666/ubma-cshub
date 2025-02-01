"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-2">
        <CardTitle className="text-start">Login</CardTitle>
        <CardDescription className="text-start">
          Enter your credentials to access the admin dashboard.
        </CardDescription>
      </CardHeader>
      <LoginForm />
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { useActionState } from "react";
import TypographyMuted from "@/components/typography/muted";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [state, loginAction, isPending] = useActionState(login, {
    success: false,
  });
  return (
    <form className="space-y-8" action={loginAction}>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input name="username" className="mb-2" />
        {state.fieldErrors?.username && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.username}
          </TypographyMuted>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" className="mb-2" />
        {state.fieldErrors?.password && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.password}
          </TypographyMuted>
        )}
      </div>
      <div>
        <Button
          type="submit"
          className="font-semibold w-full mb-2"
          disabled={isPending}
        >
          {isPending ? "Logging in" : "Login"}
        </Button>
        {state.serverErrors && (
          <TypographyMuted className="text-red-500">
            {state.serverErrors}
          </TypographyMuted>
        )}
      </div>
    </form>
  );
}

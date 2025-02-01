"use client";

import { Button } from "@/components/ui/button";
import TypographyMuted from "@/components/typography/muted";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { login } from "../actions";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, loginAction, isPending] = useActionState(login, {
    success: false,
  });

  return (
    <form action={loginAction}>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex-col">
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
      </CardFooter>
    </form>
  );
}

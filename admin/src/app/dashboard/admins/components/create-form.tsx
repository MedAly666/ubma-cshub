"use client";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { createAdmin } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TypographyMuted from "@/components/typography/muted";

interface CreateAdminFormProps {
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
}
export default function CreateAdminForm({
  setIsCreateDialogOpen,
}: CreateAdminFormProps) {
  const [state, createAdminAction, isPending] = useActionState(createAdmin, {
    success: false,
  });

  useEffect(() => {
    if (state.success) setIsCreateDialogOpen(false);
  }, [state.success, setIsCreateDialogOpen]);
  return (
    <form action={createAdminAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input name="username" />
        {state.fieldErrors?.username && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.username}
          </TypographyMuted>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" />
        {state.fieldErrors?.email && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.email}
          </TypographyMuted>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" />
        {state.fieldErrors?.password && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.password}
          </TypographyMuted>
        )}
      </div>
      <div className="w-full">
        <Button disabled={isPending} className="w-full mb-2">
          {isPending ? "Creating...." : "Create"}
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

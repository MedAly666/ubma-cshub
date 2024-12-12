"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TypographyMuted from "@/components/typography/muted";
import { Label } from "@/components/ui/label";
import { useActionState, Dispatch, SetStateAction, useEffect } from "react";
import { createDegree } from "../actions";

interface CreateDegreeFormProps {
  setCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
}
export default function CreateDegreeForm({
  setCreateDialogOpen,
}: CreateDegreeFormProps) {
  const [state, createDegreeAction, isPending] = useActionState(createDegree, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      setCreateDialogOpen(false);
    }
  }, [state.success, setCreateDialogOpen]);

  return (
    <form className="space-y-8" action={createDegreeAction}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="text" />
        {state.fieldErrors?.name && (
          <p className="text-red-500">{state.fieldErrors.name}</p>
        )}
      </div>
      <Button
        type="submit"
        className="font-semibold w-full"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create"}
      </Button>
      {state.serverErrors && (
        <TypographyMuted className="text-red-400">
          {state.fieldErrors}
        </TypographyMuted>
      )}
    </form>
  );
}

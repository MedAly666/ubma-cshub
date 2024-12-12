"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Degree } from "@/types/db";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createMajor } from "../actions";
import TypographyMuted from "@/components/typography/muted";

interface CreateMajorFormProps {
  degrees: Degree[];
  closeCreateDialog: () => void;
}

export default function CreateMajorForm({
  closeCreateDialog,
  degrees,
}: CreateMajorFormProps) {
  const [state, createMajorAction, isPending] = useActionState(createMajor, {
    success: false,
  });

  useEffect(() => {
    if (state.success) closeCreateDialog();
  }, [state.success, closeCreateDialog]);

  return (
    <form className="flex flex-col gap-5" action={createMajorAction}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" />
        {state?.fieldErrors?.name && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.name}
          </TypographyMuted>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="code">Code</Label>
        <Input name="code" type="text" />
        {state?.fieldErrors?.code && (
          <p className="text-red-500">{state.fieldErrors.code}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" />
        {state?.fieldErrors?.description && (
          <p className="text-red-500">{state.fieldErrors.description}</p>
        )}
      </div>
      <div>
        <Select name="degreeId">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Degrees" />
          </SelectTrigger>
          <SelectContent>
            {degrees.map((degree) => {
              return (
                <SelectItem value={degree.id} key={degree.id}>
                  {degree.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {state?.fieldErrors?.degreeId && (
          <p className="text-red-500">{state.fieldErrors.degreeId}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>
      {state?.serverErrors && (
        <p className="text-red-500">{state.serverErrors}</p>
      )}
    </form>
  );
}

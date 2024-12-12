"use client";
import { Degree, Major } from "@/types/db";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useActionState, useEffect } from "react";
import { updateMajor } from "../actions";
import TypographyMuted from "@/components/typography/muted";

interface UpdateMajorProps {
  major: Major;
  closeUpdateDialog: () => void;
  degrees: Degree[];
}
export default function UpdateMajorForm({
  major,
  closeUpdateDialog,
  degrees,
}: UpdateMajorProps) {
  const [state, updateMajorAction, isPending] = useActionState(updateMajor, {
    success: false,
  });

  useEffect(() => {
    if (state.success) closeUpdateDialog();
  }, [state.success, closeUpdateDialog]);

  return (
    <form className="flex flex-col gap-5" action={updateMajorAction}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" defaultValue={major.name} />
        {state?.fieldErrors?.name && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.name}
          </TypographyMuted>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="code">Code</Label>
        <Input name="code" type="text" defaultValue={major.code} />
        {state?.fieldErrors?.code && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.code}
          </TypographyMuted>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" defaultValue={major.description} />
        {state?.fieldErrors?.description && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.description}
          </TypographyMuted>
        )}
      </div>
      <div>
        <Select name="degreeId" defaultValue={major.degreeId}>
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
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.degreeId}
          </TypographyMuted>
        )}
      </div>
      <Input
        type="text"
        className="hidden"
        readOnly
        defaultValue={major.id}
        name="majorId"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </Button>
      {state?.serverErrors && (
        <TypographyMuted className="text-red-500">
          {state.serverErrors}
        </TypographyMuted>
      )}
    </form>
  );
}

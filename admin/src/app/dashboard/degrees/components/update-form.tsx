"use client";
import { Button } from "@/components/ui/button";
import { Degree } from "@/types/db";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateDegree } from "../actions";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";

interface UpdateDegreeFormProps {
  degree: Degree;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
}
export default function UpdateDegreeForm({
  degree,
  setIsUpdateDialogOpen,
}: UpdateDegreeFormProps) {
  const [state, updateDegreeAction, isPending] = useActionState(updateDegree, {
    success: false,
  });

  useEffect(() => {
    if (state.success) setIsUpdateDialogOpen(false);
  }, [state.success, setIsUpdateDialogOpen]);

  return (
    <form className="flex gap-4 flex-col" action={updateDegreeAction}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" defaultValue={degree.name} />
      </div>
      <Input name="degreeId" className="hidden" readOnly value={degree.id} />
      <Button
        type="submit"
        className="font-semibold w-full"
        disabled={isPending}
      >
        {isPending ? "Updating...." : "Update"}
      </Button>
    </form>
  );
}

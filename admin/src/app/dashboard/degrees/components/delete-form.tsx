import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, Dispatch, SetStateAction, useEffect } from "react";
import { deleteDegree } from "../actions";
import { Degree } from "@/types/db";

interface DeleteDegreeFormProps {
  degree: Degree;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DeleteDegreeForm({
  degree,
  setIsDeleteDialogOpen,
}: DeleteDegreeFormProps) {
  const [state, deleteDegreeAction, isPending] = useActionState(deleteDegree, {
    success: false,
  });

  useEffect(() => {
    if (state.success) setIsDeleteDialogOpen(false);
  }, [state.success, setIsDeleteDialogOpen]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-4 w-full">
        {!isPending && <Button className="w-full">Cancel</Button>}
        <form action={deleteDegreeAction} className="w-full">
          <Input
            value={degree.id}
            className="hidden"
            readOnly
            name="degreeId"
          />
          <Button
            className="w-full"
            variant={"destructive"}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </form>
      </div>
      {state.serverErrors && (
        <p className="text-red-500">{state.serverErrors}</p>
      )}
    </div>
  );
}

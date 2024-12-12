import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Year } from "@/types/db";
import { deleteYear } from "../actions";

interface DeleteYearDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  year: Year;
}

export function DeleteYearDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  year,
}: DeleteYearDialogProps) {
  const [state, deleteYearAction, isPending] = useActionState(
    () => deleteYear(year.id),
    {
      success: false,
      error: null,
    }
  );

  useEffect(() => {
    if (state.success) {
      setIsDeleteDialogOpen(false);
    }
  }, [state.success, setIsDeleteDialogOpen]);
  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Year</DialogTitle>
          <DialogDescription>Delete Year Here</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <div className="gap-3 flex items-center w-full">
            <Button
              className={`w-full ${isPending ? "hidden" : "block"}`}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <form action={deleteYearAction} className="w-full">
              <Button
                className="w-full"
                variant={"destructive"}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </form>
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Semester } from "@/types/db";
import { deleteSemester } from "../actions";

interface DeleteSemesterDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  semester: Semester;
}

export function DeleteSemesterDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  semester,
}: DeleteSemesterDialogProps) {
  const [state, deleteSemesterAction, isPending] = useActionState(
    deleteSemester,
    {
      success: false,
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
          <DialogTitle>Delete Semester</DialogTitle>
          <DialogDescription>Delete Semester Here</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <div className="gap-3 flex items-center w-full">
            <Button
              className={`w-full ${isPending ? "hidden" : "block"}`}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <form action={deleteSemesterAction} className="w-full">
              <Input
                readOnly
                className="hidden"
                value={semester.id}
                name="semesterId"
              />
              <Button
                className="w-full"
                variant={"destructive"}
                disabled={isPending}
                type="submit"
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </form>
          </div>
          {state.serverErrors && (
            <p className="text-red-500">{state.serverErrors}</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

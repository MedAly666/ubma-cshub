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
import { Major } from "@/types/db";
import { deleteMajor } from "../actions";

interface DeleteMajorDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  major: Major;
}

export default function DeleteMajorDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  major,
}: DeleteMajorDialogProps) {
  const [state, deleteMajorAction, isPending] = useActionState(deleteMajor, {
    success: false,
  });

  useEffect(() => {
    if (state.success) setIsDeleteDialogOpen(false);
  }, [state.success, setIsDeleteDialogOpen]);

  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Dialog</DialogTitle>
          <DialogDescription>Delete Dialog Here</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <div className="gap-3 flex items-center w-full">
            <Button
              className={`w-full ${isPending ? "hidden" : "block"}`}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <form action={deleteMajorAction} className="w-full">
              <Input
                readOnly
                className="hidden"
                value={major.id}
                name="majorId"
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

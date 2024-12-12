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
import { Module } from "@/types/db";
import { deleteModule } from "../actions";

interface DeleteSemesterDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  module: Module;
}

export function DeleteModuleDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  module,
}: DeleteSemesterDialogProps) {
  const [state, deleteModuleAction, isPending] = useActionState(deleteModule, {
    success: false,
  });

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
          <DialogTitle>Delete Module</DialogTitle>
          <DialogDescription>Delete Module Here</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full gap-3 flex-col flex">
            <div className="gap-3 flex items-center w-full">
              <Button
                className={`w-full ${isPending ? "hidden" : "block"}`}
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <form action={deleteModuleAction} className="w-full">
                <Input
                  readOnly
                  className="hidden"
                  value={module.id}
                  name="moduleId"
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

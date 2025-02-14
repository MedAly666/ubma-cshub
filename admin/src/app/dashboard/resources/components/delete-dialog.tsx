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
import { Resource } from "@prisma/client";
import { deleteResource } from "../actions";

interface DeleteResourceDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  resource: Resource;
}

export default function DeleteResourceDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  resource,
}: DeleteResourceDialogProps) {
  const [state, deleteModuleAction, isPending] = useActionState(
    deleteResource,
    {
      success: false,
    }
  );

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
          <DialogTitle>Delete Resource</DialogTitle>
          <DialogDescription>Delete Resource Here</DialogDescription>
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
                  value={resource.id}
                  name="resourceId"
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

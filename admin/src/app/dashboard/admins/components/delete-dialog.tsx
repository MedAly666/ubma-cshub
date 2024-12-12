import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/db";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { deleteAdmin } from "../actions";
import { Button } from "@/components/ui/button";

interface DeleteAdminDialogProps {
  admin: User;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
}
export default function DeleteAdminDialog({
  setIsDeleteDialogOpen,
  isDeleteDialogOpen,
  admin,
}: DeleteAdminDialogProps) {
  const [state, deleteAdminAction, isPending] = useActionState(deleteAdmin, {
    success: false,
  });
  useEffect(() => {
    if (state.success) setIsDeleteDialogOpen(false);
  }, [state.success, setIsDeleteDialogOpen]);
  return (
    <Dialog
      onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
      open={isDeleteDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Admin</DialogTitle>
          <DialogDescription>Delete Admin Here</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={deleteAdminAction} className="w-full">
            <Input
              value={admin.id}
              className="hidden"
              readOnly
              name="adminId"
            />
            <div className="w-full flex items-center gap-4">
              {!isPending && (
                <Button variant={"destructive"} className="w-full">
                  Cancel
                </Button>
              )}
              <Button className="w-full" disabled={isPending}>
                {isPending ? "Deleting...." : "Delete"}
              </Button>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

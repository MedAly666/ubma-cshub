import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import UpdateAdminForm from "./update-form";

interface UpdateAdminDialogProps {
  admin: User;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  isUpdateDialogOpen: boolean;
}
export default function UpdateAdminDialog({
  setIsUpdateDialogOpen,
  isUpdateDialogOpen,
  admin,
}: UpdateAdminDialogProps) {
  return (
    <Dialog
      onOpenChange={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
      open={isUpdateDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Admin</DialogTitle>
          <DialogDescription>Update Admin Here</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <UpdateAdminForm
            admin={admin}
            setIsUpdateDialogOpen={setIsUpdateDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

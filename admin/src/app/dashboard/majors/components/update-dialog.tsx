import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Degree, Major } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import UpdateMajorForm from "./update-form";

interface UpdateMajorProps {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  major: Major;
  degrees: Degree[];
}
export default function UpdateMajorDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  major,
  degrees,
}: UpdateMajorProps) {
  function closeUpdateDialog() {
    setIsUpdateDialogOpen(false);
  }
  return (
    <Dialog
      open={isUpdateDialogOpen}
      onOpenChange={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Major</DialogTitle>
          <DialogDescription>Update Major Here</DialogDescription>
        </DialogHeader>
        <UpdateMajorForm
          degrees={degrees}
          major={major}
          closeUpdateDialog={closeUpdateDialog}
        />
      </DialogContent>
    </Dialog>
  );
}

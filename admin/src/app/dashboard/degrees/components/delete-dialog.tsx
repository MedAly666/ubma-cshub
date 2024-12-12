import { Degree } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteDegreeForm from "./delete-form";

interface DeleteDegreeDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  degree: Degree;
}
export default function DeleteDegreeDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  degree,
}: DeleteDegreeDialogProps) {
  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Degree</DialogTitle>
          <DialogDescription>Delete Degree Program Here</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <DeleteDegreeForm
            degree={degree}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

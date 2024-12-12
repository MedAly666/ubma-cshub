import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Degree } from "@/types/db";
import UpdateDegreeForm from "./update-form";

interface UpdateDegreeProps {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  degree: Degree;
}
export default function UpdateDegreeDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  degree,
}: UpdateDegreeProps) {
  return (
    <Dialog
      open={isUpdateDialogOpen}
      onOpenChange={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Degree</DialogTitle>
          <DialogDescription>Update Degree Program Here</DialogDescription>
        </DialogHeader>
        <UpdateDegreeForm
          degree={degree}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

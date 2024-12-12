import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Degree, Year, Major } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import UpdateYearForm from "./update-form";

interface UpdateYearProps {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  year: Year;
  majors: Major[];
  degrees: Degree[];
}
export default function UpdateYearDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  year,
  degrees,
  majors,
}: UpdateYearProps) {
  const closeUpdateDialog = () => setIsUpdateDialogOpen(false);
  return (
    <Dialog
      open={isUpdateDialogOpen}
      onOpenChange={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Year</DialogTitle>
          <DialogDescription>Update Year Here</DialogDescription>
        </DialogHeader>
        <UpdateYearForm
          year={year}
          degrees={degrees}
          majors={majors}
          closeUpdateDialog={closeUpdateDialog}
        />
      </DialogContent>
    </Dialog>
  );
}

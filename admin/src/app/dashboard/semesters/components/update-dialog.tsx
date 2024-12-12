import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Semester, Year, Degree, Major } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import UpdateSemesterForm from "./update-form";

interface UpdateYearProps {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  semester: Semester;
  years: Year[];
  degrees: Degree[];
  majors: Major[];
}
export default function UpdateSemesterDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  semester,
  years,
  majors,
  degrees,
}: UpdateYearProps) {
  return (
    <Dialog
      open={isUpdateDialogOpen}
      onOpenChange={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Semester</DialogTitle>
          <DialogDescription>Update Semester Here</DialogDescription>
        </DialogHeader>
        <UpdateSemesterForm
          semester={semester}
          years={years}
          majors={majors}
          degrees={degrees}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

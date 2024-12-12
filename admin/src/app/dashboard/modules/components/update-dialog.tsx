import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Semester, Year, Degree, Module, Major } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import UpdateModuleForm from "./update-form";

interface UpdateModuleProps {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  module: Module;
  years: Year[];
  majors: Major[];
  degrees: Degree[];
  semesters: Semester[];
}
export default function UpdateModuleDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  module,
  years,
  degrees,
  majors,
  semesters,
}: UpdateModuleProps) {
  return (
    <Dialog
      open={isUpdateDialogOpen}
      onOpenChange={() => setIsUpdateDialogOpen(!isUpdateDialogOpen)}
    >
      <DialogTrigger asChild />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Module</DialogTitle>
          <DialogDescription>Update Module Here</DialogDescription>
        </DialogHeader>
        <UpdateModuleForm
          semesters={semesters}
          years={years}
          majors={majors}
          degrees={degrees}
          module={module}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

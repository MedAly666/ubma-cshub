import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import UpdateResourceForm from "./update-form";
import { Resource, Semester, Year, Degree, Module, Major } from "@/types/db";

interface UpdateResourceProps {
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  modules: Module[];
  years: Year[];
  majors: Major[];
  degrees: Degree[];
  semesters: Semester[];
  resource: Resource;
}
export default function UpdateResourceDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  resource,
  modules,
  years,
  degrees,
  majors,
  semesters,
}: UpdateResourceProps) {
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
        <UpdateResourceForm
          semesters={semesters}
          years={years}
          majors={majors}
          degrees={degrees}
          modules={modules}
          resource={resource}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

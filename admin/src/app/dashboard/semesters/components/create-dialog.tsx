"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateSemesterForm from "./create-form";
import { Degree, Major, Year } from "@/types/db";
import { useState } from "react";

interface CreateSemesterDialogProps {
  years: Year[];
  majors: Major[];
  degrees: Degree[];
}
export default function CreateSemesterDialog({
  years,
  degrees,
  majors,
}: CreateSemesterDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeCreateDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Semester</DialogTitle>
          <DialogDescription>Add a New Semester Here</DialogDescription>
        </DialogHeader>
        <CreateSemesterForm
          years={years}
          closeCreateDialog={closeCreateDialog}
          degrees={degrees}
          majors={majors}
        />
      </DialogContent>
    </Dialog>
  );
}

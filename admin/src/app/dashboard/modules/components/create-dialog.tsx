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
import CreateModuleForm from "./create-form";
import { Degree, Major, Semester, Year } from "@/types/db";
import { useState } from "react";

interface CreateModuleDialogProps {
  years: Year[];
  degrees: Degree[];
  majors: Major[];
  semesters: Semester[];
}
export default function CreateModuleDialog({
  years,
  majors,
  degrees,
  semesters,
}: CreateModuleDialogProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <Dialog
      open={createDialogOpen}
      onOpenChange={() => setCreateDialogOpen(!createDialogOpen)}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Module</DialogTitle>
          <DialogDescription>Add a New Module Here</DialogDescription>
        </DialogHeader>
        <CreateModuleForm
          years={years}
          majors={majors}
          degrees={degrees}
          semesters={semesters}
          setCreateDialogOpen={setCreateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

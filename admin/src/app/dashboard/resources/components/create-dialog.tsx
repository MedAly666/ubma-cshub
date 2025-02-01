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
import CreateResourceForm from "./create-form";
import { Degree, Major, Module, Semester, Year } from "@/types/db";
import { useState } from "react";

interface CreateResourceDialogProps {
  years: Year[];
  degrees: Degree[];
  majors: Major[];
  semesters: Semester[];
  modules: Module[];
}
export default function CreateResourceDialog({
  years,
  majors,
  degrees,
  semesters,
  modules,
}: CreateResourceDialogProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <Dialog
      open={createDialogOpen}
      onOpenChange={() => setCreateDialogOpen(!createDialogOpen)}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent className="md:w-1/2 overflow-y-scroll h-1/2">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            Create Resource
          </DialogTitle>
          <DialogDescription>
            Add a new educational resource to your collection
          </DialogDescription>
        </DialogHeader>
        <CreateResourceForm
          years={years}
          majors={majors}
          degrees={degrees}
          semesters={semesters}
          modules={modules}
          setCreateDialogOpen={setCreateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

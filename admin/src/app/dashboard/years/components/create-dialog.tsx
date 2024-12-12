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
import CreateYearForm from "./create-form";
import { Degree, Major } from "@/types/db";
import { useState } from "react";

interface CreateYearDialogProps {
  degrees: Degree[];
  majors: Major[];
}
export default function CreateYearDialog({
  degrees,
  majors,
}: CreateYearDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Year</DialogTitle>
          <DialogDescription>Add a New Year Here</DialogDescription>
        </DialogHeader>
        <CreateYearForm
          degrees={degrees}
          closeDialog={closeDialog}
          majors={majors}
        />
      </DialogContent>
    </Dialog>
  );
}

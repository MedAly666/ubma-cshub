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
// import CreateSemesterForm from "./create-form";
import { Degree } from "@/types/db";
import { useState } from "react";
import CreateMajorForm from "./create-form";

interface CreateMajorDialogProps {
  degrees: Degree[];
}
export default function CreateMajorDialog({ degrees }: CreateMajorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeCreateDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Major</DialogTitle>
          <DialogDescription>Add a New Major Here</DialogDescription>
        </DialogHeader>
        <CreateMajorForm
          closeCreateDialog={closeCreateDialog}
          degrees={degrees}
        />
        {/* <CreateSemesterForm handleClose={handleClose} degrees={degrees} /> */}
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateDegreeForm from "./create-form";
import { useState } from "react";

export default function CreateDegreeDialog() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <Dialog
      onOpenChange={() => setCreateDialogOpen(!createDialogOpen)}
      open={createDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Degree</DialogTitle>
          <DialogDescription>Add a New Degree Program Here</DialogDescription>
        </DialogHeader>
        <CreateDegreeForm setCreateDialogOpen={setCreateDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}

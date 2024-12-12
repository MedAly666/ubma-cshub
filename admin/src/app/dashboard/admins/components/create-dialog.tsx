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
import CreateAdminForm from "./create-form";
import { useState } from "react";

export default function CreateAdminDialog() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  return (
    <Dialog
      onOpenChange={() => setIsCreateDialogOpen(!isCreateDialogOpen)}
      open={isCreateDialogOpen}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
          <DialogDescription>Add a New Admin Here</DialogDescription>
        </DialogHeader>
        <CreateAdminForm setIsCreateDialogOpen={setIsCreateDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}

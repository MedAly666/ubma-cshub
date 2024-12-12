"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Degree, Major, Semester, Year } from "@/types/db";
import { DeleteSemesterDialog } from "./delete-dialog";
import UpdateSemesterDialog from "./update-dialog";
import { useState } from "react";

interface ActionsMenuProps {
  semester: Semester;
  years: Year[];
  degrees: Degree[];
  majors: Major[];
}
export default function ActionsMenu({
  semester,
  years,
  degrees,
  majors,
}: ActionsMenuProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSemesterDialog
        semester={semester}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
      />
      <UpdateSemesterDialog
        years={years}
        degrees={degrees}
        majors={majors}
        semester={semester}
        setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        isUpdateDialogOpen={isUpdateDialogOpen}
      />
    </>
  );
}

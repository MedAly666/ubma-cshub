"use client";

import { User } from "@/types/db";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteAdminDialog from "./delete-dialog";
import UpdateAdminDialog from "./update-dialog";
interface ActionsMenuProps {
  admin: User;
}

export default function TableActions({ admin }: ActionsMenuProps) {
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
      <DeleteAdminDialog
        admin={admin}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
      />
      <UpdateAdminDialog
        admin={admin}
        setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        isUpdateDialogOpen={isUpdateDialogOpen}
      />
    </>
  );
}

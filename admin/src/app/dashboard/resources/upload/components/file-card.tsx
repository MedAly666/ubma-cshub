import { File, EllipsisVertical, Trash, Eye, Copy } from "lucide-react";
import TypographyH4 from "@/components/typography/h4";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IFile } from "./files-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FileCardProps {
  file: IFile;
}

function parseFileName(name: string) {
  if (name.length > 50) {
    return name.slice(0, 50) + ".....";
  }
  return name;
}

export default function FileCard({ file }: FileCardProps) {
  const queryCient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeFile,
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ["files"] });
    },
  });
  async function removeFile(id: string) {
    const res = await fetch("/api/drive/files", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    await res.json();
  }
  return (
    <div
      className={`border-secondary flex items-center justify-between p-3 border cursor-pointer hover:bg-secondary ${
        mutation.isPending && "bg-secondary"
      }`}
    >
      <div className="flex items-center gap-2">
        <File />
        <TypographyH4>{parseFileName(file.name)}</TypographyH4>
      </div>
      <div className="flex items-center gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => (window.open(file.link), "_self")}
            >
              <Eye />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => mutation.mutate(file.id)}
              className="cursor-pointer"
            >
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(file.link)}
              className="cursor-pointer"
            >
              <Copy />
              <span>Copy Link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

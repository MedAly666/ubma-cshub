"use client";
import { Input } from "@/components/ui/input";
import { List, Grid } from "lucide-react";
import TypographyH3 from "@/components/typography/h3";
import FileCard from "./file-card";
import { useQuery } from "@tanstack/react-query";
import UploadFileForm from "./upload-file-form";
import StorageInformation from "./storage-information";

function parseType(mimetype: string) {
  const type = mimetype.split(".")[mimetype.split(".").length - 1];
  return type;
}
export interface IFile {
  id: string;
  name: string;
  type: string;
  link: string;
}
export default function FilesList() {
  const query = useQuery({ queryKey: ["files"], queryFn: getFiles });

  async function getFiles() {
    const res = await fetch("/api/drive/files");
    const data = await res.json();
    const transformedData: IFile[] = data.map(
      (item: {
        id: string;
        name: string;
        mimeType: string;
        webViewLink: string;
      }) => {
        return {
          id: item.id,
          name: item.name,
          type: parseType(item.mimeType),
          link: item.webViewLink,
        };
      }
    );
    return transformedData;
  }

  return (
    <div className="space-y-5">
      {/* Search & Create */}
      <div className="flex items-center justify-between">
        <Input placeholder="Search in Drive" className="w-60" />
        <div className="flex items-center gap-5">
          <div className="space-x-3 flex items-center">
            <List size={20} className="cursor-pointer hover:opacity-75" />
            <Grid size={20} className="cursor-pointer hover:opacity-75" />
            <UploadFileForm />
          </div>
        </div>
      </div>
      {/* Storage */}
      <StorageInformation />
      {/* Files */}
      <div className="space-y-3">
        <TypographyH3>Your Files</TypographyH3>
        {query.isLoading && <div>Loading....</div>}
        <div className="space-y-2">
          {query.data?.map((file, index) => {
            return <FileCard file={file} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { uploadToDrive } from "../actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function UploadFileForm() {
  const [state, uploadToDriveAction, isPending] = useActionState(
    uploadToDrive,
    {
      success: false,
    }
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPending) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 1000);
    } else {
      setProgress(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPending]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold">
          <Plus strokeWidth="3" />
          <span>Create New</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3" action={uploadToDriveAction}>
          <div className="flex items-center gap-4">
            <Label>File</Label>
            <Input type="file" name="file" />
          </div>
          <Button className="font-semibold self-end" disabled={isPending}>
            Upload
          </Button>
          {isPending && <Progress value={progress} />}
        </form>
      </DialogContent>
    </Dialog>
  );
}

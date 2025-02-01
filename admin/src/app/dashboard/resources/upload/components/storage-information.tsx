"use client";
import TypographyMuted from "@/components/typography/muted";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";

function byteToGb(bytes: number) {
  const number = bytes / Math.pow(2, 30);
  if (number < 1) {
    return number.toFixed(2);
  }
  return number;
}

function getProgress(value: number, max: number) {
  return (value * 100) / max;
}
export default function StorageInformation() {
  const query = useQuery({ queryKey: ["storage"], queryFn: fetchStorage });
  async function fetchStorage() {
    const res = await fetch("/api/drive/storage");
    const data = await res.json();
    return data;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <TypographyMuted>Storage</TypographyMuted>
        {query.isLoading ? (
          <div>Loading...</div>
        ) : (
          <TypographyMuted>
            {byteToGb(query.data.used)} GB of {byteToGb(query.data.total)} GB
            used
          </TypographyMuted>
        )}
      </div>
      {query.data && (
        <Progress
          value={getProgress(query.data.used, query.data.total)}
          className="h-3"
        />
      )}
    </div>
  );
}

"use client";

import TypographyH2 from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-48 flex items-center flex-col justify-center gap-5">
      <TypographyH2>Something went wrong!</TypographyH2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}

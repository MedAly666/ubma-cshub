import TypographyH3 from "@/components/typography/h3";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Years</TypographyH3>
        <Skeleton className="h-9 w-20 px-4 py-2 rounded-xl" />
      </div>
      <div>
        <Skeleton className="w-full h-40 rounded-xl" />
      </div>
    </div>
  );
}

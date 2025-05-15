import { TypographyH1 } from "@/components/typography/h1";
import { getAllDegrees } from "@/services/degrees";
import { getAllMajors } from "@/services/majors";
import { getAllYears } from "@/services/years";

export default async function Courses() {
  const degrees = await getAllDegrees();
  const majors = await getAllMajors();
  const years = await getAllYears();

  return (
    <div className="container mx-auto px-8 min-h-[100vh] flex space-y-5 flex-col items-start py-6">
      <TypographyH1>Choose Your Degree</TypographyH1>
    </div>
  );
}

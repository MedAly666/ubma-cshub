import { TypographyH1 } from "@/components/typography/h1";
import { findDegrees } from "@/services/degrees";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { findMajors } from "@/services/majors";
import { findYears } from "@/services/years";
import { findSemesters } from "@/services/semesters";
import { findModules } from "@/services/modules";

function numberToText(num: number) {
  const text = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];
  return text[num - 1];
}
export default async function Courses() {
  const degrees = await findDegrees();
  const majors = await findMajors();
  const years = await findYears();
  const semesters = await findSemesters();
  const modules = await findModules();

  return (
    <div className="container mx-auto px-8 min-h-[100vh] flex space-y-5 flex-col items-start py-6">
      <TypographyH1>Choose Your Degree</TypographyH1>
      <Select name="degreeId">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Degrees" />
        </SelectTrigger>
        <SelectContent>
          {degrees.map((degree) => {
            return (
              <SelectItem key={degree.id} value={degree.id}>
                {degree.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

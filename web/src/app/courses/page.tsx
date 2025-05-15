import { TypographyH1 } from "@/components/typography/h1";
import SelectCourseCard from "./components/select-course-card";
import { getAllMajors } from "@/services/majors";
import { getAllYears } from "@/services/years";
import { getAllSemesters } from "@/services/semesters";

export default async function Courses() {
  const majors = await getAllMajors();
  const years = await getAllYears();
  const semesters = await getAllSemesters();

  return (
    <div className="min-h-screen flex items-center flex-col gap-10 pt-10 container mx-auto">
      <TypographyH1>Computer Science Resource Hub</TypographyH1>
      <SelectCourseCard years={years} majors={majors} semesters={semesters} />
    </div>
  );
}

import TypographyH3 from "@/components/typography/h3";
import CreateYearDialog from "./components/create-dialog";
import { findYears } from "@/services/years";
import { findDegrees } from "@/services/degrees";
import { findMajors } from "@/services/majors";
import YearsTable from "./components/years-table";

export default async function Years() {
  const yearsReq = findYears();
  const degreesReq = findDegrees();
  const majorsReq = findMajors();
  const [years, degrees, majors] = await Promise.all([
    yearsReq,
    degreesReq,
    majorsReq,
  ]);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Years</TypographyH3>
        <CreateYearDialog degrees={degrees} majors={majors} />
      </div>
      <YearsTable years={years} majors={majors} degrees={degrees} />
    </div>
  );
}

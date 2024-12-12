import TypographyH3 from "@/components/typography/h3";
import CreateYearDialog from "./components/create-dialog";
import { getYears } from "@/services/years";
import { getDegrees } from "@/services/degrees";

import { getMajors } from "@/services/majors";
import YearsTable from "./components/years-table";

export default async function Years() {
  const yearsReq = getYears();
  const degreesReq = getDegrees();
  const majorsReq = getMajors();
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

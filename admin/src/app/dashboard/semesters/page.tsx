import TypographyH3 from "@/components/typography/h3";
import CreateSemesterDialog from "./components/create-dialog";
import { findYears } from "@/services/years";
import { findDegrees } from "@/services/degrees";
import { findSemesters } from "@/services/semesters";
import { findMajors } from "@/services/majors";
import SemestersTable from "./components/semesters-table";

export default async function Semesters() {
  const yearsReq = findYears();
  const degreesReq = findDegrees();
  const semestersReq = findSemesters();
  const majorsReq = findMajors();

  const [years, degrees, semesters, majors] = await Promise.all([
    yearsReq,
    degreesReq,
    semestersReq,
    majorsReq,
  ]);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Semesters</TypographyH3>
        <CreateSemesterDialog years={years} degrees={degrees} majors={majors} />
      </div>
      <div>
        <SemestersTable
          semesters={semesters}
          years={years}
          degrees={degrees}
          majors={majors}
        />
      </div>
    </div>
  );
}

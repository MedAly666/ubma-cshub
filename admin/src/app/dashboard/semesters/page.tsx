import TypographyH3 from "@/components/typography/h3";
import CreateSemesterDialog from "./components/create-dialog";
import { getYears } from "@/services/years";
import { getDegrees } from "@/services/degrees";
import { getSemesters } from "@/services/semesters";
import { getMajors } from "@/services/majors";
import SemestersTable from "./components/semesters-table";

export default async function Semesters() {
  const yearsReq = getYears();
  const degreesReq = getDegrees();
  const semestersReq = getSemesters();
  const majorsReq = getMajors();

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

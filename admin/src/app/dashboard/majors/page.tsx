import TypographyH3 from "@/components/typography/h3";
import { findMajors } from "@/services/majors";
import CreateMajorDialog from "./components/create-dialog";
import { findDegrees } from "@/services/degrees";
import MajorsTable from "./components/majors-table";

export default async function Semesters() {
  const majorsReq = findMajors();
  const degreesReq = findDegrees();
  const [majors, degrees] = await Promise.all([majorsReq, degreesReq]);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Majors</TypographyH3>
        <CreateMajorDialog degrees={degrees} />
      </div>
      <MajorsTable majors={majors} degrees={degrees} />
    </div>
  );
}

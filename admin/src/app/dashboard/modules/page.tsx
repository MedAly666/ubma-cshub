import TypographyH3 from "@/components/typography/h3";
import CreateModuleDialog from "./components/create-dialog";
import { findModules } from "@/services/modules";
import { findYears } from "@/services/years";
import { findDegrees } from "@/services/degrees";
import { findSemesters } from "@/services/semesters";
import { findMajors } from "@/services/majors";
import ModulesTable from "./components/modules-table";

export default async function Modules() {
  const modulesReq = findModules();
  const yearsReq = findYears();
  const degreesReq = findDegrees();
  const semestersReq = findSemesters();
  const majorsReq = findMajors();

  const [modules, years, degrees, semesters, majors] = await Promise.all([
    modulesReq,
    yearsReq,
    degreesReq,
    semestersReq,
    majorsReq,
  ]);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Modules</TypographyH3>
        <CreateModuleDialog
          majors={majors}
          years={years}
          degrees={degrees}
          semesters={semesters}
        />
      </div>
      <ModulesTable
        modules={modules}
        semesters={semesters}
        years={years}
        majors={majors}
        degrees={degrees}
      />
    </div>
  );
}

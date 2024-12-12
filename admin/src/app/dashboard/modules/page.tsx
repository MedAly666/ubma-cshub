import TypographyH3 from "@/components/typography/h3";
import CreateModuleDialog from "./components/create-dialog";
import { getModules } from "@/services/modules";
import { getYears } from "@/services/years";
import { getDegrees } from "@/services/degrees";
import { getSemesters } from "@/services/semesters";
import { getMajors } from "@/services/majors";
import ModulesTable from "./components/modules-table";

export default async function Modules() {
  const modulesReq = getModules();
  const yearsReq = getYears();
  const degreesReq = getDegrees();
  const semestersReq = getSemesters();
  const majorsReq = getMajors();

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

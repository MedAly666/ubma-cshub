import TypographyH3 from "@/components/typography/h3";
import { findModules } from "@/services/modules";
import { findYears } from "@/services/years";
import { findDegrees } from "@/services/degrees";
import { findSemesters } from "@/services/semesters";
import { findMajors } from "@/services/majors";
import ResourcesTable from "./components/resources-table";
import CreateResourceDialog from "./components/create-dialog";
import { findResources } from "@/services/resources";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Resources() {
  const modulesReq = findModules();
  const yearsReq = findYears();
  const degreesReq = findDegrees();
  const semestersReq = findSemesters();
  const majorsReq = findMajors();
  const resourcesReq = findResources();

  const [modules, years, degrees, semesters, majors, resources] =
    await Promise.all([
      modulesReq,
      yearsReq,
      degreesReq,
      semestersReq,
      majorsReq,
      resourcesReq,
    ]);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Resources</TypographyH3>
        <div className="space-x-2">
          <CreateResourceDialog
            majors={majors}
            modules={modules}
            years={years}
            degrees={degrees}
            semesters={semesters}
          />
          <Link href={"/dashboard/resources/upload"}>
            <Button>Upload</Button>
          </Link>
        </div>
      </div>
      <ResourcesTable
        modules={modules}
        semesters={semesters}
        years={years}
        majors={majors}
        degrees={degrees}
        resources={resources}
      />
    </div>
  );
}

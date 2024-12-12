import TypographyH3 from "@/components/typography/h3";
import { getDegrees } from "@/services/degrees";

import CreateDegreeDialog from "./components/create-dialog";
import DegreesTable from "./components/degrees-table";

export default async function Degrees() {
  const degrees = await getDegrees();
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Degrees</TypographyH3>
        <CreateDegreeDialog />
      </div>
      <DegreesTable degrees={degrees} />
    </div>
  );
}

import { Degree, Major, Module, Semester, Year } from "@/types/db";
import TableActions from "./table-actions";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface ModulesTableProps {
  modules: Module[];
  years: Year[];
  degrees: Degree[];
  semesters: Semester[];
  majors: Major[];
}
export default function ModulesTable({
  modules,
  years,
  degrees,
  semesters,
  majors,
}: ModulesTableProps) {
  const columns = [
    {
      header: "Name",
      accessor: (module: Module) => module.name,
    },
    {
      header: "Code",
      accessor: (module: Module) => module.code,
    },
    {
      header: "Description",
      accessor: (module: Module) => module.description,
    },
    {
      header: "Creation Date",
      accessor: (module: Module) => parseDate(module.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (module: Module) => parseDate(module.updatedAt.toString()),
    },
    {
      header: "Actions",
      accessor: (module: Module) => (
        <TableActions
          module={module}
          degrees={degrees}
          majors={majors}
          years={years}
          semesters={semesters}
        />
      ),
    },
  ];

  return <DynamicTable data={modules} columns={columns} />;
}

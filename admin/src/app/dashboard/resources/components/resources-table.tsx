import { Degree, Major, Module, Resource, Semester, Year } from "@/types/db";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface ResourcesTableProps {
  resources: Resource[];
  modules: Module[];
  years: Year[];
  degrees: Degree[];
  semesters: Semester[];
  majors: Major[];
}
export default function ResourcesTable({
  modules,
  years,
  degrees,
  semesters,
  majors,
  resources,
}: ResourcesTableProps) {
  const columns = [
    {
      header: "Module",
      accessor: (resource: Resource) => resource.module.name,
    },
    {
      header: "Type",
      accessor: (resource: Resource) => resource.resourceType,
    },
    /*  {
      header: "URL",
      accessor: (resource: Resource) => resource.url,
    }, */
    {
      header: "Description",
      accessor: (resource: Resource) => resource.description,
    },
    {
      header: "Creation Date",
      accessor: (resource: Resource) =>
        parseDate(resource.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (resource: Resource) =>
        parseDate(resource.updatedAt.toString()),
    },
    /* {
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
    }, */
  ];

  return <DynamicTable data={resources} columns={columns} />;
}

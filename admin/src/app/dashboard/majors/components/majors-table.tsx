import { Degree, Major } from "@/types/db";
import TableActions from "./table-actions";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface MajorsTableProps {
  majors: Major[];
  degrees: Degree[];
}
export default function MajorsTable({ majors, degrees }: MajorsTableProps) {
  const columns = [
    {
      header: "Name",
      accessor: (major: Major) => major.name,
    },
    {
      header: "Degree",
      accessor: (major: Major) => major.degree.name,
    },
    {
      header: "Code",
      accessor: (major: Major) => major.code,
    },
    {
      header: "Description",
      accessor: (major: Major) => major.description,
    },
    {
      header: "Creation Date",
      accessor: (major: Major) => parseDate(major.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (major: Major) => parseDate(major.updatedAt.toString()),
    },
    {
      header: "Actions",
      accessor: (major: Major) => (
        <TableActions major={major} degrees={degrees} />
      ),
    },
  ];

  return <DynamicTable data={majors} columns={columns} />;
}

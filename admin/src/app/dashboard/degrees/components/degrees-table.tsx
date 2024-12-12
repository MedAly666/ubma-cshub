import { Degree } from "@/types/db";
import TableActions from "./table-actions";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface DegreesTableProps {
  degrees: Degree[];
}
export default function DegreesTable({ degrees }: DegreesTableProps) {
  const columns = [
    {
      header: "Name",
      accessor: (degree: Degree) => degree.name,
    },
    {
      header: "Creation Date",
      accessor: (degree: Degree) => parseDate(degree.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (degree: Degree) => parseDate(degree.updatedAt.toString()),
    },
    {
      header: "Actions",
      accessor: (degree: Degree) => <TableActions degree={degree} />,
    },
  ];

  return <DynamicTable data={degrees} columns={columns} />;
}

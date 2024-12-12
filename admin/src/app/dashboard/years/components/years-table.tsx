import TableActions from "./table-actions";
import { Year, Degree, Major } from "@/types/db";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface YearsTableProps {
  years: Year[];
  degrees: Degree[];
  majors: Major[];
}
export default function YearsTable({
  years,
  degrees,
  majors,
}: YearsTableProps) {
  const columns = [
    {
      header: "Year Number",
      accessor: (year: Year) => year.yearNumber,
    },
    {
      header: "Major",
      accessor: (year: Year) => year.major.name,
    },
    {
      header: "Degree",
      accessor: (year: Year) => year.major.degree.name,
    },
    {
      header: "Creation Date",
      accessor: (year: Year) => parseDate(year.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (year: Year) => parseDate(year.updatedAt.toString()),
    },
    {
      header: "Actions",
      accessor: (year: Year) => (
        <TableActions year={year} degrees={degrees} majors={majors} />
      ),
    },
  ];

  return <DynamicTable data={years} columns={columns} />;
}

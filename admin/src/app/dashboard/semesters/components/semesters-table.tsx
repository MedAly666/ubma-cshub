import { Semester } from "@/types/db";
import ActionsMenu from "./table-actions";
import { Year, Degree, Major } from "@/types/db";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface SemestersTableProps {
  semesters: Semester[];
  years: Year[];
  degrees: Degree[];
  majors: Major[];
}
export default function SemestersTable({
  semesters,
  years,
  degrees,
  majors,
}: SemestersTableProps) {
  const columns = [
    {
      header: "Semester",
      accessor: (semester: Semester) => semester.semesterNumber,
    },
    {
      header: "Year",
      accessor: (semester: Semester) => semester.year.yearNumber,
    },
    {
      header: "Degree",
      accessor: (semester: Semester) => semester.year.major.degree.name,
    },
    {
      header: "Major",
      accessor: (semester: Semester) => semester.year.major.name,
    },
    {
      header: "Creation Date",
      accessor: (semester: Semester) =>
        parseDate(semester.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (semester: Semester) =>
        parseDate(semester.updatedAt.toString()),
    },
    {
      header: "Actions",
      accessor: (semester: Semester) => (
        <ActionsMenu
          semester={semester}
          years={years}
          degrees={degrees}
          majors={majors}
        />
      ),
    },
  ];

  return <DynamicTable data={semesters} columns={columns} />;
}

import { User } from "@/types/db";
import TableActions from "./table-actions";
import DynamicTable from "@/components/table/dynamic-table";
import { parseDate } from "@/utils/date";

interface AdminsTableProps {
  admins: User[];
}
export default function AdminsTable({ admins }: AdminsTableProps) {
  const columns = [
    {
      header: "Username",
      accessor: (admin: User) => admin.username,
    },
    {
      header: "Email",
      accessor: (admin: User) => admin.email,
    },
    {
      header: "Role",
      accessor: (admin: User) => admin.role,
    },
    {
      header: "Creation Date",
      accessor: (admin: User) => parseDate(admin.createdAt.toString()),
    },
    {
      header: "Update Date",
      accessor: (admin: User) => parseDate(admin.updatedAt.toString()),
    },
    {
      header: "Actions",
      accessor: (admin: User) => <TableActions admin={admin} />,
    },
  ];

  return <DynamicTable data={admins} columns={columns} />;
}

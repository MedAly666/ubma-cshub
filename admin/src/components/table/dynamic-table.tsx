import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ColumnConfig<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
}

export default function DynamicTable<T>({
  data,
  columns,
}: DynamicTableProps<T>) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {typeof col.accessor === "function"
                    ? col.accessor(item)
                    : (item[col.accessor] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

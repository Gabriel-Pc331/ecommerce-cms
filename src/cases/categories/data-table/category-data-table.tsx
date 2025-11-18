import type { CategoryDto } from "../../dtos/category.dto";
import { DataTable } from "../../components/data-table";
import { categoryColumns } from "./category-columns";

interface CategoryDataTableProps {
  data: CategoryDto[];
  onEdit?: (id: string) => void;
}

export function CategoryDataTable({ data, onEdit }: CategoryDataTableProps) {
  return (
    <DataTable
      columns={categoryColumns}
      data={data}
      onRowClick={(row: any) => {
        if (onEdit && row?.original?.id) {
          onEdit(row.original.id);
        }
      }}
    />
  );
}

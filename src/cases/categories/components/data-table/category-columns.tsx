import type { CategoryDto } from "../../dtos/category.dto";
import type { ColumnDef } from "@tanstack/react-table"; // se estiver usando react-table

export const categoryColumns: ColumnDef<CategoryDto>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "Nome da Categoria",
  },
];

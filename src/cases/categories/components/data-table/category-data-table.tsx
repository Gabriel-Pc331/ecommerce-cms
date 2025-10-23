import { useCategories } from "../../hooks/use-category";
import { categoryColumns } from "./category-columns";
import { DataTable } from "@/components/ui/data-table";

export function CategoryDataTable() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div>
      {isLoading ? (
        <p>Carregando categorias...</p>
      ) : (
        <DataTable columns={categoryColumns} data={categories} />
      )}
    </div>
  );
}

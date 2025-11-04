import type { ColumnDef } from "@tanstack/react-table";
import type { ProductDto } from "../../dtos/product.dto";
import { DataTableAction } from "@/components/layout/data-table-actions";

export const productColumns: ColumnDef<ProductDto>[] = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'name',
        header: 'Nome do Produto'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex justify-end mr-4">
                    <DataTableAction itemId={product.id!} />
                </div>
            )
        }
    }
];
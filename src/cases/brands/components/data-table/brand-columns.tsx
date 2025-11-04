import type { ColumnDef } from "@tanstack/react-table";
import type { BrandDto } from "../../dtos/brand.dto";
import { DataTableAction } from "@/components/layout/data-table-actions";

export const brandColumns: ColumnDef<BrandDto>[] = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'name',
        header: 'Nome da Marca'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const brand = row.original;

            return (
                <div className="flex justify-end mr-4">
                    <DataTableAction itemId={brand.id!} />
                </div>
            )
        }
    }
];
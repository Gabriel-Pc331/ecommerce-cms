import { DataTable } from "@/components/ui/data-table";
import { customerColumns } from "./customer-columns";
import { useCustomer } from "../../hooks/use-customer";

export function BrandDataTable() {

    const { data: customers, isLoading } = useCustomer();

    return (
        <div>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable columns={customerColumns} data={customers!} />
            )}
        </div>
    )
}
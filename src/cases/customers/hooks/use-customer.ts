import { useQuery } from "@tanstack/react-query";
import type { CustomerDTO } from "../dtos/customer.dto";
import { CustomerService } from "../services/customer.service";


export function useCustomers() {
    return useQuery<CustomerDTO[]>({
        queryKey: ['customers'],
        queryFn: CustomerService.list
    });
}

export function useCustomer(id: string) {
    return useQuery<CustomerDTO>({
        queryKey: ['customer', id],
        queryFn: () => CustomerService.getById(id),
        enabled: !!id // -> or boolean(id)
    });
}
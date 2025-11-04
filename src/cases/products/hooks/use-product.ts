import { useMutation, useQuery } from "@tanstack/react-query";
import type { ProductDto } from "../dtos/product.dto";
import { productService } from "../service/product.service";


export function useProducts() {
    return useQuery<ProductDto[]>({
        queryKey: ['products'],
        queryFn: productService.list
    });
}

export function useProduct(id: string) {
    return useQuery<ProductDto>({
        queryKey: ['product', id],
        queryFn: () => productService.getById(id),
        enabled: !!id // -> or boolean(id)
    });
}

export function useCreateProduct() {
    return useMutation<ProductDto, Error, Omit<ProductDto, 'id'>>({
        mutationFn: (product: Omit<ProductDto, 'id'>) => productService.create(product)
    });
}

export function useUpdateProduct() {
    return useMutation<ProductDto, Error, { id: string, product: ProductDto }>({
        mutationFn: ({ id, product }) => productService.update(id, product)
    });
}

export function useDeleteProduct() {
    return useMutation<void, Error, string>({
        mutationFn: (id: string) => productService.delete(id)
    });
}
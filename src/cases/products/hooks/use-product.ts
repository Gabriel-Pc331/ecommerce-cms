import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../categories/services/product.service";
import type { ProductDto } from "../dtos/product.dto";

export function useProducts() {
  return useQuery<ProductDto[]>({
    queryKey: ["products"],
    queryFn: () => productService.list(),
  });
}

export function useProduct(id: string) {
  return useQuery<ProductDto>({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<ProductDto, "id">) => productService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<ProductDto, "id"> }) =>
      productService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

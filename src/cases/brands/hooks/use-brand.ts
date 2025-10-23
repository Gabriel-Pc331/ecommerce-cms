import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { brandService } from "../../categories/services/brand.service";
import type { BrandDto } from "../dtos/brand.dto";

export function useBrands() {
  return useQuery<BrandDto[]>({
    queryKey: ["brands"],
    queryFn: () => brandService.list(),
  });
}

export function useBrand(id: string) {
  return useQuery<BrandDto>({
    queryKey: ["brand", id],
    queryFn: () => brandService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BrandDto, "id">) => brandService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}

export function useUpdateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<BrandDto, "id"> }) =>
      brandService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => brandService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["brands"] }),
  });
}

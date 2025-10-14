import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";
import type { CategoryDto } from "../dtos/category.dto";

export function useCategories() {
  return useQuery<CategoryDto[]>({
    queryKey: ["categories"],
    queryFn: () => categoryService.list(),
  });
}

export function useCategory(id: string) {
  return useQuery<CategoryDto>({
    queryKey: ["category", id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id, 
  });
}

 export function usecreateCategory() {
  return useMutation<CategoryDto, Error, Omit<CategoryDto, "id">>({
    mutationFn: (data) => categoryService.create(data),
  });
}

export function useUpdateCategory() {
  return useMutation<CategoryDto, Error, { id: string; data: Omit<CategoryDto, "id"> }>({
    mutationFn: ({ id, data }) => categoryService.update(id, data),
  });
}

export function useDeleteCategory() {
  return useMutation<void, Error, string>({
    mutationFn: (id) => categoryService.delete(id),
  });
}
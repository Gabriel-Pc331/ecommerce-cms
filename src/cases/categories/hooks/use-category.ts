import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoryDto } from "../dtos/category.dto";
import { categoryService } from "../services/category.service";
import { toast } from "react-toastify";


export function useCategories() {
    return useQuery<CategoryDto[]>({
        queryKey: ['categories'],
        queryFn: categoryService.list
    });
}

export function useCategory(id: string) {
    return useQuery<CategoryDto>({
        queryKey: ['category', id],
        queryFn: () => categoryService.getById(id),
        enabled: !!id // -> or boolean(id)
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();
    return useMutation<CategoryDto, Error, Omit<CategoryDto, 'id'>>({
        mutationFn: (category: Omit<CategoryDto, 'id'>) => categoryService.create(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Registro adcionado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao adcionar: ${error.message}`)
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation<CategoryDto, Error, { id: string, category: CategoryDto }>({
        mutationFn: ({ id, category }) => categoryService.update(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Registro alterado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`)
        }
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: (id: string) => categoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Registro excluído com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao excluir: ${error.message}`)
        }
    });
}
import type { BrandDto } from "@/cases/brands/dtos/brand.dto";
import type { CategoryDto } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
    id?: string;
    name: string;
    description?: string;
    price: number;
    active: boolean;
    category: CategoryDto;
    brand?: BrandDto;
}
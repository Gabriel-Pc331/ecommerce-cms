export interface ProductDto {
  id?: string;
  name: string;
  price: number;
  description?: string;
  brandId?: string; // relacionamento opcional com Brand
}

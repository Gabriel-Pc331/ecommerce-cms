import type { CustomerDTO } from "@/cases/customers/dto/customer";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface OrdemItem {
  id?: string;
  product: ProductDTO;
  quantity: number;
  value: number;
}

export interface OrderDTO {
  id?: string;
  customer: CustomerDTO;
  status: string;
  total: number;
  items: OrdemItem[];
  createdAt: Date;
  updatedAt: Date;
}

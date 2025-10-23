import { api } from '../../../lib/axios';
import type { ProductDto } from '../../products/dtos/product.dto';

const endpoint = '/products';

export const productService = {
  async list(): Promise<ProductDto[]> {
    const { data } = await api.get(endpoint);
    return data;
  },
  async create(data: Omit<ProductDto, "id">): Promise<ProductDto> {
    const res = await api.post(endpoint, data);
    return res.data;
  },
  async getById(id: string): Promise<ProductDto> {
    const { data } = await api.get(`${endpoint}/${id}`);
    return data;
  },
  async update(id: string, data: Omit<ProductDto, "id">): Promise<ProductDto> {
    const res = await api.put(`${endpoint}/${id}`, data);
    return res.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`${endpoint}/${id}`);
  },
};

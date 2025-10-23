import { api } from '../../../lib/axios';
import type { CategoryDto } from '../dtos/category.dto';

const endpoint = '/categories';

export const categoryService = {
  async list(): Promise<CategoryDto[]> {
    const result = await api.get(endpoint);
    return result.data;
  },

  async create(data: CategoryDto): Promise<CategoryDto> {
    const result = await api.post(endpoint, data);
    return result.data;
  },

  async getById(id: string): Promise<CategoryDto> {
    const result = await api.get(`${endpoint}/${id}`);
    return result.data;
  },

  async update(id: string, data: CategoryDto): Promise<CategoryDto> {
    const result = await api.put(`${endpoint}/${id}`, data);
    return result.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${endpoint}/${id}`);
  },
};

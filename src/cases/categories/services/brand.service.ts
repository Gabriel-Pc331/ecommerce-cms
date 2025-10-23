import { api } from '../../../lib/axios';
import type { BrandDto } from '../../brands/dtos/brand.dto';

const endpoint = '/brands';

export const brandService = {
  async list(): Promise<BrandDto[]> {
    const { data } = await api.get(endpoint);
    return data;
  },
  async create(data: Omit<BrandDto, "id">): Promise<BrandDto> {
    const res = await api.post(endpoint, data);
    return res.data;
  },
  async getById(id: string): Promise<BrandDto> {
    const { data } = await api.get(`${endpoint}/${id}`);
    return data;
  },
  async update(id: string, data: Omit<BrandDto, "id">): Promise<BrandDto> {
    const res = await api.put(`${endpoint}/${id}`, data);
    return res.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`${endpoint}/${id}`);
  },
};

import { apiClient } from '@/lib/api-client';
import { Category } from '@/types/category';

export const getCategories = () => apiClient.get<Category[]>('/category');
export const createCategory = (data: { name: string }) => apiClient.post<Category>('/category', data);
export const updateCategory = (id: number, data: { name: string }) => apiClient.put<Category>(`/category/${id}`, data);
export const deleteCategory = (id: number) => apiClient.delete<{ success: boolean; message?: string }>(`/category/${id}`);

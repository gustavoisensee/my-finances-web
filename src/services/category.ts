import { apiClient } from '@/lib/api-client';
import { Category } from '@/types/category';

export const getCategories = () => apiClient.get<Category[]>('/category');

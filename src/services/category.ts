import { apiClient } from '@/lib/api-client';

export const getCategories = () => apiClient.get('/category');

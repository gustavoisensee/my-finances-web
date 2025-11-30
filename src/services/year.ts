import { apiClient } from '@/lib/api-client';

export const getYears = () => apiClient.get('/year');

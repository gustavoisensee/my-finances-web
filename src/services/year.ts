import { apiClient } from '@/lib/api-client';
import { Year } from '@/types/year';

export const getYears = () => apiClient.get<Year[]>('/year');

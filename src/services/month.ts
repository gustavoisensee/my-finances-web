import { apiClient } from '@/lib/api-client';
import { MonthFormType } from '@/types/form';

export const getMonths = (yearId: number) =>
  apiClient.get(`/month?iIncomes=true&yearId=${yearId}`);

export const getMonthByIdWithAllData = (monthId: number) =>
  apiClient.get(`/month/${monthId}?iIncomes=true&iBudgets=true&iExpenses=true`);

export const createMonth = (month: MonthFormType) =>
  apiClient.post('/month', month);

export const updateMonth = (month: MonthFormType) =>
  apiClient.put(`/month/${month.id}`, month);

export const deleteMonth = (id: number) =>
  apiClient.delete(`/month/${id}`);
